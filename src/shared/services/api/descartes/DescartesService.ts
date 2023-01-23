import { Environment } from '../../../enviroment';
import { IDescarte, IProduto } from '../../../interfaces';
import EnderecosService from '../enderecos/EnderecosService';
import PessoasService from '../pessoas/PessoasService';
import ProdutosService from '../produtos/ProdutosService';
import VeiculosService from '../veiculos/VeiculosService';

interface ProdutoDescarteGet {
  uuid_produto: string;
  uuid_descarte: string;
  quantidade: number;
}

interface FuncionarioVeiculoDescarteGet {
  uuid_funcionario: string;
  uuid_descarte: string;
  uuid_veiculo: string;
  data_execucao: string;
}

interface DescarteGet {
  uuid_descarte: string;
  solicitado_em: string;
  uuid_solicitante: string;
  uuid_executante: string;
  uuid_origem: string;
  uuid_destino: string;
}

async function getAllProdutosInDescarte(uuid: string) {
  const response = await fetch(`${Environment.URL_BASE}/descartes/produtos/${uuid}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data: ProdutoDescarteGet[] = await response.json();

  if (data) {
    return await Promise.all(
      data.map(async (produto) => {
        const produtoData = await ProdutosService.getProdutoByUUID(produto.uuid_produto);
        return {
          produto: produtoData,
          quantidade: produto.quantidade,
        };
      })
    );
  }

  return Promise.reject('Não foi possível obter os produtos do descarte');
}

async function getAllFuncionariosVeiculosInDescarte(uuid: string) {
  const response = await fetch(`${Environment.URL_BASE}/descartes/funcionario/${uuid}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data: FuncionarioVeiculoDescarteGet[] = await response.json();

  if (data) {
    return await Promise.all(
      data.map(async (produto) => {
        const funcionario = await PessoasService.getPessoaByUUID(produto.uuid_funcionario);
        const veiculo = await VeiculosService.getVeiculoByUUId(produto.uuid_veiculo);
        return {
          funcionario: funcionario,
          veiculo: veiculo,
          data_execucao: produto.data_execucao,
        };
      })
    );
  }

  return Promise.reject('Não foi possível obter os produtos do descarte');
}

async function getAllDescartes(): Promise<IDescarte[]> {
  const response = await fetch(`${Environment.URL_BASE}/descartes`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data: DescarteGet[] = await response.json();

  if (data) {
    // Map assíncrono para obter UF pelo id_uf de cada municipio
    return await Promise.all(
      data.map(async (descarte) => {
        let destino = null;
        if (descarte.uuid_destino) {
          destino = await EnderecosService.getEnderecoByUUID(descarte.uuid_destino);
        }
        return {
          uuid: descarte.uuid_descarte,
          solicitadoEm: new Date(descarte.solicitado_em),
          solicitante: await PessoasService.getPessoaByUUID(descarte.uuid_solicitante),
          origem: await EnderecosService.getEnderecoByUUID(descarte.uuid_origem),
          destino: destino,
          produtosDescartados: await getAllProdutosInDescarte(descarte.uuid_descarte),
          funcionariosVeiculos: await getAllFuncionariosVeiculosInDescarte(descarte.uuid_descarte),
        } as IDescarte;
      })
    );
  }

  return Promise.reject('Não foi possível obter os descartes');
}

async function solicitarDescarte(descarte: {
  origem: { rua: string; numero: number; complemento: string; bairro: string; cep: string; municipioId: number };
  produtosDescartados: { produto: IProduto; quantidade: number }[];
}) {
  // Primeiro, posta o endereço de origem
  const origemUUID = await EnderecosService.postEndereco({
    rua: descarte.origem.rua,
    numero: descarte.origem.numero,
    complemento: descarte.origem.complemento,
    bairro: descarte.origem.bairro,
    cep: parseInt(descarte.origem.cep),
    uuid_pessoa: Environment.UUID_SOLICITANTE,
    municipiosId_municipio: descarte.origem.municipioId,
  });

  // Primeiro, faz de uuid do solicitante, executante e origem.
  const response = await fetch(`${Environment.URL_BASE}/descartes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      uuid_solicitante: Environment.UUID_SOLICITANTE,
      uuid_executante: Environment.UUID_SOLICITANTE,
      uuid_origem: origemUUID,
    }),
  });
  const data: { uuid_descarte: string } = await response.json();

  // Faz o post dos produtos no descarte
  await Promise.all(
    descarte.produtosDescartados.map(async (produto) => {
      await fetch(`${Environment.URL_BASE}/descartes/produtos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uuid_descarte: data.uuid_descarte,
          uuid_produto: produto.produto.uuid,
          quantidade: produto.quantidade,
        }),
      });
    })
  );

  // Se chegou até aqui, é porque deu tudo certo
  return Promise.resolve(true);
}

export default {
  getAllDescartes,
  solicitarDescarte,
};

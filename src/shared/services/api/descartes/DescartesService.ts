import { getExemploEndereco, IEndereco } from '../enderecos/EnderecosService';
import { getExemploFuncionario, getExemploSolicitante, IPessoa } from '../pessoas/PessoasService';
import { getExemploProduto, IProduto } from '../produtos/ProdutosService';
import { getExemploVeiculo, IVeiculo } from '../veiculos/VeiculosService';

export interface IDescarte {
  uuid: string;
  solicitadoEm: Date;
  solicitante: IPessoa;
  origem: IEndereco;
  destino: IEndereco;
  produtosDescartados: {
    produto: IProduto;
    quantidade: number;
  }[];
  funcionariosVeiculos: {
    funcionario: IPessoa;
    veiculo: IVeiculo;
  }[];
}

export function getExemploDescarte() {
  return ({
    uuid: '03ebcae2-a84c-4d06-beca-b1e4bbe33965',
    solicitadoEm: new Date(2014, 7, 8, 14, 0, 0, 0),
    solicitante: getExemploSolicitante(),
    origem: getExemploEndereco(),
    destino: getExemploEndereco(),
    produtosDescartados: [{
      produto: getExemploProduto(),
      quantidade: 1
    }],
    funcionariosVeiculos: [{
      funcionario: getExemploFuncionario(),
      veiculo: getExemploVeiculo(),
    }],
  } as IDescarte);
}

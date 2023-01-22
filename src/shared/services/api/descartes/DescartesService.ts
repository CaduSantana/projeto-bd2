import { IDescarte } from '../../../interfaces/interfaces';
import { getExemploEndereco } from '../enderecos/EnderecosService';
import { getExemploFuncionario, getExemploSolicitante } from '../pessoas/PessoasService';
import { getExemploProduto } from '../produtos/ProdutosService';
import { getExemploVeiculo } from '../veiculos/VeiculosService';

export function getExemploDescarte() {
  return {
    uuid: '03ebcae2-a84c-4d06-beca-b1e4bbe33965',
    solicitadoEm: new Date(2014, 7, 8, 14, 0, 0, 0),
    solicitante: getExemploSolicitante(),
    origem: getExemploEndereco(),
    destino: getExemploEndereco(),
    produtosDescartados: [
      {
        produto: getExemploProduto(),
        quantidade: 1,
      },
    ],
    funcionariosVeiculos: [
      {
        funcionario: getExemploFuncionario(),
        veiculo: getExemploVeiculo(),
      },
    ],
  } as IDescarte;
}

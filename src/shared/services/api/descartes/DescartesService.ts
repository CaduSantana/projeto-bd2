import { IEndereco } from '../enderecos/EnderecosService';
import { IPessoa } from '../pessoas/PessoasService';
import { IProduto } from '../produtos/ProdutosService';
import { IVeiculo } from '../veiculos/VeiculosService';

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

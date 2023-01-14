import { IEndereco } from '../enderecos/EnderecosService';
import { IPessoa } from '../pessoas/PessoasService';

export interface IDescarte {
  uuid: string;
  solicitadoEm: Date;
  solicitante: IPessoa;
  origem: IEndereco;
  destino: IEndereco;
}

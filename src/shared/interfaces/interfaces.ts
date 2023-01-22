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

export interface IUF {
  id: number;
  nome: string;
  sigla: string;
}

export interface IMunicipio {
  id: number;
  nome: string;
  uf: IUF;
}

export interface IEndereco {
  uuid: string;
  rua: string;
  numero: number;
  bairro: string;
  cep: string;
  complemento: string;
  coordinates?: {
    lat: number;
    long: number;
  };
  municipio: IMunicipio;
}

export interface IPessoa {
  uuid: string;
  nome: string;
  sobrenome: string;
  cpf: string;
  email: string;
  senha: string;
  is_funcionario: boolean;
  is_admin: boolean;
}

export interface ICategoriaProduto {
  id: number;
  nome: string;
  prioridade: number;
}

export interface IProduto {
  uuid: string;
  nome: string;
  descricao: string;
  massa?: number;
  categoria: ICategoriaProduto;
}

export interface IVeiculo {
  uuid: string;
  placa: string;
  tipo: string;
  capacidade: number;
}

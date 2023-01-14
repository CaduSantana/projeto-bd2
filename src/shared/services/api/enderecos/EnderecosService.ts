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

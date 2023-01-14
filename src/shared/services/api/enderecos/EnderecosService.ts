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

export function getExemploUF() {
  return ({
    id: 1,
    nome: 'São Paulo',
    sigla: 'SP',
  } as IUF);
}

export function getExemploMunicipio() {
  return ({
    id: 1,
    nome: 'Presidente Prudente',
    uf: getExemploUF(),
  });
}

export function getExemploEndereco() {
  return ({
    uuid: '0af616a3-bc39-44fb-97f2-b7e05d696469',
    rua: 'Rua Roberto Simonsen',
    numero: 305,
    bairro: 'Centro Educacional',
    cep: '19060900',
    complemento: 'UNESP',
    municipio: getExemploMunicipio(),
  } as IEndereco);
}
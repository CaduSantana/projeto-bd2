import { IEndereco, IUF } from '../../../interfaces/interfaces';

export function getExemploUF() {
  return {
    id: 1,
    nome: 'São Paulo',
    sigla: 'SP',
  } as IUF;
}

export function getExemploMunicipio() {
  return {
    id: 1,
    nome: 'Presidente Prudente',
    uf: getExemploUF(),
  };
}

export function getExemploEndereco() {
  return {
    uuid: '0af616a3-bc39-44fb-97f2-b7e05d696469',
    rua: 'Rua Roberto Simonsen',
    numero: 305,
    bairro: 'Centro Educacional',
    cep: '19060900',
    complemento: 'UNESP',
    municipio: getExemploMunicipio(),
    coordinates: {
      lat: -22.122047988151103,
      long: -51.40894285915336,
    },
  } as IEndereco;
}

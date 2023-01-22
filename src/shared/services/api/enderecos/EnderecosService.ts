import { Environment } from '../../../enviroment';
import { IEndereco, IMunicipio, IUF } from '../../../interfaces/interfaces';

interface IMunicipioResponse {
  id_municipio: number;
  nome: string;
  id_uf: number;
}

interface EnderecoIn {
  rua: string;
  numero: number;
  complemento: string;
  bairro: string;
  cep: string;
  uuid_pessoa: string;
  municipiosId_municipio: number;
}

// #region UF
async function getAllUfs(): Promise<IUF[] | Error> {
  const response = await fetch(`${Environment.URL_BASE}/ufs`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data: IUF[] = await response.json();

  if (data) {
    return data;
  }

  return new Error('Não foi possível obter as UFs');
}

async function getUfByID(id: number): Promise<IUF | Error> {
  const response = await fetch(`${Environment.URL_BASE}/ufs/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data: IUF = await response.json();

  if (data) {
    return data;
  }

  return new Error('Não foi possível obter a UF');
}
//#endregion

// #region Municipio
async function getAllMunicipios(): Promise<IMunicipio[] | (IMunicipio | Error)[] | Error> {
  const response = await fetch(`${Environment.URL_BASE}/municipios`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data: IMunicipioResponse[] = await response.json();

  if (data) {
    // Map assíncrono para obter UF pelo id_uf de cada municipio
    return await Promise.all(
      data.map(async (municipio) => {
        const uf = await getUfByID(municipio.id_uf);
        if (uf instanceof Error) {
          return uf;
        }

        return {
          id: municipio.id_municipio,
          nome: municipio.nome,
          uf: uf,
        };
      })
    );
  }

  return new Error('Não foi possível obter os municípios');
}

async function getAllMunicipiosByUfId(uf_id: number): Promise<IMunicipio[] | Error> {
  const uf = await getUfByID(uf_id);
  if (uf instanceof Error) {
    return uf;
  }

  const response = await fetch(`${Environment.URL_BASE}/municipios/uf`, {
    method: 'POST',
    body: JSON.stringify({
      id_uf: uf_id,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data: IMunicipioResponse[] = await response.json();

  if (data) {
    return data.map((municipio) => {
      return {
        id: municipio.id_municipio,
        nome: municipio.nome,
        uf: uf,
      };
    });
  }

  return new Error('Não foi possível obter os municípios');
}
//#endregion

async function postEndereco(endereco: EnderecoIn): Promise<boolean> {
  const response = await fetch(`${Environment.URL_BASE}/enderecos`, {
    method: 'POST',
    body: JSON.stringify(endereco),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.status === 201;
}

export function getExemploUF() {
  return {
    id_uf: 1,
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

export default {
  getAllUfs,
  getUfByID,
  getAllMunicipios,
  getAllMunicipiosByUfId,
  postEndereco,
};

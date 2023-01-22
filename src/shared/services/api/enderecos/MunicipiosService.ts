import { Environment } from '../../../enviroment';
import { getUfByID } from './UfsService';

interface IMunicipioResponse {
  id_municipio: number;
  nome: string;
  id_uf: number;
}

async function getAllMunicipios() {
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

        return {
          id: municipio.id_municipio,
          nome: municipio.nome,
          uf: uf,
        };
      })
    );
  }

  return Promise.reject('Não foi possível obter os municípios');
}

async function getAllMunicipiosByUfId(uf_id: number) {
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

  return Promise.reject('Não foi possível obter os municípios');
}

export default {
  getAllMunicipios,
  getAllMunicipiosByUfId,
};

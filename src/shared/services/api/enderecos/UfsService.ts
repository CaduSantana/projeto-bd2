import { Environment } from '../../../enviroment';
import { IUF } from '../../../interfaces/interfaces';

async function getAllUfs() {
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

  return Promise.reject('Não foi possível obter as UFs');
}
export async function getUfByID(id: number) {
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

  return Promise.reject('Não foi possível obter a UF');
}

export default {
  getAllUfs,
  getUfByID,
};

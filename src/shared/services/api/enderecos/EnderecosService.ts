import { Environment } from '../../../enviroment';
import { IEndereco } from '../../../interfaces';

async function getEnderecoByUUId(uuid: string) {
  const response = await fetch(`${Environment.URL_BASE}/enderecos/${uuid}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data: IEndereco = await response.json();

  if (data) {
    return data;
  }

  return Promise.reject('Não foi possível obter o endereço');
}

export default {
  getEnderecoByUUId,
};

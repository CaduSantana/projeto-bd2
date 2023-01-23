import { Environment } from '../../../enviroment';
import { IEndereco } from '../../../interfaces';

interface EnderecoPost {
  rua: string;
  numero: number;
  complemento: string;
  bairro: string;
  cep: number;
  uuid_pessoa: string;
  municipiosId_municipio: number;
}

async function getEnderecoByUUID(uuid: string) {
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

async function postEndereco(endereco: EnderecoPost) {
  const response = await fetch(`${Environment.URL_BASE}/enderecos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(endereco),
  });
  const generatedUUID: string = await response.json();

  if (generatedUUID) {
    return generatedUUID;
  }

  return Promise.reject('Não foi possível criar o endereço');
}

export default {
  getEnderecoByUUID,
  postEndereco,
};

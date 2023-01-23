import { Environment } from '../../../enviroment';
import { IVeiculo } from '../../../interfaces/interfaces';

interface VeiculoPost {
  placa: string;
  tipo: string;
  capacidade: number;
}

async function getAllVeiculos() {
  const response = await fetch(`${Environment.URL_BASE}/veiculos`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const veiculos: IVeiculo[] = await response.json();
  if (veiculos) {
    return veiculos;
  }

  return Promise.reject('Não foi possível obter os veículos');
}

async function getVeiculoByUUID(uuid: string) {
  const response = await fetch(`${Environment.URL_BASE}/veiculos/${uuid}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const veiculo: IVeiculo = await response.json();
  if (veiculo) {
    return veiculo;
  }

  return Promise.reject('Não foi possível obter o veículo');
}

async function postVeiculo(veiculo: VeiculoPost) {
  const response = await fetch(`${Environment.URL_BASE}/veiculos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(veiculo),
  });
  return response.status === 201;
}

async function deleteVeiculoByUUID(uuid: string) {
  const response = await fetch(`${Environment.URL_BASE}/veiculos/${uuid}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.status === 200;
}

export default {
  getAllVeiculos,
  getVeiculoByUUID,
  postVeiculo,
  deleteVeiculoByUUID,
};

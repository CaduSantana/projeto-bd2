import { Environment } from '../../../enviroment';
import { IVeiculo } from '../../../interfaces/interfaces';

interface VeiculoPost {
  placa: string;
  tipo: string;
  capacidade: number;
}

async function getAllVeiculos(): Promise<IVeiculo[] | Error> {
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

  return new Error('Não foi possível obter os veículos');
}

async function postVeiculo(veiculo: VeiculoPost): Promise<boolean> {
  const response = await fetch(`${Environment.URL_BASE}/veiculos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(veiculo),
  });
  return response.status === 201;
}

export function getExemploVeiculo() {
  return {
    uuid: 'c3f054e8-34d3-4797-b858-5add245a2c64',
    placa: 'SAF1234',
    tipo: 'Caminhão',
    capacidade: 200,
  } as IVeiculo;
}

export default {
  getAllVeiculos,
  postVeiculo,
};

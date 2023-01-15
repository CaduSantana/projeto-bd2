export interface IVeiculo {
  uuid: string;
  placa: string;
  tipo: string;
  capacidade: number;
}

export function getExemploVeiculo() {
  return ({
    uuid: 'c3f054e8-34d3-4797-b858-5add245a2c64',
    placa: 'SAF1234',
    tipo: 'Caminhão',
    capacidade: 200,
  } as IVeiculo);
}

import { Environment } from '../../../enviroment';
import { IPessoa } from '../../../interfaces/interfaces';

interface FuncionarioPost {
  nome: string;
  sobrenome: string;
  cpf: string;
  email: string;
  senha: string;
  is_funcionario: boolean;
  is_admin: boolean;
}

async function getAllFuncionarios() {
  const response = await fetch(`${Environment.URL_BASE}/pessoas`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const funcionarios: IPessoa[] = await response.json();
  if (funcionarios) {
    return funcionarios.filter((funcionario) => funcionario.is_funcionario);
  }

  return new Error('Não foi possível obter os funcionários.');
}

async function postFuncionario(funcionario: FuncionarioPost): Promise<boolean> {
  const response = await fetch(`${Environment.URL_BASE}/pessoas`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(funcionario),
  });
  return response.status === 201;
}

export function getExemploSolicitante() {
  return {
    uuid: 'd7a667b6-be2d-459f-a8e9-f2ee0ae9adc2',
    nome: 'Luiz Felipe',
    sobrenome: 'Scolari',
    cpf: '12345678901',
    email: 'luizfelipescolari@cbf.com',
    senha: 'khediratabelando',
    is_funcionario: false,
    is_admin: false,
  } as IPessoa;
}

export function getExemploFuncionario() {
  return {
    uuid: '014d5781-d601-4121-82d3-c1a4167755b8',
    nome: 'Thomas',
    sobrenome: 'Müller',
    cpf: '13243546576',
    email: 'thomasmuller@deutsch.com',
    senha: 'raumdeuter',
    is_funcionario: true,
    is_admin: false,
  } as IPessoa;
}

export default {
  getAllFuncionarios,
  postFuncionario,
};

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

  return Promise.reject('Não foi possível obter os funcionários');
}

async function postFuncionario(funcionario: FuncionarioPost) {
  const response = await fetch(`${Environment.URL_BASE}/pessoas`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(funcionario),
  });
  return response.status === 201;
}

async function getPessoaByUUID(uuid: string) {
  const response = await fetch(`${Environment.URL_BASE}/pessoas`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data: IPessoa[] = await response.json();

  if (data) {
    const pessoa = data.find((pessoa) => pessoa.uuid === uuid);
    if (pessoa) {
      return pessoa;
    }
  }

  return Promise.reject('Não foi possível obter a pessoa');
}

async function putPessoa(
  uuid_pessoa: string,
  nome: string,
  sobrenome: string,
  email: string,
  cpf: string,
  senha: string,
  is_funcionario: boolean,
  is_admin: boolean
) {
  const response = await fetch(`${Environment.URL_BASE}/pessoas`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      uuid_pessoa,
      nome,
      sobrenome,
      email,
      cpf,
      senha,
      is_funcionario,
      is_admin,
    }),
  });
  return response.status === 200;
}

export default {
  getAllFuncionarios,
  postFuncionario,
  getPessoaByUUID,
  putPessoa,
};

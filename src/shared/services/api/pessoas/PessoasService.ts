import { IPessoa } from '../../../interfaces/interfaces';

export function getExemploSolicitante() {
  return {
    uuid: 'd7a667b6-be2d-459f-a8e9-f2ee0ae9adc2',
    nome: 'Luiz Felipe',
    sobrenome: 'Scolari',
    cpf: '12345678901',
    email: 'luizfelipescolari@cbf.com',
    senha: 'khediratabelando',
    isFuncionario: false,
    isAdmin: false,
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
    isFuncionario: true,
    isAdmin: false,
  } as IPessoa;
}

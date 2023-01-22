import { ICategoriaProduto, IProduto } from '../../../interfaces/interfaces';

export function getExemploCategoria() {
  return {
    id: 1,
    nome: 'Abstrato',
    prioridade: 1,
  } as ICategoriaProduto;
}

export function getExemploProduto() {
  return {
    uuid: '8053dcd9-8b50-4ef4-b938-abbe432709c8',
    nome: 'Dignidade da Seleção Brasileira',
    descricao: 'Acabou',
    massa: 100,
    categoria: getExemploCategoria(),
  } as IProduto;
}

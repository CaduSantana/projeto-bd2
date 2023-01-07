export interface ICategoriaProduto {
  id: string,
  nome: string,
  prioridade: number,
}

export interface IProduto {
  uuid: string,
  nome: string,
  descricao: string,
  massa: number,
  categoria: ICategoriaProduto,
}
export interface ICategoriaProduto {
  id: number,
  nome: string,
  prioridade: number,
}

export interface IProduto {
  uuid: string,
  nome: string,
  descricao: string,
  massa?: number,
  categoria: ICategoriaProduto,
}
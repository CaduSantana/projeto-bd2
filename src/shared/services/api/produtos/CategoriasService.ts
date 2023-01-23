import { Environment } from '../../../enviroment';
import { ICategoriaProduto } from '../../../interfaces';

interface CategoriaGet {
  id_categoria: number;
  nome: string;
  prioridade: number;
}

async function getAllCategorias() {
  const response = await fetch(`${Environment.URL_BASE}/categorias`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data: CategoriaGet[] = await response.json();
  if (data) {
    return data.map(
      (categoria) =>
        ({
          id: categoria.id_categoria,
          nome: categoria.nome,
          prioridade: categoria.prioridade,
        } as ICategoriaProduto)
    );
  }

  return Promise.reject('Não foi possível obter as categorias');
}

async function getCategoriaById(id: number) {
  const allCategorias = await getAllCategorias();
  const categoria = allCategorias.find((categoria) => categoria.id === id);
  if (categoria) {
    return categoria;
  }

  return Promise.reject('Não foi possível obter a categoria');
}

export default {
  getAllCategorias,
  getCategoriaById,
};

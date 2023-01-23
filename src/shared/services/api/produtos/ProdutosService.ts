import { Environment } from '../../../enviroment';
import { IProduto } from '../../../interfaces/interfaces';
import CategoriasService from './CategoriasService';

interface ProdutoGet {
  uuid_produto: string;
  nome: string;
  descricao: string;
  massa: number;
  id_categoria: number;
}

interface ProdutoPost {
  nome: string;
  descricao: string;
  massa: number;
  id_categoria: number;
}

async function getAllProdutos(): Promise<IProduto[]> {
  const response = await fetch(`${Environment.URL_BASE}/produtos`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data: ProdutoGet[] = await response.json();
  if (data) {
    return await Promise.all(
      data.map(async (produto) => {
        const categoria = await CategoriasService.getCategoriaById(produto.id_categoria);
        return {
          uuid: produto.uuid_produto,
          nome: produto.nome,
          descricao: produto.descricao,
          massa: produto.massa,
          categoria: categoria,
        } as IProduto;
      })
    );
  }

  return Promise.reject('Não foi possível obter os produtos');
}

async function getProdutoByUUID(uuid: string) {
  const response = await fetch(`${Environment.URL_BASE}/produtos/${uuid}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data: ProdutoGet = await response.json();
  if (data) {
    const categoria = await CategoriasService.getCategoriaById(data.id_categoria);
    return {
      uuid: data.uuid_produto,
      nome: data.nome,
      descricao: data.descricao,
      massa: data.massa,
      categoria: categoria,
    } as IProduto;
  }

  return Promise.reject('Não foi possível obter o produto');
}

async function postProduto(produto: ProdutoPost) {
  const response = await fetch(`${Environment.URL_BASE}/produtos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(produto),
  });
  return response.status === 201;
}

export default {
  getProdutoByUUID,
  getAllProdutos,
  postProduto,
};

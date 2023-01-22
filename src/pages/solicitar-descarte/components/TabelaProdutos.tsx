import { useMemo } from 'react';
import { Tabela } from '../../../shared/components';
import { useSolicitarDescarteContext } from '../SolicitarDescarteContext';

interface ProdutoTabela {
  uuid: string;
  nome: string;
  descricao: string;
  massa: number;
  categoria: string;
  quantidade: number;
}

export const TabelaProdutos: React.FC = () => {
  const {
    produtosAdicionados: { value: produtosQuantidades, setValue: setProdutosQuantidades },
  } = useSolicitarDescarteContext();

  const tableData = useMemo(
    () =>
      produtosQuantidades.map(({ produto, quantidade }) => ({
        key: produto.uuid,
        value: {
          uuid: produto.uuid,
          nome: produto.nome,
          descricao: produto.descricao,
          massa: produto.massa,
          categoria: produto.categoria.nome,
          quantidade: quantidade,
        },
      })),
    [produtosQuantidades]
  );

  function tableMapper(produto: unknown) {
    const produtoValue = produto as ProdutoTabela;
    return [
      produtoValue.nome,
      produtoValue.descricao,
      produtoValue.massa.toString(),
      produtoValue.categoria,
      produtoValue.quantidade.toString(),
    ];
  }

  function handleProdutoIncrement(produto: unknown) {
    const produtoValue = produto as ProdutoTabela;
    const indexProduto = produtosQuantidades.findIndex(({ produto }) => produto.uuid === produtoValue.uuid);
    const novoProdutosQuantidades = [...produtosQuantidades];
    novoProdutosQuantidades[indexProduto].quantidade += 1;
    setProdutosQuantidades(novoProdutosQuantidades);
  }

  function handleProdutoDecrement(produto: unknown) {
    const produtoValue = produto as ProdutoTabela;
    const quantidadeNova = produtoValue.quantidade - 1;
    if (quantidadeNova < 1) {
      return;
    }
    const indexProduto = produtosQuantidades.findIndex(({ produto }) => produto.uuid === produtoValue.uuid);
    const novoProdutosQuantidades = [...produtosQuantidades];
    novoProdutosQuantidades[indexProduto].quantidade = quantidadeNova;
    setProdutosQuantidades(novoProdutosQuantidades);
  }

  function handleProdutoDelete(produto: unknown) {
    const produtoValue = produto as ProdutoTabela;
    const indexProduto = produtosQuantidades.findIndex(({ produto }) => produto.uuid === produtoValue.uuid);
    const novoProdutosQuantidades = [...produtosQuantidades];
    novoProdutosQuantidades.splice(indexProduto, 1);
    setProdutosQuantidades(novoProdutosQuantidades);
  }

  return (
    <Tabela
      columns={[
        {
          key: 'nome',
          label: 'Nome',
        },
        {
          key: 'descricao',
          label: 'Descrição',
        },
        {
          key: 'massa',
          label: 'Massa aproximada (g)',
        },
        {
          key: 'categoria',
          label: 'Categoria',
        },
        {
          key: 'quantidade',
          label: 'Quantidade',
        },
      ]}
      alignments={['left', 'left', 'right', 'left', 'right']}
      data={tableData}
      mapper={tableMapper}
      actions={[
        {
          icon: 'add',
          onClick: handleProdutoIncrement,
        },
        {
          icon: 'remove',
          onClick: handleProdutoDecrement,
        },
        {
          icon: 'delete',
          onClick: handleProdutoDelete,
        },
      ]}
    />
  );
};

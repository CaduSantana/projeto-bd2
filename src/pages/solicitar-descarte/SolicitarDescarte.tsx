import { useState } from 'react';
import { BarraDeSelecao } from '../../shared/components';
import { LayoutBase } from '../../shared/layouts';
import { TabelaProdutos, ModalFormNovoProduto } from './components';

export const SolicitarDescarte: React.FC = () => {
  const listaDeProdutos = [
    {
      uuid: '1',
      nome: 'Produto 1',
      descricao: 'Descrição 1',
      massa: 100,
      categoria: 'Categoria 1',
    },
    {
      uuid: '2',
      nome: 'Produto 2',
      descricao: 'Descrição 2',
      massa: 200,
      categoria: 'Categoria 2',
    },
  ];

  const [textoDeBusca, setTextoDeBusca] = useState<string>('');
  const [opcaoSelecionada, setOpcaoSelecionada] = useState<{
    key: string;
    label: string;
  }>();

  const [produtosAdicionados, setProdutosAdicionados] = useState<string[][]>([]);

  const [modalNovoProdutoAberto, setModalNovoProdutoAberto] = useState<boolean>(false);

  const aoMudarSelecao = (novaSelecaoKey: string) => {
    const produtoSelecionado = listaDeProdutos.find((produto) => produto.uuid === novaSelecaoKey);
    if (produtoSelecionado) {
      setOpcaoSelecionada({ key: produtoSelecionado.uuid, label: produtoSelecionado.nome });
    }
  };

  const aoMudarQuantidade = (linhaIndex: number, novaQuantidade: number) => {
    if (novaQuantidade > 0) {
      const novaListaDeProdutos = [...produtosAdicionados];
      novaListaDeProdutos[linhaIndex][4] = novaQuantidade.toString();
      setProdutosAdicionados(novaListaDeProdutos);
    }
  };

  const aoClicarEmSelecionar = () => {
    if (!opcaoSelecionada) {
      return;
    }

    const produtoSelecionado = listaDeProdutos.find((produto) => produto.uuid === opcaoSelecionada.key);
    if (!produtoSelecionado) {
      return;
    }

    // Procura se o produto já foi adicionado, valor é diferente de -1 se for encontrado
    const linhaProduto = produtosAdicionados.findIndex((linha) => linha[0] === produtoSelecionado.uuid);
    if (linhaProduto !== -1) {
      // Se o produto já foi adicionado, incrementa a quantidade
      const novaListaDeProdutos = [...produtosAdicionados];
      novaListaDeProdutos[linhaProduto][4] = (parseInt(novaListaDeProdutos[linhaProduto][4]) + 1).toString();
      setProdutosAdicionados(novaListaDeProdutos);
      return;
    }

    // Se o produto não foi adicionado, adiciona na lista
    setProdutosAdicionados([
      ...produtosAdicionados,
      [
        produtoSelecionado.uuid,
        produtoSelecionado.nome,
        produtoSelecionado.descricao,
        produtoSelecionado.categoria,
        '1',
      ],
    ]);
  };

  const aoClicarEmDeletar = (linhaIndex: number) => {
    const novaListaDeProdutos = [...produtosAdicionados];
    novaListaDeProdutos.splice(linhaIndex, 1);
    setProdutosAdicionados(novaListaDeProdutos);
  };

  return (
    <LayoutBase title="Solicitar um descarte">
      <BarraDeSelecao
        autoCompleteProps={{
          textoDaBusca: textoDeBusca,
          aoMudarTextoDeBusca: setTextoDeBusca,
          opcoesDeBusca: listaDeProdutos.map((produto) => ({
            key: produto.uuid,
            label: produto.nome,
          })),
          opcaoSelecionada: opcaoSelecionada,
          aoMudarSelecao: aoMudarSelecao,
        }}
        aoClicarEmNovo={() => setModalNovoProdutoAberto(true)}
        aoClicarEmSelecionar={aoClicarEmSelecionar}
      />

      <TabelaProdutos
        conteudo={produtosAdicionados}
        aoMudarQuantidade={aoMudarQuantidade}
        aoClicarDeletar={aoClicarEmDeletar}
      />

      <ModalFormNovoProduto aberto={modalNovoProdutoAberto} aoFechar={() => setModalNovoProdutoAberto(false)} />
    </LayoutBase>
  );
};

import { useState } from 'react';
import { BarraDeSelecao } from '../../shared/components';
import { LayoutBase } from '../../shared/layouts';
import { TabelaProdutos, ModalFormNovoProduto } from './components';
import { SolicitarDescarteContextProvider, useSolicitarDescarteContext } from './SolicitarDescarteContext';

const SolicitarDescarteI: React.FC = () => {
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

  const { modalNovoProdutoAberto } = useSolicitarDescarteContext();
  const [textoDeBusca, setTextoDeBusca] = useState<string>('');
  const [opcaoSelecionada, setOpcaoSelecionada] = useState<{
    key: string;
    label: string;
  }>();

  const [linhasTabela, setLinhasTabela] = useState<string[][]>([]);

  const aoMudarSelecao = (novaSelecaoKey: string) => {
    const produtoSelecionado = listaDeProdutos.find((produto) => produto.uuid === novaSelecaoKey);
    if (produtoSelecionado) {
      setOpcaoSelecionada({ key: produtoSelecionado.uuid, label: produtoSelecionado.nome });
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
    const indexProdutoAdicionado = produtosAdicionados.current.findIndex(
      (produto) => produto.uuid === produtoSelecionado.uuid
    );
    if (indexProdutoAdicionado !== -1) {
      // Se o produto já foi adicionado, incrementa a quantidade e atualiza linhas da tabela
      produtosAdicionados.current[indexProdutoAdicionado].quantidade += 1;
      const novaLinhasTabela = [...linhasTabela];
      novaLinhasTabela[indexProdutoAdicionado][4] = (
        parseInt(novaLinhasTabela[indexProdutoAdicionado][4]) + 1
      ).toString();
      setLinhasTabela(novaLinhasTabela);
      console.log(produtosAdicionados);
      return;
    }

    // Se o produto não foi adicionado, adiciona na lista
    produtosAdicionados.current.push({ uuid: produtoSelecionado.uuid, quantidade: 1 });
    console.log(produtosAdicionados);
    setLinhasTabela([
      ...linhasTabela,
      [
        produtoSelecionado.nome,
        produtoSelecionado.descricao,
        produtoSelecionado.massa.toString(),
        produtoSelecionado.categoria,
        '1',
      ],
    ]);
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
        aoClicarEmNovo={() => modalNovoProdutoAberto.setValue(true)}
        aoClicarEmSelecionar={aoClicarEmSelecionar}
      />
      <TabelaProdutos />
      <ModalFormNovoProduto />
    </LayoutBase>
  );
};

export const SolicitarDescarte: React.FC = () => {
  return (
    <SolicitarDescarteContextProvider>
      <SolicitarDescarteI />
    </SolicitarDescarteContextProvider>
  );
};

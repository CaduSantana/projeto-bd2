import { useState } from 'react';
import { BarraDeSelecao } from '../../shared/components';
import { LayoutBase } from '../../shared/layouts';
import { TabelaProdutos, ModalFormNovoProduto } from './components';

export const SolicitarDescarte: React.FC = () => {
  const listaDeOpcoes = [
    { key: '1', label: 'Opção 1' },
    { key: '2', label: 'Opção 2' },
    { key: '3', label: 'Opção 3' },
    { key: '4', label: 'Opção 4' },
  ];

  const [textoDeBusca, setTextoDeBusca] = useState<string>('');
  const [opcaoSelecionada, setOpcaoSelecionada] = useState<{
    key: string;
    label: string;
  }>();
  const [produtosAdicionados, setProdutosAdicionados] = useState<string[][]>([
    ['Produto 1', 'Descrição 1', '100', 'Categoria 1', '1'],
  ]);
  const [modalNovoProdutoAberto, setModalNovoProdutoAberto] = useState<boolean>(false);

  const aoMudarSelecao = (novaSelecaoKey: string) => {
    setOpcaoSelecionada(
      listaDeOpcoes.find((opcao) => opcao.key === novaSelecaoKey) as {
        key: string;
        label: string;
      }
    );
  };

  const aoMudarQuantidade = (linhaIndex: number, novaQuantidade: number) => {
    if (novaQuantidade > 0) {
      const novaListaDeProdutos = [...produtosAdicionados];
      novaListaDeProdutos[linhaIndex][4] = novaQuantidade.toString();
      setProdutosAdicionados(novaListaDeProdutos);
    }
  };

  return (
    <LayoutBase title="Solicitar um descarte">
      <BarraDeSelecao
        autoCompleteProps={{
          textoDaBusca: textoDeBusca,
          aoMudarTextoDeBusca: setTextoDeBusca,
          opcoesDeBusca: listaDeOpcoes,
          opcaoSelecionada: opcaoSelecionada,
          aoMudarSelecao: aoMudarSelecao,
        }}
        aoClicarEmNovo={() => setModalNovoProdutoAberto(true)}
      />

      <TabelaProdutos conteudo={produtosAdicionados} aoMudarQuantidade={aoMudarQuantidade} />

      <ModalFormNovoProduto aberto={modalNovoProdutoAberto} aoFechar={() => setModalNovoProdutoAberto(false)} />
    </LayoutBase>
  );
};

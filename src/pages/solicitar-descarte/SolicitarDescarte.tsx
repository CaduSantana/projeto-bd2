import { useState } from 'react';
import { BarraDeSelecao } from '../../shared/components';
import { LayoutBase } from '../../shared/layouts';

export const SolicitarDescarte: React.FC = () => {
  const listaDeOpcoes = [
    { key: '1', label: 'Opção 1' },
    { key: '2', label: 'Opção 2' },
    { key: '3', label: 'Opção 3' },
    { key: '4', label: 'Opção 4' },
  ];

  const [textoDeBusca, setTextoDeBusca] = useState<string>('');
  const [opcaoSelecionada, setOpcaoSelecionada] = useState<{ key: string, label: string }>(listaDeOpcoes[0]);

  const aoMudarSelecao = (novaSelecaoKey: string) => {
    setOpcaoSelecionada(listaDeOpcoes.find((opcao) => opcao.key === novaSelecaoKey) as { key: string, label: string });
  };

  return (
    <LayoutBase
      title='Solicitar um descarte'>
      <BarraDeSelecao
        textoDaBusca={textoDeBusca}
        aoMudarTextoDeBusca={setTextoDeBusca}
        opcoesDeBusca={listaDeOpcoes}
        opcaoSelecionada={opcaoSelecionada}
        aoMudarSelecao={aoMudarSelecao}

      />
    </LayoutBase>
  );
};

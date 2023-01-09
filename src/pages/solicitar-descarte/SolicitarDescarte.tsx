import { LayoutBase } from '../../shared/layouts';
import { TabelaProdutos, ModalFormNovoProduto, BarraSelecaoProdutos } from './components';
import { SolicitarDescarteContextProvider } from './SolicitarDescarteContext';

const SolicitarDescarteI: React.FC = () => {
  return (
    <LayoutBase title="Solicitar um descarte">
      <BarraSelecaoProdutos />
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

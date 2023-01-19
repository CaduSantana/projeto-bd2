import { LayoutBase } from '../../shared/layouts';
import { ModalRealizarDescarte, TabelaDescartes } from './components';
import { ExecutarDescarteContextProvider } from './ExecutarDescarteContext';

const ExecutarDescarteI: React.FC = () => {
  return (
    <LayoutBase title='Executar um descarte'>
      <TabelaDescartes />
      <ModalRealizarDescarte />
    </LayoutBase>
  );
};

export const ExecutarDescarte: React.FC = () => {
  return (
    <ExecutarDescarteContextProvider>
      <ExecutarDescarteI />
    </ExecutarDescarteContextProvider>
  );
};

import { LayoutBase } from '../../shared/layouts';
import { TabelaDescartes } from './components/TabelaDescartes';
import { ExecutarDescarteContextProvider } from './ExecutarDescarteContext';

const ExecutarDescarteI: React.FC = () => {
  return (
    <LayoutBase title='Executar um descarte'>
      <TabelaDescartes />
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

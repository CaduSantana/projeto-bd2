import { LayoutBase } from '../../shared/layouts';
import { ExecutarDescarteContextProvider } from './ExecutarDescarteContext';

const ExecutarDescarteI: React.FC = () => {
  return <LayoutBase title='Executar um descarte'>A</LayoutBase>;
};

export const ExecutarDescarte: React.FC = () => {
  return (
    <ExecutarDescarteContextProvider>
      <ExecutarDescarteI />
    </ExecutarDescarteContextProvider>
  );
};

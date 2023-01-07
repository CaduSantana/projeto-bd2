import { BarraDeFerramentas } from '../../shared/components';
import { LayoutBase } from '../../shared/layouts';

export const Dashboard: React.FC = () => {
  return (
    <LayoutBase
    title='Dashboard'
    barraDeFerramentas={(
      <BarraDeFerramentas mostrarInputDaBusca />
    )}
    >
    </LayoutBase>
  );
};
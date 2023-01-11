import { LayoutBase } from '../../shared/layouts';
import { BarraDePesquisa } from './components';

export const GerenciarVeiculos: React.FC = () => {
  return (
    <LayoutBase title='Gerenciar veículos'>
      <BarraDePesquisa />
    </LayoutBase>
  );
};

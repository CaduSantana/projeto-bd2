import { Typography } from '@mui/material';
import { LayoutBase } from '../../shared/layouts';

export const PaginaInicial: React.FC = () => {
  return (
    <LayoutBase title='Página inicial'>
      <Typography variant='h3'>Bem-vindo ao descarte solidário!</Typography>
    </LayoutBase>
  );
};

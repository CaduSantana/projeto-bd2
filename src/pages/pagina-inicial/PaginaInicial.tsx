import { Typography } from '@mui/material';
import { LayoutBase } from '../../shared/layouts';

export const PaginaInicial: React.FC = () => {
  return (
    <LayoutBase title='Bem-vindo ao descarte solidário!' titleVariant='h4'>
      <Typography variant='body1'>
        O objetivo desse projeto é permitir que o lixo de uns seja o luxo de outros.
      </Typography>
    </LayoutBase>
  );
};

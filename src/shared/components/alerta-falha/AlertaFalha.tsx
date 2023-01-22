import { Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';

export const AlertaFalha: React.FC = () => {
  return (
    <Box component={Paper}>
      <Typography variant='body1' padding={2}>
        Ocorreu um erro ao fazer a requisição dos dados. Verifique se o servidor está online.
      </Typography>
    </Box>
  );
};

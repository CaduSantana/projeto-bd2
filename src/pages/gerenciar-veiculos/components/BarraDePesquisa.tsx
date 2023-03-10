import { Button, Icon, Paper, TextField, useTheme } from '@mui/material';
import { Box } from '@mui/system';

interface IBarraDePesquisaProps {
  onAdicionar: () => void;
}

export const BarraDePesquisa: React.FC<IBarraDePesquisaProps> = ({ onAdicionar }) => {
  const theme = useTheme();

  return (
    <Box
      height={theme.spacing(5)}
      padding={1}
      paddingX={2}
      display='flex'
      gap={1}
      alignItems='center'
      component={Paper}
    >
      <TextField size='small' placeholder='Pesquisar...' fullWidth />
      <Button variant='contained'
      endIcon={<Icon>library_add</Icon>}
      onClick={onAdicionar}>
        Adicionar
      </Button>
    </Box>
  );
};

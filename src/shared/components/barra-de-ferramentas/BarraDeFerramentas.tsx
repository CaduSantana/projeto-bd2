import { Button, Icon, InputAdornment, Paper, TextField, useTheme } from '@mui/material';
import { Box } from '@mui/system';

interface IBarraDeFerramentasProps {
  textoDaBusca?: string;
  mostrarInputDaBusca?: boolean;
  aoMudarTextoDeBusca?: (novoTexto: string) => void;
  textoBotaoNovo?: string;
  mostrarBotaoNovo?: boolean;
  aoClicarEmNovo?: () => void;
}

export const BarraDeFerramentas: React.FC<IBarraDeFerramentasProps> = ({
  textoDaBusca = '',
  mostrarInputDaBusca = false,
  aoMudarTextoDeBusca,
  textoBotaoNovo = 'Novo',
  mostrarBotaoNovo = true,
  aoClicarEmNovo
}) => {
  const theme = useTheme();

  return (
    <Box height={ theme.spacing(5) }
    marginX={1} padding={1} paddingX={2}
    display='flex' gap={1} alignItems='center'
    component={ Paper }>
      {(mostrarInputDaBusca) && (
        <TextField size="small" placeholder='Pesquisar...'
        value={ textoDaBusca }
        onChange={(e) => aoMudarTextoDeBusca?.(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Icon>search</Icon>
            </InputAdornment>
          ),
        }}/>
      )}

      <Box display='flex' flex={1} justifyContent='end'>
        {(mostrarBotaoNovo) && (
          <Button color='primary' variant='contained'
          disableElevation endIcon={<Icon>add</Icon>}
          onClick={ aoClicarEmNovo }>{ textoBotaoNovo }</Button>
        )}
      </Box>
    </Box>
  );
};
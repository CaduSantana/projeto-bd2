import { Autocomplete, Button, Icon, InputAdornment, MenuItem, Paper, TextField, useTheme } from '@mui/material';
import { Box } from '@mui/system';

interface IBarraDeSelecaoProps {
  textoDaBusca?: string;
  aoMudarTextoDeBusca?: (novoTexto: string) => void;
  opcoesDeBusca?: { key: string, label: string }[];
  opcaoSelecionada?: { key: string, label: string };
  aoMudarSelecao?: (novaSelecaoKey: string) => void;
  textoBotaoSelecionar?: string;
  mostrarBotaoSelecionar?: boolean;
  aoClicarEmSelecionar?: () => void;
  textoBotaoNovo?: string;
  mostrarBotaoNovo?: boolean;
  aoClicarEmNovo?: () => void;
}

export const BarraDeSelecao: React.FC<IBarraDeSelecaoProps> = ({
  textoDaBusca = '',
  aoMudarTextoDeBusca,
  opcoesDeBusca = [],
  opcaoSelecionada,
  aoMudarSelecao,
  textoBotaoSelecionar = 'Selecionar',
  mostrarBotaoSelecionar = true,
  aoClicarEmSelecionar,
  textoBotaoNovo = 'Novo',
  mostrarBotaoNovo = true,
  aoClicarEmNovo
}) => {
  const theme = useTheme();

  return (
    <Box height={theme.spacing(5)}
      marginX={1} padding={1} paddingX={2}
      display='flex' gap={1} alignItems='center'
      component={Paper}>
      <Box flex={1}>
        <Autocomplete size="small" placeholder='Pesquisar...'
          renderInput={(params) => (
            <TextField {...params} />
          )}
          inputValue={textoDaBusca}
          onInputChange={(_, novoTexto) => aoMudarTextoDeBusca?.(novoTexto)}
          options={opcoesDeBusca}
          value={opcaoSelecionada}
          onChange={(_, novaSelecao) => aoMudarSelecao?.(novaSelecao?.key as string)}
          fullWidth
          noOptionsText='Não há opções disponíveis' />
      </Box>

      <Box display='flex' justifyContent='end' gap={2}>
        {(mostrarBotaoSelecionar) && (
          <Button color='primary' variant='contained'
            disableElevation endIcon={<Icon>add</Icon>}
            onClick={aoClicarEmSelecionar}>{textoBotaoSelecionar}</Button>
        )}
        {(mostrarBotaoNovo) && (
          <Button color='primary' variant='contained'
            disableElevation endIcon={<Icon>add</Icon>}
            onClick={aoClicarEmNovo}>{textoBotaoNovo}</Button>
        )}
      </Box>
    </Box>
  );
};
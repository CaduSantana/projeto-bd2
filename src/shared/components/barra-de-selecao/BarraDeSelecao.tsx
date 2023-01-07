import { Autocomplete, Button, Icon, Paper, TextField, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { AutoCompleteComboBox, IAutoCompleteComboBoxProps } from '../autocomplete-combobox/AutoCompleteComboBox';

interface IBarraDeSelecaoProps {
  autoCompleteProps: IAutoCompleteComboBoxProps;
  textoBotaoSelecionar?: string;
  mostrarBotaoSelecionar?: boolean;
  aoClicarEmSelecionar?: () => void;
  textoBotaoNovo?: string;
  mostrarBotaoNovo?: boolean;
  aoClicarEmNovo?: () => void;
}

export const BarraDeSelecao: React.FC<IBarraDeSelecaoProps> = ({
  autoCompleteProps,
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
        <AutoCompleteComboBox {...autoCompleteProps} />
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
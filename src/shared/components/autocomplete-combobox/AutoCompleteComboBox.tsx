import { Autocomplete, TextField } from '@mui/material';

export interface IAutoCompleteComboBoxProps {
  textoDaBusca?: string;
  aoMudarTextoDeBusca?: (novoTexto: string) => void;
  opcoesDeBusca?: { key: string, label: string }[];
  opcaoSelecionada?: { key: string, label: string };
  aoMudarSelecao?: (novaSelecaoKey: string) => void;
  textoSemOpcoes?: string;
}

export const AutoCompleteComboBox: React.FC<IAutoCompleteComboBoxProps> = ({
  textoDaBusca = '',
  aoMudarTextoDeBusca,
  opcoesDeBusca = [],
  opcaoSelecionada,
  aoMudarSelecao,
  textoSemOpcoes = 'Não há opções disponíveis'
}) => {
  return (
    <Autocomplete size="small" placeholder='Pesquisar...'
      renderInput={(params) => (
        <TextField {...params} />
      )}
      inputValue={textoDaBusca}
      onInputChange={(_, novoTexto) => aoMudarTextoDeBusca?.(novoTexto)}
      options={opcoesDeBusca}
      value={opcaoSelecionada}
      onChange={(_, novaSelecao) => aoMudarSelecao?.(novaSelecao?.key as string)}
      noOptionsText={textoSemOpcoes} />
  );
};
import { Autocomplete, TextField } from '@mui/material';
import { useEffect } from 'react';

export interface IAutoCompleteComboBoxProps {
  textoDaBusca?: string;
  aoMudarTextoDeBusca?: (novoTexto: string) => void;
  opcoesDeBusca?: { key: string; label: string }[];
  opcaoSelecionada?: { key: string; label: string };
  aoMudarSelecao?: (novaSelecaoKey: string) => void;
  textoSemOpcoes?: string;
  aoLimparInput?: () => void;
}

export const AutoCompleteComboBox: React.FC<IAutoCompleteComboBoxProps> = ({
  textoDaBusca = '',
  aoMudarTextoDeBusca,
  opcoesDeBusca = [],
  opcaoSelecionada = opcoesDeBusca[0] ? opcoesDeBusca[0] : null,
  aoMudarSelecao,
  textoSemOpcoes = 'Não há opções disponíveis',
}) => {
  useEffect(() => {
    if (opcaoSelecionada) {
      aoMudarSelecao?.(opcaoSelecionada.key);
    }
  }, []);

  return (
    <Autocomplete
      size="small"
      placeholder="Pesquisar..."
      inputValue={textoDaBusca}
      onInputChange={(_, novoTexto) => aoMudarTextoDeBusca?.(novoTexto)}
      options={opcoesDeBusca}
      value={opcaoSelecionada}
      onChange={(_, novaSelecao) => aoMudarSelecao?.(novaSelecao?.key as string)}
      noOptionsText={textoSemOpcoes}
      isOptionEqualToValue={(option, value) => option.key === value.key}
      renderInput={(params) => <TextField {...params} />}
    />
  );
};

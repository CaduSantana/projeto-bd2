import { Button } from '@mui/material';
import { LayoutBase } from '../../shared/layouts';
import { TabelaProdutos, ModalFormNovoProduto, BarraSelecaoProdutos } from './components';
import { ModalFormNovoEndereco } from './components/modal-form-novo-endereco/ModalFormNovoEndereco';
import { SolicitarDescarteContextProvider, useSolicitarDescarteContext } from './SolicitarDescarteContext';

const SolicitarDescarteI: React.FC = () => {
  const { produtosAdicionados, modalEnderecoAberto } = useSolicitarDescarteContext();

  return (
    <LayoutBase title="Solicitar um descarte">
      <BarraSelecaoProdutos />
      <TabelaProdutos />
      <Button
        variant="contained"
        disabled={produtosAdicionados.value.length === 0}
        onClick={() => modalEnderecoAberto.setValue(true)}
      >Solicitar descarte</Button>
      
      <ModalFormNovoProduto />
      <ModalFormNovoEndereco />
    </LayoutBase>
  );
};

export const SolicitarDescarte: React.FC = () => {
  return (
    <SolicitarDescarteContextProvider>
      <SolicitarDescarteI />
    </SolicitarDescarteContextProvider>
  );
};

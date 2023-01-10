import { Alert, Button, Snackbar } from '@mui/material';
import { LayoutBase } from '../../shared/layouts';
import { TabelaProdutos, ModalFormNovoProduto, BarraSelecaoProdutos, ModalFormEndereco } from './components';
import { SolicitarDescarteContextProvider, useSolicitarDescarteContext } from './SolicitarDescarteContext';

const SolicitarDescarteI: React.FC = () => {
  const { produtosAdicionados, modalEnderecoAberto, snackbar } = useSolicitarDescarteContext();

  return (
    <LayoutBase title='Solicitar um descarte'>
      <BarraSelecaoProdutos />
      <TabelaProdutos />
      <Button
        variant='contained'
        disabled={produtosAdicionados.value.length === 0}
        onClick={() => modalEnderecoAberto.setValue(true)}
      >
        Solicitar descarte
      </Button>

      <ModalFormNovoProduto />
      <ModalFormEndereco />

      <Snackbar
        open={snackbar.aberto.value}
        autoHideDuration={2000}
        onClose={() => {
          snackbar.aberto.setValue(false);
        }}
        message={snackbar.mensagem.value}
      >
        <Alert
          severity={snackbar.tipo.value}
          onClose={() => {
            snackbar.aberto.setValue(false);
          }}
        >
          {snackbar.mensagem.value}
        </Alert>
      </Snackbar>
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

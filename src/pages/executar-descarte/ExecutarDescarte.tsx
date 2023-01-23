import { Alert, Snackbar } from '@mui/material';
import { LayoutBase } from '../../shared/layouts';
import { ModalRealizarDescarte, TabelaDescartes } from './components';
import { ExecutarDescarteContextProvider, useExecutarDescarteContext } from './ExecutarDescarteContext';

const ExecutarDescarteI: React.FC = () => {
  const { snackbar } = useExecutarDescarteContext();

  return (
    <LayoutBase title='Executar um descarte'>
      <TabelaDescartes />
      <ModalRealizarDescarte />
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

export const ExecutarDescarte: React.FC = () => {
  return (
    <ExecutarDescarteContextProvider>
      <ExecutarDescarteI />
    </ExecutarDescarteContextProvider>
  );
};

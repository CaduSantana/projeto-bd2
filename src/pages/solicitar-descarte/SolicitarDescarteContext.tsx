import { AlertColor } from '@mui/material';
import { createContext, useContext, useState } from 'react';

interface ISolicitarDescarteContextData {
  produtosAdicionados: {
    value: {
      uuid: string;
      quantidade: number;
    }[];
    setValue: (
      produtos: {
        uuid: string;
        quantidade: number;
      }[]
    ) => void;
  };
  modalNovoProdutoAberto: {
    value: boolean;
    setValue: (aberto: boolean) => void;
  };
  modalEnderecoAberto: {
    value: boolean;
    setValue: (aberto: boolean) => void;
  };
  snackbar: {
    aberto: {
      value: boolean;
      setValue: (aberto: boolean) => void;
    };
    mensagem: {
      value: string;
      setValue: (mensagem: string) => void;
    };
    tipo: {
      value: AlertColor | undefined;
      setValue: (tipo: AlertColor | undefined) => void;
    };
  };
}

export const SolicitarDescarteContext = createContext<ISolicitarDescarteContextData>(
  {} as ISolicitarDescarteContextData
);

export const useSolicitarDescarteContext = () => {
  return useContext(SolicitarDescarteContext);
};

export const SolicitarDescarteContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [produtosAdicionados, setProdutosAdicionados] = useState<
    {
      uuid: string;
      quantidade: number;
    }[]
  >([]);

  const [modalNovoProdutoAberto, setModalNovoProdutoAberto] = useState(false);
  const [modalEnderecoAberto, setModalEnderecoAberto] = useState(false);
  const [snackbarAberto, setSnackbarAberto] = useState(false);
  const [mensagemSnackbar, setMensagemSnackbar] = useState('');
  const [tipoAlertaSnackbar, setTipoAlertaSnackbar] = useState<AlertColor | undefined>(undefined);

  return (
    <SolicitarDescarteContext.Provider
      value={{
        produtosAdicionados: {
          value: produtosAdicionados,
          setValue: setProdutosAdicionados,
        },
        modalNovoProdutoAberto: {
          value: modalNovoProdutoAberto,
          setValue: setModalNovoProdutoAberto,
        },
        modalEnderecoAberto: {
          value: modalEnderecoAberto,
          setValue: setModalEnderecoAberto,
        },
        snackbar: {
          aberto: {
            value: snackbarAberto,
            setValue: setSnackbarAberto,
          },
          mensagem: {
            value: mensagemSnackbar,
            setValue: setMensagemSnackbar,
          },
          tipo: {
            value: tipoAlertaSnackbar,
            setValue: setTipoAlertaSnackbar,
          },
        },
      }}
    >
      {children}
    </SolicitarDescarteContext.Provider>
  );
};

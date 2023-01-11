import { AlertColor } from '@mui/material';
import { createContext, useCallback, useContext, useState } from 'react';

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
  const loadProdutosAdicionados = () => {
    const produtosAdicionados = localStorage.getItem('produtosAdicionados');
    if (produtosAdicionados) {
      return JSON.parse(produtosAdicionados);
    }
    return [];
  };
  
  const [produtosAdicionados, setProdutosAdicionados] = useState<
    {
      uuid: string;
      quantidade: number;
    }[]
  >(loadProdutosAdicionados());

  const [modalNovoProdutoAberto, setModalNovoProdutoAberto] = useState(false);
  const [modalEnderecoAberto, setModalEnderecoAberto] = useState(false);
  const [snackbarAberto, setSnackbarAberto] = useState(false);
  const [mensagemSnackbar, setMensagemSnackbar] = useState('');
  const [tipoAlertaSnackbar, setTipoAlertaSnackbar] = useState<AlertColor | undefined>(undefined);

  const setSaveProdutosAdicionados = useCallback(
    (
      produtosAdicionados: {
        uuid: string;
        quantidade: number;
      }[]
    ) => {
      setProdutosAdicionados(produtosAdicionados);
      localStorage.setItem('produtosAdicionados', JSON.stringify(produtosAdicionados));
    },
    []
  );

  return (
    <SolicitarDescarteContext.Provider
      value={{
        produtosAdicionados: {
          value: produtosAdicionados,
          setValue: setSaveProdutosAdicionados,
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

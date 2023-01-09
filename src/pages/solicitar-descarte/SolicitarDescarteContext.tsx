import { createContext, useContext, useState } from 'react';

interface ISolicitarDescarteContextData {
  produtosAdicionados: {
    value: {
      uuid: string;
      quantidade: number;
    }[];
    setValue: (produtos: {
      uuid: string;
      quantidade: number;
    }[]) => void;
  };
  modalNovoProdutoAberto: {
    value: boolean;
    setValue: (aberto: boolean) => void;
  };
  modalEnderecoAberto: {
    value: boolean;
    setValue: (aberto: boolean) => void;
  };
}

export const SolicitarDescarteContext = createContext<ISolicitarDescarteContextData>(
  {} as ISolicitarDescarteContextData
);

export const useSolicitarDescarteContext = () => {
  return useContext(SolicitarDescarteContext);
};

export const SolicitarDescarteContextProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [produtosAdicionados, setProdutosAdicionados] = useState<{
    uuid: string;
    quantidade: number;
  }[]>([]);

  const [modalNovoProdutoAberto, setModalNovoProdutoAberto] = useState(false);
  const [modalEnderecoAberto, setModalEnderecoAberto] = useState(false);

  return (
    <SolicitarDescarteContext.Provider value={{
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
    }}>
      {children}
    </SolicitarDescarteContext.Provider>
  );
};
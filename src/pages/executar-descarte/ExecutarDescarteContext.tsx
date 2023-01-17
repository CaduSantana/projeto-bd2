import { createContext, useContext, useState } from 'react';
import { IDescarte, IPessoa, IVeiculo } from '../../shared/services/api';

interface FuncionarioVeiculo {
  funcionario: IPessoa;
  veiculoUtilizado?: IVeiculo;
}

interface IExecutarDescarteContextData {
  descarteSolicitado: {
    value?: IDescarte;
    setValue: (descarte: IDescarte) => void;
  };
  funcionariosSelecionados: {
    value: FuncionarioVeiculo[] | [];
    setValue: (valor: FuncionarioVeiculo[] | []) => void;
  };
  modalRealizarDescarte: {
    value: boolean;
    setValue: (valor: boolean) => void;
  };
}

export const ExecutarDescarteContext = createContext<IExecutarDescarteContextData>({} as IExecutarDescarteContextData);

export const useExecutarDescarteContext = () => {
  return useContext(ExecutarDescarteContext);
};

export const ExecutarDescarteContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [descarteSolicitado, setDescarteSolicitado] = useState<IDescarte>();
  const [funcionariosSelecionados, setFuncionariosSelecionados] = useState<FuncionarioVeiculo[]>([]);
  const [modalRealizarDescarte, setModalRealizarDescarte] = useState(false);

  return (
    <ExecutarDescarteContext.Provider
      value={{
        descarteSolicitado: {
          value: descarteSolicitado,
          setValue: setDescarteSolicitado,
        },
        funcionariosSelecionados: {
          value: funcionariosSelecionados,
          setValue: setFuncionariosSelecionados,
        },
        modalRealizarDescarte: {
          value: modalRealizarDescarte,
          setValue: setModalRealizarDescarte,
        },
      }}
    >
      {children}
    </ExecutarDescarteContext.Provider>
  );
};

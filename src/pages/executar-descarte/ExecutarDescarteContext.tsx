import { createContext, useCallback, useContext, useState } from 'react';
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
    addFuncionario: (funcionario: IPessoa) => void;
    removeFuncionario: (funcionario: IPessoa) => void;
    associateVeiculo: (funcionario: IPessoa, veiculo: IVeiculo) => void;
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

  const addFuncionario = useCallback((m_funcionario: IPessoa) => {
    setFuncionariosSelecionados((state) => [...state, { funcionario: m_funcionario }]);
  }, []);

  const removeFuncionario = useCallback((m_funcionario: IPessoa) => {
    setFuncionariosSelecionados((state) => state.filter(({ funcionario }) => funcionario.uuid !== m_funcionario.uuid));
  }, []);

  const associateVeiculo = useCallback((m_funcionario: IPessoa, m_veiculo: IVeiculo) => {
    setFuncionariosSelecionados((state) => {
      const funcionarioIndex = state.findIndex(({ funcionario }) => funcionario.uuid === m_funcionario.uuid);
      state[funcionarioIndex].veiculoUtilizado = m_veiculo;
      return state;
    });
  }, []);

  return (
    <ExecutarDescarteContext.Provider
      value={{
        descarteSolicitado: {
          value: descarteSolicitado,
          setValue: setDescarteSolicitado,
        },
        funcionariosSelecionados: {
          value: funcionariosSelecionados,
          addFuncionario,
          removeFuncionario,
          associateVeiculo,
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

import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { IDescarte, IPessoa, IVeiculo } from '../../shared/interfaces';

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
    open: boolean;
    setOpen: (valor: boolean) => void;
  };
  modalSelecionarVeiculo: {
    open: boolean;
    setOpen: (valor: boolean) => void;
    funcionario?: IPessoa;
    setFuncionario: (funcionario: IPessoa) => void;
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
  const [modalSelecionarVeiculoAberto, setModalSelecionarVeiculoAberto] = useState(false);
  const [funcionarioSelecionado, setFuncionarioSelecionado] = useState<IPessoa>();

  const addFuncionario = useCallback((m_funcionario: IPessoa) => {
    setFuncionariosSelecionados((state) => {
      if (state.some(({ funcionario }) => funcionario.uuid === m_funcionario.uuid)) {
        return state;
      }

      return [...state, { funcionario: m_funcionario }];
    });
  }, []);

  const removeFuncionario = useCallback((m_funcionario: IPessoa) => {
    setFuncionariosSelecionados((state) => state.filter(({ funcionario }) => funcionario.uuid !== m_funcionario.uuid));
  }, []);

  const associateVeiculo = useCallback((m_funcionario: IPessoa, m_veiculo: IVeiculo) => {
    setFuncionariosSelecionados((state) =>
      state.map((funcionarioVeiculo) =>
        funcionarioVeiculo.funcionario.uuid === m_funcionario.uuid
          ? { ...funcionarioVeiculo, veiculoUtilizado: m_veiculo }
          : funcionarioVeiculo
      )
    );
  }, []);

  const information: IExecutarDescarteContextData = useMemo(
    () => ({
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
        open: modalRealizarDescarte,
        setOpen: setModalRealizarDescarte,
      },
      modalSelecionarVeiculo: {
        open: modalSelecionarVeiculoAberto,
        setOpen: setModalSelecionarVeiculoAberto,
        funcionario: funcionarioSelecionado,
        setFuncionario: setFuncionarioSelecionado,
      },
    }),
    [
      descarteSolicitado,
      funcionariosSelecionados,
      modalRealizarDescarte,
      modalSelecionarVeiculoAberto,
      funcionarioSelecionado,
    ]
  );

  return <ExecutarDescarteContext.Provider value={information}>{children}</ExecutarDescarteContext.Provider>;
};

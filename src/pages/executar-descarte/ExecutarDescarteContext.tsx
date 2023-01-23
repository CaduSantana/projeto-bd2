import { AlertColor } from '@mui/material';
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
  dialogSelecionarOpcaoDestino: {
    open: boolean;
    setOpen: (valor: boolean) => void;
  };
  modalDestino: {
    open: boolean;
    setOpen: (valor: boolean) => void;
    option: 'manual' | 'mapa';
    setOption: (option: 'manual' | 'mapa') => void;
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
  signal: {
    value: boolean;
    toggle: () => void;
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
  const [dialogSelecionarOpcaoDestinoAberto, setDialogSelecionarOpcaoDestinoAberto] = useState(false);
  const [modalDestinoAberto, setModalDestinoAberto] = useState(false);
  const [modalDestinoOpcao, setModalDestinoOpcao] = useState<'manual' | 'mapa'>('manual');
  const [snackbarAberto, setSnackbarAberto] = useState(false);
  const [snackbarMensagem, setSnackbarMensagem] = useState('');
  const [snackbarTipo, setSnackbarTipo] = useState<AlertColor>();
  const [signal, setSignal] = useState(false);

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
      dialogSelecionarOpcaoDestino: {
        open: dialogSelecionarOpcaoDestinoAberto,
        setOpen: setDialogSelecionarOpcaoDestinoAberto,
      },
      modalDestino: {
        open: modalDestinoAberto,
        setOpen: setModalDestinoAberto,
        option: modalDestinoOpcao,
        setOption: setModalDestinoOpcao,
      },
      snackbar: {
        aberto: {
          value: snackbarAberto,
          setValue: setSnackbarAberto,
        },
        mensagem: {
          value: snackbarMensagem,
          setValue: setSnackbarMensagem,
        },
        tipo: {
          value: snackbarTipo,
          setValue: setSnackbarTipo,
        },
      },
      signal: {
        value: signal,
        toggle: () => setSignal((state) => !state),
      },
    }),
    [
      descarteSolicitado,
      funcionariosSelecionados,
      modalRealizarDescarte,
      modalSelecionarVeiculoAberto,
      funcionarioSelecionado,
      dialogSelecionarOpcaoDestinoAberto,
      modalDestinoAberto,
      modalDestinoOpcao,
      snackbarAberto,
      snackbarMensagem,
      snackbarTipo,
      signal,
      addFuncionario,
      removeFuncionario,
      associateVeiculo,
    ]
  );

  return <ExecutarDescarteContext.Provider value={information}>{children}</ExecutarDescarteContext.Provider>;
};

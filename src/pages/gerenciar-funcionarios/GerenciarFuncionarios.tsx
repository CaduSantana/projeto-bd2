import { useEffect, useMemo, useState } from 'react';
import { AlertaFalha, Tabela } from '../../shared/components';
import { LayoutBase } from '../../shared/layouts';
import { IPessoa } from '../../shared/interfaces';
import { BarraDePesquisa, ModalFuncionario } from './components';
import PessoasService from '../../shared/services/api/pessoas/PessoasService';
import { CircularProgress } from '@mui/material';

export const GerenciarFuncionarios: React.FC = () => {
  const [loadingStatus, setLoadingStatus] = useState<'loading' | 'success' | 'fail'>('loading');
  const [funcionarios, setFuncionarios] = useState<IPessoa[]>([]);

  useEffect(() => {
    handleDataChange();
  }, []);

  function handleDataChange() {
    setLoadingStatus('loading');

    PessoasService.getAllFuncionarios()
      .then((funcionarios) => {
        if (funcionarios instanceof Error) {
          setLoadingStatus('fail');
          return;
        }

        setLoadingStatus('success');
        setFuncionarios(funcionarios);
      })
      .catch(() => {
        setLoadingStatus('fail');
      });
  }

  function abrirModalCadastro() {
    setFuncionarioSelecionado(undefined);
    setModalAction('create');
    setModalFuncionarioAberto(true);
  }

  function abrirModalEdicao(funcionario: IPessoa) {
    setFuncionarioSelecionado(funcionario);
    setModalAction('edit');
    setModalFuncionarioAberto(true);
  }

  const [modalFuncionarioAberto, setModalFuncionarioAberto] = useState<boolean>(false);
  const [modalAction, setModalAction] = useState<'create' | 'edit'>('create');
  const [funcionarioSelecionado, setFuncionarioSelecionado] = useState<IPessoa>();

  const tableData = useMemo(
    () =>
      funcionarios.map((funcionario) => ({
        key: funcionario.uuid,
        value: funcionario,
      })),
    [funcionarios]
  );

  return (
    <LayoutBase title='Gerenciar funcionários'>
      {loadingStatus === 'success' && (
        <>
          <BarraDePesquisa
            onAdicionar={() => {
              abrirModalCadastro();
            }}
          />
          <Tabela
            columns={[
              {
                key: 'nome',
                label: 'Nome completo',
              },
              {
                key: 'cpf',
                label: 'CPF',
              },
              {
                key: 'email',
                label: 'Email',
              },
            ]}
            alignments={['left', 'left', 'left']}
            data={tableData}
            mapper={(funcionario) => {
              const funcionarioValue = funcionario as IPessoa;
              return [
                `${funcionarioValue.nome} ${funcionarioValue.sobrenome}`,
                funcionarioValue.cpf,
                funcionarioValue.email,
              ];
            }}
            actions={[
              {
                icon: 'edit',
                onClick: function (funcionario) {
                  abrirModalEdicao(funcionario as IPessoa);
                },
              },
            ]}
          />
        </>
      )}
      {loadingStatus === 'fail' && <AlertaFalha />}
      {loadingStatus === 'loading' && <CircularProgress />}

      <ModalFuncionario
        open={modalFuncionarioAberto}
        action={modalAction}
        afterAction={() => {
          handleDataChange();
        }}
        onClose={() => {
          setModalFuncionarioAberto(false);
        }}
        funcionario={funcionarioSelecionado}
      />
    </LayoutBase>
  );
};

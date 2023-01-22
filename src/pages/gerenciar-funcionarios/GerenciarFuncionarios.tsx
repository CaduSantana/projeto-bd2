import { useEffect, useMemo, useState } from 'react';
import { ModalConfirmacao, Tabela } from '../../shared/components';
import { LayoutBase } from '../../shared/layouts';
import { IPessoa } from '../../shared/interfaces';
import { BarraDePesquisa, ModalFuncionario } from './components';
import PessoasService from '../../shared/services/api/pessoas/PessoasService';

export const GerenciarFuncionarios: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [funcionarios, setFuncionarios] = useState<IPessoa[]>([]);

  useEffect(() => {
    handleDataChange();
  }, []);

  function handleDataChange() {
    setIsLoading(true);

    PessoasService.getAllFuncionarios().then((funcionarios) => {
      setIsLoading(false);

      if (funcionarios instanceof Error) {
        // TODO exibir mensagem de erro
        return;
      }

      setFuncionarios(funcionarios);
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

  function abrirModalExclusao(funcionario: IPessoa) {
    setFuncionarioSelecionado(funcionario);
    setModalConfirmacaoExclusaoAberto(true);
  }

  const [modalFuncionarioAberto, setModalFuncionarioAberto] = useState<boolean>(false);
  const [modalAction, setModalAction] = useState<'create' | 'edit'>('create');
  const [modalConfirmacaoExclusaoAberto, setModalConfirmacaoExclusaoAberto] = useState<boolean>(false);
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
      <BarraDePesquisa
        onAdicionar={() => {
          abrirModalCadastro();
        }}
      />

      {!isLoading && <Tabela
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
          {
            icon: 'delete',
            onClick: function (funcionario) {
              abrirModalExclusao(funcionario as IPessoa);
            },
          },
        ]}
      />}

      <ModalConfirmacao
        open={modalConfirmacaoExclusaoAberto}
        onClose={() => {
          setModalConfirmacaoExclusaoAberto(false);
        }}
        title='Remover funcionário'
        message='Deseja realmente remover este funcionário?'
        onConfirm={() => {
          // TODO função que exclui veículo do Banco de Dados.
        }}
      />
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

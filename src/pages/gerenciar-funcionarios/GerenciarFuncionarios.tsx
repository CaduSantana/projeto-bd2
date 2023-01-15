import { useState } from 'react';
import { ModalConfirmacao, Tabela } from '../../shared/components';
import { LayoutBase } from '../../shared/layouts';
import { getExemploFuncionario, IPessoa } from '../../shared/services/api';
import { BarraDePesquisa, ModalFuncionario } from './components';

export const GerenciarFuncionarios: React.FC = () => {
  const funcionarios: IPessoa[] = [getExemploFuncionario()];

  function abrirModalCadastro() {
    setFuncionarioSelecionado(undefined);
    setModalAction('create');
    setModalFuncionarioAberto(true);
  }

  function abrirModalEdicao(linhaIndex: number) {
    setFuncionarioSelecionado(funcionarios[linhaIndex]);
    setModalAction('edit');
    setModalFuncionarioAberto(true);
  }

  function abrirModalExclusao(linhaIndex: number) {
    setFuncionarioSelecionado(funcionarios[linhaIndex]);
    setModalConfirmacaoExclusaoAberto(true);
  }

  const [modalFuncionarioAberto, setModalFuncionarioAberto] = useState<boolean>(false);
  const [modalAction, setModalAction] = useState<'create' | 'edit'>('create');
  const [modalConfirmacaoExclusaoAberto, setModalConfirmacaoExclusaoAberto] = useState<boolean>(false);
  const [funcionarioSelecionado, setFuncionarioSelecionado] = useState<IPessoa>();

  return (
    <LayoutBase title='Gerenciar funcionários'>
      <BarraDePesquisa
        onAdicionar={() => {
          abrirModalCadastro();
        }}
      />

      <Tabela
        cabecalho={['Nome completo', 'CPF', 'Email']}
        alinhamentos={['left', 'left', 'right']}
        linhas={funcionarios.map((funcionario) => [
          `${funcionario.nome} ${funcionario.sobrenome}`,
          funcionario.cpf,
          funcionario.email,
        ])}
        acoes={[
          {
            icon: 'edit',
            funcao: (linhaIndex: number) => {
              abrirModalEdicao(linhaIndex);
            },
          },
          {
            icon: 'delete',
            funcao: (linhaIndex: number) => {
              abrirModalExclusao(linhaIndex);
            },
          },
        ]}
      />

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
        onClose={() => {
          setModalFuncionarioAberto(false);
        }}
        funcionario={funcionarioSelecionado}
      />
    </LayoutBase>
  );
};

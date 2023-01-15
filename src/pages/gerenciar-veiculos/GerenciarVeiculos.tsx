import { Tabela, ModalConfirmacao } from '../../shared/components';
import { LayoutBase } from '../../shared/layouts';
import { BarraDePesquisa, ModalVeiculo } from './components';
import { getExemploVeiculo, IVeiculo } from '../../shared/services/api';
import { useState } from 'react';

export const GerenciarVeiculos: React.FC = () => {
  const veiculos: IVeiculo[] = [getExemploVeiculo()];

  function abrirModalCadastro() {
    setVeiculoSelecionado(undefined);
    setModalAction('create');
    setModalVeiculoAberto(true);
  }

  function abrirModalEdicao(linhaIndex: number) {
    setVeiculoSelecionado(veiculos[linhaIndex]);
    setModalAction('edit');
    setModalVeiculoAberto(true);
  }

  function abrirModalExclusao(linhaIndex: number) {
    setVeiculoSelecionado(veiculos[linhaIndex]);
    setModalConfirmacaoExclusaoAberto(true);
  }

  const [modalConfirmacaoExclusaoAberto, setModalConfirmacaoExclusaoAberto] = useState<boolean>(false);
  const [modalVeiculoAberto, setModalVeiculoAberto] = useState<boolean>(false);
  const [modalAction, setModalAction] = useState<'create' | 'edit'>('create');
  const [veiculoSelecionado, setVeiculoSelecionado] = useState<IVeiculo>();

  return (
    <LayoutBase title='Gerenciar veículos'>
      <BarraDePesquisa onAdicionar={abrirModalCadastro} />
      <Tabela
        cabecalho={['Placa', 'Tipo', 'Capacidade (kg)']}
        alinhamentos={['left', 'left', 'right']}
        linhas={veiculos.map((veiculo) => [veiculo.placa, veiculo.tipo, veiculo.capacidade.toString()])}
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
        title='Excluir veículo'
        message='Deseja realmente excluir este veículo?'
        onConfirm={() => {
          // TODO função que exclui veículo do Banco de Dados.
        }}
      />
      <ModalVeiculo
        open={modalVeiculoAberto}
        veiculo={veiculoSelecionado}
        onClose={() => {
          setModalVeiculoAberto(false);
        }}
        action={modalAction}
      />
    </LayoutBase>
  );
};

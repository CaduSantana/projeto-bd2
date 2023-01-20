import { ModalConfirmacao, NovaTabela } from '../../shared/components';
import { LayoutBase } from '../../shared/layouts';
import { BarraDePesquisa, ModalVeiculo } from './components';
import { getExemploVeiculo, IVeiculo } from '../../shared/services/api';
import { useMemo, useState } from 'react';

export const GerenciarVeiculos: React.FC = () => {
  const veiculos: IVeiculo[] = [getExemploVeiculo()];

  function abrirModalCadastro() {
    setVeiculoSelecionado(undefined);
    setModalAction('create');
    setModalVeiculoAberto(true);
  }

  function abrirModalEdicao(veiculo: IVeiculo) {
    setVeiculoSelecionado(veiculo);
    setModalAction('edit');
    setModalVeiculoAberto(true);
  }

  function abrirModalExclusao(veiculo: IVeiculo) {
    setVeiculoSelecionado(veiculo);
    setModalConfirmacaoExclusaoAberto(true);
  }

  const [modalConfirmacaoExclusaoAberto, setModalConfirmacaoExclusaoAberto] = useState<boolean>(false);
  const [modalVeiculoAberto, setModalVeiculoAberto] = useState<boolean>(false);
  const [modalAction, setModalAction] = useState<'create' | 'edit'>('create');
  const [veiculoSelecionado, setVeiculoSelecionado] = useState<IVeiculo>();

  const tableData = useMemo(
    () =>
      veiculos.map((veiculo) => ({
        key: veiculo.uuid,
        value: veiculo,
      })),
    [veiculos]
  );

  return (
    <LayoutBase title='Gerenciar veículos'>
      <BarraDePesquisa onAdicionar={abrirModalCadastro} />
      <NovaTabela
        columns={[
          {
            key: 'placa',
            label: 'Placa',
          },
          {
            key: 'tipo',
            label: 'Tipo',
          },
          {
            key: 'capacidade',
            label: 'Capacidade (kg)',
          },
        ]}
        alignments={['left', 'left', 'right']}
        data={tableData}
        mapper={(veiculo) => {
          const veiculoValue = veiculo as IVeiculo;
          return [veiculoValue.placa, veiculoValue.tipo, veiculoValue.capacidade.toString()];
        }}
        actions={[
          {
            icon: 'edit',
            onClick: function (veiculo) {
              abrirModalEdicao(veiculo as IVeiculo);
            },
          },
          {
            icon: 'delete',
            onClick: function (veiculo) {
              abrirModalExclusao(veiculo as IVeiculo);
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

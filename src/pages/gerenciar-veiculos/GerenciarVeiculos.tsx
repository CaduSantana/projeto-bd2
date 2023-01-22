import { AlertaFalha, ModalConfirmacao, Tabela } from '../../shared/components';
import { LayoutBase } from '../../shared/layouts';
import { BarraDePesquisa, ModalVeiculo } from './components';
import { IVeiculo } from '../../shared/interfaces';
import { useEffect, useMemo, useState } from 'react';
import VeiculosService from '../../shared/services/api/veiculos/VeiculosService';
import { CircularProgress } from '@mui/material';

export const GerenciarVeiculos: React.FC = () => {
  const [loadingStatus, setLoadingStatus] = useState<'loading' | 'success' | 'fail'>('loading');
  const [veiculos, setVeiculos] = useState<IVeiculo[]>([]);

  useEffect(() => {
    handleDataChange();
  }, []);

  function handleDataChange() {
    setLoadingStatus('loading');

    VeiculosService.getAllVeiculos()
      .then((veiculos) => {
        if (veiculos instanceof Error) {
          setLoadingStatus('fail');
          return;
        }

        setLoadingStatus('success');
        setVeiculos(veiculos);
      })
      .catch(() => {
        setLoadingStatus('fail');
      });
  }

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
      {loadingStatus === 'success' && (
        <Tabela
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
      )}
      {loadingStatus === 'fail' && <AlertaFalha />}
      {loadingStatus === 'loading' && <CircularProgress />}

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
        afterAction={() => {
          handleDataChange();
        }}
      />
    </LayoutBase>
  );
};

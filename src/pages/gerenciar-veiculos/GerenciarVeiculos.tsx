import { Tabela } from '../../shared/components';
import { LayoutBase } from '../../shared/layouts';
import { BarraDePesquisa, ModalVeiculo } from './components';
import { IVeiculo } from '../../shared/services/api';
import { useState } from 'react';

export const GerenciarVeiculos: React.FC = () => {
  const veiculos: IVeiculo[] = [
    {
      uuid: '1',
      placa: 'ABC-1234',
      tipo: 'Caminhão',
      capacidade: 1000,
    },
    {
      uuid: '2',
      placa: 'CBA-4321',
      tipo: 'Caminhão',
      capacidade: 1000,
    },
  ];

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
    // TODO: Exibir modal de confirmação de exclusão
  }

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
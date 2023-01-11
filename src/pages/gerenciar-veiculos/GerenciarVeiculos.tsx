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

  const [modalVeiculoAberto, setModalVeiculoAberto] = useState<boolean>(false);
  const [veiculoSelecionado, setVeiculoSelecionado] = useState<IVeiculo>();

  const editarVeiculo = (linhaIndex: number) => {
    setVeiculoSelecionado(veiculos[linhaIndex]);
    setModalVeiculoAberto(true);
  };

  const excluirVeiculo = (linhaIndex: number) => {
    // TODO: Exibir modal de confirmação
  };

  return (
    <LayoutBase title='Gerenciar veículos'>
      <BarraDePesquisa />
      <Tabela
        cabecalho={['Placa', 'Tipo', 'Capacidade (kg)']}
        alinhamentos={['left', 'left', 'right']}
        linhas={veiculos.map((veiculo) => [veiculo.placa, veiculo.tipo, veiculo.capacidade.toString()])}
        acoes={[
          {
            icon: 'edit',
            funcao: (linhaIndex: number) => {
              editarVeiculo(linhaIndex);
            },
          },
          {
            icon: 'delete',
            funcao: (linhaIndex: number) => {
              excluirVeiculo(linhaIndex);
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
      />
    </LayoutBase>
  );
};

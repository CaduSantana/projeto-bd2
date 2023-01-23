import { Typography } from '@mui/material';
import { useMemo } from 'react';
import { Tabela } from '../../../shared/components';
import { IPessoa, IVeiculo } from '../../../shared/interfaces';
import { useExecutarDescarteContext } from '../ExecutarDescarteContext';

export const ListaFuncionariosSelecionados: React.FC = () => {
  const { funcionariosSelecionados, modalSelecionarVeiculo } = useExecutarDescarteContext();

  const tableData = useMemo(
    () =>
      funcionariosSelecionados.value.map(({ funcionario, veiculoUtilizado }) => ({
        key: funcionario.uuid,
        value: { funcionario, veiculoUtilizado },
      })),
    [funcionariosSelecionados.value]
  );

  return funcionariosSelecionados.value.length > 0 ? (
    <>
      <Typography variant='h5'>Funcionários selecionados</Typography>
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
          {
            key: 'veiculo-utilizado',
            label: 'Veículo utilizado',
          },
        ]}
        alignments={['left', 'left', 'left', 'left']}
        data={tableData}
        mapper={(data) => {
          const { funcionario, veiculoUtilizado } = data as { funcionario: IPessoa; veiculoUtilizado: IVeiculo };
          return [
            `${funcionario.nome} ${funcionario.sobrenome}`,
            funcionario.cpf,
            funcionario.email,
            veiculoUtilizado ? veiculoUtilizado.placa : 'Nenhum veículo selecionado',
          ];
        }}
        actions={[
          {
            icon: 'delete',
            onClick: function (data) {
              const { funcionario } = data as { funcionario: IPessoa; veiculoUtilizado: IVeiculo };
              funcionariosSelecionados.removeFuncionario(funcionario);
            },
          },
          {
            icon: 'local_shipping',
            onClick: function (data) {
              const { funcionario } = data as { funcionario: IPessoa; veiculoUtilizado: IVeiculo };
              modalSelecionarVeiculo.setFuncionario(funcionario);
              modalSelecionarVeiculo.setOpen(true);
            },
          },
        ]}
      />
    </>
  ) : (
    <></>
  );
};

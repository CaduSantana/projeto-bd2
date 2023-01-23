import { Typography } from '@mui/material';
import { useMemo } from 'react';
import { Tabela } from '../../../shared/components';
import { IPessoa } from '../../../shared/interfaces';
import { useExecutarDescarteContext } from '../ExecutarDescarteContext';

export const TabelaFuncionariosDisponiveis: React.FC = () => {
  const funcionarios: IPessoa[] = [];
  const { funcionariosSelecionados } = useExecutarDescarteContext();

  const tableData = useMemo(
    () => funcionarios.map((funcionario) => ({
      key: funcionario.uuid,
      value: funcionario,
    })),
    [funcionarios]
  );

  return (
    <>
      <Typography variant='h5'>Funcionários</Typography>
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
            icon: 'add',
            onClick: function (funcionario) {
              funcionariosSelecionados.addFuncionario(funcionario as IPessoa);
            },
          },
        ]} />
    </>
  );
};

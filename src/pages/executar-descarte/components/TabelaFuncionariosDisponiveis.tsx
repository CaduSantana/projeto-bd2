import { CircularProgress, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { AlertaFalha, Tabela } from '../../../shared/components';
import { IPessoa } from '../../../shared/interfaces';
import PessoasService from '../../../shared/services/api/pessoas/PessoasService';
import { useExecutarDescarteContext } from '../ExecutarDescarteContext';

export const TabelaFuncionariosDisponiveis: React.FC = () => {
  // Estados de carregamento de dados
  const [funcionariosDisponiveis, setFuncionariosDisponiveis] = useState<IPessoa[]>([]);
  const [loadingStatus, setLoadingStatus] = useState<'loading' | 'success' | 'fail'>('loading');

  // Estados de contexto
  const { funcionariosSelecionados } = useExecutarDescarteContext();

  // Carrega os funcionários disponíveis
  useEffect(() => {
    setLoadingStatus('loading');

    PessoasService.getAllFuncionarios()
      .then((funcionarios) => {
        setFuncionariosDisponiveis(funcionarios);
        setLoadingStatus('success');
      })
      .catch(() => {
        setLoadingStatus('fail');
      });
  }, []);

  const tableData = useMemo(
    () =>
      funcionariosDisponiveis.map((funcionario) => ({
        key: funcionario.uuid,
        value: funcionario,
      })),
    [funcionariosDisponiveis]
  );

  return (
    <>
      <Typography variant='h5'>Funcionários</Typography>
      {loadingStatus === 'success' && (
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
          ]}
        />
      )}
      {loadingStatus === 'loading' && <CircularProgress />}
      {loadingStatus === 'fail' && <AlertaFalha />}
    </>
  );
};

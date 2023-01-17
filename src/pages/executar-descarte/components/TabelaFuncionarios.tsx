import { Tabela } from '../../../shared/components';
import { getExemploFuncionario } from '../../../shared/services/api';

export const TabelaFuncionarios: React.FC = () => {
  const funcionarios = [getExemploFuncionario()];

  return (
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
          icon: 'select',
          funcao: (linhaIndex: number) => {
            // TODO selecionar o funcionário
          },
        },
      ]}
    />
  );
};

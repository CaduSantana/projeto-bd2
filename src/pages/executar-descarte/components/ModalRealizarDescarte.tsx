import { useMemo } from 'react';
import { ModalWrapper, Tabela } from '../../../shared/components';
import { getExemploFuncionario } from '../../../shared/services/api';
import { useExecutarDescarteContext } from '../ExecutarDescarteContext';

const TabelaFuncionarios: React.FC = () => {
  const funcionarios = [getExemploFuncionario()];
  const { funcionariosSelecionados } = useExecutarDescarteContext();
  const linhasTabela = useMemo(() => funcionarios.map((funcionario) => [
    `${funcionario.nome} ${funcionario.sobrenome}`,
    funcionario.cpf,
    funcionario.email,
  ]), [funcionarios]);

  return (
    <Tabela
      cabecalho={['Nome completo', 'CPF', 'Email']}
      alinhamentos={['left', 'left', 'right']}
      linhas={linhasTabela}
      acoes={[
        {
          icon: 'add',
          funcao: (linhaIndex: number) => {
            funcionariosSelecionados.setValue([
              ...(funcionariosSelecionados.value || []),
              {
                funcionario: funcionarios[linhaIndex],
                veiculoUtilizado: undefined,
              },
            ]);
          },
        },
      ]}
    />
  );
};

const ListaFuncionariosSelecionados: React.FC = () => {
  const { funcionariosSelecionados } = useExecutarDescarteContext();
  const linhasTabela = useMemo(() => funcionariosSelecionados.value.map(
    ({ funcionario, veiculoUtilizado }) => [
      `${funcionario.nome} ${funcionario.sobrenome}`,
      funcionario.cpf,
      funcionario.email,
      veiculoUtilizado? veiculoUtilizado.placa : 'Não selecionado',
    ]
  ),[funcionariosSelecionados.value]);

  return funcionariosSelecionados.value.length > 0 ? (
    <Tabela
      cabecalho={['Nome completo', 'CPF', 'Email', 'Veículo utilizado']}
      alinhamentos={['left', 'left', 'right']}
      linhas={linhasTabela}
      acoes={[
        {
          icon: 'delete',
          funcao: (linhaIndex: number) => {
            funcionariosSelecionados.setValue(
              funcionariosSelecionados.value?.filter((_, index) => index !== linhaIndex)
            );
          },
        },
      ]}
    />
  ) : (
    <></>
  );
};

export const ModalRealizarDescarte: React.FC = () => {
  const { modalRealizarDescarte } = useExecutarDescarteContext();

  return (
    <ModalWrapper
      open={modalRealizarDescarte.value}
      onClose={() => {
        modalRealizarDescarte.setValue(false);
      }}
    >
      <TabelaFuncionarios />
      <ListaFuncionariosSelecionados />
    </ModalWrapper>
  );
};

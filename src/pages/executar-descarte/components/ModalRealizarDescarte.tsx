import { MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import { ModalWrapper, Tabela } from '../../../shared/components';
import { getExemploFuncionario, getExemploVeiculo } from '../../../shared/services/api';
import { useExecutarDescarteContext } from '../ExecutarDescarteContext';

const TabelaFuncionariosDisponiveis: React.FC = () => {
  const funcionarios = [getExemploFuncionario()];
  const { funcionariosSelecionados } = useExecutarDescarteContext();
  const linhasTabela = useMemo(
    () =>
      funcionarios.map((funcionario) => [
        `${funcionario.nome} ${funcionario.sobrenome}`,
        funcionario.cpf,
        funcionario.email,
      ]),
    [funcionarios]
  );

  return (
    <>
      <Typography variant='h5'>Funcionários</Typography>
      <Tabela
        cabecalho={['Nome completo', 'CPF', 'Email']}
        alinhamentos={['left', 'left', 'right']}
        linhas={linhasTabela}
        acoes={[
          {
            icon: 'add',
            funcao: (linhaIndex: number) => {
              funcionariosSelecionados.addFuncionario(funcionarios[linhaIndex]);
            },
          },
        ]}
      />
    </>
  );
};

const ListaFuncionariosSelecionados: React.FC = () => {
  const funcionarios = [getExemploFuncionario()];

  const { funcionariosSelecionados, modalSelecionarVeiculo } = useExecutarDescarteContext();
  const linhasTabela = useMemo(
    () =>
      funcionariosSelecionados.value.map(({ funcionario, veiculoUtilizado }) => [
        `${funcionario.nome} ${funcionario.sobrenome}`,
        funcionario.cpf,
        funcionario.email,
        veiculoUtilizado ? veiculoUtilizado.placa : 'Não selecionado',
      ]),
    [funcionariosSelecionados.value]
  );

  return funcionariosSelecionados.value.length > 0 ? (
    <>
      <Typography variant='h5'>Funcionários selecionados</Typography>
      <Tabela
        cabecalho={['Nome completo', 'CPF', 'Email', 'Veículo utilizado']}
        alinhamentos={['left', 'left', 'right']}
        linhas={linhasTabela}
        acoes={[
          {
            icon: 'delete',
            funcao: (linhaIndex: number) => {
              funcionariosSelecionados.removeFuncionario(funcionarios[linhaIndex]);
            },
          },
          {
            icon: 'local_shipping',
            funcao: (linhaIndex: number) => {
              modalSelecionarVeiculo.setFuncionario(funcionarios[linhaIndex]);
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

const ModalSelecionarVeiculo: React.FC = () => {
  const veiculos = [getExemploVeiculo()];

  const [uuidVeiculoSelecionado, setUuidVeiculoSelecionado] = useState<string>('');

  const {
    modalSelecionarVeiculo: { open, setOpen, funcionario },
    funcionariosSelecionados: { associateVeiculo },
  } = useExecutarDescarteContext();

  function handleChangeVeiculoSelecionado(e: SelectChangeEvent<string>) {
    setUuidVeiculoSelecionado(e.target.value);
  }

  function handleCloseModal() {
    // Verifica se um veículo foi selecionado
    // Se sim, associa esse veículo ao funcionário
    if (uuidVeiculoSelecionado && funcionario) {
      const veiculoSelecionado = veiculos.find((veiculo) => veiculo.uuid === uuidVeiculoSelecionado);
      if (veiculoSelecionado) {
        associateVeiculo(funcionario, veiculoSelecionado);
      }
    }
    setOpen(false);
  }

  return (
    <ModalWrapper open={open} onClose={handleCloseModal}>
      <Typography variant='h5'>
        Selecione o veículo utilizado por {funcionario?.nome} {funcionario?.sobrenome}
      </Typography>
      <Select value={uuidVeiculoSelecionado} onChange={handleChangeVeiculoSelecionado}>
        {veiculos.map((veiculo) => (
          <MenuItem
            key={veiculo.uuid}
            value={veiculo.uuid}
          >{`${veiculo.placa} - ${veiculo.tipo} (${veiculo.capacidade})`}</MenuItem>
        ))}
      </Select>
    </ModalWrapper>
  );
};

export const ModalRealizarDescarte: React.FC = () => {
  const { modalRealizarDescarte } = useExecutarDescarteContext();

  return (
    <ModalWrapper
      open={modalRealizarDescarte.open}
      onClose={function () {
        modalRealizarDescarte.setOpen(false);
      }}
    >
      <TabelaFuncionariosDisponiveis />
      <ListaFuncionariosSelecionados />

      <ModalSelecionarVeiculo />
    </ModalWrapper>
  );
};

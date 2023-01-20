import { Button, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import { ModalWrapper, Tabela } from '../../../shared/components';
import { getExemploFuncionario, getExemploVeiculo, IPessoa, IVeiculo } from '../../../shared/services/api';
import { useExecutarDescarteContext } from '../ExecutarDescarteContext';

const TabelaFuncionariosDisponiveis: React.FC = () => {
  const funcionarios = [getExemploFuncionario()];
  const { funcionariosSelecionados } = useExecutarDescarteContext();

  const tableData = useMemo(
    () =>
      funcionarios.map((funcionario) => ({
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
        ]}
      />
    </>
  );
};

const ListaFuncionariosSelecionados: React.FC = () => {
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
  const { modalRealizarDescarte, funcionariosSelecionados } = useExecutarDescarteContext();

  const possivelRealizarDescarte = useMemo(
    () =>
      funcionariosSelecionados.value.length > 0 &&
      funcionariosSelecionados.value.every(({ veiculoUtilizado }) => veiculoUtilizado),
    [funcionariosSelecionados]
  );

  return (
    <ModalWrapper
      open={modalRealizarDescarte.open}
      onClose={function () {
        modalRealizarDescarte.setOpen(false);
      }}
    >
      <TabelaFuncionariosDisponiveis />
      <ListaFuncionariosSelecionados />
      <Button variant='contained' disabled={!possivelRealizarDescarte}>
        Realizar descarte
      </Button>
      <ModalSelecionarVeiculo />
    </ModalWrapper>
  );
};

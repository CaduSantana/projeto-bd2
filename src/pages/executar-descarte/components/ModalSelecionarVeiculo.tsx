import { MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { useState } from 'react';
import { ModalWrapper } from '../../../shared/components';
import { getExemploVeiculo } from '../../../shared/services/api';
import { useExecutarDescarteContext } from '../ExecutarDescarteContext';

export const ModalSelecionarVeiculo: React.FC = () => {
  const veiculos = [getExemploVeiculo()];

  const [uuidVeiculoSelecionado, setUuidVeiculoSelecionado] = useState<string>('');

  const {
    modalSelecionarVeiculo: { open, setOpen, funcionario }, funcionariosSelecionados: { associateVeiculo },
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

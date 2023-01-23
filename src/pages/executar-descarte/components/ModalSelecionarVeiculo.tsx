import { MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { ModalWrapper } from '../../../shared/components';
import { IVeiculo } from '../../../shared/interfaces';
import VeiculosService from '../../../shared/services/api/veiculos/VeiculosService';
import { useExecutarDescarteContext } from '../ExecutarDescarteContext';

export const ModalSelecionarVeiculo: React.FC = () => {
  // Estados de carregamento de dados
  const [veiculos, setVeiculos] = useState<IVeiculo[]>([]);

  // Estados do componente
  const [uuidVeiculoSelecionado, setUuidVeiculoSelecionado] = useState<string>('');

  // Estados de contexto
  const {
    modalSelecionarVeiculo: { open, setOpen, funcionario },
    funcionariosSelecionados: { associateVeiculo },
  } = useExecutarDescarteContext();

  // Carregamento de dados
  useEffect(() => {
    VeiculosService.getAllVeiculos().then((veiculos) => {
      setVeiculos(veiculos);
    });
  }, []);

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

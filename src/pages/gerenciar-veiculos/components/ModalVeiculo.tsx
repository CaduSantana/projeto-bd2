import { Box, Button, Modal, Paper, TextField, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { IVeiculo } from '../../../shared/interfaces';
import VeiculosService from '../../../shared/services/api/veiculos/VeiculosService';

interface IModalEditarVeiculoProps {
  open: boolean;
  onClose: () => void;
  action: 'create' | 'edit';
  afterAction: () => void;
  veiculo?: IVeiculo;
}

function adicionarVeiculo(placa: string, tipo: string, capacidade: number) {
  VeiculosService.postVeiculo({ placa, tipo, capacidade });
}
function editarVeiculo(uuid_veiculo: string, placa: string, tipo: string, capacidade: number) {
  VeiculosService.putVeiculo(uuid_veiculo, placa, tipo, capacidade);
}

export const ModalVeiculo: React.FC<IModalEditarVeiculoProps> = ({
  open,
  onClose,
  action,
  afterAction: onAction,
  veiculo,
}) => {
  const theme = useTheme();

  const [placa, setPlaca] = useState<string>('');
  const [tipo, setTipo] = useState<string>('');
  const [capacidade, setCapacidade] = useState<number>(1);

  useEffect(() => {
    if (veiculo) {
      setPlaca(veiculo.placa);
      setTipo(veiculo.tipo);
      setCapacidade(veiculo.capacidade);
    } else {
      setPlaca('');
      setTipo('');
      setCapacidade(1);
    }
  }, [open]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      component={Box}
      boxSizing='border-box'
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw',
      }}
    >
      <Box component={Paper} padding={theme.spacing(4)}>
        <Box display='flex' flexDirection='column' gap={2}>
          <Box display='flex' flexDirection='row' gap={2}>
            <TextField
              size='small'
              placeholder='Placa'
              value={placa}
              onChange={(e) => {
                setPlaca(e.target.value);
              }}
              required
              error={placa.length < 7}
            />
            <TextField
              size='small'
              placeholder='Tipo'
              value={tipo}
              onChange={(e) => {
                setTipo(e.target.value);
              }}
              required
              error={tipo.length === 0}
            />
            <TextField
              size='small'
              placeholder='Capacidade'
              value={capacidade.toString()}
              onChange={(e) => {
                if (!isNaN(Number(e.target.value))) {
                  setCapacidade(Number(e.target.value));
                }
              }}
              required
              error={capacidade === 0}
            />
          </Box>
          <Box display='flex' flexDirection='row' gap={2}>
            <Button
              variant='contained'
              onClick={() => {
                const placaValida = placa.length === 7;
                const tipoValido = tipo.length > 0;
                const capacidadeValida = capacidade > 0;
                if (placaValida && tipoValido && capacidadeValida) {
                  if (action === 'create') {
                    adicionarVeiculo(placa, tipo, capacidade);
                  } else {
                    if (!veiculo) return;
                    editarVeiculo(veiculo.uuid, placa, tipo, capacidade);
                  }
                  onAction();
                  onClose();
                }
              }}
            >
              {action === 'create' ? 'Adicionar' : 'Editar'}
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

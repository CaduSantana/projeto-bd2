import { Box, Button, Modal, Paper, TextField, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { IVeiculo } from '../../../shared/services/api';

interface IModalEditarVeiculoProps {
  open: boolean;
  onClose: () => void;
  action: 'create' | 'edit';
  veiculo?: IVeiculo;
}

// TODO funções que realizam escrita e edição no Banco de Dados, devem ser transportadas para VeiculosService posteriormente.
function adicionarVeiculo(veiculo: IVeiculo) {
  return;
}
function editarVeiculo(veiculo: IVeiculo) {
  return;
}

export const ModalVeiculo: React.FC<IModalEditarVeiculoProps> = ({ open, onClose, action, veiculo }) => {
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
            />
            <TextField
              size='small'
              placeholder='Tipo'
              value={tipo}
              onChange={(e) => {
                setTipo(e.target.value);
              }}
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
            />
          </Box>
          <Box display='flex' flexDirection='row' gap={2}>
            <Button
              variant='contained'
              onClick={() => {
                if (action === 'create') {
                  // TODO lógica de geração do UUID: banco ou local?
                  const uuid = '';
                  adicionarVeiculo({ uuid, placa, tipo, capacidade });
                } else {
                  if (!veiculo) return;
                  editarVeiculo({ uuid: veiculo.uuid, placa, tipo, capacidade });
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
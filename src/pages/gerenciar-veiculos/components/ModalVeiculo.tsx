import { Box, Modal, Paper, TextField, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { IVeiculo } from '../../../shared/services/api';

interface IModalEditarVeiculoProps {
  open: boolean;
  veiculo?: IVeiculo;
  onClose: () => void;
}

export const ModalVeiculo: React.FC<IModalEditarVeiculoProps> = ({ open, veiculo, onClose }) => {
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
      </Box>
    </Modal>
  );
};

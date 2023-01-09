import { Box, Button, MenuItem, Modal, Paper, Select, TextField, useTheme } from '@mui/material';
import { useSolicitarDescarteContext } from '../../SolicitarDescarteContext';

export const ModalFormNovoEndereco: React.FC = () => {
  const theme = useTheme();
  const { modalEnderecoAberto } = useSolicitarDescarteContext();
  return (
    <Modal
      open={modalEnderecoAberto.value}
      onClose={() => modalEnderecoAberto.setValue(false)}
      component={Box}
      boxSizing="border-box"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw',
      }}
    >
      <Box component={Paper} padding={theme.spacing(4)}>
        <Box display="flex" flexDirection="column" gap={2} component="form">
          <Box display="flex" flexDirection="row" gap={2}>
            <Select label="UF" value="SP" fullWidth>
              <MenuItem value="SP">São Paulo</MenuItem>
            </Select>

            <Select label="Cidade" value="Presidente Prudente" fullWidth>
              <MenuItem value="Presidente Prudente">Presidente Prudente</MenuItem>
            </Select>
          </Box>
          <Box display="flex" flexDirection="row" gap={2}>
            <TextField size="small" placeholder="Rua, Passeio, Logradouro" />
            <TextField size="small" placeholder="Número" />
            <TextField size="small" placeholder="Bairro" />
          </Box>
          <Box display="flex" flexDirection="row" gap={2}>
            <TextField size="small" placeholder="CEP" />
            <TextField size="small" placeholder="Complemento" />
            <Button variant="contained" fullWidth>
              Solicitar Descarte
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

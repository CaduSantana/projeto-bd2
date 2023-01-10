import { Box, Button, MenuItem, Modal, Paper, Select, TextField, useTheme } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSolicitarDescarteContext } from '../../SolicitarDescarteContext';

export const ModalFormNovoEndereco: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const { modalEnderecoAberto } = useSolicitarDescarteContext();
  const [ufId, setUfId] = useState<number>(1);
  const [cidadeId, setCidadeId] = useState<number>(1);
  const [rua, setRua] = useState<string>('');
  const [numero, setNumero] = useState<string>('');
  const [bairro, setBairro] = useState<string>('');
  const [cep, setCep] = useState<string>('');
  const [complemento, setComplemento] = useState<string>('');

  const TAMANHO_MAXIMO_COMPLEMENTO = 280;

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
            <Select
              label="UF"
              value={ufId}
              onChange={(e) => {
                setUfId(e.target.value as number);
              }}
              fullWidth
            >
              <MenuItem value={1}>São Paulo</MenuItem>
              <MenuItem value={2}>Rio de Janeiro</MenuItem>
            </Select>

            <Select
              label="Cidade"
              value={cidadeId}
              onChange={(e) => {
                setCidadeId(e.target.value as number);
              }}
              fullWidth
            >
              <MenuItem value={1}>Presidente Prudente</MenuItem>
              <MenuItem value={2}>Presidente Epitácio</MenuItem>
            </Select>
          </Box>
          <Box display="flex" flexDirection="row" gap={2}>
            <TextField
              size="small"
              placeholder="Rua, Passeio, Logradouro"
              value={rua}
              onChange={(event) => {
                setRua(event.target.value);
              }}
            />
            <TextField
              size="small"
              placeholder="Número"
              value={numero}
              onChange={(event) => {
                if (!isNaN(Number(event.target.value))) {
                  setNumero(event.target.value);
                }
              }}
            />
            <TextField
              size="small"
              placeholder="Bairro"
              value={bairro}
              onChange={(event) => {
                setBairro(event.target.value);
              }}
            />
            <TextField
              size="small"
              placeholder="CEP"
              value={cep}
              onChange={(event) => {
                if (!isNaN(Number(event.target.value)) && event.target.value.length <= 8) {
                  setCep(event.target.value);
                }
              }}
            />
          </Box>
          <Box display="flex" flexDirection="row" gap={2}>
            <TextField
              placeholder="Complemento"
              value={complemento}
              onChange={(event) => {
                if (event.target.value.length <= TAMANHO_MAXIMO_COMPLEMENTO) {
                  setComplemento(event.target.value);
                }
              }}
              fullWidth
              multiline
              maxRows={4}
            />
          </Box>
          <Box display="flex" flexDirection="row">
            <Button
              variant="contained"
              fullWidth
              onClick={() => {
                // Faz o submit, roteia para fora da página.

                navigate('/');
              }}
            >
              Solicitar Descarte
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

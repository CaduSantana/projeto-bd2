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

  const TAMANHO_MAXIMO_RUA = 45;
  const TAMANHO_MAXIMO_NUMERO = 5;
  const TAMANHO_MAXIMO_BAIRRO = 45;
  const TAMANHO_MAXIMO_CEP = 8;
  const TAMANHO_MAXIMO_COMPLEMENTO = 280;

  return (
    <Modal
      open={modalEnderecoAberto.value}
      onClose={() => modalEnderecoAberto.setValue(false)}
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
        <Box display='flex' flexDirection='column' gap={2} component='form'>
          <Box display='flex' flexDirection='row' gap={2}>
            <Select
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
          <Box display='flex' flexDirection='row' gap={2}>
            <TextField
              size='small'
              label='Rua, Passeio, Logradouro'
              required
              value={rua}
              onChange={(event) => {
                if (event.target.value.length <= TAMANHO_MAXIMO_RUA) {
                  setRua(event.target.value);
                }
              }}
              error={rua.length === 0}
            />
            <TextField
              size='small'
              label='Número'
              value={numero}
              onChange={(event) => {
                if (!isNaN(Number(event.target.value)) && event.target.value.length <= TAMANHO_MAXIMO_NUMERO) {
                  setNumero(event.target.value);
                }
              }}
            />
            <TextField
              size='small'
              label='Bairro'
              required
              value={bairro}
              onChange={(event) => {
                if (event.target.value.length <= TAMANHO_MAXIMO_BAIRRO) {
                  setBairro(event.target.value);
                }
              }}
              error={bairro.length === 0}
            />
            <TextField
              size='small'
              label='CEP'
              value={cep}
              onChange={(event) => {
                if (!isNaN(Number(event.target.value)) && event.target.value.length <= TAMANHO_MAXIMO_CEP) {
                  setCep(event.target.value);
                }
              }}
              error={cep.length > 0 && cep.length < TAMANHO_MAXIMO_CEP}
            />
          </Box>
          <Box display='flex' flexDirection='row' gap={2}>
            <TextField
              label='Complemento'
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
          <Box display='flex' flexDirection='row'>
            <Button
              variant='contained'
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

import { Box, Button, MenuItem, Modal, Paper, Select, TextField, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { IMunicipio, IUF } from '../../../shared/interfaces';
import MunicipiosService from '../../../shared/services/api/enderecos/MunicipiosService';
import UfsService from '../../../shared/services/api/enderecos/UfsService';

interface IModalEnderecoProps {
  open: boolean;
  onClose: () => void;
  onClickConfirm: (
    ufId: number,
    muicipioId: number,
    rua: string,
    numero: number,
    bairro: string,
    cep: number,
    complemento: string
  ) => void;
}

export const ModalEndereco: React.FC<IModalEnderecoProps> = ({ open, onClose, onClickConfirm }) => {
  const theme = useTheme();

  // Estados de carregamento de dados
  const [ufs, setUfs] = useState<IUF[]>([]);
  const [municipios, setMunicipios] = useState<IMunicipio[]>([]);
  // Estados do formulário
  const [ufIdSelecionada, setUfIdSelecionada] = useState<number>(1);
  const [municipioIdSelecionada, setMunicipioIdSelecionada] = useState<number>(1);
  const [rua, setRua] = useState<string>('');
  const [numero, setNumero] = useState<string>('');
  const [bairro, setBairro] = useState<string>('');
  const [cep, setCep] = useState<string>('');
  const [complemento, setComplemento] = useState<string>('');

  // Carrega todas as UFs
  useEffect(() => {
    UfsService.getAllUfs().then((ufs) => {
      if (ufs instanceof Error) {
        return;
      }

      setUfs(ufs);
      setUfIdSelecionada(ufs[0].id_uf);
    });
  }, []);

  // Atualiza municipios sempre que a UF selecionada mudar
  useEffect(() => {
    MunicipiosService.getAllMunicipiosByUfId(ufIdSelecionada).then((municipios) => {
      if (municipios instanceof Error) {
        return;
      }

      setMunicipios(municipios);
    });
  }, [ufIdSelecionada]);

  // Tamanhos máximos de campos
  const TAMANHO_MAXIMO_RUA = 45;
  const TAMANHO_MAXIMO_NUMERO = 5;
  const TAMANHO_MAXIMO_BAIRRO = 45;
  const TAMANHO_MAXIMO_CEP = 8;
  const TAMANHO_MAXIMO_COMPLEMENTO = 280;

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
        <Box display='flex' flexDirection='column' gap={2} component='form'>
          <Box display='flex' flexDirection='row' gap={2}>
            <Select
              value={ufIdSelecionada}
              onChange={(e) => {
                setUfIdSelecionada(e.target.value as number);
              }}
              fullWidth
            >
              {ufs.map((uf) => (
                <MenuItem key={uf.id_uf} value={uf.id_uf}>
                  {uf.nome}
                </MenuItem>
              ))}
            </Select>

            <Select
              value={municipioIdSelecionada}
              onChange={(e) => {
                setMunicipioIdSelecionada(e.target.value as number);
              }}
              fullWidth
            >
              {municipios.map((municipio) => (
                <MenuItem key={municipio.id} value={municipio.id}>
                  {municipio.nome}
                </MenuItem>
              ))}
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
              onClick={function () {
                onClickConfirm(
                  ufIdSelecionada,
                  municipioIdSelecionada,
                  rua,
                  parseInt(numero),
                  bairro,
                  parseInt(cep),
                  complemento
                );
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

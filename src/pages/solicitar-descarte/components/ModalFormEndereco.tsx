import { Box, Button, MenuItem, Modal, Paper, Select, TextField, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { IMunicipio, IUF } from '../../../shared/interfaces';
import EnderecosService from '../../../shared/services/api/enderecos/EnderecosService';
import { useSolicitarDescarteContext } from '../SolicitarDescarteContext';

interface EnderecoIn {
  rua: string;
  numero: number;
  complemento: string;
  bairro: string;
  cep: string;
  uuid_pessoa: string;
  municipiosId_municipio: number;
}

export const ModalFormEndereco: React.FC = () => {
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
  // Estados do context
  const { modalEnderecoAberto, snackbar } = useSolicitarDescarteContext();

  // Carrega todas as UFs
  useEffect(() => {
    EnderecosService.getAllUfs().then((ufs) => {
      if (ufs instanceof Error) {
        return;
      }

      setUfs(ufs);
      setUfIdSelecionada(ufs[0].id_uf);
    });
  }, []);

  // Atualiza municipios sempre que a UF selecionada mudar
  useEffect(() => {
    EnderecosService.getAllMunicipiosByUfId(ufIdSelecionada).then((municipios) => {
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
              onClick={() => {
                modalEnderecoAberto.setValue(false);
                snackbar.tipo.setValue('success');
                snackbar.mensagem.setValue('Solicitação de descarte realizada com sucesso!');
                snackbar.aberto.setValue(true);
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

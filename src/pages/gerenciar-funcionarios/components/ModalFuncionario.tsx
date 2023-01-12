import { Box, Button, Modal, Paper, TextField, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { IPessoa } from '../../../shared/services/api';

interface IModalEditarVeiculoProps {
  open: boolean;
  onClose: () => void;
  action: 'create' | 'edit';
  funcionario?: IPessoa;
}

// TODO funções que realizam escrita e edição no Banco de Dados, devem ser transportadas para PessoasService posteriormente.
function adicionarFuncionario(nome: string, sobrenome: string, cpf: string, email: string) {
  return;
}
function editarFuncionario(uuid: string, nome: string, sobrenome: string, cpf: string, email: string) {
  return;
}

export const ModalFuncionario: React.FC<IModalEditarVeiculoProps> = ({ open, onClose, action, funcionario }) => {
  const theme = useTheme();

  const [nome, setNome] = useState<string>('');
  const [sobrenome, setSobrenome] = useState<string>('');
  const [cpf, setCpf] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  useEffect(() => {
    if (funcionario) {
      setNome(funcionario.nome);
      setSobrenome(funcionario.sobrenome);
      setCpf(funcionario.cpf);
      setEmail(funcionario.email);
    } else {
      setNome('');
      setSobrenome('');
      setCpf('');
      setEmail('');
    }
  }, [funcionario]);

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
              placeholder='Nome'
              value={nome}
              onChange={(e) => {
                setNome(e.target.value);
              }}
            />
            <TextField
              size='small'
              placeholder='Sobrenome'
              value={sobrenome}
              onChange={(e) => {
                setSobrenome(e.target.value);
              }}
            />
            <TextField
              size='small'
              placeholder='CPF'
              value={cpf}
              onChange={(e) => {
                setCpf(e.target.value);
              }}
            />
            <TextField
              size='small'
              placeholder='Email'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </Box>
          <Box display='flex' flexDirection='row' gap={2}>
            <Button
              variant='contained'
              onClick={() => {
                if (action === 'create') {
                  // TODO lógica de geração do UUID: banco ou local?
                  adicionarFuncionario(nome, sobrenome, cpf, email);
                } else {
                  if (!funcionario) return;
                  editarFuncionario(funcionario.uuid, nome, sobrenome, cpf, email);
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

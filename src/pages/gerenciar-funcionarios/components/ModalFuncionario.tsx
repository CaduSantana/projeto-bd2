import { Box, Button, Modal, Paper, TextField, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { IPessoa } from '../../../shared/interfaces';
import PessoasService from '../../../shared/services/api/pessoas/PessoasService';

interface IModalEditarVeiculoProps {
  open: boolean;
  onClose: () => void;
  action: 'create' | 'edit';
  afterAction: () => void;
  funcionario?: IPessoa;
}

function adicionarFuncionario(nome: string, sobrenome: string, email: string, cpf: string) {
  PessoasService.postFuncionario({
    nome,
    sobrenome,
    email,
    cpf,
    senha: '',
    is_funcionario: true,
    is_admin: false,
  });
}
function editarFuncionario(uuid: string, nome: string, sobrenome: string, email: string, cpf: string, senha: string) {
  PessoasService.putPessoa(uuid, nome, sobrenome, email, cpf, senha, true, false);
}

export const ModalFuncionario: React.FC<IModalEditarVeiculoProps> = ({
  open,
  onClose,
  action,
  afterAction,
  funcionario,
}) => {
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
                if (e.target.value.length <= 45)
                  setNome(e.target.value);
              }}
              required
              error={nome.length === 0}
            />
            <TextField
              size='small'
              placeholder='Sobrenome'
              value={sobrenome}
              onChange={(e) => {
                if (e.target.value.length <= 45)
                  setSobrenome(e.target.value);
              }}
              required
              error={sobrenome.length === 0}
            />
            <TextField
              size='small'
              placeholder='CPF'
              value={cpf}
              onChange={(e) => {
                if (e.target.value.length <= 11)
                  setCpf(e.target.value);
              }}
              required
              error={cpf.length !== 11}
            />
            <TextField
              size='small'
              placeholder='Email'
              value={email}
              onChange={(e) => {
                if (e.target.value.length <= 320)
                  setEmail(e.target.value);
              }}
              required
              error={/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email) === false}
            />
          </Box>
          <Box display='flex' flexDirection='row' gap={2}>
            <Button
              variant='contained'
              onClick={() => {
                const nomeValido = nome.length > 0;
                const sobrenomeValido = sobrenome.length > 0;
                const cpfValido = cpf.length === 11;
                const emailValido = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
                if (nomeValido && sobrenomeValido && cpfValido && emailValido) {
                  if (action === 'create') {
                    adicionarFuncionario(nome, sobrenome, email, cpf);
                  } else {
                    if (!funcionario) return;
                    editarFuncionario(funcionario.uuid, nome, sobrenome, email, cpf, funcionario.senha);
                  }
                  afterAction();
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

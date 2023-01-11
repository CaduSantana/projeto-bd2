import { Box, Button, Modal, Paper, Typography, useTheme } from '@mui/material';

interface IModalConfirmacaoProps {
  open: boolean;
  onClose: () => void;
  title: string;
  message: string;
  onConfirm: () => void;
  onDeny?: () => void;
}

export const ModalConfirmacao: React.FC<IModalConfirmacaoProps> = ({
  open = false,
  onClose,
  title = 'Confirmação',
  message = 'Deseja realmente realizar esta ação?',
  onConfirm,
  onDeny = onClose,
}) => {
  const theme = useTheme();

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
      <Box display='flex' flexDirection='column' gap={2} component={Paper} padding={theme.spacing(4)}>
        <Typography variant='h5'>{title}</Typography>
        <Typography variant='body1'>{message}</Typography>
        <Box display='flex' flexDirection='row' gap={2} alignItems='center' justifyContent='center'>
          <Button variant='contained' color='secondary' onClick={onDeny}>
            Não
          </Button>
          <Button variant='contained' color='primary' onClick={onConfirm}>
            Sim
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

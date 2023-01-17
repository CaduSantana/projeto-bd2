import { Box, Modal, Paper, useTheme } from '@mui/material';

interface ModalBaseProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const ModalWrapper: React.FC<ModalBaseProps> = ({
  open,
  onClose,
  children,
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
        {children}
      </Box>
    </Modal>
  );
};

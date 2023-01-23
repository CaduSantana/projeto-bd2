import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

interface DialogOpcoesProps {
  open: boolean;
  onClose: () => void;
  title: string;
  text: string;
  actions: {
    text: string;
    onClick: () => void;
  }[];
}

export const DialogOpcoes: React.FC<DialogOpcoesProps> = ({
  open = false,
  onClose,
  title = '',
  text = '',
  actions = [],
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{text}</DialogContent>
      <DialogActions>
        {actions.map((action) => (
          <Button key={action.text} onClick={action.onClick}>
            {action.text}
          </Button>
        ))}
      </DialogActions>
    </Dialog>
  );
};

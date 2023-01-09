import { Box, Button, Modal, Paper, TextField, useTheme } from '@mui/material';
import { useState } from 'react';
import { AutoCompleteComboBox } from '../../../../shared/components';
import { ICategoriaProduto } from '../../../../shared/services/api';

interface IModalFormNovoProdutoProps {
  aberto: boolean;
  aoFechar: () => void;
}

export const ModalFormNovoProduto: React.FC<IModalFormNovoProdutoProps> = ({ aberto, aoFechar }) => {
  const theme = useTheme();

  const listaDeCategorias: ICategoriaProduto[] = [
    { id: 1, nome: 'Categoria 1', prioridade: 1 },
    { id: 2, nome: 'Categoria 2', prioridade: 2 },
  ];

  const [textoCategoria, setTextoCategoria] = useState<string>('');
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<{
    key: string;
    label: string;
  }>();

  const handleMudarSelecao = (novaSelecaoKey: string) => {
    const novaCategoriaSelecionada = listaDeCategorias.find((categoria) => categoria.id.toString() === novaSelecaoKey);
    novaCategoriaSelecionada &&
      setCategoriaSelecionada({
        key: novaCategoriaSelecionada.id.toString(),
        label: novaCategoriaSelecionada.nome,
      });
  };

  return (
    <Modal
      open={aberto}
      onClose={aoFechar}
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
      <Box component={Paper} padding={theme.spacing(2)}>
        <Box display="flex" flexDirection="column" gap={2} component="form">
          <Box display="flex" flexDirection="row" gap={2}>
            <TextField size="small" placeholder="Nome" />
            <TextField size="small" placeholder="Descrição" />
            <TextField size="small" placeholder="Massa aproximada (g)" />
          </Box>
          <Box display="flex" flexDirection="row" gap={2}>
            <Box flex={1}>
              <AutoCompleteComboBox
                textoDaBusca={textoCategoria}
                aoMudarTextoDeBusca={setTextoCategoria}
                opcoesDeBusca={listaDeCategorias.map((categoria) => ({
                  key: categoria.id.toString(),
                  label: categoria.nome,
                }))}
                opcaoSelecionada={categoriaSelecionada}
                aoMudarSelecao={handleMudarSelecao}
              />
            </Box>

            <Button size="small" variant="contained">
              Adicionar produto
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

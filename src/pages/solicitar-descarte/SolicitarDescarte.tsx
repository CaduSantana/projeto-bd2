import { Button, Modal, Paper, TextField, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import { AutoCompleteComboBox, BarraDeSelecao } from '../../shared/components';
import { LayoutBase } from '../../shared/layouts';
import { ICategoriaProduto } from '../../shared/services/api';

interface IFormNovoProdutoProps {
  aberto: boolean;
  aoFechar: () => void;
}

const FormNovoProduto: React.FC<IFormNovoProdutoProps> = ({ aberto, aoFechar }) => {
  const theme = useTheme();

  const listaDeCategorias: ICategoriaProduto[] = [
    { id: 1, nome: 'Categoria 1', prioridade: 1 },
    { id: 2, nome: 'Categoria 2', prioridade: 2 },
  ];

  const [textoCategoria, setTextoCategoria] = useState<string>('');
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<{ key: string, label: string }>();

  const handleMudarSelecao = (novaSelecaoKey: string) => {
    const novaCategoriaSelecionada = listaDeCategorias.find((categoria) => categoria.id.toString() === novaSelecaoKey);
    novaCategoriaSelecionada && setCategoriaSelecionada({ key: novaCategoriaSelecionada.id.toString(), label: novaCategoriaSelecionada.nome });
  };

  return (
    <Modal
      open={aberto}
      onClose={aoFechar}
      component={Box}
      boxSizing='border-box'
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw'
      }}
    >
      <Box component={Paper} padding={theme.spacing(2)}>
        <Box
          display='flex' flexDirection='column' gap={2}
          component='form'>
          <Box display='flex' flexDirection='row' gap={2}>
            <TextField size='small' placeholder='Nome' />
            <TextField size='small' placeholder='Descrição' />
            <TextField size='small' placeholder='Massa aproximada (g)' />
          </Box>
          <Box display='flex' flexDirection='row' gap={2}>
            <Box flex={1}>
              <AutoCompleteComboBox
                textoDaBusca={textoCategoria}
                aoMudarTextoDeBusca={setTextoCategoria}
                opcoesDeBusca={listaDeCategorias.map((categoria) => ({ key: categoria.id.toString(), label: categoria.nome }))}
                opcaoSelecionada={categoriaSelecionada}
                aoMudarSelecao={handleMudarSelecao}
              />
            </Box>

            <Button size='small' variant='contained'>Adicionar produto</Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export const SolicitarDescarte: React.FC = () => {
  const listaDeOpcoes = [
    { key: '1', label: 'Opção 1' },
    { key: '2', label: 'Opção 2' },
    { key: '3', label: 'Opção 3' },
    { key: '4', label: 'Opção 4' },
  ];

  const [textoDeBusca, setTextoDeBusca] = useState<string>('');
  const [opcaoSelecionada, setOpcaoSelecionada] = useState<{ key: string, label: string }>();
  const [modalNovoProdutoAberto, setModalNovoProdutoAberto] = useState<boolean>(false);

  const aoMudarSelecao = (novaSelecaoKey: string) => {
    setOpcaoSelecionada(listaDeOpcoes.find((opcao) => opcao.key === novaSelecaoKey) as { key: string, label: string });
  };

  return (
    <LayoutBase
      title='Solicitar um descarte'>
      <BarraDeSelecao
        autoCompleteProps={{
          textoDaBusca: textoDeBusca,
          aoMudarTextoDeBusca: setTextoDeBusca,
          opcoesDeBusca: listaDeOpcoes,
          opcaoSelecionada: opcaoSelecionada,
          aoMudarSelecao: aoMudarSelecao,
        }}
        aoClicarEmNovo={() => setModalNovoProdutoAberto(true)}
      />

      <FormNovoProduto
        aberto={modalNovoProdutoAberto}
        aoFechar={() => setModalNovoProdutoAberto(false)}
      />
    </LayoutBase>
  );
};

import { Box, Button, Modal, Paper, TextField, useTheme } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { AutoCompleteComboBox } from '../../../shared/components';
import { ICategoriaProduto } from '../../../shared/interfaces';
import CategoriasService from '../../../shared/services/api/produtos/CategoriasService';
import ProdutosService from '../../../shared/services/api/produtos/ProdutosService';
import { useSolicitarDescarteContext } from '../SolicitarDescarteContext';

export const ModalFormNovoProduto: React.FC = () => {
  const theme = useTheme();

  // Estados de carregamento de dados
  const [listaDeCategorias, setListaDeCategorias] = useState<ICategoriaProduto[]>([]);

  // Estados de formulário, nome descricao massa
  const [nome, setNome] = useState<string>('');
  const [descricao, setDescricao] = useState<string>('');
  const [massa, setMassa] = useState<string>('');
  // Tamanhos máximos
  const TAMANHO_MAXIMO_NOME = 45;
  const TAMANHO_MAXIMO_DESCRICAO = 280;

  // Estados de componente
  const [textoCategoria, setTextoCategoria] = useState<string>('');
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<{
    key: string;
    label: string;
  }>();

  // Estados de contexto
  const {
    modalNovoProdutoAberto,
    signal: { toggle },
  } = useSolicitarDescarteContext();

  // Carregamento de dados
  useEffect(() => {
    CategoriasService.getAllCategorias().then((categorias) => {
      setListaDeCategorias(categorias);
    });
  }, []);

  // Opções de categoria
  const opcoesDeCategoria = useMemo(
    () =>
      listaDeCategorias.map((categoria) => ({
        key: categoria.id.toString(),
        label: categoria.nome,
      })),
    [listaDeCategorias]
  );

  function handleMudarSelecao(novaSelecaoKey: string) {
    const novaCategoriaSelecionada = listaDeCategorias.find((categoria) => categoria.id.toString() === novaSelecaoKey);
    novaCategoriaSelecionada &&
      setCategoriaSelecionada({
        key: novaCategoriaSelecionada.id.toString(),
        label: novaCategoriaSelecionada.nome,
      });
  }

  return (
    <Modal
      open={modalNovoProdutoAberto.value}
      onClose={() => modalNovoProdutoAberto.setValue(false)}
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
      <Box component={Paper} padding={theme.spacing(2)}>
        <Box display='flex' flexDirection='column' gap={2} component='form'>
          <Box display='flex' flexDirection='row' gap={2}>
            <TextField
              size='small'
              placeholder='Nome'
              value={nome}
              onChange={function (e) {
                if (e.target.value.length <= TAMANHO_MAXIMO_NOME) {
                  setNome(e.target.value);
                }
              }}
            />
            <TextField
              size='small'
              placeholder='Descrição'
              value={descricao}
              onChange={function (e) {
                if (e.target.value.length <= TAMANHO_MAXIMO_DESCRICAO) {
                  setDescricao(e.target.value);
                }
              }}
            />
            <TextField
              size='small'
              placeholder='Massa aproximada (g)'
              value={massa}
              onChange={function (e) {
                if (!isNaN(parseFloat(e.target.value))) {
                  setMassa(e.target.value);
                }
              }}
            />
          </Box>
          <Box display='flex' flexDirection='row' gap={2}>
            <Box flex={1}>
              <AutoCompleteComboBox
                textoDaBusca={textoCategoria}
                aoMudarTextoDeBusca={setTextoCategoria}
                opcoesDeBusca={opcoesDeCategoria}
                opcaoSelecionada={categoriaSelecionada}
                aoMudarSelecao={handleMudarSelecao}
              />
            </Box>

            <Button
              size='small'
              variant='contained'
              onClick={function () {
                ProdutosService.postProduto({
                  nome,
                  descricao,
                  massa: parseFloat(massa),
                  id_categoria: parseInt(categoriaSelecionada?.key || '0'),
                });
                toggle();
                modalNovoProdutoAberto.setValue(false);
              }}
            >
              Adicionar produto
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

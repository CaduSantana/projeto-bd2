import { Autocomplete, Box, Button, Icon, Paper, TextField, useTheme } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { IProduto } from '../../../shared/interfaces';
import ProdutosService from '../../../shared/services/api/produtos/ProdutosService';
import { useSolicitarDescarteContext } from '../SolicitarDescarteContext';

export const BarraSelecaoProdutos: React.FC = () => {
  const theme = useTheme();

  // Estados de carregamento de dados
  const [listaDeProdutos, setListaDeProdutos] = useState<IProduto[]>([]);

  // Estados de componente
  const [textoDaBusca, setTextoDaBusca] = useState('');
  const [produtoSelecionado, setProdutoSelecionado] = useState<IProduto>();

  // Estados de contexto
  const {
    produtosAdicionados,
    modalNovoProdutoAberto,
    signal: { value: signal },
  } = useSolicitarDescarteContext();

  // Carregamento de dados
  useEffect(() => {
    ProdutosService.getAllProdutos().then((produtos) => {
      setListaDeProdutos(produtos);
    });
  }, [signal]);

  // Memo de opções de busca
  const opcoesDeBusca = useMemo(
    () =>
      listaDeProdutos.map((produto) => ({
        key: produto.uuid,
        label: produto.nome,
      })),
    [listaDeProdutos]
  );

  function adicionarProdutoSelecionado() {
    // Verifica se não existe um produto selecionado
    if (!produtoSelecionado) {
      return;
    }

    // Verifica se o produto atualmente selecionado já está presente na lista
    // de produtos adicionados. Se sim, incrementa a quantidade em uma unidade.
    const indexProduto = produtosAdicionados.value.findIndex(({ produto }) => produto.uuid === produtoSelecionado.uuid);
    if (indexProduto !== -1) {
      const novoProdutosAdicionados = [...produtosAdicionados.value];
      novoProdutosAdicionados[indexProduto].quantidade += 1;
      produtosAdicionados.setValue(novoProdutosAdicionados);
    } else {
      // Caso contrário, adiciona o produto selecionado na lista de produtos adicionados
      produtosAdicionados.setValue([
        ...produtosAdicionados.value,
        {
          produto: produtoSelecionado,
          quantidade: 1,
        },
      ]);
    }
  }

  return (
    <Box
      height={theme.spacing(5)}
      padding={1}
      paddingX={2}
      display='flex'
      gap={1}
      alignItems='center'
      component={Paper}
    >
      <Box flex={1}>
        <Autocomplete
          disableClearable
          size='small'
          placeholder='Pesquisar produto'
          inputValue={textoDaBusca}
          onInputChange={(_, novoTexto) => {
            setTextoDaBusca(novoTexto);
          }}
          options={opcoesDeBusca}
          value={produtoSelecionado ? { key: produtoSelecionado.uuid, label: produtoSelecionado.nome } : undefined}
          onChange={(_, novaSelecao) => {
            const produto = listaDeProdutos.find((produto) => produto.uuid === novaSelecao?.key);
            produto ? setProdutoSelecionado(produto) : setProdutoSelecionado(listaDeProdutos[0]);
          }}
          noOptionsText='Nenhum produto encontrado'
          isOptionEqualToValue={(option, value) => option.key === value.key}
          renderInput={(params) => <TextField {...params} />}
        />
      </Box>

      <Box display='flex' justifyContent='end' gap={2}>
        <Button
          color='primary'
          variant='contained'
          disableElevation
          endIcon={<Icon>add</Icon>}
          onClick={adicionarProdutoSelecionado}
          disabled={!produtoSelecionado}
        >
          Selecionar
        </Button>

        <Button
          color='primary'
          variant='contained'
          disableElevation
          endIcon={<Icon>library_add</Icon>}
          onClick={() => modalNovoProdutoAberto.setValue(true)}
        >
          Novo
        </Button>
      </Box>
    </Box>
  );
};

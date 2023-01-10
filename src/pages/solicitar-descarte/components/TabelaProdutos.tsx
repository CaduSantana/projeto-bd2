import {
  Icon,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  useTheme,
} from '@mui/material';
import { useSolicitarDescarteContext } from '../SolicitarDescarteContext';

export const TabelaProdutos: React.FC = () => {
  const theme = useTheme();
  const { produtosAdicionados } = useSolicitarDescarteContext();

  const listaDeProdutos = [
    {
      uuid: '1',
      nome: 'Produto 1',
      descricao: 'Descrição 1',
      massa: 100,
      categoria: 'Categoria 1',
    },
    {
      uuid: '2',
      nome: 'Produto 2',
      descricao: 'Descrição 2',
      massa: 200,
      categoria: 'Categoria 2',
    },
  ];

  const cabecalho = ['Nome', 'Descrição', 'Massa aproximada (g)', 'Categoria', 'Quantidade', 'Deletar'];
  const alinhamentos: ('left' | 'right' | 'center' | 'justify' | 'inherit' | undefined)[] = [
    'left',
    'left',
    'right',
    'left',
    'right',
    'center',
  ];

  const mapProdutosAdicionadosToLinhas: () => string[][] = () => {
    return produtosAdicionados.value.map((produtoAdicionado) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const produto = listaDeProdutos.find((produto) => produto.uuid === produtoAdicionado.uuid)!;
      return [
        produto.nome,
        produto.descricao,
        produto.massa.toString(),
        produto.categoria,
        produtoAdicionado.quantidade.toString(),
      ];
    });
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {cabecalho.map((cabecalho, index) => (
              <TableCell key={index} align={alinhamentos[index]}>
                {cabecalho}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {mapProdutosAdicionadosToLinhas().map((linha, linhaIndex) => (
            <TableRow key={linhaIndex}>
              {linha.map((celula, colunaIndex) => (
                <TableCell key={colunaIndex} align={alinhamentos[colunaIndex]}>
                  {colunaIndex === 4 ? (
                    <TextField
                      size="small"
                      value={celula}
                      onChange={(event) => {
                        const novaQuantidade = parseInt(event.target.value);
                        if (novaQuantidade > 0) {
                          const novoProdutosAdicionados = [...produtosAdicionados.value];
                          novoProdutosAdicionados[linhaIndex].quantidade = novaQuantidade;
                          produtosAdicionados.setValue(novoProdutosAdicionados);
                        }
                      }}
                      sx={{
                        width: theme.spacing(10),
                      }}
                    />
                  ) : (
                    celula
                  )}
                </TableCell>
              ))}
              <TableCell align={alinhamentos[5]}>
                <IconButton onClick={() => {
                  const novoProdutosAdicionados = [...produtosAdicionados.value];
                  novoProdutosAdicionados.splice(linhaIndex, 1);
                  produtosAdicionados.setValue(novoProdutosAdicionados);
                }}>
                  <Icon>delete</Icon>
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

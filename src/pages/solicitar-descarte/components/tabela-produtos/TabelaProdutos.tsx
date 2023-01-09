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

interface ITabelaProdutosProps {
  conteudo: string[][];
  aoMudarQuantidade?: (linhaIndex: number, novaQuantidade: number) => void;
  aoClicarDeletar?: (linhaIndex: number) => void;
}

export const TabelaProdutos: React.FC<ITabelaProdutosProps> = ({ conteudo, aoMudarQuantidade, aoClicarDeletar }) => {
  const theme = useTheme();

  const cabecalho = ['Nome', 'Descrição', 'Massa aproximada (g)', 'Categoria', 'Quantidade', 'Deletar'];
  const alinhamentos: ('left' | 'right' | 'center' | 'justify' | 'inherit' | undefined)[] = [
    'left',
    'left',
    'right',
    'left',
    'right',
    'center',
  ];

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
          {conteudo.map((linha, linhaIndex) => (
            <TableRow key={linhaIndex}>
              {linha.map((celula, colunaIndex) => (
                <TableCell key={colunaIndex} align={alinhamentos[colunaIndex]}>
                  {colunaIndex === 4 ? (
                    <TextField
                      size="small"
                      value={celula}
                      onChange={(event) => aoMudarQuantidade?.(linhaIndex, parseInt(event.target.value))}
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
                <IconButton onClick={() => aoClicarDeletar?.(linhaIndex)}>
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

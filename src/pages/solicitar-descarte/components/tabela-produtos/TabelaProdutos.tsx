import {
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
}

export const TabelaProdutos: React.FC<ITabelaProdutosProps> = ({ conteudo, aoMudarQuantidade }) => {
  const theme = useTheme();

  const cabecalho = ['Nome', 'Descrição', 'Massa aproximada (g)', 'Categoria', 'Quantidade'];
  const alinhamentos: ('left' | 'right' | 'center' | 'justify' | 'inherit' | undefined)[] = [
    'left',
    'left',
    'right',
    'left',
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
                  {colunaIndex !== 4 ? (
                    celula
                  ) : (
                    <TextField
                      size="small"
                      value={celula}
                      onChange={(event) => aoMudarQuantidade?.(linhaIndex, parseInt(event.target.value))}
                      sx={{
                        width: theme.spacing(10),
                      }}
                    />
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

interface ITabelaProps {
  cabecalho: string[];
  alinhamentos: (
    | 'center'
    | 'left'
    | 'right'
    | 'justify'
    | 'inherit'
    | undefined
  )[];
  linhas: string[][];
}

export const Tabela: React.FC<ITabelaProps> = ({
  cabecalho,
  alinhamentos,
  linhas,
}) => {
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
          {linhas.map((linha, index) => (
            <TableRow key={index}>
              {linha.map((celula, index) => (
                <TableCell key={index} align={alinhamentos[index]}>
                  {celula}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

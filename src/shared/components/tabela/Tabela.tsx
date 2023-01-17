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
  useTheme,
} from '@mui/material';
import { useEffect } from 'react';

interface ITabelaProps {
  cabecalho: string[];
  alinhamentos: ('center' | 'left' | 'right' | 'justify' | 'inherit' | undefined)[];
  linhas: string[][];
  acoes?: {
    icon: string;
    funcao: (linhaIndex: number) => void;
  }[];
  bgColor?: string;
}

export const Tabela: React.FC<ITabelaProps> = ({
  cabecalho,
  alinhamentos,
  linhas,
  acoes,
  bgColor,
}) => {
  const theme = useTheme();

  useEffect(() => {
    bgColor = bgColor? bgColor : theme.palette.background.default;
  }, [theme]);

  return (
    <TableContainer component={Paper}>
      <Table bgcolor={bgColor}>
        <TableHead>
          <TableRow>
            {cabecalho.map((cabecalho, index) => (
              <TableCell key={index} align={alinhamentos[index]}>
                {cabecalho}
              </TableCell>
            ))}
            {acoes && <TableCell align='right'>Ações</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {linhas.map((linha, linhaIndex) => (
            <TableRow key={linhaIndex}>
              {linha.map((celula, index) => (
                <TableCell key={index} align={alinhamentos[index]}>
                  {celula}
                </TableCell>
              ))}
              {acoes && (
                <TableCell align='right'>
                  {acoes.map((acao, index) => (
                    <IconButton key={index} onClick={() => acao.funcao(linhaIndex)}>
                      <Icon>{acao.icon}</Icon>
                    </IconButton>
                  ))}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

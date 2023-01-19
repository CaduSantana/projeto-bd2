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

interface INovaTabelaProps {
  columns: {
    key: string;
    label: string;
  }[];
  alignments: ('center' | 'left' | 'right' | 'justify' | 'inherit' | undefined)[];
  data: {
    key: string;
    value: unknown;
  }[];
  mapper: (data: unknown) => string[];
  actions?: {
    icon: string;
    onClick: (data: unknown) => void;
    isAvailable?: (data: unknown) => boolean;
  }[];
  bgColor?: string;
}

export const NovaTabela: React.FC<INovaTabelaProps> = ({
  columns = [],
  alignments = [],
  data = [],
  mapper = () => [],
  actions = [],
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
            {columns.map(({ key, label }, index) => (
              <TableCell key={key} align={alignments[index]}>
                {label}
              </TableCell>
            ))}
            {actions && <TableCell align='right'>Ações</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(({ key: rowKey, value: rowValue }) => (
            <TableRow key={rowKey}>
              {mapper(rowValue).map((columnString, columnIndex) => (
                <TableCell key={`${rowKey},${columns[columnIndex].key}`} align={alignments[columnIndex]}>
                  {columnString}
                </TableCell>
              ))}
              {actions && (
                <TableCell align='right'>
                  {actions.map((action) => {
                    if (action.isAvailable && !action.isAvailable(rowValue)) {
                      return null;
                    }
                    return (
                      <IconButton
                        key={`${rowKey},${action.icon}`}
                        onClick={() => action.onClick(rowValue)}
                        size='small'
                      >
                        <Icon>{action.icon}</Icon>
                      </IconButton>
                    );
                  })}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

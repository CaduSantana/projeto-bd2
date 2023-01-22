import { Icon, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { useDrawerContext } from '../contexts';

interface ILayoutBaseProps {
  title: string;
  titleVariant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  children: React.ReactNode;
}

export const LayoutBase: React.FC<ILayoutBaseProps> = ({ title, titleVariant = 'h5', children }) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const { toggleDrawerOpen } = useDrawerContext();

  return (
    <Box height='100vh' display='flex' flexDirection='column' gap={1}>
      <Box padding={1} height={theme.spacing(12)} display='flex' alignItems='center' gap={1}>
        {smDown ? (
          <IconButton onClick={toggleDrawerOpen}>
            <Icon>menu</Icon>
          </IconButton>
        ) : undefined}

        {title && <Typography variant={titleVariant}>{title}</Typography>}
      </Box>

      <Box display='flex' flexDirection='column' gap={1} marginX={2} overflow='scroll' marginBottom={1}>
        {children}
      </Box>
    </Box>
  );
};

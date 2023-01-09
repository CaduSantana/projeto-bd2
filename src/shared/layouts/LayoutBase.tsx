import { Icon, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { useDrawerContext } from '../contexts';

interface ILayoutBaseProps {
  title: string;
  children: React.ReactNode;
}

export const LayoutBase: React.FC<ILayoutBaseProps> = ({ title, children }) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const { toggleDrawerOpen } = useDrawerContext();

  return (
    <Box height="100%" display="flex" flexDirection="column" gap={1}>
      <Box padding={1} height={theme.spacing(12)} display="flex" alignItems="center" gap={1}>
        {smDown ?
          (<IconButton onClick={toggleDrawerOpen}>
            <Icon>menu</Icon>
          </IconButton>) : undefined}

        <Typography variant='h5'>
          {title}
        </Typography>
      </Box>

      <Box
      display='flex' flexDirection='column' gap={1}
      marginX={2}>
        {children}
      </Box>
    </Box>
  );
};

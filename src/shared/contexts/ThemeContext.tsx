import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { ThemeProvider } from '@mui/material';

import { DarkTheme, LightTheme } from '../themes';
import { Box } from '@mui/system';

interface ThemeContextData {
  themeName: 'light' | 'dark';
  toggleTheme: () => void;
}

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeContext = createContext({} as ThemeContextData);

export const useAppThemeContext = () => {
  return useContext(ThemeContext);
};

export const AppThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const getThemeFromLocalStorage = () => {
    const themeName = localStorage.getItem('themeName');
    if (themeName === 'light' || themeName === 'dark') return themeName;
    return 'light';
  };

  const [themeName, setThemeName] = useState<'light' | 'dark'>(getThemeFromLocalStorage());
  const toggleTheme = useCallback(() => {
    setThemeName((oldThemeName) => (oldThemeName === 'light' ? 'dark' : 'light'));
    localStorage.setItem('themeName', themeName === 'light' ? 'dark' : 'light');
  }, []);

  const theme = useMemo(() => {
    if (themeName === 'light') return LightTheme;
    return DarkTheme;
  }, [themeName]);

  return (
    <ThemeContext.Provider value={{ themeName, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <Box width={'100vw'} height={'100vh'} bgcolor={theme.palette.background.default}>
          {children}
        </Box>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

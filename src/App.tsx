import { useState } from 'react';

import { Outlet } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Theme, DarkTheme } from 'styles/theme';
import { GlobalStyle, media } from 'styles';

import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient();

export default function App() {
  const [isDark, setIsDark] = useState(true);
  const toggleDarkMode = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsDark(prev => !prev);
  };
  const theme = isDark ? { ...DarkTheme, ...media } : { ...Theme, ...media };
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={true} />
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Outlet context={{ isDark, toggleDarkMode }} />
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}

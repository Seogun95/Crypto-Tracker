import { useEffect, useState } from 'react';

import { Outlet } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Theme, DarkTheme } from 'styles/theme';
import { GlobalStyle, media } from 'styles';

import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { useRecoilState, useRecoilValue } from 'recoil';
import { isDarkAtom } from 'atom';

const queryClient = new QueryClient();

export default function App() {
  const darkMode = useRecoilValue(isDarkAtom);
  const theme = darkMode ? { ...DarkTheme, ...media } : { ...Theme, ...media };

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode ? 'true' : 'false');
  }, [darkMode]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={true} />
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Outlet />
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}

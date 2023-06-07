import { Outlet } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Theme, DarkTheme } from 'styles/theme';
import { GlobalStyle } from 'styles';

import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient();

export default function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={true} />
        <ThemeProvider theme={Theme}>
          <GlobalStyle />
          <Outlet />
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}

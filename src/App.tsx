import { Outlet } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Theme, DarkTheme } from 'styles/theme';
import { GlobalStyle } from 'styles';

export default function App() {
  return (
    <>
      <ThemeProvider theme={DarkTheme}>
        <GlobalStyle />
        <Outlet />
      </ThemeProvider>
    </>
  );
}

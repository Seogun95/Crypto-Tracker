import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from 'styled-components';

const darkTheme = {
  textColor: 'whitesmoke',
  backgroundColor: '#212121',
};

const lightTheme = {
  textColor: '#212121',
  backgroundColor: 'whitesmoke',
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

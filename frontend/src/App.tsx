import './global.module.css';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from './styles/theme/light';
import { Router } from './Router';
import { GlobalStyle } from './styles/global';
import { TransfersProviderDp, TransfersProviderPix } from './contexts/TransfersContextPixDp';

export function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <BrowserRouter>
        <TransfersProviderDp>
          <TransfersProviderPix>
            <Router />
          </TransfersProviderPix>
        </TransfersProviderDp>
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  );
}

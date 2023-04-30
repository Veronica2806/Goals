import { useState } from 'react';
import {
  BrowserRouter
} from 'react-router-dom';
import AppRoutes from './routes/AppRoutes.tsx';
import { PageLayout } from 'components';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AppContext } from './tools/context';

const theme = createTheme({
  typography: {
    fontFamily: 'Montserrat',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: '600',
          fontFamily: 'Raleway'
        },
      },
    }
  }
});

function App() {
  const isAuthenticated = Boolean(localStorage.getItem('AccessToken'));
  const [context, setContext] = useState({ isAuthenticated });

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AppContext.Provider value={{ context, setContext }} >
          <PageLayout content={AppRoutes} />
        </AppContext.Provider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

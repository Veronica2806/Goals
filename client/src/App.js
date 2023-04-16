import {
  BrowserRouter
} from 'react-router-dom';
import AppRoutes from './routes/AppRoutes.tsx';
import PageLayout from './components/pageLayout/PageLayout';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <PageLayout content={AppRoutes} />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

import {
  BrowserRouter
} from 'react-router-dom';
import AppRoutes from './routes/AppRoutes.tsx';
import PageLayout from './components/pageLayout/PageLayout';

function App() {
  return (
    <BrowserRouter>
      <PageLayout content={AppRoutes} />
    </BrowserRouter>
  );
}

export default App;

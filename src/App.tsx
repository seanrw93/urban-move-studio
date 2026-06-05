import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/organisms/Layout/Layout';
import { HomePage } from './pages/HomePage/HomePage';
import { PrestationsPage } from './pages/PrestationsPage/PrestationsPage';
import { InscriptionPage } from './pages/InscriptionPage/InscriptionPage';
import './styles/main.scss';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/prestations" element={<PrestationsPage />} />
          <Route path="/inscription" element={<InscriptionPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

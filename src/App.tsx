import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Layout } from './components/organisms/Layout/Layout';
import './styles/main.scss';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const PrestationsPage = lazy(() => import('./pages/PrestationsPage/PrestationsPage'));
const InscriptionPage = lazy(() => import('./pages/InscriptionPage/InscriptionPage'));

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={null}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/prestations" element={<PrestationsPage />} />
            <Route path="/inscription" element={<InscriptionPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;

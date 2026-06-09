import { Outlet } from 'react-router-dom';
import { Navbar } from '../Navbar/Navbar';
import { Footer } from '../Footer/Footer';
import { Contact } from '../Contact/Contact';
import './Layout.scss';

export function Layout() {
  return (
    <>
      <a href="#main-content" className="layout__skip-link">
        Aller au contenu principal
      </a>
      <Navbar />
      <main id="main-content">
        <Outlet />
      </main>
      <Contact />
      <Footer />
    </>
  );
}

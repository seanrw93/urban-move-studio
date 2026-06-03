import { useState } from 'react';
import { Navbar } from './components/organisms/Navbar/Navbar';
import { Hero } from './components/organisms/Hero/Hero';
import { HowItWorks } from './components/organisms/HowItWorks/HowItWorks';
import { About } from './components/organisms/About/About';
import { Pricing } from './components/organisms/Pricing/Pricing';
import { BookingModal } from './components/organisms/BookingModal/BookingModal';
import { Testimonials } from './components/organisms/Testimonials/Testimonials';
import { Gallery } from './components/organisms/Gallery/Gallery';
import { Contact } from './components/organisms/Contact/Contact';
import { Footer } from './components/organisms/Footer/Footer';
import './styles/main.scss';

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [prefilledPackage, setPrefilledPackage] = useState<string | undefined>(undefined);

  const openBooking = (packageName?: string) => {
    setPrefilledPackage(packageName);
    setModalOpen(true);
  };

  const closeBooking = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Navbar />
      <main>
        <Hero onBooking={() => openBooking()} />
        <HowItWorks />
        <About />
        <Pricing onBook={openBooking} />
        <Testimonials />
        <Gallery />
        <Contact />
      </main>
      <Footer />
      <BookingModal
        isOpen={modalOpen}
        onClose={closeBooking}
        prefilledPackage={prefilledPackage}
      />
    </>
  );
}

export default App;

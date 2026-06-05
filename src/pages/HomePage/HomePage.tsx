import { useState } from 'react';
import { Hero } from '../../components/organisms/Hero/Hero';
import { HowItWorks } from '../../components/organisms/HowItWorks/HowItWorks';
import { About } from '../../components/organisms/About/About';
import { Pricing } from '../../components/organisms/Pricing/Pricing';
import { Testimonials } from '../../components/organisms/Testimonials/Testimonials';
import { Gallery } from '../../components/organisms/Gallery/Gallery';
import { Contact } from '../../components/organisms/Contact/Contact';
import { JotformModal } from '../../components/organisms/JotformModal/JotformModal';

export function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedForfait, setSelectedForfait] = useState<string | undefined>();

  const handleReserver = (forfait: string) => {
    setSelectedForfait(forfait);
    setIsModalOpen(true);
  };

  return (
    <main>
      <Hero />
      <HowItWorks />
      <About />
      <Pricing onReserver={handleReserver} />
      <Testimonials />
      <Gallery />
      <Contact />
      <JotformModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedForfait(undefined);
        }}
        selectedForfait={selectedForfait}
      />
    </main>
  );
}

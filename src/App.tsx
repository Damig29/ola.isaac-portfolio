import { useState, useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LenisContext } from './context/LenisContext';

// GSAP registration moved to main.tsx

// Import components
import { LoadingScreen } from './components/LoadingScreen';
import { CustomCursor } from './components/CustomCursor';
import { Navigation } from './components/Navigation';
import { FluidBackground } from './components/FluidBackground';

// Import hooks
import { useLenis } from './hooks/useLenis';

// Import sections
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Work } from './sections/Work';
import { Skills } from './sections/Skills';
import { Testimonials } from './sections/Testimonials';
import { Contact } from './sections/Contact';

import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const lenisRef = useLenis();

  useEffect(() => {
    ScrollTrigger.defaults({
      toggleActions: 'play none none none',
    });
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const refresh = () => ScrollTrigger.refresh();
    const timer = setTimeout(refresh, 500);
    
    // Create a ResizeObserver to watch for any layout shifts (e.g. late image loads)
    // that would push the ScrollTrigger markers out of sync.
    const resizeObserver = new ResizeObserver(() => {
      ScrollTrigger.refresh();
    });
    resizeObserver.observe(document.body);
    window.addEventListener('load', refresh);

    return () => {
      clearTimeout(timer);
      resizeObserver.disconnect();
      window.removeEventListener('load', refresh);
    };
  }, [isLoading]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <LenisContext.Provider value={lenisRef}>
      {/* Loading Screen */}
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

      <CustomCursor />

      <Navigation />

      <FluidBackground />

      <div className="noise-overlay" />

      <main className="relative">
        <Hero />
        <About />
        <Work />
        <Skills />
        <Testimonials />
        <Contact />
      </main>
    </LenisContext.Provider>
  );
}

export default App;

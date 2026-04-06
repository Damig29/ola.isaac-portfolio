import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Check for touch device - disable Lenis on mobile for better performance
    const isTouch = window.matchMedia('(pointer: coarse)').matches;

    if (isTouch) {
      // Still need to refresh ScrollTrigger on mobile
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value) {
        if (arguments.length) {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: document.documentElement.style.transform ? 'transform' : 'fixed',
    });

    const onStRefresh = () => lenis.resize();
    ScrollTrigger.addEventListener('refresh', onStRefresh);

    lenis.on('scroll', ScrollTrigger.update);

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(raf);

    gsap.ticker.lagSmoothing(0);

    // Add lenis class to html element
    document.documentElement.classList.add('lenis', 'lenis-smooth');

    // Refresh ScrollTrigger on resize to handle layout shifts
    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      ScrollTrigger.removeEventListener('refresh', onStRefresh);
      ScrollTrigger.scrollerProxy(document.documentElement);
      lenis.destroy();
      window.removeEventListener('resize', handleResize);
      document.documentElement.classList.remove('lenis', 'lenis-smooth');
      gsap.ticker.remove(raf);
    };
  }, []);

  return lenisRef;
}

export default useLenis;

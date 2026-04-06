import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ChevronDown } from 'lucide-react';

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const charsRef = useRef<HTMLSpanElement[]>([]);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  const [scrollProgress, setScrollProgress] = useState(0);

  // Native scrub logic entirely replacing GSAP ScrollTrigger
  useEffect(() => {
    const handleScroll = () => {
      // Map the first 50vh (half screen) of scrolling to a 0-1 progress scalar
      const maxScroll = window.innerHeight * 0.5;
      const currentScroll = Math.max(0, window.scrollY);
      const progress = Math.min(currentScroll / maxScroll, 1);
      
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on mount to handle situations where user refreshes mid-page
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const subheading = subheadingRef.current;
    const scrollIndicator = scrollIndicatorRef.current;
    const chars = charsRef.current;

    if (!section || !subheading || !scrollIndicator || chars.length === 0) return;

    const ctx = gsap.context(() => {
      // Initial reveal animation (only triggered once, purely visually)
      const revealTl = gsap.timeline({ delay: 0.1 });

      revealTl
        .fromTo(
          chars,
          {
            y: 150,
            opacity: 0,
            rotateX: -90,
          },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1.2,
            stagger: 0.05,
            ease: 'power4.out',
          }
        )
        .fromTo(
          subheading,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
          '-=0.5'
        )
        .fromTo(
          scrollIndicator,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
          '-=0.3'
        );
    }, section);

    return () => ctx.revert();
  }, []);

  const headingText = 'OLA.ISAAC';

  // Compute transform styles natively without ScrollTrigger logic fighting GSAP Context
  const scrubOpacity = Math.max(0, 1 - scrollProgress * 1.5);
  const scrubScale = 1 + scrollProgress * 1.5;
  const scrubSubY = -(scrollProgress * 50);

  return (
    // Outer container defines the physical scrolling space (pinned height)
    <div className="h-[150vh]">
      {/* Sticky section acts as the native Pin */}
      <section
        id="hero"
        ref={sectionRef}
        className="sticky top-0 flex flex-col items-center justify-center h-screen relative z-10 overflow-hidden"
      >
        <div 
          className="relative z-10 text-center px-4 max-w-[100vw] will-change-transform"
          style={{ 
            opacity: scrubOpacity, 
            transform: `scale(${scrubScale})`,
          }}
        >
          <h1
            className="brutalist-heading text-hero text-white mb-6 hero-display-text whitespace-nowrap"
            style={{ perspective: '1000px' }}
          >
            {headingText.split('').map((char, i) => (
              <span
                key={i}
                ref={(el) => {
                  if (el) charsRef.current[i] = el;
                }}
                className="inline-block hero-heading-char"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {char}
              </span>
            ))}
          </h1>

          <p
            ref={subheadingRef}
            className="text-xl md:text-2xl text-white/60 font-light tracking-wide will-change-transform"
            style={{ transform: `translateY(${scrubSubY}px)` }}
          >
            Full Stack Developer & Graphic Designer
          </p>
        </div>

        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 will-change-transform"
          style={{ opacity: scrubOpacity }}
        >
          <span className="text-xs text-white/40 uppercase tracking-widest">
            Scroll to Explore
          </span>
          <div className="animate-bounce">
            <ChevronDown className="w-5 h-5 text-white/40" />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Hero;

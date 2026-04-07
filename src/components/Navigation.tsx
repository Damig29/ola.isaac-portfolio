import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Menu, X, Download } from 'lucide-react';
import { useLenisInstance } from '../context/LenisContext';
import { scrollToHashAnchor, scrollToTop } from '../utils/scrollToHash';

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Skills', href: '#skills' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

export function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const lenisRef = useLenisInstance();
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);

  const linksContainerRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });

  useEffect(() => {
    const updateIndicator = () => {
      if (!linksContainerRef.current) return;
      if (!activeSection || activeSection === 'hero') {
        setIndicatorStyle(prev => ({ ...prev, opacity: 0 }));
        return;
      }

      const activeLink = linksContainerRef.current.querySelector(
        `a[href="#${activeSection}"]`
      ) as HTMLElement;
      
      if (activeLink) {
        setIndicatorStyle({
          left: activeLink.offsetLeft,
          width: activeLink.offsetWidth,
          opacity: 1,
        });
      } else {
        setIndicatorStyle(prev => ({ ...prev, opacity: 0 }));
      }
    };

    // Use a tiny delay to ensure font/layout is ready on mount
    setTimeout(updateIndicator, 50);
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [activeSection]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the most visible section
        const visibleSections = entries.filter((entry) => entry.isIntersecting);
        if (visibleSections.length > 0) {
          // Sort by intersection ratio to find the most prominent one
          visibleSections.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
          setActiveSection(visibleSections[0].target.id);
        }
      },
      {
        root: null,
        rootMargin: '-20% 0px -40% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    const sectionIds = ['hero', 'about', 'work', 'skills', 'testimonials', 'contact'];
    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      } else {
        // Fallback retry if DOM is slow
        setTimeout(() => {
          const delayedElement = document.getElementById(id);
          if (delayedElement) observer.observe(delayedElement);
        }, 500);
      }
    });

    return () => observer.disconnect();
  }, []);

  // Lenis drives scroll on desktop; ST.scroll() + scrollerProxy + Hero pin can disagree — read lenis.scroll instead
  useEffect(() => {
    const readY = () => {
      const lenis = lenisRef?.current;
      return lenis != null ? lenis.scroll : window.scrollY;
    };

    const updateVisible = () => {
      const y = readY();
      setIsVisible(y > 72);
    };

    let detach: (() => void) | undefined;

    const attach = () => {
      updateVisible();
      const lenis = lenisRef?.current;
      if (lenis) {
        lenis.on('scroll', updateVisible);
        detach = () => lenis.off('scroll', updateVisible);
      } else {
        window.addEventListener('scroll', updateVisible, { passive: true });
        detach = () => window.removeEventListener('scroll', updateVisible);
      }
    };

    requestAnimationFrame(() => {
      requestAnimationFrame(attach);
    });

    return () => {
      detach?.();
    };
  }, [lenisRef]);

  useLayoutEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    gsap.set(nav, { y: -100, opacity: 0 });
  }, []);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    gsap.to(nav, {
      y: isVisible ? 0 : -100,
      opacity: isVisible ? 1 : 0,
      duration: 0.5,
      ease: 'power3.out',
    });
  }, [isVisible]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    scrollToHashAnchor(href, lenisRef?.current);
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 will-change-transform ${
          isVisible ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        aria-hidden={!isVisible}
      >
        <div className="mx-4 mt-4">
          <div className="glass rounded-full px-6 py-3 flex items-center justify-between max-w-4xl mx-auto">
            {/* Logo */}
            <a
              href="#"
              className={`text-lg font-bold tracking-tight transition-all duration-500 ${
                activeSection === 'hero' ? 'text-cyber drop-shadow-[0_0_10px_rgba(0,255,157,0.5)]' : 'text-white'
              }`}
              onClick={(e) => {
                e.preventDefault();
                setMobileOpen(false);
                scrollToTop(lenisRef?.current);
              }}
              data-cursor-hover
              data-cursor-scale="1.5"
            >
              OLA.ISAAC
            </a>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-1 relative" ref={linksContainerRef}>
              {/* Sliding Border Indicator */}
              <div
                className="absolute bottom-0 h-[2px] bg-cyber rounded-full transition-all duration-500 ease-out"
                style={{
                  left: indicatorStyle.left,
                  width: indicatorStyle.width,
                  opacity: indicatorStyle.opacity,
                  transform: 'translateY(-4px)' // Match padding/alignment of links
                }}
              />
              
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={`
                      relative px-4 py-2 text-sm font-medium
                      transition-all duration-300
                      ${isActive ? 'text-white text-shadow-sm' : 'text-white/50 hover:text-white'}
                    `}
                    data-cursor-hover
                    data-cursor-scale="1.5"
                  >
                    {link.label}
                  </a>
                );
              })}
            </div>

            {/* Desktop CTAs */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href="/images/CV.docx"
                download="Ola_Isaac_CV.docx"
                className="
                  flex items-center gap-2 px-4 py-2 rounded-full
                  border border-white/20 text-white/70 text-sm font-medium
                  hover:border-cyber hover:text-cyber
                  transition-all duration-300
                "
                data-cursor-hover
                data-cursor-scale="1.5"
              >
                <Download className="w-3.5 h-3.5" />
                Download CV
              </a>
              <a
                href="#contact"
                onClick={(e) => handleLinkClick(e, '#contact')}
                className="
                  px-4 py-2 rounded-full
                  bg-white/10 text-white text-sm font-medium
                  hover:bg-cyber hover:text-void
                  transition-all duration-300
                "
                data-cursor-hover
                data-cursor-scale="1.5"
              >
                Let&apos;s Talk
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              type="button"
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors duration-300"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`
          fixed inset-0 z-40 flex flex-col
          bg-void/95 backdrop-blur-2xl
          transition-all duration-500
          ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
      >
        <div className="flex flex-col items-center justify-center flex-1 gap-6 px-8">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-4xl font-black text-white/80 hover:text-cyber transition-colors duration-300 uppercase tracking-tight"
              style={{ transitionDelay: mobileOpen ? `${i * 60}ms` : '0ms' }}
            >
              {link.label}
            </a>
          ))}

          <div className="mt-8 flex flex-col items-center gap-4 w-full max-w-xs">
            <a
              href="/images/CV.pdf"
              download="Ola_Isaac_CV.pdf"
              className="
                w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full
                border border-white/20 text-white/70 text-sm font-medium
                hover:border-cyber hover:text-cyber
                transition-all duration-300
              "
            >
              <Download className="w-4 h-4" />
              Download CV
            </a>
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              className="
                w-full flex items-center justify-center px-6 py-3 rounded-full
                bg-cyber text-void text-sm font-semibold
                hover:bg-white transition-all duration-300
              "
            >
              Let&apos;s Talk
            </a>
          </div>
        </div>

        <div className="py-6 text-center text-white/20 text-xs">
          © {new Date().getFullYear()} OLA.ISAAC
        </div>
      </div>
    </>
  );
}

export default Navigation;

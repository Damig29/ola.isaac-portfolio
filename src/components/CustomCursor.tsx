import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface CursorState {
  isHovering: boolean;
  hoverText: string;
  hoverScale: number;
}

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [cursorState, setCursorState] = useState<CursorState>({
    isHovering: false,
    hoverText: '',
    hoverScale: 1,
  });
  const mousePos = useRef({ x: 0, y: 0 });
  const isTouch = useRef(false);

  useEffect(() => {
    // Check for touch device
    isTouch.current = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch.current) return;

    // Add cursor-hidden class to body
    document.body.classList.add('cursor-hidden');

    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    if (!cursor || !cursorDot) return;

    // Set initial position off-screen
    gsap.set([cursor, cursorDot], { xPercent: -50, yPercent: -50 });

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      
      // Fast follow for dot
      gsap.to(cursorDot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.08,
        ease: 'power2.out',
      });

      // Slower, smoother follow for outer cursor
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: 'power2.out',
      });
    };

    const handleMouseEnter = () => {
      gsap.to([cursor, cursorDot], { opacity: 1, duration: 0.3 });
    };

    const handleMouseLeave = () => {
      gsap.to([cursor, cursorDot], { opacity: 0, duration: 0.3 });
    };

    // Handle hover states
    const handleElementHover = (e: Event) => {
      const target = e.target as HTMLElement;
      const hoverText = target.dataset.cursorText || '';
      const hoverScale = parseFloat(target.dataset.cursorScale || '2.5');
      
      setCursorState({
        isHovering: true,
        hoverText,
        hoverScale,
      });

      gsap.to(cursor, {
        scale: hoverScale,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleElementLeave = () => {
      setCursorState({
        isHovering: false,
        hoverText: '',
        hoverScale: 1,
      });

      gsap.to(cursor, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Add hover listeners to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [data-cursor-hover]');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleElementHover);
      el.addEventListener('mouseleave', handleElementLeave);
    });

    // MutationObserver to handle dynamically added elements
    const observer = new MutationObserver(() => {
      const newElements = document.querySelectorAll('a, button, [data-cursor-hover]');
      newElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleElementHover);
        el.removeEventListener('mouseleave', handleElementLeave);
        el.addEventListener('mouseenter', handleElementHover);
        el.addEventListener('mouseleave', handleElementLeave);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.body.classList.remove('cursor-hidden');
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleElementHover);
        el.removeEventListener('mouseleave', handleElementLeave);
      });
      observer.disconnect();
    };
  }, []);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      {/* Outer cursor ring */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{ opacity: 0 }}
      >
        <div
          className={`
            relative flex items-center justify-center
            w-8 h-8 rounded-full
            border border-white/80
            transition-all duration-300
            ${cursorState.isHovering ? 'bg-white/10' : 'bg-transparent'}
          `}
        >
          {cursorState.hoverText && (
            <span className="text-[8px] font-medium text-white uppercase tracking-wider whitespace-nowrap">
              {cursorState.hoverText}
            </span>
          )}
        </div>
      </div>

      {/* Inner cursor dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{ opacity: 0 }}
      >
        <div className="w-1 h-1 rounded-full bg-white" />
      </div>
    </>
  );
}

export default CustomCursor;

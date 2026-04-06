import { useRef, useEffect, type ReactNode } from 'react';
import gsap from 'gsap';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
  href?: string;
  cursorText?: string;
  cursorScale?: string;
}

export function MagneticButton({
  children,
  className = '',
  strength = 0.5,
  onClick,
  href,
  cursorText = 'View',
  cursorScale = '3',
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const contentRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    const content = contentRef.current;
    if (!button || !content) return;

    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      gsap.to(button, {
        x: deltaX,
        y: deltaY,
        duration: 0.3,
        ease: 'power2.out',
      });

      gsap.to(content, {
        x: deltaX * 0.3,
        y: deltaY * 0.3,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)',
      });

      gsap.to(content, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)',
      });
    };

    button.addEventListener('mousemove', handleMouseMove as EventListener);
    button.addEventListener('mouseleave', handleMouseLeave as EventListener);

    return () => {
      button.removeEventListener('mousemove', handleMouseMove as EventListener);
      button.removeEventListener('mouseleave', handleMouseLeave as EventListener);
    };
  }, [strength]);

  const baseClasses = `
    magnetic-button relative inline-flex items-center justify-center
    px-8 py-4 rounded-full
    bg-white text-void font-medium
    overflow-hidden
    transition-colors duration-300
    hover:bg-cyber hover:text-void
    ${className}
  `;

  const content = (
    <span ref={contentRef} className="relative z-10 flex items-center gap-2">
      {children}
    </span>
  );

  if (href) {
    return (
      <a
        ref={buttonRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={baseClasses}
        data-cursor-hover
        data-cursor-text={cursorText}
        data-cursor-scale={cursorScale}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={buttonRef as React.RefObject<HTMLButtonElement>}
      onClick={onClick}
      className={baseClasses}
      data-cursor-hover
      data-cursor-text={cursorText}
      data-cursor-scale={cursorScale}
    >
      {content}
    </button>
  );
}

export default MagneticButton;

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const text = textRef.current;
    const progressBar = progressRef.current;
    if (!container || !text || !progressBar) return;

    // Animate progress
    const progressObj = { value: 0 };
    gsap.to(progressObj, {
      value: 100,
      duration: 2,
      ease: 'power2.inOut',
      onUpdate: () => {
        setProgress(Math.round(progressObj.value));
      },
      onComplete: () => {
        // Exit animation
        const tl = gsap.timeline({
          onComplete: () => {
            onComplete();
          },
        });

        tl.to(text, {
          y: -50,
          opacity: 0,
          duration: 0.5,
          ease: 'power2.in',
        })
          .to(
            progressBar,
            {
              scaleX: 0,
              transformOrigin: 'center',
              duration: 0.5,
              ease: 'power2.in',
            },
            '-=0.3'
          )
          .to(
            container,
            {
              clipPath: 'inset(50% 0% 50% 0%)',
              duration: 0.8,
              ease: 'power3.inOut',
            },
            '-=0.2'
          );
      },
    });

    // Character animation for text
    const chars = text.querySelectorAll('.char');
    gsap.fromTo(
      chars,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.05,
        ease: 'power3.out',
        delay: 0.2,
      }
    );
  }, [onComplete]);

  const text = 'OLA.ISAAC';

  return (
    <div
      ref={containerRef}
      className="loading-screen"
      style={{ clipPath: 'inset(0% 0% 0% 0%)' }}
    >
      <div className="flex flex-col items-center gap-8">
        {/* Logo text */}
        <div
          ref={textRef}
          className="brutalist-heading text-hero text-white overflow-hidden whitespace-nowrap"
        >
          {text.split('').map((char, i) => (
            <span key={i} className="char inline-block">
              {char}
            </span>
          ))}
        </div>

        {/* Progress bar */}
        <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
          <div
            ref={progressRef}
            className="h-full bg-cyber rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Progress text */}
        <div className="text-sm text-white/50 font-mono">
          {progress}%
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;

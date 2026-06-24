import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

/**
 * Loader — Premium loading screen with animated logo and progress bar.
 * Fades out and reveals page content via GSAP timeline.
 */
export default function Loader({ onComplete }) {
  const loaderRef = useRef(null);
  const barRef = useRef(null);
  const logoRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        // Exit animation
        gsap.to(loaderRef.current, {
          opacity: 0,
          scale: 1.05,
          duration: 0.6,
          ease: 'power2.inOut',
          onComplete: () => {
            if (loaderRef.current) {
              loaderRef.current.style.display = 'none';
            }
            onComplete?.();
          },
        });
      },
    });

    // Logo entrance
    tl.from(logoRef.current, {
      scale: 0.8,
      opacity: 0,
      duration: 0.6,
      ease: 'back.out(1.7)',
    });

    // Progress bar fill
    tl.to(barRef.current, {
      width: '100%',
      duration: 1.6,
      ease: 'power2.inOut',
      onUpdate: function () {
        setProgress(Math.round(this.progress() * 100));
      },
    }, '-=0.2');

    return () => tl.kill();
  }, [onComplete]);

  return (
    <div ref={loaderRef} className="loader-screen">
      {/* Logo */}
      <div ref={logoRef} className="flex items-center gap-3">
        <div className="relative w-10 h-10">
          <div
            className="absolute inset-0 rounded-lg"
            style={{
              background: 'linear-gradient(135deg, #4f7df7, #8b5cf6)',
            }}
          />
          <div className="absolute inset-[3px] rounded-[5px] bg-bg-primary" />
          <div
            className="absolute inset-[6px] rounded-[4px]"
            style={{
              background: 'linear-gradient(135deg, #4f7df7, #8b5cf6)',
              opacity: 0.6,
            }}
          />
        </div>
        <span
          className="text-xl font-bold tracking-tight"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          NexusForge
        </span>
      </div>

      {/* Progress */}
      <div className="flex flex-col items-center gap-3">
        <div className="loader-bar-track">
          <div ref={barRef} className="loader-bar-fill" />
        </div>
        <span className="text-xs text-text-muted font-mono tracking-widest">
          {progress}%
        </span>
      </div>
    </div>
  );
}

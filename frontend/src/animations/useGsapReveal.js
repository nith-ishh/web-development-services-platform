import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Custom hook: Fade-in + slide reveal on scroll via GSAP ScrollTrigger.
 * @param {Object} options
 * @param {string} options.direction - 'up' | 'down' | 'left' | 'right'
 * @param {number} options.delay - Delay before animation starts
 * @param {number} options.duration - Animation duration
 * @param {number} options.distance - Pixels to translate from
 * @param {string} options.start - ScrollTrigger start position
 */
export function useGsapReveal({
  direction = 'up',
  delay = 0,
  duration = 1,
  distance = 60,
  start = 'top 85%',
} = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const axis = direction === 'up' || direction === 'down' ? 'y' : 'x';
    const sign = direction === 'down' || direction === 'right' ? -1 : 1;

    gsap.set(el, { opacity: 0, [axis]: sign * distance });

    const tween = gsap.to(el, {
      opacity: 1,
      [axis]: 0,
      duration,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: 'play none none none',
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [direction, delay, duration, distance, start]);

  return ref;
}

export default useGsapReveal;

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Custom hook: Animates a number from 0 to target when element scrolls into view.
 * @param {number} target - The final number to count up to
 * @param {number} duration - Animation duration in seconds
 * @param {string} suffix - Optional suffix (e.g., '+', '%')
 */
export function useCountUp(target, duration = 2, suffix = '') {
  const ref = useRef(null);
  const [display, setDisplay] = useState('0' + suffix);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obj = { val: 0 };

    const tween = gsap.to(obj, {
      val: target,
      duration,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
      onUpdate: () => {
        setDisplay(Math.round(obj.val) + suffix);
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [target, duration, suffix]);

  return { ref, display };
}

export default useCountUp;

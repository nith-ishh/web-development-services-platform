import { useRef, useEffect } from 'react';
import VanillaTilt from 'vanilla-tilt';

/**
 * Custom hook: Attaches a 3D tilt effect to an element.
 * @param {Object} options - vanilla-tilt options
 */
export function useTilt(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Don't apply on touch devices
    if (window.matchMedia('(hover: none)').matches) return;

    VanillaTilt.init(el, {
      max: 8,
      speed: 600,
      perspective: 1200,
      glare: true,
      'max-glare': 0.12,
      scale: 1.02,
      gyroscope: false,
      ...options,
    });

    return () => {
      if (el.vanillaTilt) {
        el.vanillaTilt.destroy();
      }
    };
  }, []);

  return ref;
}

export default useTilt;

import { useRef, useCallback } from 'react';

/**
 * Custom hook: Creates a magnetic hover effect where the element
 * subtly moves toward the cursor on hover.
 * @param {number} strength - How strongly the element follows the cursor (0-1)
 */
export function useMagneticHover(strength = 0.3) {
  const ref = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    el.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    el.style.transition = 'transform 0.2s cubic-bezier(0.33, 1, 0.68, 1)';
  }, [strength]);

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    el.style.transform = 'translate(0, 0)';
    el.style.transition = 'transform 0.5s cubic-bezier(0.33, 1, 0.68, 1)';
  }, []);

  return {
    ref,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
  };
}

export default useMagneticHover;

import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

/**
 * CustomCursor — Animated dot + ring cursor that grows on interactive elements.
 * Hidden on touch devices via CSS media query.
 */
export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const rafRef = useRef(null);
  const posRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Hide on touch devices
    if (window.matchMedia('(hover: none)').matches) return;

    const handleMouseMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Use RAF for smooth position updates
    const updatePosition = () => {
      setPosition({ ...posRef.current });
      rafRef.current = requestAnimationFrame(updatePosition);
    };

    // Detect hoverable elements
    const handleElementHover = (e) => {
      const target = e.target.closest('a, button, [data-cursor="hover"], input, textarea, .glass-card');
      setIsHovering(!!target);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousemove', handleElementHover);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    rafRef.current = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousemove', handleElementHover);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [isVisible]);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) {
    return null;
  }

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10000] hidden md:block"
        animate={{
          x: position.x - 4,
          y: position.y - 4,
          scale: isHovering ? 0 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: 'spring', stiffness: 800, damping: 35, mass: 0.2 }}
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #4f7df7, #8b5cf6)',
        }}
      />
      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10000] hidden md:block"
        animate={{
          x: position.x - (isHovering ? 28 : 20),
          y: position.y - (isHovering ? 28 : 20),
          width: isHovering ? 56 : 40,
          height: isHovering ? 56 : 40,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 28, mass: 0.3 }}
        style={{
          borderRadius: '50%',
          border: '1.5px solid rgba(79, 125, 247, 0.4)',
          background: isHovering ? 'rgba(79, 125, 247, 0.06)' : 'transparent',
          backdropFilter: isHovering ? 'blur(4px)' : 'none',
        }}
      />
    </>
  );
}

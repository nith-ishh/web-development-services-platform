import { motion } from 'motion/react';

/**
 * AnimatedSection — Wrapper component for scroll-triggered entrance animations.
 * Uses Motion's whileInView for declarative, performant animations.
 *
 * @param {string} direction - Animation direction: 'up' | 'down' | 'left' | 'right'
 * @param {number} delay - Delay in seconds
 * @param {number} duration - Duration in seconds
 * @param {number} distance - Pixels to animate from
 * @param {boolean} stagger - Whether to stagger child animations
 * @param {number} staggerDelay - Delay between staggered children
 */
export default function AnimatedSection({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.7,
  distance = 40,
  className = '',
  once = true,
}) {
  const getInitial = () => {
    switch (direction) {
      case 'up': return { opacity: 0, y: distance };
      case 'down': return { opacity: 0, y: -distance };
      case 'left': return { opacity: 0, x: distance };
      case 'right': return { opacity: 0, x: -distance };
      default: return { opacity: 0, y: distance };
    }
  };

  const getAnimate = () => {
    switch (direction) {
      case 'up':
      case 'down':
        return { opacity: 1, y: 0 };
      case 'left':
      case 'right':
        return { opacity: 1, x: 0 };
      default:
        return { opacity: 1, y: 0 };
    }
  };

  return (
    <motion.div
      initial={getInitial()}
      whileInView={getAnimate()}
      viewport={{ once, margin: '-80px' }}
      transition={{
        duration,
        delay,
        ease: [0.33, 1, 0.68, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

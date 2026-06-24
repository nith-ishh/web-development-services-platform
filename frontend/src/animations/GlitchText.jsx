import { useEffect, useRef } from 'react';

/**
 * GlitchText — Renders text with a subtle cyber glitch effect.
 * Uses CSS pseudo-elements with clip-path offset for the glitch layers.
 * 
 * @param {string} text - The text to display
 * @param {string} className - Additional CSS classes
 * @param {string} as - HTML element to render as (default: 'span')
 */
export default function GlitchText({ text, className = '', as: Tag = 'span' }) {
  const ref = useRef(null);

  useEffect(() => {
    // Activate glitch after a short delay for dramatic entrance
    const timer = setTimeout(() => {
      ref.current?.classList.add('active');
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Tag
      ref={ref}
      className={`glitch-text ${className}`}
      data-text={text}
      aria-label={text}
    >
      {text}
    </Tag>
  );
}

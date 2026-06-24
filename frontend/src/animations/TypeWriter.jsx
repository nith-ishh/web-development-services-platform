import { useEffect, useRef, useState } from 'react';

/**
 * TypeWriter — Cycles through phrases with a typing/deleting effect.
 * 
 * @param {string[]} phrases - Array of phrases to cycle through
 * @param {number} typeSpeed - Milliseconds per character typing
 * @param {number} deleteSpeed - Milliseconds per character deleting
 * @param {number} pauseDuration - Pause between typing and deleting
 */
export default function TypeWriter({
  phrases = [],
  typeSpeed = 80,
  deleteSpeed = 40,
  pauseDuration = 2000,
  className = '',
}) {
  const [text, setText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (phrases.length === 0) return;

    const currentPhrase = phrases[phraseIndex];

    const handleTyping = () => {
      if (!isDeleting) {
        // Typing forward
        if (text.length < currentPhrase.length) {
          setText(currentPhrase.slice(0, text.length + 1));
          timeoutRef.current = setTimeout(handleTyping, typeSpeed);
        } else {
          // Finished typing, pause then start deleting
          timeoutRef.current = setTimeout(() => {
            setIsDeleting(true);
          }, pauseDuration);
        }
      } else {
        // Deleting
        if (text.length > 0) {
          setText(currentPhrase.slice(0, text.length - 1));
          timeoutRef.current = setTimeout(handleTyping, deleteSpeed);
        } else {
          // Finished deleting, move to next phrase
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % phrases.length);
        }
      }
    };

    timeoutRef.current = setTimeout(handleTyping, isDeleting ? deleteSpeed : typeSpeed);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [text, isDeleting, phraseIndex, phrases, typeSpeed, deleteSpeed, pauseDuration]);

  return (
    <span className={className}>
      {text}
      <span
        className="inline-block w-[2px] h-[1em] ml-1 align-middle"
        style={{
          background: 'linear-gradient(180deg, #4f7df7, #8b5cf6)',
          animation: 'blink 1s step-end infinite',
        }}
      />
      <style>{`@keyframes blink { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0; } }`}</style>
    </span>
  );
}

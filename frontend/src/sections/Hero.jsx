import { useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import gsap from 'gsap';
import GlitchText from '../animations/GlitchText';
import TypeWriter from '../animations/TypeWriter';
import { useMagneticHover } from '../animations/useMagneticHover';

/**
 * Hero — Full-screen landing section with animated gradient mesh,
 * floating geometric shapes, glitch headline, typewriter subtitle,
 * and magnetic CTA buttons.
 */
export default function Hero() {
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const mag1 = useMagneticHover(0.25);
  const mag2 = useMagneticHover(0.25);

  // Entrance animation for hero content
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 1.8 });

      tl.from('.hero-badge', {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power3.out',
      })
        .from('.hero-title', {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: 'power3.out',
        }, '-=0.3')
        .from('.hero-subtitle', {
          opacity: 0,
          y: 30,
          duration: 0.7,
          ease: 'power3.out',
        }, '-=0.4')
        .from('.hero-ctas', {
          opacity: 0,
          y: 25,
          duration: 0.6,
          ease: 'power3.out',
        }, '-=0.3')
        .from('.hero-scroll-indicator', {
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out',
        }, '-=0.2');
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Gradient Mesh Background */}
      <div className="mesh-gradient">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>

      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Circle */}
        <div
          className="floating-shape rounded-full w-16 h-16 lg:w-24 lg:h-24"
          style={{
            top: '15%',
            left: '10%',
            animation: 'float-shape 15s ease-in-out infinite',
            borderColor: 'rgba(79, 125, 247, 0.15)',
          }}
        />
        {/* Square rotated */}
        <div
          className="floating-shape w-12 h-12 lg:w-16 lg:h-16 rotate-45"
          style={{
            top: '25%',
            right: '12%',
            animation: 'float-shape-alt 18s ease-in-out infinite',
            borderColor: 'rgba(139, 92, 246, 0.12)',
            borderRadius: '4px',
          }}
        />
        {/* Small circle */}
        <div
          className="floating-shape rounded-full w-8 h-8 lg:w-10 lg:h-10"
          style={{
            bottom: '30%',
            left: '20%',
            animation: 'float-shape 12s ease-in-out infinite reverse',
            borderColor: 'rgba(34, 211, 238, 0.12)',
          }}
        />
        {/* Triangle (CSS border trick) */}
        <div
          className="absolute"
          style={{
            top: '60%',
            right: '18%',
            width: 0,
            height: 0,
            borderLeft: '12px solid transparent',
            borderRight: '12px solid transparent',
            borderBottom: '20px solid rgba(139, 92, 246, 0.1)',
            animation: 'float-shape-alt 20s ease-in-out infinite',
          }}
        />
        {/* Ring */}
        <div
          className="floating-shape rounded-full w-20 h-20 lg:w-32 lg:h-32"
          style={{
            bottom: '15%',
            right: '25%',
            animation: 'float-shape 25s ease-in-out infinite',
            borderColor: 'rgba(79, 125, 247, 0.08)',
            borderWidth: '2px',
          }}
        />
        {/* Dot cluster */}
        <div
          className="absolute w-2 h-2 rounded-full bg-accent-blue/20"
          style={{
            top: '40%',
            left: '5%',
            animation: 'float-shape 10s ease-in-out infinite',
          }}
        />
        <div
          className="absolute w-1.5 h-1.5 rounded-full bg-accent-purple/20"
          style={{
            top: '70%',
            left: '45%',
            animation: 'float-shape-alt 14s ease-in-out infinite',
          }}
        />
      </div>

      {/* Hero Content */}
      <div ref={contentRef} className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full glass-card text-xs font-medium text-text-secondary tracking-wider uppercase">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Available for new projects
        </div>

        {/* Headline with Glitch */}
        <h1 className="hero-title text-[clamp(2.5rem,8vw,5.5rem)] font-bold leading-[1.05] mb-6">
          <span className="block text-text-primary">We Build</span>
          <GlitchText
            text="Digital Experiences"
            as="span"
            className="block bg-gradient-to-r from-accent-blue via-accent-purple to-accent-cyan bg-clip-text text-transparent"
          />
        </h1>

        {/* Typewriter Subtitle */}
        <p className="hero-subtitle text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
          <TypeWriter
            phrases={[
              'Premium web applications that convert visitors into customers.',
              'Cutting-edge mobile experiences that users love.',
              'Scalable cloud architectures that grow with your business.',
              'AI-powered solutions that redefine possibilities.',
            ]}
            typeSpeed={50}
            deleteSpeed={30}
            pauseDuration={2500}
          />
        </p>

        {/* CTA Buttons */}
        <div className="hero-ctas flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.a
            ref={mag1.ref}
            onMouseMove={mag1.onMouseMove}
            onMouseLeave={mag1.onMouseLeave}
            href="#contact"
            className="btn-primary text-base px-8 py-4"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Start Your Project
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>

          <motion.a
            ref={mag2.ref}
            onMouseMove={mag2.onMouseMove}
            onMouseLeave={mag2.onMouseLeave}
            href="#portfolio"
            className="btn-secondary text-base px-8 py-4"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            View Our Work
          </motion.a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hero-scroll-indicator absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-text-muted text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-8 rounded-full border border-border-glass flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-accent-blue" />
        </motion.div>
      </div>
    </section>
  );
}

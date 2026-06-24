import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedSection from '../animations/AnimatedSection';

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    number: '01',
    title: 'Discover',
    description: 'We dive deep into your vision, market, and users. Through workshops and research, we define the roadmap that will guide every decision.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Design',
    description: 'From wireframes to high-fidelity prototypes, we craft pixel-perfect interfaces that are beautiful, intuitive, and conversion-focused.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19l7-7 3 3-7 7-3-3z" />
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
        <path d="M2 2l7.586 7.586" />
        <circle cx="11" cy="11" r="2" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Develop',
    description: 'Our engineers build with best-in-class technologies, following clean architecture and TDD practices for robust, scalable code.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Deploy',
    description: 'Zero-downtime deployments with monitoring, performance optimization, and ongoing support to ensure your product thrives in production.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
];

export default function Process() {
  const lineRef = useRef(null);

  /* Animate the vertical connecting line on scroll */
  useEffect(() => {
    const line = lineRef.current;
    if (!line) return;

    gsap.set(line, { scaleY: 0, transformOrigin: 'top center' });

    const tween = gsap.to(line, {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: line,
        start: 'top 70%',
        end: 'bottom 30%',
        scrub: 1,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section id="process" className="section-padding relative">
      {/* Background accent */}
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-accent-cyan/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-16 lg:mb-20">
          <span className="text-accent-cyan text-sm font-semibold tracking-widest uppercase mb-4 block">
            How We Work
          </span>
          <h2 className="section-title mb-5">Our Process</h2>
          <p className="section-subtitle mx-auto">
            A battle-tested methodology refined across 150+ projects to deliver exceptional results every time.
          </p>
        </AnimatedSection>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            ref={lineRef}
            className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 hidden md:block"
            style={{
              background: 'linear-gradient(180deg, #4f7df7, #8b5cf6, #22d3ee)',
            }}
          />

          {/* Steps */}
          <div className="space-y-12 lg:space-y-16">
            {STEPS.map((step, i) => (
              <AnimatedSection
                key={step.number}
                delay={i * 0.12}
                direction={i % 2 === 0 ? 'left' : 'right'}
              >
                <div
                  className={`relative flex flex-col md:flex-row items-start gap-6 md:gap-10 ${
                    i % 2 === 1 ? 'lg:flex-row-reverse lg:text-right' : ''
                  }`}
                >
                  {/* Dot on timeline */}
                  <div className="absolute left-8 lg:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-accent-blue bg-bg-primary z-10 hidden md:block" />

                  {/* Content card */}
                  <div className={`glass-card p-8 flex-1 max-w-lg ${i % 2 === 1 ? 'lg:mr-auto' : 'lg:ml-auto'} md:ml-16 lg:ml-0`}>
                    {/* Step number */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-accent-blue/10 flex items-center justify-center text-accent-blue">
                        {step.icon}
                      </div>
                      <span
                        className="text-5xl font-bold text-white/5"
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        {step.number}
                      </span>
                    </div>
                    <h3
                      className="text-xl font-semibold text-text-primary mb-3"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {step.title}
                    </h3>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

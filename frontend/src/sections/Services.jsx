import { useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';
import AnimatedSection from '../animations/AnimatedSection';
import { useTilt } from '../animations/useTilt';

gsap.registerPlugin(ScrollTrigger);

/* ── Animated SVG Icons (stroke-dashoffset draw-in) ── */
const ServiceIcon = ({ path, viewBox = '0 0 24 24' }) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const paths = el.querySelectorAll('path, circle, rect, line, polyline, polygon');
    paths.forEach((p) => {
      const length = p.getTotalLength ? p.getTotalLength() : 100;
      gsap.set(p, { strokeDasharray: length, strokeDashoffset: length });
    });

    const tween = gsap.to(paths, {
      strokeDashoffset: 0,
      duration: 1.2,
      ease: 'power2.out',
      stagger: 0.1,
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <svg
      ref={ref}
      viewBox={viewBox}
      className="w-10 h-10"
      fill="none"
      stroke="url(#icon-gradient)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <defs>
        <linearGradient id="icon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4f7df7" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      {path}
    </svg>
  );
};

/* ── Service Data ── */
const SERVICES = [
  {
    title: 'Web Development',
    description: 'High-performance web applications built with modern frameworks, optimized for speed and scalability.',
    icon: (
      <>
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </>
    ),
  },
  {
    title: 'Mobile Apps',
    description: 'Native and cross-platform mobile experiences that delight users with fluid interactions.',
    icon: (
      <>
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </>
    ),
  },
  {
    title: 'UI/UX Design',
    description: 'Pixel-perfect interfaces and intuitive user journeys designed with research-driven methodology.',
    icon: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        <line x1="2" y1="12" x2="22" y2="12" />
      </>
    ),
  },
  {
    title: 'Cloud Solutions',
    description: 'Scalable cloud infrastructure with automated deployments, monitoring, and zero-downtime releases.',
    icon: (
      <>
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
      </>
    ),
  },
  {
    title: 'AI Integration',
    description: 'Smart applications powered by machine learning, NLP, and generative AI technologies.',
    icon: (
      <>
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </>
    ),
  },
  {
    title: 'DevOps & CI/CD',
    description: 'Streamlined development pipelines with automated testing, deployment, and infrastructure as code.',
    icon: (
      <>
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
        <line x1="14" y1="4" x2="10" y2="20" />
      </>
    ),
  },
];

/* ── Service Card with Tilt & Glow ── */
function ServiceCard({ service, index }) {
  const tiltRef = useTilt({ max: 6, speed: 400, glare: true, 'max-glare': 0.08 });
  const cardRef = useRef(null);

  /* Cursor-following glow effect */
  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--glow-x', x + 'px');
    card.style.setProperty('--glow-y', y + 'px');
  }, []);

  return (
    <AnimatedSection delay={index * 0.1} direction="up">
      <div
        ref={(el) => {
          tiltRef.current = el;
          cardRef.current = el;
        }}
        onMouseMove={handleMouseMove}
        className="glass-card gradient-border card-glow p-8 h-full group relative overflow-hidden"
        style={{
          '--glow-x': '50%',
          '--glow-y': '50%',
        }}
      >
        {/* Cursor glow overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: 'radial-gradient(300px circle at var(--glow-x) var(--glow-y), rgba(79,125,247,0.08), transparent 60%)',
          }}
        />

        {/* Icon */}
        <div className="mb-6 relative z-10">
          <div className="w-14 h-14 rounded-xl bg-accent-blue/10 flex items-center justify-center group-hover:bg-accent-blue/15 transition-colors duration-300">
            <ServiceIcon path={service.icon} />
          </div>
        </div>

        {/* Content */}
        <h3
          className="text-xl font-semibold text-text-primary mb-3 relative z-10"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {service.title}
        </h3>
        <p className="text-text-secondary text-sm leading-relaxed relative z-10">
          {service.description}
        </p>

        {/* Arrow */}
        <div className="mt-6 relative z-10">
          <motion.span
            className="inline-flex items-center gap-2 text-accent-blue text-sm font-medium"
            whileHover={{ x: 4 }}
          >
            Learn more
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.span>
        </div>
      </div>
    </AnimatedSection>
  );
}

/* ── Services Section ── */
export default function Services() {
  return (
    <section id="services" className="section-padding relative">
      {/* Background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-purple/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-16 lg:mb-20">
          <span className="text-accent-blue text-sm font-semibold tracking-widest uppercase mb-4 block">
            What We Do
          </span>
          <h2 className="section-title mb-5">
            Services & Expertise
          </h2>
          <p className="section-subtitle mx-auto">
            We specialize in building world-class digital products with cutting-edge technology and meticulous attention to detail.
          </p>
        </AnimatedSection>

        {/* Service Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import AnimatedSection from '../animations/AnimatedSection';
import { useTilt } from '../animations/useTilt';

/* ── Portfolio Data ── */
const PROJECTS = [
  {
    id: 1,
    title: 'Aurora Finance',
    category: 'Web Application',
    description: 'A next-generation fintech dashboard with real-time analytics, AI-driven insights, and seamless banking integration.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
    color: '#4f7df7',
    span: 'tall', // tall card
  },
  {
    id: 2,
    title: 'NebulaOS',
    category: 'SaaS Platform',
    description: 'Cloud-native operating system for managing distributed teams with real-time collaboration tools.',
    tech: ['Next.js', 'GraphQL', 'Redis', 'Docker'],
    color: '#8b5cf6',
    span: 'normal',
  },
  {
    id: 3,
    title: 'Prism Health',
    category: 'Mobile App',
    description: 'AI-powered health monitoring app with wearable device integration and predictive analytics.',
    tech: ['React Native', 'Python', 'TensorFlow', 'Firebase'],
    color: '#22d3ee',
    span: 'normal',
  },
  {
    id: 4,
    title: 'Vortex Commerce',
    category: 'E-Commerce',
    description: 'High-converting headless commerce platform handling 100K+ daily transactions with sub-second load times.',
    tech: ['Next.js', 'Stripe', 'Algolia', 'Vercel'],
    color: '#ec4899',
    span: 'normal',
  },
  {
    id: 5,
    title: 'SynapseAI',
    category: 'AI Platform',
    description: 'Enterprise AI orchestration platform for deploying and monitoring ML models at scale.',
    tech: ['Python', 'FastAPI', 'Kubernetes', 'GCP'],
    color: '#f59e0b',
    span: 'tall',
  },
  {
    id: 6,
    title: 'EchoVerse',
    category: 'Web3 / Metaverse',
    description: 'Immersive 3D virtual workspace with spatial audio, avatar customization, and blockchain auth.',
    tech: ['Three.js', 'WebRTC', 'Solidity', 'IPFS'],
    color: '#10b981',
    span: 'normal',
  },
];

/* ── Portfolio Card ── */
function PortfolioCard({ project, index }) {
  const tiltRef = useTilt({ max: 5, speed: 500, glare: true, 'max-glare': 0.1 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--glow-x', (e.clientX - rect.left) + 'px');
    card.style.setProperty('--glow-y', (e.clientY - rect.top) + 'px');
  }, []);

  return (
    <AnimatedSection
      delay={index * 0.08}
      direction="up"
      className={project.span === 'tall' ? 'md:row-span-2' : ''}
    >
      <motion.div
        ref={(el) => {
          tiltRef.current = el;
          cardRef.current = el;
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
        className="glass-card overflow-hidden h-full group relative"
        whileHover={{ scale: 1.015 }}
        transition={{ duration: 0.3 }}
        style={{ '--glow-x': '50%', '--glow-y': '50%' }}
      >
        {/* Colored gradient background */}
        <div
          className="absolute inset-0 opacity-20 transition-opacity duration-500 group-hover:opacity-30"
          style={{
            background: `radial-gradient(ellipse at var(--glow-x, 50%) var(--glow-y, 50%), ${project.color}22, transparent 70%)`,
          }}
        />

        {/* Faux image area */}
        <div
          className={`relative overflow-hidden ${project.span === 'tall' ? 'h-48 md:h-64' : 'h-44'}`}
        >
          <div
            className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
            style={{
              background: `linear-gradient(135deg, ${project.color}15, ${project.color}30, ${project.color}10)`,
            }}
          />
          {/* Abstract pattern */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-24 h-24 rounded-2xl rotate-12 opacity-20 group-hover:rotate-[24deg] transition-transform duration-700"
              style={{ background: project.color }}
            />
            <div
              className="absolute w-16 h-16 rounded-full -rotate-12 opacity-15 group-hover:-rotate-[24deg] transition-transform duration-700"
              style={{ background: project.color, left: '30%', top: '20%' }}
            />
          </div>

          {/* Category badge */}
          <div className="absolute top-4 left-4 z-10">
            <span
              className="text-xs font-medium px-3 py-1 rounded-full backdrop-blur-md"
              style={{
                background: `${project.color}20`,
                color: project.color,
                border: `1px solid ${project.color}30`,
              }}
            >
              {project.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 relative z-10">
          <h3
            className="text-lg font-semibold text-text-primary mb-2 group-hover:text-white transition-colors"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {project.title}
          </h3>
          <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-2">
            {project.description}
          </p>

          {/* Tech badges */}
          <div className="flex flex-wrap gap-2">
            <AnimatePresence>
              {project.tech.map((t, i) => (
                <motion.span
                  key={t}
                  initial={isHovered ? { opacity: 0, y: 10, scale: 0.8 } : false}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  className="text-xs px-2.5 py-1 rounded-md bg-white/5 text-text-secondary border border-border-glass"
                >
                  {t}
                </motion.span>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </AnimatedSection>
  );
}

/* ── Portfolio Section ── */
export default function Portfolio() {
  return (
    <section id="portfolio" className="section-padding relative">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-blue/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-16 lg:mb-20">
          <span className="text-accent-purple text-sm font-semibold tracking-widest uppercase mb-4 block">
            Our Work
          </span>
          <h2 className="section-title mb-5">
            Featured Projects
          </h2>
          <p className="section-subtitle mx-auto">
            A curated selection of projects where we pushed boundaries and delivered extraordinary results.
          </p>
        </AnimatedSection>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto">
          {PROJECTS.map((project, i) => (
            <PortfolioCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

import AnimatedSection from '../animations/AnimatedSection';
import { useCountUp } from '../animations/useCountUp';

/* ── Stat Component ── */
function StatCounter({ value, suffix, label }) {
  const { ref, display } = useCountUp(value, 2, suffix);

  return (
    <div ref={ref} className="text-center">
      <div
        className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-accent-blue to-accent-purple bg-clip-text text-transparent mb-2"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        {display}
      </div>
      <div className="text-text-secondary text-sm">{label}</div>
    </div>
  );
}

const STATS = [
  { value: 150, suffix: '+', label: 'Projects Delivered' },
  { value: 85, suffix: '+', label: 'Happy Clients' },
  { value: 12, suffix: '', label: 'Industry Awards' },
  { value: 25, suffix: '+', label: 'Team Members' },
];

export default function About() {
  return (
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Decorative gradient orb */}
      <div className="absolute -right-40 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent-purple/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Text Column */}
          <div>
            <AnimatedSection>
              <span className="text-accent-cyan text-sm font-semibold tracking-widest uppercase mb-4 block">
                About Us
              </span>
              <h2 className="section-title mb-6">
                We're a Team of<br />
                <span className="bg-gradient-to-r from-accent-blue to-accent-purple bg-clip-text text-transparent">
                  Digital Craftsmen
                </span>
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <p className="text-text-secondary leading-relaxed mb-6">
                Founded in 2018, NexusForge has grown from a small studio into a full-service 
                digital agency trusted by startups and enterprises worldwide. We combine technical 
                excellence with creative vision to build products that matter.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <p className="text-text-secondary leading-relaxed mb-8">
                Our multidisciplinary team of engineers, designers, and strategists work as an 
                extension of your team — bringing deep expertise in modern web technologies, 
                cloud architecture, and user experience design.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <div className="flex flex-wrap gap-3">
                {['React', 'Next.js', 'Node.js', 'Python', 'AWS', 'Figma', 'TypeScript', 'Docker'].map(
                  (tech) => (
                    <span
                      key={tech}
                      className="text-xs px-3 py-1.5 rounded-full glass-card text-text-secondary hover:text-accent-blue hover:border-accent-blue/20 transition-all duration-300"
                    >
                      {tech}
                    </span>
                  )
                )}
              </div>
            </AnimatedSection>
          </div>

          {/* Visual Column — Stats */}
          <div>
            <AnimatedSection direction="left" delay={0.2}>
              <div className="glass-card p-10 lg:p-12">
                <div className="grid grid-cols-2 gap-8 lg:gap-10">
                  {STATS.map((stat) => (
                    <StatCounter key={stat.label} {...stat} />
                  ))}
                </div>

                {/* Decorative accent */}
                <div className="mt-10 pt-8 border-t border-border-glass text-center">
                  <p className="text-text-muted text-sm">
                    Trusted by teams at
                  </p>
                  <div className="flex items-center justify-center gap-8 mt-4 text-text-muted/50 text-sm font-semibold tracking-wider">
                    <span>GOOGLE</span>
                    <span>META</span>
                    <span>STRIPE</span>
                    <span className="hidden sm:block">VERCEL</span>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}

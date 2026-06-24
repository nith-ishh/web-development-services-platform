import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedSection from '../animations/AnimatedSection';

gsap.registerPlugin(ScrollTrigger);

const TESTIMONIALS = [
  {
    name: 'Sarah Chen',
    role: 'CTO, Aurora Finance',
    quote: 'NexusForge transformed our vision into a product that exceeded every expectation. Their attention to detail and technical expertise is unmatched in the industry.',
    rating: 5,
    avatar: 'SC',
  },
  {
    name: 'Marcus Johnson',
    role: 'Founder, NebulaOS',
    quote: 'Working with NexusForge felt like having a world-class engineering team in-house. They shipped faster than we thought possible without compromising quality.',
    rating: 5,
    avatar: 'MJ',
  },
  {
    name: 'Elena Rodriguez',
    role: 'VP Product, Prism Health',
    quote: 'The user experience they designed increased our engagement by 340%. Their design-first approach combined with deep technical knowledge is rare and valuable.',
    rating: 5,
    avatar: 'ER',
  },
  {
    name: 'David Park',
    role: 'CEO, Vortex Commerce',
    quote: 'Our conversion rate doubled within three months of launching the platform NexusForge built. They truly understand what drives business results through technology.',
    rating: 5,
    avatar: 'DP',
  },
  {
    name: 'Aisha Patel',
    role: 'Head of Engineering, SynapseAI',
    quote: 'NexusForge built our entire AI platform from scratch. Their architecture decisions proved prescient as we scaled from 100 to 10,000 enterprise users.',
    rating: 5,
    avatar: 'AP',
  },
];

/* ── Star Rating ── */
function Stars({ count }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < count ? 'text-amber-400' : 'text-white/10'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const scrollRef = useRef(null);
  const containerRef = useRef(null);

  /* Horizontal scroll pinned section */
  useEffect(() => {
    const container = containerRef.current;
    const scrollEl = scrollRef.current;
    if (!container || !scrollEl) return;

    const totalScroll = scrollEl.scrollWidth - container.offsetWidth;

    const tween = gsap.to(scrollEl, {
      x: -totalScroll,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: 1,
        start: 'top top',
        end: () => `+=${totalScroll}`,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section id="testimonials" className="relative">
      {/* Background accent */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-accent-purple/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2" />

      {/* Header — outside the pinned area */}
      <div className="section-padding pb-0">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <span className="text-accent-pink text-sm font-semibold tracking-widest uppercase mb-4 block">
              Testimonials
            </span>
            <h2 className="section-title mb-5">What Our Clients Say</h2>
            <p className="section-subtitle mx-auto">
              Don't just take our word for it — hear from the teams we've partnered with.
            </p>
          </AnimatedSection>
        </div>
      </div>

      {/* Horizontal Scroll Container */}
      <div ref={containerRef} className="h-screen flex items-center overflow-hidden">
        <div ref={scrollRef} className="flex gap-6 pl-8 lg:pl-16 pr-16">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.name}
              className="glass-card p-8 w-[360px] md:w-[420px] flex-shrink-0 flex flex-col justify-between group hover:bg-bg-glass-hover transition-all duration-400"
            >
              {/* Stars */}
              <div className="mb-6">
                <Stars count={t.rating} />
              </div>

              {/* Quote */}
              <blockquote className="text-text-primary text-base leading-relaxed mb-8 flex-1">
                "{t.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{
                    background: `linear-gradient(135deg, #4f7df7, #8b5cf6)`,
                  }}
                >
                  {t.avatar}
                </div>
                <div>
                  <div className="text-text-primary text-sm font-semibold">{t.name}</div>
                  <div className="text-text-muted text-xs">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

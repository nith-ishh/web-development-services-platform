import AnimatedSection from '../animations/AnimatedSection';

const SOCIAL_LINKS = [
  { label: 'Twitter', icon: '𝕏', href: '#' },
  { label: 'GitHub', icon: 'GH', href: '#' },
  { label: 'LinkedIn', icon: 'in', href: '#' },
  { label: 'Dribbble', icon: 'Dr', href: '#' },
];

const FOOTER_LINKS = [
  {
    title: 'Services',
    links: ['Web Development', 'Mobile Apps', 'UI/UX Design', 'Cloud Solutions'],
  },
  {
    title: 'Company',
    links: ['About Us', 'Careers', 'Blog', 'Contact'],
  },
  {
    title: 'Resources',
    links: ['Case Studies', 'Documentation', 'Privacy Policy', 'Terms of Service'],
  },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-border-glass overflow-hidden">
      {/* Gradient top border glow */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{
          background: 'linear-gradient(90deg, transparent, #4f7df7, #8b5cf6, transparent)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand Column */}
          <AnimatedSection className="lg:col-span-2" delay={0}>
            <div className="flex items-center gap-2.5 mb-5">
              <div className="relative w-8 h-8">
                <div
                  className="absolute inset-0 rounded-lg"
                  style={{
                    background: 'linear-gradient(135deg, #4f7df7, #8b5cf6)',
                  }}
                />
                <div className="absolute inset-[2.5px] rounded-[5px] bg-bg-primary" />
                <div
                  className="absolute inset-[5px] rounded-[3px]"
                  style={{
                    background: 'linear-gradient(135deg, #4f7df7, #8b5cf6)',
                    opacity: 0.6,
                  }}
                />
              </div>
              <span
                className="text-lg font-bold tracking-tight"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                NexusForge
              </span>
            </div>
            <p className="text-text-secondary text-sm leading-relaxed max-w-sm mb-6">
              We craft premium digital experiences that push the boundaries of web technology. 
              From concept to deployment, we build the future of the web.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg glass-card flex items-center justify-center text-text-secondary text-xs font-bold hover:text-accent-blue hover:border-accent-blue/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(79,125,247,0.15)]"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </AnimatedSection>

          {/* Link Columns */}
          {FOOTER_LINKS.map((group, i) => (
            <AnimatedSection key={group.title} delay={0.1 * (i + 1)}>
              <h4
                className="text-sm font-semibold text-text-primary mb-4 tracking-wider uppercase"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {group.title}
              </h4>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="link-underline text-sm">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </AnimatedSection>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border-glass flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-text-muted text-xs">
            © {new Date().getFullYear()} NexusForge. All rights reserved.
          </p>
          <p className="text-text-muted text-xs">
            Crafted with precision & passion
          </p>
        </div>
      </div>
    </footer>
  );
}

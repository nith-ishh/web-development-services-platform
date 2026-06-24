import { useState } from 'react';
import { motion } from 'motion/react';
import AnimatedSection from '../animations/AnimatedSection';

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    budget: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  const CONTACT_INFO = [
    {
      label: 'Email',
      value: 'hello@nexusforge.dev',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      label: 'Phone',
      value: '+1 (555) 123-4567',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
    },
    {
      label: 'Location',
      value: 'San Francisco, CA',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
  ];

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute -left-40 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent-blue/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -right-40 bottom-0 w-[400px] h-[400px] bg-accent-purple/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <AnimatedSection className="text-center mb-16 lg:mb-20">
          <span className="text-accent-blue text-sm font-semibold tracking-widest uppercase mb-4 block">
            Get In Touch
          </span>
          <h2 className="section-title mb-5">
            Let's Build Something<br />
            <span className="bg-gradient-to-r from-accent-blue to-accent-purple bg-clip-text text-transparent">
              Extraordinary
            </span>
          </h2>
          <p className="section-subtitle mx-auto">
            Ready to bring your vision to life? Tell us about your project and let's start the conversation.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
          {/* Form */}
          <AnimatedSection className="lg:col-span-3" direction="right" delay={0.1}>
            <div className="glass-card p-8 lg:p-10">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16"
                >
                  <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3
                    className="text-2xl font-semibold text-text-primary mb-3"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    Message Sent!
                  </h3>
                  <p className="text-text-secondary">
                    We'll get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-text-secondary mb-2">Your Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-border-glass text-text-primary placeholder-text-muted text-sm focus:outline-none focus:border-accent-blue/50 focus:shadow-[0_0_20px_rgba(79,125,247,0.1)] transition-all duration-300"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-text-secondary mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-border-glass text-text-primary placeholder-text-muted text-sm focus:outline-none focus:border-accent-blue/50 focus:shadow-[0_0_20px_rgba(79,125,247,0.1)] transition-all duration-300"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-text-secondary mb-2">Company</label>
                      <input
                        type="text"
                        name="company"
                        value={formState.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-border-glass text-text-primary placeholder-text-muted text-sm focus:outline-none focus:border-accent-blue/50 focus:shadow-[0_0_20px_rgba(79,125,247,0.1)] transition-all duration-300"
                        placeholder="Your Company"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-text-secondary mb-2">Budget Range</label>
                      <select
                        name="budget"
                        value={formState.budget}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-border-glass text-text-primary text-sm focus:outline-none focus:border-accent-blue/50 focus:shadow-[0_0_20px_rgba(79,125,247,0.1)] transition-all duration-300 appearance-none"
                        style={{ cursor: 'none' }}
                      >
                        <option value="" className="bg-bg-secondary">Select budget</option>
                        <option value="10k-25k" className="bg-bg-secondary">$10K – $25K</option>
                        <option value="25k-50k" className="bg-bg-secondary">$25K – $50K</option>
                        <option value="50k-100k" className="bg-bg-secondary">$50K – $100K</option>
                        <option value="100k+" className="bg-bg-secondary">$100K+</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-text-secondary mb-2">Project Details</label>
                    <textarea
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-border-glass text-text-primary placeholder-text-muted text-sm focus:outline-none focus:border-accent-blue/50 focus:shadow-[0_0_20px_rgba(79,125,247,0.1)] transition-all duration-300 resize-none"
                      placeholder="Tell us about your project, goals, and timeline..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full justify-center py-4 text-base disabled:opacity-50"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      'Send Message'
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </AnimatedSection>

          {/* Contact Info */}
          <AnimatedSection className="lg:col-span-2" direction="left" delay={0.2}>
            <div className="space-y-6">
              {CONTACT_INFO.map((info, i) => (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="glass-card p-6 flex items-start gap-4 group hover:border-accent-blue/20"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent-blue/10 flex items-center justify-center text-accent-blue flex-shrink-0 group-hover:bg-accent-blue/15 transition-colors duration-300">
                    {info.icon}
                  </div>
                  <div>
                    <div className="text-text-muted text-xs uppercase tracking-wider mb-1">
                      {info.label}
                    </div>
                    <div className="text-text-primary text-sm font-medium">
                      {info.value}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Availability card */}
              <div className="glass-card p-6 mt-8">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-text-primary text-sm font-semibold">
                    Currently Available
                  </span>
                </div>
                <p className="text-text-secondary text-sm leading-relaxed">
                  We're accepting new projects for Q3 2026. 
                  Average response time: 2 hours.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

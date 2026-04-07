import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Mail, Github, Linkedin, Send, MapPin, Phone, Clock } from 'lucide-react';
import { MagneticButton } from '../components/MagneticButton';
import { useLenisInstance } from '../context/LenisContext';
import { scrollToHashAnchor } from '../utils/scrollToHash';

// GSAP registration moved to main.tsx

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="none"
  >
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

const socialLinks = [
  { icon: Github, href: 'https://github.com/Damig29', label: 'GitHub', handle: '@Damig29' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/oladipupo-isaac-745368264', label: 'LinkedIn', handle: '/in/oladipupo-isaac' },
  { icon: XIcon, href: 'https://twitter.com/Damilar29', label: 'X', handle: '@Damilar29' },
];

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'oladipupoajagbe888@outlook.com', href: 'mailto:oladipupoajagbe888@outlook.com' },
  { icon: Phone, label: 'Phone', value: '+234 907 627 7555', href: 'tel:+2349076277555' },
  { icon: MapPin, label: 'Location', value: 'Lagos, Nigeria', href: '#' },
  { icon: Clock, label: 'Availability', value: 'Mon – Fri, 9AM – 6PM PST', href: '#' },
];

const PROJECT_TYPES = [
  'Select a project type…',
  'Web Application',
  'Mobile App',
  'UI / UX Design',
  'API & Backend',
  'Consulting',
  'Other',
];

interface FormData {
  name: string;
  email: string;
  subject: string;
  projectType: string;
  message: string;
}

export function Contact() {
  const lenisRef = useLenisInstance();
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  const [emailScrambled, setEmailScrambled] = useState('OLADIPUPOAJAGBE888@OUTLOOK.COM');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    projectType: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const form = formRef.current;
    const info = infoRef.current;
    const socials = socialsRef.current;
    const footer = footerRef.current;

    if (!section || !heading || !form || !info || !socials || !footer) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        heading,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          immediateRender: false,
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            once: true,
            invalidateOnRefresh: true,
          },
        }
      );

      gsap.fromTo(
        form,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          immediateRender: false,
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            once: true,
            invalidateOnRefresh: true,
          },
        }
      );

      gsap.fromTo(
        info.children,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          immediateRender: false,
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            once: true,
            invalidateOnRefresh: true,
          },
        }
      );

      const socialIcons = socials.querySelectorAll('a');
      gsap.fromTo(
        socialIcons,
        { y: 15, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          immediateRender: false,
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            once: true,
            invalidateOnRefresh: true,
          },
        }
      );

      gsap.fromTo(
        footer,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          immediateRender: false,
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            once: true,
            invalidateOnRefresh: true,
          },
        }
      );
    }, section);

    const refresh = () => ScrollTrigger.refresh();
    requestAnimationFrame(() => requestAnimationFrame(refresh));
    const timer = setTimeout(refresh, 400);

    return () => {
      ctx.revert();
      clearTimeout(timer);
    };
  }, []);

  const handleEmailHover = () => {
    const original = 'OLADIPUPOAJAGBE888@OUTLOOK.COM';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@.';
    let iterations = 0;

    const interval = setInterval(() => {
      setEmailScrambled(
        original
          .split('')
          .map((_, index) => {
            if (index < iterations) return original[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      iterations += 1 / 2;

      if (iterations >= original.length) {
        clearInterval(interval);
        setEmailScrambled(original);
      }
    }, 30);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create payload for Web3Forms
      const payload = {
        access_key: "25d2478e-431c-4716-9be4-048ca741134a", // <-- USER WILL REPLACE THIS!
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        "Project Type": formData.projectType || "Not Specified",
        message: formData.message,
      };

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', projectType: '', message: '' });
        setTimeout(() => setSubmitted(false), 4000);
      } else {
        console.error("Form submission failed", result);
        alert("Something went wrong with the form submission. Please email me directly!");
      }
    } catch (error) {
      console.error("Network error during form submission", error);
      alert("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    'w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-cyber focus:outline-none transition-colors duration-300';

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative z-50 bg-void"
    >
      {/* Main content */}
      <div className="py-24 md:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="text-cyber text-sm font-medium uppercase tracking-widest mb-4 block">
              Get In Touch
            </span>
            <h2
              ref={headingRef}
              className="brutalist-heading text-section text-white"
            >
              LET&apos;S BUILD
              <br />
              <span className="text-gradient-accent">SOMETHING GREAT</span>
            </h2>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left: Contact Form */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div>
                  <label className="block text-white/60 text-sm mb-2">Your Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={inputClass}
                    placeholder="John Doe"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-white/60 text-sm mb-2">Your Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={inputClass}
                    placeholder="john@example.com"
                    required
                  />
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-white/60 text-sm mb-2">Subject</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className={inputClass}
                    placeholder="How can I help you?"
                    required
                  />
                </div>

                {/* Project Type */}
                <div>
                  <label className="block text-white/60 text-sm mb-2">Project Type</label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className={`${inputClass} appearance-none cursor-pointer`}
                  >
                    {PROJECT_TYPES.map((type) => (
                      <option
                        key={type}
                        value={type === 'Select a project type…' ? '' : type}
                        className="bg-void text-white"
                      >
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-white/60 text-sm mb-2">Your Message</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={5}
                    className={`${inputClass} resize-none`}
                    placeholder="Tell me about your project..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="
                    w-full flex items-center justify-center gap-3 px-8 py-4 rounded-xl
                    bg-cyber text-void font-semibold
                    hover:bg-white transition-colors duration-300
                    disabled:opacity-50 disabled:cursor-not-allowed
                  "
                  data-cursor-hover
                  data-cursor-scale="2"
                >
                  {isSubmitting ? (
                    <span>Sending…</span>
                  ) : submitted ? (
                    <span>✓ Message Sent!</span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Right: Contact Info */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Contact Info</h3>

              <div ref={infoRef} className="space-y-4 mb-10">
                {contactInfo.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-4 p-4 rounded-xl glass hover:border-cyber/30 transition-all duration-300 group"
                    data-cursor-hover
                    data-cursor-scale="1.5"
                  >
                    <div className="w-12 h-12 rounded-xl bg-cyber/10 flex items-center justify-center group-hover:bg-cyber/20 transition-colors duration-300">
                      <item.icon className="w-5 h-5 text-cyber" />
                    </div>
                    <div>
                      <p className="text-white/50 text-sm">{item.label}</p>
                      <p className="text-white font-medium group-hover:text-cyber transition-colors duration-300 break-all">
                        {item.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Email CTA */}
              <div className="mb-10">
                <p className="text-white/60 mb-4">Prefer email? Reach out directly:</p>
                <a
                  href="mailto:oladipupoajagbe888@outlook.com"
                  className="
                    group inline-flex items-center gap-2 sm:gap-3
                    text-sm xs:text-base sm:text-xl md:text-2xl font-bold text-white
                    hover:text-cyber transition-colors duration-300
                  "
                  onMouseEnter={handleEmailHover}
                  data-cursor-hover
                  data-cursor-text="Email"
                  data-cursor-scale="2.5"
                >
                  <Mail className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0" />
                  <span className="font-mono tracking-wider break-all">{emailScrambled}</span>
                  <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                </a>
              </div>

              {/* Social Links */}
              <div>
                <p className="text-white/60 mb-4">Follow me on social media:</p>
                <div ref={socialsRef} className="flex flex-wrap items-center gap-4">
                  {socialLinks.map(({ icon: Icon, href, label, handle }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        group flex items-center gap-3 px-4 py-3 rounded-xl
                        glass hover:bg-white/10
                        transition-all duration-300
                      "
                      aria-label={label}
                      data-cursor-hover
                      data-cursor-text={label}
                      data-cursor-scale="2"
                    >
                      <Icon className="w-5 h-5 text-white/70 group-hover:text-cyber transition-colors duration-300" />
                      <span className="text-white/50 text-sm group-hover:text-white transition-colors duration-300">
                        {handle}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* CTA Banner */}
          <div className="mt-20 text-center">
            <div className="glass-strong rounded-3xl p-8 md:p-12">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Ready to start your project?
              </h3>
              <p className="text-white/60 mb-8 max-w-xl mx-auto">
                I&apos;m always excited to work on new challenges. Let&apos;s discuss how we can bring your ideas to life.
              </p>
              <MagneticButton
                href="mailto:oladipupoajagbe888@outlook.com"
                className="text-lg"
                cursorText="Send"
                cursorScale="3"
              >
                Start a Conversation
                <ArrowUpRight className="w-5 h-5" />
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        ref={footerRef}
        className="border-t border-white/5 py-8 px-4"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyber flex items-center justify-center">
                <span className="text-void font-bold">OI</span>
              </div>
              <span className="text-xl font-bold text-white">OLA.ISAAC</span>
            </div>

            {/* Navigation */}
            <nav className="flex flex-wrap items-center justify-center gap-6">
              {['About', 'Work', 'Skills', 'Testimonials', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-sm text-white/50 hover:text-white transition-colors duration-300 link-underline"
                  data-cursor-hover
                  data-cursor-scale="1.5"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToHashAnchor(`#${item.toLowerCase()}`, lenisRef?.current);
                  }}
                >
                  {item}
                </a>
              ))}
            </nav>

            {/* Copyright */}
            <div className="text-sm text-white/30">
              © {new Date().getFullYear()} OLA.ISAAC. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;

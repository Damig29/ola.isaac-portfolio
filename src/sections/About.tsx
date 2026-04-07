import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Mail, Calendar, Code2, Server, Palette, PenTool, Layers, Sparkles, Heart, Rocket, Target, Briefcase } from 'lucide-react';
import { MagneticButton } from '../components/MagneticButton';
import { ArrowUpRight } from 'lucide-react';

// GSAP registration moved to main.tsx

const services = [
  {
    icon: Code2,
    title: 'Full Stack Development',
    description: 'End-to-end web products—React and modern frontends, Node and APIs, databases, auth, and deployment—built to scale and stay maintainable.',
  },
  {
    icon: Server,
    title: 'Backend & Architecture',
    description: 'REST and GraphQL services, data modeling, integrations, and cloud-ready backends that match how your product actually grows.',
  },
  {
    icon: Palette,
    title: 'Graphic Design',
    description: 'Campaigns, social and marketing assets, layout, and visual storytelling—strong typography and hierarchy that stay on brand.',
  },
  {
    icon: PenTool,
    title: 'Brand & Identity',
    description: 'Logos, color systems, and brand guidelines so your visuals feel cohesive everywhere—from deck to landing page to print.',
  },
  {
    icon: Layers,
    title: 'UI & Web Design',
    description: 'Screens, components, and responsive layouts that translate cleanly into code—design files your dev workflow can trust.',
  },
  {
    icon: Sparkles,
    title: 'Design + Code',
    description: 'One person owning both sides: prototypes that ship, handoffs that don’t break, and polish that survives launch.',
  },
];

const experience = [
  {
    role: 'Full Stack Development Teacher',
    company: 'Globaltech Computer Institute, Ebute/Ibeshe',
    period: 'Oct 2025 - Present',
    description: 'Instructing and mentoring students on modern web development technologies, best practices, and practical application building.',
  },
];

const mindset = [
  {
    icon: Heart,
    title: 'User-Centric',
    description: 'Whether it’s an interface or a poster, clarity comes first. I design and build for real people—readable, accessible, and intentional.',
  },
  {
    icon: Target,
    title: 'Pixels & Pragmatism',
    description: 'Graphic design discipline meets engineering tradeoffs: strong layout and type in Figma or in CSS, without losing what has to ship on time.',
  },
  {
    icon: Rocket,
    title: 'Stack to Screen',
    description: 'I stay deep in full stack tooling and design craft alike—so ideas move from sketch to production without getting lost in the handoff.',
  },
];

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const content = contentRef.current;
    const image = imageRef.current;
    const servicesGrid = servicesRef.current;
    const infoGrid = infoRef.current;

    if (!section || !heading || !content || !image || !servicesGrid || !infoGrid) return;

    const ctx = gsap.context(() => {
      // Main Heading reveal
      gsap.fromTo(
        heading,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'expo.out',
          immediateRender: false,
          scrollTrigger: {
            trigger: section,
            start: 'top bottom-=100',
            once: true,
          },
        }
      );

      // Content text stagger
      gsap.fromTo(
        content.children,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          immediateRender: false,
          scrollTrigger: {
            trigger: section,
            start: 'top bottom-=100',
            once: true,
          },
        }
      );

      // Image reveal with scale
      gsap.fromTo(
        image,
        { scale: 0.9, opacity: 0, y: 50 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: 'expo.out',
          immediateRender: false,
          scrollTrigger: {
            trigger: section,
            start: 'top bottom-=100',
            once: true,
          },
        }
      );

      // Info sections stagger
      const infoChildren = infoGrid.querySelectorAll('.info-group');
      gsap.fromTo(
        infoChildren,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.3,
          ease: 'power3.out',
          immediateRender: false,
          scrollTrigger: {
            trigger: infoGrid,
            start: 'top bottom-=50',
            once: true,
          },
        }
      );

      // Services cards stagger
      const serviceCards = servicesGrid.querySelectorAll('.service-card');
      gsap.fromTo(
        serviceCards,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          immediateRender: false,
          scrollTrigger: {
            trigger: servicesGrid,
            start: 'top 85%',
            once: true,
          },
        }
      );
    }, section);

    const refresh = () => ScrollTrigger.refresh();
    requestAnimationFrame(() => requestAnimationFrame(refresh));
    const refreshTimer = setTimeout(refresh, 400);

    return () => {
      ctx.revert();
      clearTimeout(refreshTimer);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative z-30 py-24 md:py-32 bg-void"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-20">
          <span className="text-cyber text-sm font-medium uppercase tracking-widest mb-4 block">
            About Me
          </span>
          <h2
            ref={headingRef}
            className="brutalist-heading text-section text-white flex flex-col"
          >
            <span>FULL STACK</span>
            <span className="text-gradient-accent">GRAPHIC DESIGN</span>
          </h2>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-32">
          {/* Left: Image/Visual */}
          <div ref={imageRef} className="relative">
            <div className="aspect-[4/5] max-w-md mx-auto lg:mx-0 relative group">
              {/* Abstract avatar/visual */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyber/30 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute inset-4 rounded-2xl glass-strong flex items-center justify-center overflow-hidden border border-white/10 group-hover:border-cyber/30 transition-colors duration-500">
                <div className="text-center">
                  <div className="w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden flex items-center justify-center relative shadow-[0_0_50px_rgba(0,255,157,0.2)] border-2 border-cyber/20 group-hover:border-cyber/50 transition-colors duration-500">
                    <img 
                      src="/images/my-picture.jpeg" 
                      alt="Ola Isaac" 
                      className="w-full h-full object-cover object-top hover:scale-110 transition-transform duration-700" 
                    />
                  </div>
                  <h3 className="text-white font-black text-3xl tracking-tight">Ola Isaac</h3>
                  <p className="text-cyber font-medium text-sm lg:text-base mt-2">Full Stack Developer & Graphic Designer</p>

                  <div className="mt-6 flex flex-col items-center gap-3">
                    <div className="flex items-center gap-2 bg-cyber/10 px-4 py-2 rounded-full border border-cyber/20">
                      <span className="w-2 h-2 rounded-full bg-cyber animate-pulse" />
                      <span className="text-white/90 text-xs font-semibold tracking-wide uppercase">Open for High-Impact Roles</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-3 -right-3 sm:-top-6 sm:-right-6 w-24 h-24 sm:w-32 sm:h-32 border-t-2 border-r-2 border-cyber/20 rounded-tr-3xl" />
              <div className="absolute -bottom-3 -left-3 sm:-bottom-6 sm:-left-6 w-24 h-24 sm:w-32 sm:h-32 border-b-2 border-l-2 border-cyber/20 rounded-bl-3xl" />
            </div>

            {/* Quick info List */}
            <div className="mt-12 space-y-5 p-8 glass rounded-3xl border border-white/5">
              <div className="flex items-center gap-4 text-white/80 group">
                <div className="w-10 h-10 rounded-xl bg-cyber/10 flex items-center justify-center group-hover:bg-cyber group-hover:text-void transition-colors duration-300">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase font-bold tracking-tighter">Based in</p>
                  <p className="font-medium">Lagos, Nigeria</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-white/80 group">
                <div className="w-10 h-10 rounded-xl bg-cyber/10 flex items-center justify-center group-hover:bg-cyber group-hover:text-void transition-colors duration-300">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase font-bold tracking-tighter">Email</p>
                  <p className="font-medium">oladipupoajagbe888@outlook.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-white/80 group">
                <div className="w-10 h-10 rounded-xl bg-cyber/10 flex items-center justify-center group-hover:bg-cyber group-hover:text-void transition-colors duration-300">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase font-bold tracking-tighter">Experience</p>
                  <p className="font-medium">Full Stack Developer</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Bio & Story */}
          <div ref={contentRef} className="space-y-10">
            <div className="space-y-6">
              <h3 className="text-3xl md:text-4xl font-black text-white leading-tight uppercase italic">
                <span className="text-cyber">Full stack</span> build. <span className="text-gradient-accent">Graphic design</span> craft.
              </h3>
              <p className="text-xl text-white/90 leading-relaxed font-medium">
                I ship complete web products and the visual systems around them—APIs to interfaces, brand assets to production CSS.
              </p>
            </div>

            <div className="space-y-6 text-white/70 leading-relaxed text-lg">
              <p>
                My name is <span className="text-white font-bold px-1">Oladipupo Ajagbe</span>, and <span className="text-cyber font-semibold px-1">Ola.isaac</span> is my professional brand name. Just a quick note in case you see a different name on my CV!
              </p>
              <p>
                I work as a <span className="text-white font-bold px-1">full stack developer</span> across modern JavaScript stacks—frontends, backends, databases, and deployment—so features go from idea to live without gaps in ownership.
              </p>
              <p>
                Alongside engineering, I practice <span className="text-white font-bold px-1">graphic design</span>: branding, marketing layouts, typography, and digital visuals that stay consistent whether they end up in a deck, on social, or in the product itself.
              </p>
              <p>
                That dual focus means fewer handoffs and a single thread from <span className="text-cyber font-semibold">Figma (or a sketch) to shipped code</span>—design decisions that respect constraints, and engineering that respects the grid, type, and color you committed to.
              </p>
            </div>

            {/* Quick stats grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl glass border border-white/5 hover:border-cyber/30 transition-all group">
                <p className="text-4xl font-black text-cyber mb-1 group-hover:scale-110 transition-transform">10+</p>
                <p className="text-white/40 text-xs uppercase font-bold tracking-widest">Projects Shipped</p>
              </div>
              <div className="p-6 rounded-2xl glass border border-white/5 hover:border-cyber/30 transition-all group">
                <p className="text-4xl font-black text-white mb-1 group-hover:scale-110 transition-transform">10+</p>
                <p className="text-white/40 text-xs uppercase font-bold tracking-widest">Global Clients</p>
              </div>
            </div>

            <div className="flex gap-6">
              <MagneticButton
                href="/images/CV.pdf"
                download="Ola_Isaac_CV.pdf"
                className="text-sm px-8 py-4"
                cursorText="Download"
                cursorScale="2.5"
              >
                <span className="font-bold flex items-center gap-2">
                  RESUME / CV <ArrowUpRight className="w-4 h-4" />
                </span>
              </MagneticButton>
            </div>
          </div>
        </div>

        {/* Philosophy & Education Row */}
        <div ref={infoRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-32">
          {/* Mindset */}
          <div className="info-group space-y-8">
            <h3 className="text-2xl font-black text-white uppercase tracking-tighter flex items-center gap-3">
              <div className="w-1.5 h-6 bg-cyber" />
              Core Philosophy
            </h3>
            <div className="space-y-6">
              {mindset.map((item, i) => (
                <div key={i} className="flex gap-6 group p-6 rounded-2xl hover:bg-white/[0.03] transition-colors border border-transparent hover:border-white/5">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:text-cyber transition-colors">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-white font-bold text-lg">{item.title}</h4>
                    <p className="text-white/60 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div className="info-group space-y-8">
            <h3 className="text-2xl font-black text-white uppercase tracking-tighter flex items-center gap-3">
              <div className="w-1.5 h-6 bg-cyber" />
              Experience
            </h3>
            <div className="space-y-6">
              {experience.map((item, i) => (
                <div key={i} className="flex gap-6 group p-6 rounded-2xl hover:bg-white/[0.03] transition-colors border border-transparent hover:border-white/5">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:text-cyber transition-colors">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <h4 className="text-white font-bold text-lg">{item.role}</h4>
                      <span className="text-cyber text-xs font-bold">{item.period}</span>
                    </div>
                    <p className="text-white/90 text-sm font-medium">{item.company}</p>
                    <p className="text-white/60 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Services / What I Do */}
        <div className="pt-20 border-t border-white/5">
          <div className="text-center mb-16 space-y-4">
            <h3 className="brutalist-heading text-3xl md:text-5xl text-white">
              MY DIGITAL <span className="text-gradient-accent">TOOLBOX</span>
            </h3>
            <p className="text-white/50 max-w-xl mx-auto">
              Full stack tooling for what you launch, graphic design craft for how it looks—one workflow from database to brand touchpoint.
            </p>
          </div>

          <div
            ref={servicesRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {services.map((service) => (
              <div
                key={service.title}
                className="service-card glass-strong rounded-3xl p-10 group hover:border-cyber/30 transition-all duration-500 hover:-translate-y-2"
              >
                <div className="w-16 h-16 rounded-2xl bg-cyber/10 flex items-center justify-center mb-8 group-hover:bg-cyber group-hover:text-void transition-all duration-500 transform group-hover:rotate-12">
                  <service.icon className="w-8 h-8 text-cyber group-hover:text-void" />
                </div>
                <h4 className="text-2xl font-bold text-white mb-4 group-hover:text-cyber transition-colors duration-300">
                  {service.title}
                </h4>
                <p className="text-white/60 text-base leading-relaxed">
                  {service.description}
                </p>

                <div className="mt-8 flex items-center gap-2 text-white/20 text-xs font-black uppercase tracking-widest group-hover:text-cyber transition-colors">
                  <span>Explore Stack</span>
                  <div className="h-[1px] flex-1 bg-white/10 group-hover:bg-cyber/30" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;

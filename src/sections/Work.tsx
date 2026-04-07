import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, ExternalLink, Github, Zap } from 'lucide-react';

// GSAP registration moved to main.tsx

type Category = 'All' | 'Development' | 'Graphic Design';

interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  tags: string[];
  color: string;
  year: string;
  role: string;
  category: Exclude<Category, 'All'>;
  githubUrl?: string;
  liveUrl?: string;
  image: string;
  impact?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'LIMOVIES',
    subtitle: 'Search & Download Platform',
    description: 'A comprehensive movie platform for searching, viewing trailers, and exploring film details.',
    longDescription: 'Built a feature-rich movie application where users can search for any film, explore detailed cast and plot information, and watch trailers. The application features a smooth, cinematic user interface and provides options for users to download movies when available.',
    tags: ['React', 'TMDB API', 'Tailwind CSS'],
    color: '#e11d48',
    year: '2025',
    role: 'Lead Developer',
    category: 'Development',
    githubUrl: 'https://github.com/Damig29/Movie_Trailer_Web_App',
    liveUrl: 'https://github.com/Damig29/Movie_Trailer_Web_App',
    image: '/images/lib-movie.png',
    impact: 'Seamless search and high-performance data retrieval for movie fans.',
  },
  {
    id: 2,
    title: 'MOJITO',
    subtitle: 'Digital Mixology Experience',
    description: 'A vibrant cocktail exploration platform featuring immersive GSAP animations.',
    longDescription: 'Designed and developed Mojito, a high-end digital experience for cocktail enthusiasts. The platform uses GSAP to create an immersive, lively environment where users can explore artisanal drinks with fluid transitions and custom scroll-triggered effects. The design reflects the energy and craft of mixology through motion and visual storytelling.',
    tags: ['React', 'GSAP', 'Tailwind CSS'],
    color: '#10b981',
    year: '2024',
    role: 'Creative Developer',
    category: 'Development',
    githubUrl: 'https://github.com/Damig29/Mojito_cocktails',
    // liveUrl: 'https://github.com/Damig29/Mojito_cocktails',
    image: '/images/Mojito.png',
    impact: 'Enhanced user engagement through premium interaction design.',
  },
  {
    id: 3,
    title: 'Linkedin',
    subtitle: 'Cloned Social Media Platform',
    description: 'A professional networking platform for connecting with colleagues and industry peers.',
    longDescription: 'A professional networking platform for connecting with colleagues and industry peers. This project features a modern interface with a seamless user experience. It includes features such as user profiles, job listings, and messaging capabilities, all built with the latest web technologies.',
    tags: ['HTML', 'CSS', 'JAVASCRIPT', 'PHP', 'MySQL'],
    color: '#06b6d4',
    year: '2025',
    role: 'Frontend & Backend Developer',
    category: 'Development',
    githubUrl: 'https://github.com/Damig29/Linkedin_clone',
    image: '/images/linkedin.png',
    impact: 'I was able to create real world social media platform including the necessary features.',
  },
  {
    id: 4,
    title: 'BEACH FLYER',
    subtitle: 'Tropical Church Event Promotion',
    description: 'High-energy visual design for a church premium beach event.',
    longDescription: 'Created a vibrant and immersive flyer design for an exclusive church programme. The project focused on capturing the summer energy through custom photo manipulation, dynamic typography, and a sun-soaked color palette, all crafted meticulously in Photoshop.',
    tags: ['Photoshop', 'Graphic Design', 'Typography', 'Manipulation'],
    color: '#f59e0b',
    year: '2026',
    role: 'Lead Graphic Designer',
    category: 'Graphic Design',
    image: '/designs/Beach flyer.jpg',
    impact: 'Increased event social media reach by 150% through viral sharing.',
  },
  {
    id: 5,
    title: 'CULTURAL CAROL',
    subtitle: 'Festive Season Visuals',
    description: 'Elegant graphic series for a traditional Christmas celebration.',
    longDescription: 'Developed a comprehensive visual identity for a large-scale cultural Christmas carol event. The design blends traditional festive elements with a modern African aesthetic, utilizing advanced layering and texture work in Photoshop to create a rich, tactile feel across all promotional materials.',
    tags: ['Photoshop', 'Graphic Design', 'Cultural Arts', 'Layout'],
    color: '#ec4899',
    year: '2025',
    role: 'Art Director',
    category: 'Graphic Design',
    image: '/designs/Cultural Christmas Carol.jpg',
    impact: 'Sold out all 1,200 seats within the first week of poster release.',
  },
  {
    id: 6,
    title: 'MODERN CONCEPT',
    subtitle: 'Visual Identity Series',
    description: 'Experimental graphic design exploring typography and space.',
    longDescription: 'A personal exploration into minimalist but high-impact graphic design. This series focuses on the intersection of bold typography and abstract imagery, pushing the boundaries of traditional layout structures using Photoshop\'s powerful compositing tools.',
    tags: ['Photoshop', 'Graphic Design', 'Canva', 'Minimalism'],
    color: '#10b981',
    year: '2025',
    role: 'Graphic Designer',
    category: 'Graphic Design',
    image: '/designs/Your paragraph text (3).jpg',
    impact: 'Featured in a popular design gallery for innovative layout techniques.',
  },
  {
    id: 7,
    title: 'HOMELAND',
    subtitle: 'Real Estate Website Front-end',
    description: 'A comprehensive 10-page front-end development for a modern real estate platform.',
    longDescription: 'Developed the front-end architecture for Homeland, an extensive real estate platform featuring 10 meticulously crafted pages. The project focused on creating an intuitive property browsing experience, fluid navigation, and responsive layouts that look exceptional across all devices.',
    tags: ['HTML5', 'CSS3', 'JAVASCRIPT', 'BOOTSTRAP5', 'JQUERY'],
    color: '#3b82f6',
    year: '2026',
    role: 'Frontend Developer',
    category: 'Development',
    githubUrl: 'https://github.com/Damig29/Homeland',
    image: '/images/homeland.png',
    impact: 'Delivered a seamless multi-page property browsing experience.',
  },
];

const CATEGORIES: Category[] = ['All', 'Development', 'Graphic Design'];

function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 40;
      const rotateY = (centerX - x) / 40;

      gsap.to(card, {
        rotateX,
        rotateY,
        duration: 0.3,
        ease: 'power2.out',
      });

      if (imageRef.current) {
        gsap.to(imageRef.current, {
          x: (x - centerX) / 20,
          y: (y - centerY) / 20,
          rotateX: -rotateX * 2,
          rotateY: -rotateY * 2,
          duration: 0.4,
          ease: 'power2.out',
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.5)',
      });

      if (imageRef.current) {
        gsap.to(imageRef.current, {
          x: 0,
          y: 0,
          rotateX: 0,
          rotateY: 0,
          duration: 0.6,
          ease: 'power2.out',
        });
      }
    };

    card.addEventListener('mousemove', handleMouseMove as EventListener);
    card.addEventListener('mouseleave', handleMouseLeave as EventListener);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove as EventListener);
      card.removeEventListener('mouseleave', handleMouseLeave as EventListener);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="project-card group relative"
      style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
    >
      <div
        className="
          relative overflow-hidden rounded-[2.5rem]
          bg-white/[0.03] backdrop-blur-2xl border border-white/10
          min-h-[580px]
          flex flex-col
          transition-all duration-700
          group-hover:border-white/20 group-hover:bg-white/[0.07]
        "
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Preview Image Container */}
        <div className="relative h-64 overflow-hidden p-4" style={{ transformStyle: 'preserve-3d' }}>
          <div
            ref={imageRef}
            className="w-full h-full rounded-3xl overflow-hidden relative"
            style={{ transform: 'translateZ(50px)' }}
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-void/80 to-transparent opacity-60" />
          </div>

          {/* Floating Tags */}
          <div className="absolute top-8 left-8 flex flex-col gap-2" style={{ transform: 'translateZ(80px)' }}>
            <span className="bg-void/80 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full border border-white/10">
              {project.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex-1 flex flex-col px-8 pb-8 pt-4" style={{ transform: 'translateZ(30px)' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-3xl font-black text-white tracking-tight group-hover:text-cyber transition-colors duration-300">
              {project.title}
            </h3>
            <span className="text-xs font-black text-white/20 tracking-widest">{project.year}</span>
          </div>

          <p className="text-sm font-bold text-cyber mb-3 uppercase tracking-wider">
            {project.subtitle}
          </p>

          <p className="text-white/60 mb-6 text-sm leading-relaxed line-clamp-3">
            {project.longDescription}
          </p>

          {/* Impact Box */}
          <div className="mb-8 p-4 rounded-2xl bg-white/[0.03] border border-white/5 group-hover:border-cyber/20 transition-colors">
            <div className="flex items-start gap-3">
              <Zap className="w-4 h-4 text-cyber mt-1 flex-shrink-0" />
              <div>
                <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-1">Key Impact</p>
                <p className="text-xs text-white/80 font-medium leading-normal">{project.impact}</p>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="
                  px-3 py-1.5 rounded-lg
                  text-[10px] font-black uppercase tracking-wider
                  bg-white/5 text-white/40
                  border border-white/5
                  group-hover:text-white group-hover:border-white/20
                  transition-all duration-300
                "
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="mt-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              {project.githubUrl && (
                <a 
                  href={project.githubUrl} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all group/git"
                >
                  <Github className="w-4 h-4 group-hover/git:scale-110 transition-transform" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Gloss overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-10 pointer-events-none bg-gradient-to-br from-white via-transparent to-transparent transition-opacity duration-700" />
      </div>
    </div>
  );
}

export function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState<Category>('All');

  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let tween: gsap.core.Tween | null = null;

    const ctx = gsap.context(() => {
      const cards = section.querySelectorAll('.project-card');
      if (!cards.length) return;

      tween = gsap.fromTo(
        cards,
        { scale: 0.9, y: 50, opacity: 0 },
        {
          scale: 1,
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: 'power4.out',
          immediateRender: false,
          scrollTrigger: {
            trigger: section,
            start: 'top 90%',
            once: true,
          },
        }
      );
    }, section);

    const syncScrollTrigger = () => {
      ScrollTrigger.refresh();
      const st = tween?.scrollTrigger;
      if (st && st.progress >= 1) {
        tween?.progress(1);
      }
    };

    requestAnimationFrame(() => {
      requestAnimationFrame(syncScrollTrigger);
    });
    const timer = setTimeout(syncScrollTrigger, 300);

    return () => {
      ctx.revert();
      clearTimeout(timer);
    };
  }, [activeCategory]);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative z-30 py-24 md:py-36 bg-void"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mb-24">
          <div>
            <span className="text-cyber text-sm font-black uppercase tracking-[0.4em] mb-6 block">
              Work / Portfolio
            </span>
            <h2 className="brutalist-heading text-4xl sm:text-6xl md:text-8xl text-white">
              CRAFTING
              <br />
              <span className="text-gradient-accent">IMPACT</span>
            </h2>
          </div>
          <div className="lg:pb-4">
            <p className="text-white/50 text-xl max-w-xl leading-relaxed font-medium">
              Designing and building high-performance digital products that
              bridge the gap between <span className="text-white font-bold">creative vision</span> and <span className="text-cyber font-bold">technical excellence</span>.
            </p>
          </div>
        </div>

        {/* Category filter tabs */}
        <div className="flex flex-wrap items-center justify-between gap-8 mb-16 pb-8 border-b border-white/5">
          <div className="flex flex-wrap gap-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`
                  px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest
                  transition-all duration-500
                  ${activeCategory === cat
                    ? 'bg-cyber text-void'
                    : 'bg-white/5 text-white/40 hover:text-white hover:bg-white/10'}
                `}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Quick stats grid inside Work */}
          <div className="hidden md:flex gap-12">
            <div className="flex flex-col">
              <span className="text-2xl font-black text-white uppercase italic">10+</span>
              <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">Shipped</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black text-white uppercase italic">10+</span>
              <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">Global Clients</span>
            </div>
          </div>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* View all CTA */}
        <div className="mt-24 flex flex-col md:flex-row items-center justify-center gap-8">
          {(activeCategory === 'All' || activeCategory === 'Development') && (
            <a
              href="https://github.com/Damig29"
              target="_blank"
              rel="noopener noreferrer"
              className="
                group relative inline-flex items-center gap-4 px-12 py-6 rounded-[2rem]
                bg-void border-2 border-white/5 overflow-hidden
                transition-all duration-500
                hover:border-cyber/50 hover:scale-105
              "
            >
              <div className="absolute inset-0 bg-cyber/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="text-white font-black uppercase tracking-[0.3em] text-sm relative z-10">
                Explore All Repositories
              </span>
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-cyber group-hover:text-void transition-all duration-500 relative z-10">
                <ArrowUpRight className="w-5 h-5" />
              </div>
            </a>
          )}

          {(activeCategory === 'All' || activeCategory === 'Graphic Design') && (
            <a
              href="https://drive.google.com/drive/folders/1gOEDwiJTiGyqozLApepYld9BgScZumL0?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="
                group relative inline-flex items-center gap-4 px-12 py-6 rounded-[2rem]
                bg-void border-2 border-white/5 overflow-hidden
                transition-all duration-500
                hover:border-cyber/50 hover:scale-105
              "
            >
              <div className="absolute inset-0 bg-cyber/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="text-white font-black uppercase tracking-[0.3em] text-sm relative z-10">
                View Design Portfolio
              </span>
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-cyber group-hover:text-void transition-all duration-500 relative z-10">
                <ArrowUpRight className="w-5 h-5" />
              </div>
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

export default Work;

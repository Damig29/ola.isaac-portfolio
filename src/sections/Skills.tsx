import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// GSAP registration moved to main.tsx

interface Skill {
  name: string;
  level: number;
  color: string;
  category: string;
}

interface SkillCategory {
  title: string;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Frontend',
    skills: [
      { name: 'React', level: 85, color: '#61fbb3ff', category: 'Frontend' },
      { name: 'JavaScript', level: 90, color: '#3178c6', category: 'Frontend' },
      { name: 'Tailwind CSS', level: 95, color: '#38bdf8', category: 'Frontend' },
    ],
  },
  {
    title: '3D & Animation',
    skills: [
      { name: 'Three.js', level: 52, color: '#ffffff', category: '3D' },
      { name: 'GSAP', level: 62, color: '#88ce02', category: 'Animation' },
      { name: 'Blender', level: 40, color: '#f5792a', category: '3D' },
    ],
  },
  {
    title: 'Backend',
    skills: [
      { name: 'Node.js', level: 50, color: '#339933', category: 'Backend' },
      { name: 'Python', level: 62, color: '#ffd43b', category: 'Backend' },
      { name: 'MySQL', level: 70, color: '#336791', category: 'Database' },
      { name: 'PHP', level: 78, color: '#e535ab', category: 'API' },
    ],
  },
  {
    title: 'Tools',
    skills: [
      { name: 'Git / GitHub', level: 75, color: '#f05032', category: 'Tools' },
      { name: 'CorelDraw', level: 95, color: '#2496ed', category: 'DevOps' },
      { name: 'Photoshop', level: 92, color: '#ff9900', category: 'Design' },
      { name: 'Figma', level: 68, color: '#f24e1e', category: 'Design' },
    ],
  },
];

const experiences = [
  {
    role: "Full-Stack Development Tutor",
    company: 'GlobalTech Computer Institue Ebute/Ibeshe Branch',
    period: 'Oct 2025 - Present',
    description: 'Leading Full-stack development tutor for students, mentoring upcoming developers, and Educating them on full-stack development.',
  },
  {
    role: 'Front-End Tutor',
    company: 'GlobalTech Computer Institue Ketu Branch',
    period: 'Jan 2025 - Oct 2025',
    description: 'Taught front-end development to students, helping them build 10+ real world projects.',
  }
];

function SkillBar({ skill, index }: { skill: Skill; index: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Stagger the animation timing based on the index
          setTimeout(() => setIsVisible(true), index * 100);
          observer.disconnect(); // Only animate once
        }
      },
      { threshold: 0.2 } // Trigger when 20% visible
    );

    if (barRef.current) observer.observe(barRef.current);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div ref={barRef} className="group">
      <div className="flex items-center justify-between mb-2">
        <span className="text-white font-medium group-hover:text-cyber transition-colors duration-300">
          {skill.name}
        </span>
        <span className="text-white/50 text-sm">{skill.level}%</span>
      </div>
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all [transition-duration:1200ms] ease-out"
          style={{
            width: isVisible ? `${skill.level}%` : '0%',
            backgroundColor: skill.color,
            boxShadow: `0 0 10px ${skill.color}50`,
          }}
        />
      </div>
    </div>
  );
}

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const intro = introRef.current;
    const categories = categoriesRef.current;
    const experience = experienceRef.current;

    if (!section || !heading || !intro || !categories || !experience) return;

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        heading,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          immediateRender: false,
          scrollTrigger: {
            trigger: section,
            start: 'top bottom-=100',
            once: true,
          },
        }
      );

      // Intro animation
      gsap.fromTo(
        intro,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          immediateRender: false,
          scrollTrigger: {
            trigger: section,
            start: 'top bottom-=100',
            once: true,
          },
        }
      );

      // Categories animation
      const categoryCards = categories.querySelectorAll('.skill-category');
      gsap.fromTo(
        categoryCards,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          immediateRender: false,
          scrollTrigger: {
            trigger: categories,
            start: 'top bottom-=50',
            once: true,
          },
        }
      );

      // Experience animation
      const expItems = experience.querySelectorAll('.experience-item');
      gsap.fromTo(
        expItems,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          immediateRender: false,
          scrollTrigger: {
            trigger: experience,
            start: 'top bottom-=50',
            once: true,
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

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative z-40 py-24 md:py-32 bg-void"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-12">
          <span className="text-cyber text-sm font-medium uppercase tracking-widest mb-4 block">
            Expertise
          </span>
          <h2
            ref={headingRef}
            className="brutalist-heading text-section text-white mb-6"
          >
            SKILLS &
            <br />
            <span className="text-gradient-accent">EXPERIENCE</span>
          </h2>
          <p
            ref={introRef}
            className="text-white/60 text-lg max-w-2xl"
          >
            With over 2 years of experience in web development, I specialize in creating
            performant, accessible, and visually stunning applications. My expertise spans
            frontend frameworks, 3D graphics, and modern development workflows.
          </p>
        </div>

        {/* Skills Grid */}
        <div
          ref={categoriesRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20"
        >
          {skillCategories.map((category) => (
            <div
              key={category.title}
              className="skill-category glass-strong rounded-3xl p-6 md:p-8"
            >
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-cyber" />
                {category.title}
              </h3>
              <div className="space-y-5">
                {category.skills.map((skill, index) => (
                  <SkillBar key={skill.name} skill={skill} index={index} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Experience Timeline */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-cyber" />
            Work Experience
          </h3>
        </div>

        <div ref={experienceRef} className="space-y-6">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="experience-item glass rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-start gap-4 md:gap-8 group hover:border-cyber/30 transition-colors duration-300"
            >
              <div className="md:w-48 flex-shrink-0">
                <span className="text-cyber text-sm font-medium">{exp.period}</span>
              </div>
              <div className="flex-1">
                <h4 className="text-xl font-bold text-white mb-1 group-hover:text-cyber transition-colors duration-300">
                  {exp.role}
                </h4>
                <p className="text-white/50 mb-3">{exp.company}</p>
                <p className="text-white/60 text-sm">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-6 glass rounded-2xl">
            <span className="text-4xl font-bold text-cyber block mb-2">10+</span>
            <span className="text-white/50 text-sm">Technologies</span>
          </div>
          <div className="text-center p-6 glass rounded-2xl">
            <span className="text-4xl font-bold text-cyber block mb-2">10+</span>
            <span className="text-white/50 text-sm">Projects</span>
          </div>
          <div className="text-center p-6 glass rounded-2xl">
            <span className="text-4xl font-bold text-cyber block mb-2">2+</span>
            <span className="text-white/50 text-sm">Years Exp</span>
          </div>
          <div className="text-center p-6 glass rounded-2xl">
            <span className="text-4xl font-bold text-cyber block mb-2">∞</span>
            <span className="text-white/50 text-sm">Passion</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;

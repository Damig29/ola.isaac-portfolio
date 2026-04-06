import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, Star, ArrowUpRight } from 'lucide-react';

// GSAP registration moved to main.tsx

interface Testimonial {
    id: number;
    text: string;
    author: string;
    title: string;
    company: string;
    initials: string;
    color: string;
    tag: string;
    impact: string;
}

const testimonials: Testimonial[] = [
    {
        id: 1,
        text: "He helped me with a challenging Python programming project for my Computer Science degree. Not only did he deliver an exceptional solution quickly, but he also took the extra time to walk me through the code and explain exactly how it works. He was so fast and efficient that he even had time to help my classmates with their projects as well. I highly recommend him!",
        author: "Azeezat",
        title: "Computer Science Student",
        company: "University Student",
        initials: "AZ",
        color: "#3b82f6",
        tag: "Python & Mentorship",
        impact: "Exceptional Mentoring",
    },
    {
        id: 2,
        text: "Ola produced an incredible series of flyer designs for our events that completely exceeded our expectations. I've always admired the high quality of his graphic design work. I was so impressed with his creative process that I even brought him in to personally mentor me on Canva, helping me learn the fundamentals of design myself. He is a phenomenal designer and an excellent teacher.",
        author: "Mr. Oladele",
        title: "Manager",
        company: "Venkom Company",
        initials: "MO",
        color: "#8b5cf6",
        tag: "Graphic Design & Training",
        impact: "Top-Tier Design Execution",
    },
    {
        id: 3,
        text: "Ola's performance was so exceptional that I immediately asked him to join our teaching staff. He has a remarkable talent for taking complex programming topics and breaking them down clearly. Whether he's guiding absolute beginners or helping advanced students navigate difficult roadblocks, his patience and depth of knowledge shine through. He is an outstanding educator and developer whom I confidently recommend.",
        author: "Mr. Hamzat",
        title: "Branch Director",
        company: "GlobalTech Computer Institute",
        initials: "MH",
        color: "#06b6d4",
        tag: "Web Dev & Tutoring",
        impact: "Promoted to Branch Tutor",
    },
    {
        id: 4,
        text: "When Ola set out to build a comprehensive movie platform with live trailers and downloading functionality, we honestly doubted it could be done given the immense technical complexity of the task. However, he completely proved us wrong. The flawless downloading architecture he engineered left our entire team marveling at his skill. He has an incredible ability to tackle 'impossible' challenges and deliver astonishing results.",
        author: "Senior Colleague",
        title: "Senior Instructor",
        company: "GlobalTech Computer Institute",
        initials: "SC",
        color: "#10b981",
        tag: "Full-Stack Development",
        impact: "Complex Feature Delivery",
    },
];

export function Testimonials() {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const heading = headingRef.current;
        const grid = gridRef.current;

        if (!section || !heading || !grid) return;

        const ctx = gsap.context(() => {
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

            const cards = grid.querySelectorAll('.testimonial-card');
            gsap.fromTo(
                cards,
                { y: 60, opacity: 0, scale: 0.95 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 1,
                    stagger: 0.2,
                    ease: 'power4.out',
                    immediateRender: false,
                    scrollTrigger: {
                        trigger: section,
                        start: 'top bottom-=200',
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
            id="testimonials"
            className="relative z-40 py-24 md:py-40 bg-void"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section header */}
                <div className="mb-24 text-center lg:text-left grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
                    <div>
                        <span className="text-cyber text-sm font-black uppercase tracking-[0.4em] mb-6 block">
                            Kind Words
                        </span>
                        <h2
                            ref={headingRef}
                            className="brutalist-heading text-6xl md:text-8xl text-white"
                        >
                            CLIENT
                            <br />
                            <span className="text-gradient-accent">VOICES</span>
                        </h2>
                    </div>
                    <div className="lg:pb-4 lg:text-right">
                        <div className="inline-flex items-center gap-2 bg-white/5 py-3 px-6 rounded-full border border-white/10">
                            <div className="flex -space-x-2">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="w-8 h-8 rounded-full border-2 border-void bg-white/10 flex items-center justify-center text-[10px] font-bold text-cyber">
                                        ★
                                    </div>
                                ))}
                            </div>
                            <span className="text-white font-bold text-sm tracking-tight">100% Satisfaction Rate</span>
                        </div>
                    </div>
                </div>

                {/* Testimonial cards grid */}
                <div
                    ref={gridRef}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
                >
                    {testimonials.map((t) => (
                        <div
                            key={t.id}
                            className="
                                testimonial-card glass-strong rounded-[2.5rem] p-10 lg:p-14 
                                flex flex-col gap-10 group transition-all duration-700
                                hover:border-white/20 hover:bg-white/[0.08] hover:-translate-y-2
                            "
                        >
                            {/* Header: Label and Impact */}
                            <div className="flex items-start justify-between">
                                <span className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-[10px] font-black uppercase tracking-widest text-white/40 group-hover:text-cyber group-hover:border-cyber/20 transition-all">
                                    {t.tag}
                                </span>
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map(star => (
                                        <Star key={star} className="w-3 h-3 text-cyber fill-cyber" />
                                    ))}
                                </div>
                            </div>

                            {/* Quote icon & Text */}
                            <div className="relative">
                                <Quote className="absolute -top-6 -left-6 w-12 h-12 text-white/5 group-hover:text-cyber/10 transition-colors duration-700" />
                                <p className="text-white/80 leading-relaxed font-medium text-lg lg:text-xl italic relative z-10">
                                    &ldquo;{t.text}&rdquo;
                                </p>
                            </div>

                            {/* Impact Capsule */}
                            <div className="bg-cyber/10 border border-cyber/20 rounded-2xl p-6 transform group-hover:scale-[1.02] transition-transform duration-500">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-cyber flex items-center justify-center text-void">
                                        <ArrowUpRight className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-cyber uppercase tracking-widest mb-1">Key Achievement</p>
                                        <p className="text-white font-black text-lg uppercase italic">{t.impact}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Author */}
                            <div className="flex items-center gap-5 mt-auto pt-10 border-t border-white/5">
                                <div
                                    className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 font-black text-2xl relative overflow-hidden group-hover:rotate-6 transition-transform duration-500"
                                    style={{
                                        background: `linear-gradient(135deg, ${t.color}, ${t.color}80)`,
                                        boxShadow: `0 10px 30px ${t.color}30`
                                    }}
                                >
                                    <span className="text-void relative z-10">{t.initials}</span>
                                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <div>
                                    <p className="text-xl font-black text-white group-hover:text-cyber transition-colors duration-500 tracking-tight">
                                        {t.author}
                                    </p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-white/40 text-xs font-bold uppercase tracking-widest">{t.title}</span>
                                        <div className="w-1 h-1 rounded-full bg-cyber" />
                                        <span className="text-cyber text-xs font-black uppercase tracking-widest">{t.company}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Testimonials;

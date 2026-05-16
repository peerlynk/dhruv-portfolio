import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Globe, Terminal, Activity, Zap, Layers, Smartphone, ExternalLink } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { motion } from 'motion/react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 'peerlynk',
    title: '',
    description: 'A comprehensive digital ecosystem for professional student networking, architected for hyper-scale and verified connectivity.',
    problem: 'Campus networking is fragmented and low-trust.',
    solution: 'Engineered a unified infrastructure for verified student identity and data-driven talent discovery.',
    architecture: 'High-performance microservices, real-time sync with Socket.io, optimized PostgreSQL queries.',
    tech: ['React Native', 'Node.js', 'PostgreSQL', 'Socket.io', 'AWS'],
    metrics: { uptime: '99.9%', latency: '<50ms' },
    color: '#06B6D4',
    image: 'https://res.cloudinary.com/dqppqvblk/image/upload/v1778872080/Screenshot_2026-05-16_003733_a60mhf.png',
    links: { 
      live: 'https://peerlynk.com', 
      android: 'https://play.google.com/store/apps/details?id=com.peerlynk.network',
      github: 'https://github.com/dhruvpal0/peerlynk' 
    },
    isFeatured: true
  },
  {
    id: 'cravenutri',
    title: 'CraveNutri',
    description: 'AI-powered nutrition and wellness ecosystem focused on personalized health experiences.',
    problem: 'Foundational wellness lacks deep personalization.',
    solution: 'AI-driven engine that crafts unique nutritional paths based on biometric data and goals.',
    tech: ['Next.js', 'PyTorch', 'FastAPI'],
    metrics: { engine: 'AI-Core', accuracy: '98%' },
    color: '#10B981',
    image: 'https://res.cloudinary.com/dqppqvblk/image/upload/v1778871971/Screenshot_2026-05-16_003552_nkfo3e.png',
    links: { live: 'https://cravenutri.com', github: 'https://github.com/dhruvpal0/CraveNutri' }
  },
  {
    id: 'nextwise',
    title: 'NextWise',
    description: 'Intelligent learning infrastructure that generates dynamic educational roadmaps.',
    problem: 'Unstructured learning leading to knowledge gaps.',
    solution: 'Recursive learning-tree generation using large language models and progress analytics.',
    tech: ['Next.js', 'OpenAI', 'PostgreSQL'],
    metrics: { nodes: '1.2k+', sync: 'Realtime' },
    color: '#8B5CF6',
    image: 'https://res.cloudinary.com/dqppqvblk/image/upload/v1778872265/Screenshot_2026-05-16_004042_ayhl0s.png',
    links: { live: 'https://nextwise.onrender.com', github: 'https://github.com/dhruvpal0/NextWise' }
  }
];

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".project-item", {
        y: 60,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const featured = projects.find(p => p.isFeatured);
  const secondary = projects.filter(p => !p.isFeatured);

  return (
    <section id="systems" ref={containerRef} className="py-32 px-6 relative overflow-hidden bg-brand-deep">
      {/* Background Section Glows */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-cyan-glow/5 to-transparent blur-[120px] pointer-events-none" />

      <div className="app-container relative z-10">
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="text-cyan-glow font-mono text-xs tracking-[0.4em] uppercase mb-4"
            >
              Featured Systems
            </motion.div>
            <h2 className="text-5xl md:text-[7rem] font-bold text-white font-display uppercase tracking-tighter leading-none">
              Featured <span className="gradient-text italic">Systems</span>
            </h2>
          </div>
          <p className="text-white/40 font-mono text-[10px] uppercase tracking-widest max-w-xs leading-loose">
            High-performance digital ecosystems engineered for scalability and professional impact.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Featured Project: peerlynk */}
          {featured && (
            <div className="lg:col-span-12 xl:col-span-8 project-item">
              <div className="group relative glass rounded-[4rem] overflow-hidden border border-white/5 hover:border-cyan-glow/20 transition-all duration-700 h-full flex flex-col shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]">
                {/* Browser Chrome Header */}
                <div className="bg-[#0a0a0f] px-6 py-4 flex items-center justify-between border-b border-white/5 relative z-20">
                   <div className="flex gap-2">
                     <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                     <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                     <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                   </div>
                   <div className="px-12 py-1.5 bg-white/5 rounded-lg text-[10px] font-mono text-white/40 tracking-widest hidden md:block select-none">
                     https://peerlynk.com/architecture
                   </div>
                   <div className="flex gap-4">
                      <div className="w-4 h-0.5 bg-white/20 rounded-full" />
                   </div>
                </div>

                <div className="aspect-[16/10] relative overflow-hidden bg-[#0a0a0f]">
                   <img 
                    src={featured.image} 
                    alt={featured.title} 
                    className="w-full h-full object-cover filter brightness-90 group-hover:brightness-100 transition-all duration-1000 group-hover:scale-[1.02] origin-top" 
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/90 via-brand-deep/20 to-transparent" />
                   
                   {/* Cinematic Overlay Title */}
                   <div className="absolute bottom-16 left-16 right-16">
                     <div className="flex items-center gap-4 mb-6">
                        <div className="glass px-4 py-1 text-[10px] font-mono text-cyan-glow uppercase tracking-[0.4em] border-cyan-glow/20">Flagship Ecosystem</div>
                        <div className="h-px flex-1 bg-white/10" />
                     </div>
                     <h3 className="text-7xl md:text-[8rem] font-bold font-display text-white group-hover:text-cyan-glow transition-colors tracking-tighter leading-none mb-10">
                        {featured.title}
                     </h3>
                   </div>
                </div>

                <div className="p-16 flex-1 flex flex-col lg:grid lg:grid-cols-3 gap-16 bg-white/[0.01]">
                   <div className="lg:col-span-2 space-y-12">
                      <div>
                         <p className="text-white/80 text-2xl md:text-3xl leading-tight max-w-3xl font-display italic tracking-tight">
                            {featured.description}
                         </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                         <div className="space-y-4">
                            <div className="flex items-center gap-3 text-white/20">
                               <Terminal size={14} />
                               <span className="text-[11px] font-mono uppercase tracking-[0.3em]">Foundation</span>
                            </div>
                            <p className="text-white/50 text-sm leading-relaxed">{featured.problem}</p>
                         </div>
                         <div className="space-y-4">
                            <div className="flex items-center gap-3 text-cyan-glow/30">
                               <Zap size={14} />
                               <span className="text-[11px] font-mono uppercase tracking-[0.3em]">Engineering</span>
                            </div>
                            <p className="text-white/50 text-sm leading-relaxed">{featured.architecture}</p>
                         </div>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        {featured.tech.map(t => (
                          <span key={t} className="px-4 py-2 border border-white/5 rounded-xl text-[10px] font-mono text-white/30 tracking-widest bg-white/[0.02]">
                            {t}
                          </span>
                        ))}
                      </div>
                   </div>

                   <div className="lg:col-span-1 space-y-12 h-full flex flex-col justify-between">
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 gap-4">
                           {Object.entries(featured.metrics).map(([key, val]) => (
                             <div key={key} className="glass p-6 rounded-3xl border-white/5 group-hover:bg-white/[0.02] transition-colors">
                               <div className="text-[10px] font-mono text-white/20 uppercase tracking-[0.3em] mb-2">{key}</div>
                               <div className="text-3xl font-bold text-white font-display group-hover:text-cyan-glow transition-colors">{val}</div>
                             </div>
                           ))}
                        </div>
                      </div>

                      <div className="flex flex-col gap-4">
                        <a 
                          href={featured.links.live} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-full bg-cyan-glow text-brand-deep py-6 rounded-2xl flex items-center justify-center gap-3 hover:scale-[1.02] transition-all font-black text-xs tracking-[0.2em] uppercase shadow-[0_20px_40px_-10px_rgba(6,182,212,0.3)]"
                        >
                          <Globe size={18} /> Live System
                        </a>
                        <div className="grid grid-cols-2 gap-4">
                          <a 
                            href={featured.links.android} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="glass py-5 rounded-2xl flex items-center justify-center gap-2 border-white/5 hover:bg-white/10 transition-all font-mono text-[10px] text-white/60 tracking-widest uppercase"
                          >
                            <Smartphone size={16} /> App
                          </a>
                          <a 
                            href={featured.links.github} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="glass py-5 rounded-2xl flex items-center justify-center gap-2 border-white/5 hover:bg-white/10 transition-all font-mono text-[10px] text-white/60 tracking-widest uppercase"
                          >
                            <Github size={16} /> Source
                          </a>
                        </div>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          )}

          {/* Secondary Projects - Compact Premium Cards */}
          <div className="lg:col-span-12 xl:col-span-4 flex flex-col gap-12">
            {secondary.map((project) => (
              <div key={project.id} className="project-item group h-full">
                <div className="glass rounded-[3rem] border border-white/5 hover:border-cyan-glow/20 transition-all duration-700 h-full flex flex-col bg-white/[0.01] overflow-hidden shadow-2xl">
                  {/* Miniature Browser Frame */}
                  <div className="bg-[#0a0a0f] px-5 py-3 border-b border-white/5 flex items-center justify-between">
                    <div className="flex gap-1.5">
                       <div className="w-2 h-2 rounded-full bg-white/10" />
                       <div className="w-2 h-2 rounded-full bg-white/10" />
                       <div className="w-2 h-2 rounded-full bg-white/10" />
                    </div>
                    <div className="text-[8px] font-mono text-white/20 tracking-widest uppercase">system_v2.0</div>
                  </div>

                  <div className="relative aspect-video overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover filter brightness-75 group-hover:brightness-90 transition-all duration-1000 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-deep to-transparent opacity-80" />
                    <div className="absolute bottom-6 left-8">
                       <h4 className="text-4xl font-bold font-display text-white group-hover:text-cyan-glow transition-colors tracking-tight italic">{project.title}</h4>
                    </div>
                  </div>

                  <div className="p-10 flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-white/50 text-sm mb-10 leading-relaxed font-sans line-clamp-3">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-10">
                        {project.tech.map(t => (
                          <span key={t} className="px-3 py-1 border border-white/5 rounded-lg text-[9px] font-mono text-white/30 tracking-widest uppercase">{t}</span>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        {Object.entries(project.metrics).map(([key, val]) => (
                          <div key={key}>
                            <div className="text-[9px] font-mono text-white/20 uppercase tracking-widest mb-1">{key}</div>
                            <div className="text-xl font-bold text-white font-display group-hover:text-cyan-glow transition-colors">{val}</div>
                          </div>
                        ))}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <a 
                          href={project.links.live} 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="glass py-4 rounded-xl flex items-center justify-center gap-2 border-white/5 hover:bg-cyan-glow/10 transition-all text-[11px] font-bold text-white tracking-widest uppercase"
                        >
                          Visit <ExternalLink size={14} className="opacity-40" />
                        </a>
                        <a 
                          href={project.links.github} 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="glass py-4 rounded-xl flex items-center justify-center gap-2 border-white/5 hover:bg-white/10 transition-all text-[11px] font-bold text-white/40 tracking-widest uppercase"
                        >
                          <Github size={14} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

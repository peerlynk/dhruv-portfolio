import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Code2, 
  Terminal, 
  Database, 
  Cloud, 
  Smartphone, 
  Cpu, 
  Settings,
  ChevronRight,
  Activity,
  Zap,
  Cog
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import gsap from 'gsap';

type Category = 'All' | 'Frontend' | 'Backend' | 'Database' | 'Cloud' | 'Language' | 'Mobile';

interface Technology {
  name: string;
  category: Category;
  slug: string;
  level: 'Advanced' | 'Expert' | 'Intermediate';
  experience: string;
  usedIn: string[];
  specialization: string[];
  years: string;
}

const techStack: Technology[] = [
  // Frontend
  { name: 'React.js', category: 'Frontend', slug: 'react', level: 'Expert', experience: 'Core UI', usedIn: ['peerlynk', 'NextWise'], specialization: ['Hooks', 'Redux', 'Performance'], years: '3+' },
  { name: 'Next.js', category: 'Frontend', slug: 'nextdotjs', level: 'Expert', experience: 'SSR Flow', usedIn: ['Portfolio', 'AI Dashboards'], specialization: ['SSR', 'App Router', 'Hydration'], years: '2+' },
  { name: 'Tailwind CSS', category: 'Frontend', slug: 'tailwindcss', level: 'Expert', experience: 'Atomic CSS', usedIn: ['Global'], specialization: ['Custom Themes', 'Design Systems'], years: '3+' },
  { name: 'GSAP', category: 'Frontend', slug: 'greensock', level: 'Advanced', experience: 'Motion', usedIn: ['Interactive Apps'], specialization: ['Timelines', 'ScrollTrigger'], years: '1+' },
  
  // Backend
  { name: 'Node.js', category: 'Backend', slug: 'nodedotjs', level: 'Expert', experience: 'Server Runtime', usedIn: ['peerlynk', 'API Gateway'], specialization: ['Streams', 'Async Architecture'], years: '3+' },
  { name: 'Socket.io', category: 'Backend', slug: 'socketdotio', level: 'Advanced', experience: 'Real-time', usedIn: ['Chat Engines'], specialization: ['WebSockets', 'Broadcasting'], years: '2+' },
  { name: 'Prisma', category: 'Backend', slug: 'prisma', level: 'Advanced', experience: 'ORM Layer', usedIn: ['Database Layers'], specialization: ['Optimization', 'Schema Migrations'], years: '1+' },
  
  // Database
  { name: 'PostgreSQL', category: 'Database', slug: 'postgresql', level: 'Expert', experience: 'Relational Store', usedIn: ['peerlynk', 'Auth DB'], specialization: ['PL/pgSQL', 'Indexing'], years: '2+' },
  { name: 'MongoDB', category: 'Database', slug: 'mongodb', level: 'Expert', experience: 'Document Storage', usedIn: ['NoSQL Systems'], specialization: ['Aggregation', 'Clustering'], years: '3+' },
  { name: 'Redis', category: 'Database', slug: 'redis', level: 'Advanced', experience: 'Memory Cache', usedIn: ['Session Management'], specialization: ['Pub/Sub', 'InMemory'], years: '1+' },

  // Cloud & DevOps
  { name: 'Docker', category: 'Cloud', slug: 'docker', level: 'Advanced', experience: 'Containers', usedIn: ['Deployment Pipelines'], specialization: ['Multi-stage Builds'], years: '1+' },
  { name: 'Firebase', category: 'Cloud', slug: 'firebase', level: 'Expert', experience: 'BaaS', usedIn: ['Mobile Apps'], specialization: ['Realtime DB', 'Auth'], years: '3+' },
  { name: 'AWS', category: 'Cloud', slug: 'amazonaws', level: 'Intermediate', experience: 'Infrastructure', usedIn: ['S3', 'EC2'], specialization: ['Storage', 'Auto-scaling'], years: '1+' },

  // Mobile
  { name: 'React Native', category: 'Mobile', slug: 'react', level: 'Expert', experience: 'Native UI', usedIn: ['peerlynk App', 'Cloud Wallet'], specialization: ['Navigation', 'Performance'], years: '2+' },
];

const categoryData: { id: Category, icon: React.ReactNode, label: string }[] = [
  { id: 'All', icon: <Activity size={20} />, label: 'All Systems' },
  { id: 'Frontend', icon: <Code2 size={20} />, label: 'Frontend Ecosystem' },
  { id: 'Backend', icon: <Cog size={20} />, label: 'Backend Architecture' },
  { id: 'Database', icon: <Database size={20} />, label: 'Data Infrastructure' },
  { id: 'Mobile', icon: <Smartphone size={20} />, label: 'Mobile Architecture' },
  { id: 'Cloud', icon: <Cloud size={20} />, label: 'Cloud & Ops' },
];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [selectedTech, setSelectedTech] = useState<Technology | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeTechs = activeCategory === 'All' 
    ? techStack 
    : techStack.filter(t => t.category === activeCategory);

  return (
    <section id="ecosystem" ref={containerRef} className="py-32 px-6 relative overflow-hidden bg-brand-deep/20">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={cn(
          "absolute inset-0 transition-colors duration-1000 opacity-10",
          activeCategory === 'Frontend' ? 'bg-cyan-glow/20' : 
          activeCategory === 'Backend' ? 'bg-neon-purple/20' : 
          activeCategory === 'Database' ? 'bg-magenta/20' : 'bg-cyan-glow/10'
        )} />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] opacity-10" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-12 lg:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8 text-center md:text-left">
          <div className="w-full md:w-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-cyan-glow font-mono text-[10px] tracking-[0.4em] uppercase mb-4"
            >
              System_Modules // Production_Ready
            </motion.div>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white font-display uppercase tracking-tighter">
              Engineering <span className="gradient-text italic">Ecosystem</span>
            </h2>
          </div>
          <p className="text-white/40 font-mono text-[10px] uppercase tracking-[0.2em] max-w-sm leading-loose mx-auto md:mx-0">
            Technologies powering scalable digital infrastructure and high-performance digital ecosystems.
          </p>
        </div>

        {/* MOBILE CATEGORY NAVIGATION (Chips) */}
        <div className="flex lg:hidden overflow-x-auto hide-scrollbar gap-3 mb-10 pb-4 -mx-6 px-6">
          {categoryData.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-full border text-[12px] font-mono tracking-widest transition-all uppercase whitespace-nowrap backdrop-blur-xl relative overflow-hidden group",
                activeCategory === cat.id
                  ? "bg-cyan-glow/20 border-cyan-glow text-cyan-glow shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                  : "bg-[#0F0F19]/60 border-white/10 text-white/40 active:bg-white/10"
              )}
            >
              {/* Shine Sweep animation on active */}
              {activeCategory === cat.id && (
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none"
                />
              )}
              
              <span className={cn(
                "transition-transform duration-300",
                activeCategory === cat.id ? "scale-110" : "group-active:scale-95"
              )}>
                {cat.icon}
              </span>
              <span className="relative z-10">{cat.label}</span>
            </button>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-12 min-h-[500px]">
          {/* DESKTOP CATEGORY NAVIGATION PANEL */}
          <div className="hidden lg:block lg:w-80 flex-shrink-0">
            <div className="sticky top-32 glass rounded-[2.5rem] border border-white/5 p-4 bg-white/[0.02] backdrop-blur-2xl">
              <div className="space-y-2">
                {categoryData.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={cn(
                      "w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-500 group relative overflow-hidden",
                      activeCategory === cat.id 
                        ? "bg-white/[0.05] border border-white/10 shadow-lg" 
                        : "hover:bg-white/[0.02] border border-transparent"
                    )}
                  >
                    <div className="flex items-center gap-4 relative z-10">
                      <div className={cn(
                        "p-2.5 rounded-xl transition-all duration-500 group-hover:scale-110",
                        activeCategory === cat.id ? "bg-cyan-glow/20 text-cyan-glow" : "bg-white/5 text-white/30"
                      )}>
                        {cat.icon}
                      </div>
                      <span className={cn(
                        "text-xs font-mono tracking-widest transition-colors",
                        activeCategory === cat.id ? "text-white font-bold" : "text-white/40 group-hover:text-white/60"
                      )}>
                        {cat.label}
                      </span>
                    </div>

                    {activeCategory === cat.id && (
                      <>
                        <motion.div 
                          layoutId="active-nav-glow"
                          className="absolute inset-0 bg-gradient-to-r from-cyan-glow/5 to-transparent pointer-events-none" 
                        />
                        <motion.div 
                          layoutId="active-nav-indicator"
                          className="w-1 h-6 bg-cyan-glow rounded-full shadow-[0_0_15px_#06B6D4]" 
                        />
                      </>
                    )}
                  </button>
                ))}
              </div>

              {/* Status HUD in sidebar */}
              <div className="mt-8 p-6 border-t border-white/5 space-y-4">
                 <div className="flex items-center justify-between text-[8px] font-mono text-white/20 uppercase">
                    <span>System_Ops</span>
                    <span className="text-cyan-glow">Synchronized</span>
                 </div>
                 <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      key={activeCategory}
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1.5 }}
                      className="h-full bg-cyan-glow/40" 
                    />
                 </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Dynamic Technology Area */}
          <div className="flex-1 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full"
              >
                {activeTechs.map((tech) => (
                  <motion.div
                    key={tech.name}
                    layoutId={`tech-${tech.name}`}
                    onClick={() => setSelectedTech(tech)}
                    className="group relative cursor-pointer"
                  >
                    {/* COMPACT ARCHITECTURE NODE CARD */}
                    <div className="glass p-4 rounded-2xl border border-white/5 group-hover:border-white/10 transition-all duration-500 bg-white/[0.01] overflow-hidden flex flex-col items-center text-center">
                      <div className="relative mb-3">
                        <div className="absolute inset-0 bg-white/10 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <img 
                          src={`https://cdn.simpleicons.org/${tech.slug}/fff`} 
                          alt={tech.name}
                          className="w-8 h-8 object-contain filter group-hover:brightness-125 relative z-10 transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <div className="relative z-10">
                        <h4 className="text-white font-bold text-[12px] group-hover:text-cyan-glow transition-colors tracking-tight mb-1">{tech.name}</h4>
                        <div className="text-[9px] font-mono text-white/30 uppercase tracking-widest leading-none">
                          {tech.level} • {tech.years}
                        </div>
                      </div>

                      {/* Subtle Active Indicator */}
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-cyan-glow/0 group-hover:bg-cyan-glow/40 transition-all duration-500 rounded-full" />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* DETAIL MODAL OVERLAY */}
            <AnimatePresence>
              {selectedTech && (
                <div className="absolute inset-0 z-40 flex items-center justify-center p-4">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setSelectedTech(null)}
                    className="absolute inset-0 bg-brand-deep/80 backdrop-blur-md cursor-pointer"
                  />
                  <motion.div
                    layoutId={`tech-${selectedTech.name}`}
                    className="relative w-full max-w-lg glass p-10 rounded-[3rem] border border-cyan-glow/30 bg-brand-deep shadow-2xl z-50 overflow-hidden"
                  >
                    {/* Animated Circuit Background in card */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                       <div className="absolute top-0 right-0 w-64 h-64 border border-white rounded-full translate-x-1/2 -translate-y-1/2" />
                       <div className="absolute bottom-0 left-0 w-48 h-48 border border-white rounded-full -translate-x-1/2 translate-y-1/2" />
                    </div>

                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-8 md:mb-12">
                        <div className="flex items-center gap-4 md:gap-8">
                          <img src={`https://cdn.simpleicons.org/${selectedTech.slug}/fff`} alt={selectedTech.name} className="w-12 h-12 md:w-16 md:h-16 object-contain" />
                          <div>
                             <h3 className="text-2xl md:text-4xl font-bold font-display text-white mb-1 md:mb-2 italic tracking-tighter">{selectedTech.name}</h3>
                             <p className="text-cyan-glow font-mono text-[9px] md:text-xs uppercase tracking-[0.3em] font-bold">{selectedTech.experience} CAPABILITY</p>
                          </div>
                        </div>
                        <button onClick={() => setSelectedTech(null)} className="p-2 md:p-3 glass rounded-2xl border-white/10 hover:bg-white/5 transition-colors text-white/50">
                           <ChevronRight className="rotate-180" size={20} />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mb-8 md:mb-12">
                        <div className="space-y-3 md:space-y-4">
                          <label className="text-[9px] md:text-[10px] uppercase font-mono text-white/20 tracking-widest">Specialization</label>
                          <div className="flex flex-wrap gap-2">
                             {selectedTech.specialization.map(s => (
                               <span key={s} className="px-2 py-0.5 md:px-3 md:py-1 glass rounded-lg text-[9px] md:text-[10px] font-mono text-white/60">{s}</span>
                             ))}
                          </div>
                        </div>
                        <div className="space-y-3 md:space-y-4">
                          <label className="text-[9px] md:text-[10px] uppercase font-mono text-white/20 tracking-widest">Integrated Systems</label>
                          <div className="flex flex-wrap gap-2">
                             {selectedTech.usedIn.map(p => (
                               <span key={p} className="px-2 py-0.5 md:px-3 md:py-1 glass rounded-lg text-[9px] md:text-[10px] font-mono text-neon-purple font-bold tracking-tighter">{p}</span>
                             ))}
                          </div>
                        </div>
                      </div>

                      <div className="pt-8 md:pt-10 border-t border-white/5 flex items-center justify-between">
                         <div className="flex items-center gap-3 md:gap-4">
                            <Zap size={16} className="text-cyan-glow animate-pulse" />
                            <div className="text-[9px] md:text-[10px] font-mono text-white/30 uppercase tracking-widest">Efficiency: <span className="text-white font-bold">98.4%</span></div>
                         </div>
                         <button onClick={() => setSelectedTech(null)} className="px-5 py-2 md:px-8 md:py-3 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl text-[10px] md:text-xs font-mono text-white/50 hover:bg-white/10 transition-all uppercase tracking-widest">
                           Close System
                         </button>
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

            {/* Empty space placeholder for cinematic feel */}
            {!selectedTech && (
               <div className="absolute bottom-0 right-0 opacity-[0.02] pointer-events-none select-none hidden xl:block">
                  <div className="text-[200px] font-black font-display rotate-12 leading-none uppercase -mr-20">
                    CORE
                  </div>
               </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}


// Timeline.tsx
"use client";

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'motion/react';
import { 
  Zap, Network, Layers, Smartphone, Code, Sparkles, Database, ShieldCheck, Rocket, ArrowUpRight
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

const experiences = [
  {
    date: '2022',
    title: 'Computer Science Student',
    subtitle: 'Started B.Tech Journey',
    desc: 'Started exploring programming, development fundamentals, and modern software engineering concepts while pursuing B.Tech in Computer Science.',
    highlights: ['Programming foundations', 'Java, C, & Web dev', 'Frontend interfaces', 'Systems thinking'],
    tag: 'Foundation Initialized',
    icon: <Code size={20} />,
    color: 'text-blue-400',
  },
  {
    date: '2023',
    title: 'Full-Stack Developer',
    subtitle: 'Entered Development Phase',
    desc: 'Transitioned from learning basics to building complete applications using modern frontend and backend technologies.',
    highlights: ['Responsive web apps', 'React & Node.js', 'Databases & APIs', 'Scalable backend logic'],
    tag: 'Architecture Phase',
    icon: <Layers size={20} />,
    color: 'text-yellow-500',
  },
  {
    date: '2024',
    title: 'System Builder',
    subtitle: 'Scalable Systems & Mobile Engineering',
    desc: 'Focused on real-time communication systems, scalable architectures, and cross-platform mobile development.',
    highlights: ['Socket.io Real-time', 'React Native dev', 'API Optimization', 'Production Ready'],
    tag: 'Infrastructure Expansion',
    icon: <Smartphone size={20} />,
    color: 'text-magenta',
  },
  {
    date: '2024',
    title: 'AI Learning Platform',
    subtitle: 'Built NextWise',
    desc: 'Developed an AI-powered educational ecosystem focused on personalized learning experiences and intelligent roadmaps.',
    highlights: ['AI workflow integration', 'Scalable frontend', 'Modern UX Architecture', 'Learning pipelines'],
    tag: 'AI Systems Online',
    icon: <Sparkles size={20} />,
    color: 'text-cyan-400',
  },
  {
    date: '2024',
    title: 'FinTech System Development',
    subtitle: 'Cloud Wallet Infrastructure',
    desc: 'Engineered secure wallet infrastructure with modern fintech architecture and high-performance mobile experiences.',
    highlights: ['Secure transactions', 'Web3 concepts', 'Scalable mobile UI', 'Real-time sync'],
    tag: 'Secure Layer Activated',
    icon: <ShieldCheck size={20} />,
    color: 'text-purple-400',
  },
  {
    date: '2025',
    title: 'Founder & Lead Engineer',
    subtitle: 'Founded peerlynk',
    desc: 'Founded peerlynk — a scalable student ecosystem designed to transform networking, collaboration, communication, and digital identity for students.',
    highlights: ['Scalable infrastructure', 'Real-time systems', 'Auto-grouping AI', 'Mobile-first'],
    metrics: { growth: '400%', uptime: '99.9%', efficiency: 'High' },
    tag: 'Ecosystem Launch',
    icon: <Network size={24} />,
    color: 'text-cyan-400',
    isMain: true
  },
  {
    date: '2025',
    title: 'Health & Nutrition Platform',
    subtitle: 'CraveNutri Ecosystem',
    desc: 'Building a modern AI-powered nutrition ecosystem focused on personalized wellness and digital health experiences.',
    highlights: ['Smart health UX', 'Recommendation systems', 'Scalable frontend', 'Product thinking'],
    tag: 'Wellness Systems Active',
    icon: <Database size={20} />,
    color: 'text-green-500',
  }
];

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const backgroundYears = [2022, 2023, 2024, 2025];

  return (
    <section ref={sectionRef} className="py-32 px-6 relative bg-black overflow-visible">
      {/* Large background years */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {backgroundYears.map((year, i) => (
          <motion.div
            key={year}
            initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 0.05, x: 0 }}
            transition={{ duration: 1, delay: i * 0.2 }}
            viewport={{ once: true }}
            className={cn(
              "absolute font-black text-white font-display text-[18vw] whitespace-nowrap select-none tracking-tighter",
              i % 2 === 0 ? "left-0 -translate-x-1/4" : "right-0 translate-x-1/4",
              i === 0 && "top-[10%]",
              i === 1 && "top-[30%]",
              i === 2 && "top-[50%]",
              i === 3 && "top-[70%]"
            )}
          >
            {year}
          </motion.div>
        ))}
      </div>

      {/* Subtle animated glows */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-[10%] left-[5%] w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.35, 0.15] }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
          className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px]"
        />
      </div>

      <div className="app-container relative z-10">
        {/* Header */}
        <div className="mb-32 text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm"
          >
            <Zap size={14} className="text-cyan-400 animate-pulse" />
            <span className="text-cyan-400 font-mono text-[10px] tracking-[0.4em] uppercase">My Journey</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="text-5xl md:text-8xl font-bold text-white font-display uppercase tracking-tighter mb-8 leading-none"
          >
            Founder <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 bg-clip-text text-transparent animate-gradient">Evolution</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-white/60 text-lg md:text-2xl font-display italic tracking-tight"
          >
            From curiosity to building <span className="text-white">scalable digital ecosystems.</span>
          </motion.p>
        </div>

        {/* Timeline */}
        <div ref={containerRef} className="relative">
          {/* Central line with improved UI */}
          <div className="absolute left-[20px] lg:left-1/2 lg:-translate-x-1/2 top-0 bottom-0 w-[3px] bg-gradient-to-b from-cyan-500/20 via-purple-500/20 to-cyan-500/20 rounded-full">
            <div className="absolute inset-0 w-full bg-[repeating-linear-gradient(0deg,transparent,transparent_10px,rgba(6,182,212,0.3)_10px,rgba(6,182,212,0.3)_15px)] rounded-full" />
            <motion.div
              className="absolute top-0 left-0 right-0 bg-gradient-to-b from-cyan-400 via-purple-500 to-cyan-400 rounded-full shadow-[0_0_15px_cyan]"
              style={{ height: lineHeight }}
            />
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 w-3 h-3 bg-cyan-400 rounded-full shadow-lg shadow-cyan-500/80 ring-2 ring-white/50"
              style={{ top: lineHeight }}
            />
          </div>

          <div className="space-y-24 lg:space-y-40">
            {experiences.map((exp, idx) => {
              const isLeft = idx % 2 === 0;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 80, x: isLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, y: 0, x: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1, type: "spring", stiffness: 100 }}
                  viewport={{ once: true, margin: "-80px" }}
                  className={cn(
                    "relative flex flex-col lg:flex-row items-start lg:items-center gap-10 lg:gap-20",
                    !isLeft && "lg:flex-row-reverse"
                  )}
                >
                  {/* Year in empty space (above or below card, near center line) */}
                  <div className={cn(
                    "absolute z-30 whitespace-nowrap",
                    idx % 2 === 0 ? "-top-12 lg:-top-16" : "-bottom-12 lg:-bottom-16",
                    "left-[20px] lg:left-1/2 lg:-translate-x-1/2",
                    isLeft ? "lg:translate-x-[-45px]" : "lg:translate-x-[45px]"
                  )}>
                    <div className="bg-black/70 backdrop-blur-sm px-4 py-1.5 rounded-full border border-cyan-400/40 shadow-md">
                      <span className="text-cyan-300 font-mono text-sm font-bold tracking-wider">{exp.date}</span>
                    </div>
                  </div>

                  {/* Timeline node */}
                  <div className="absolute left-[20px] lg:left-1/2 lg:-translate-x-1/2 z-20 -translate-y-1/2 top-1/2">
                    <motion.div
                      whileHover={{ scale: 1.3, rotate: 360 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className={cn(
                        "w-10 h-10 lg:w-12 lg:h-12 rounded-2xl bg-black/90 backdrop-blur-sm border-2 flex items-center justify-center transition-all duration-300",
                        exp.isMain
                          ? "border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.8)]"
                          : "border-white/40 hover:border-white/70"
                      )}
                    >
                      <div className={cn("transition-all", exp.color)}>{exp.icon}</div>
                    </motion.div>
                    {exp.isMain && (
                      <div className="absolute inset-0 rounded-2xl border-2 border-cyan-400 animate-ping opacity-40" />
                    )}
                  </div>

                  {/* Card – fully visible with solid background */}
                  <div className={cn(
                    "w-full lg:w-[42%] ml-12 lg:ml-0",
                    isLeft ? "lg:mr-auto" : "lg:ml-auto"
                  )}>
                    <motion.div
                      whileHover={{ y: -12, scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 200 }}
                      className={cn(
                        "group relative p-8 lg:p-12 rounded-[2rem] border transition-all duration-300 backdrop-blur-sm overflow-hidden",
                        exp.isMain
                          ? "bg-gradient-to-br from-black/90 via-cyan-950/30 to-black/90 border-cyan-400/40 shadow-2xl shadow-cyan-500/30"
                          : "bg-black/80 border-white/15 hover:border-white/30 hover:shadow-xl"
                      )}
                    >
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                      <div className="relative z-10 space-y-6">
                        <div className="flex items-center justify-between">
                          <div className="bg-black/60 px-4 py-1 rounded-full text-[9px] font-mono text-white/80 uppercase tracking-wider border border-white/20 backdrop-blur-sm">
                            {exp.tag}
                          </div>
                          <div className="text-[10px] font-mono text-white/40 italic lg:hidden flex items-center gap-1">
                            <div className="w-1 h-1 rounded-full bg-cyan-400" />
                            {exp.date}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-white/60 text-xs font-mono uppercase tracking-widest mb-1">{exp.subtitle}</h4>
                          <h3 className={cn(
                            "text-3xl lg:text-4xl font-bold font-display tracking-tight",
                            exp.isMain ? "text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400" : "text-white"
                          )}>
                            {exp.title}
                          </h3>
                        </div>
                        <p className="text-white/70 text-sm lg:text-base leading-relaxed">{exp.desc}</p>
                        <div className="flex flex-wrap gap-2">
                          {exp.highlights.map((h, i) => (
                            <span key={i} className="px-3 py-1 bg-white/10 border border-white/10 rounded-lg text-[9px] font-mono text-white/70 hover:bg-white/20 transition">
                              {h}
                            </span>
                          ))}
                        </div>
                        {exp.metrics && (
                          <div className="grid grid-cols-3 gap-3 pt-6 border-t border-white/10">
                            {Object.entries(exp.metrics).map(([k, v]) => (
                              <div key={k} className="text-center">
                                <div className="text-[8px] font-mono text-white/40 uppercase mb-1">{k}</div>
                                <div className="text-sm lg:text-base font-bold text-white bg-white/5 rounded-lg py-1">{v}</div>
                              </div>
                            ))}
                          </div>
                        )}
                        {exp.isMain && (
                          <motion.a
                            href="https://peerlynk.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.02, gap: "0.75rem" }}
                            className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider hover:from-cyan-500/30 hover:to-purple-500/30 transition-all"
                          >
                            Explore Ecosystem <ArrowUpRight size={14} className="group-hover:translate-x-1 transition" />
                          </motion.a>
                        )}
                      </div>
                    </motion.div>
                  </div>
                  <div className="hidden lg:block lg:w-[42%]" />
                </motion.div>
              );
            })}

            {/* Future node */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative flex flex-col items-center justify-center pt-20"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-12 h-12 lg:w-16 lg:h-16 rounded-2xl bg-black/80 backdrop-blur-sm border border-white/20 flex items-center justify-center"
              >
                <Rocket size={24} className="text-white/40" />
              </motion.div>
              <div className="mt-8 text-center">
                <div className="text-cyan-400/60 font-mono text-[9px] tracking-[0.5em] uppercase mb-2">Next_Phase</div>
                <h4 className="text-white/60 font-display text-xl lg:text-2xl italic tracking-tight">
                  Building the future of scalable digital ecosystems.
                </h4>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s linear infinite;
        }
      `}</style>
    </section>
  );
}
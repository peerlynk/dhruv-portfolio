import { motion } from 'motion/react';
import { Zap, Globe, Cpu, Layers, Layout, Target, Smartphone } from 'lucide-react';

const principles = [
  {
    title: "Scalability at Core",
    desc: "Architecting distributed systems designed for 10x growth through horizontal scaling and modular services.",
    icon: <Layers size={24} />,
    color: "text-cyan-glow"
  },
  {
    title: "Performance Precision",
    desc: "Optimizing the critical path for sub-100ms response times and fluid, hardware-accelerated interactions.",
    icon: <Zap size={24} />,
    color: "text-neon-purple"
  },
  {
    title: "Real-time Connectivity",
    desc: "Designing low-latency event-driven systems for instant global state synchronization and live collaboration.",
    icon: <Globe size={24} />,
    color: "text-magenta"
  },
  {
    title: "Human-Centric Systems",
    desc: "Engineering intuitive interfaces that simplify complex underlying architectures for a premium user experience.",
    icon: <Target size={24} />,
    color: "text-blue-500"
  },
  {
    title: "Robust Maintainability",
    desc: "Prioritizing clean, well-documented, and type-safe code foundations for future-ready system evolution.",
    icon: <Cpu size={24} />,
    color: "text-yellow-500"
  },
  {
    title: "Full-Stack Integrity",
    desc: "Managing the entire lifecycle from database optimization to pixel-perfect frontend delivery.",
    icon: <Layout size={24} />,
    color: "text-green-500"
  }
];

export default function Methodology() {
  return (
    <section id="philosophy" className="py-32 px-6 relative overflow-hidden bg-brand-deep">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-24 text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-cyan-glow font-mono text-[10px] tracking-[0.4em] uppercase mb-4"
          >
            Engineering_Framework // Philosophy
          </motion.div>
          <h2 className="text-4xl md:text-7xl font-bold text-white font-display uppercase tracking-tighter mb-8">
            Engineering <span className="gradient-text italic">Philosophy</span>
          </h2>
          <p className="text-white/60 text-2xl md:text-3xl leading-snug tracking-tight font-display">
            I build systems with <span className="text-white">scalability, performance, and long-term maintainability</span> at the core of every architectural decision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {principles.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass p-10 rounded-[3rem] border border-white/5 group hover:border-cyan-glow/20 transition-all duration-500 bg-white/[0.01]"
            >
              <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-8 ${p.color} group-hover:scale-110 transition-transform`}>
                {p.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-4 italic tracking-tight">{p.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">
                {p.desc}
              </p>
              
              <div className="mt-8 flex gap-1 opacity-20 group-hover:opacity-100 transition-opacity">
                {[...Array(4)].map((_, j) => (
                   <div key={j} className="h-[2px] w-4 bg-cyan-glow rounded-full" />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

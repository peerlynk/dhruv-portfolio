import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';
import { Activity, Globe, Zap, Cpu } from 'lucide-react';
import { cn } from '@/src/lib/utils';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { label: 'System Uptime', value: '99.9', suffix: '%', icon: <Zap size={20} />, trend: '+0.001%', color: 'text-cyan-glow', tech: 'Elastic Load Balancing' },
  { label: 'Ecosystem Scale', value: '1.2', suffix: 'k+', icon: <Activity size={20} />, trend: '+14% / mo', color: 'text-neon-purple', tech: 'PostgreSQL Distributed' },
  { label: 'Global Throughput', value: '150', suffix: '+ TPS', icon: <Globe size={20} />, trend: 'Stable', color: 'text-magenta', tech: 'Redis Cluster' },
  { label: 'Development Core', value: '4.2', suffix: 'k+', icon: <Cpu size={20} />, trend: 'Continuous', color: 'text-blue-500', tech: 'Vercel Deployment' },
];

export default function Stats() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Counter animation logic
      const counters = document.querySelectorAll('.stat-value');
      counters.forEach(counter => {
        const target = parseFloat(counter.getAttribute('data-target') || '0');
        const duration = 2;
        
        gsap.to(counter, {
          innerText: target,
          duration: duration,
          snap: { innerText: 0.1 },
          ease: "power2.out",
          scrollTrigger: {
            trigger: counter,
            start: "top 85%",
          }
        });
      });

      gsap.from(".stat-card", {
        scale: 0.9,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="metrics" ref={containerRef} className="py-32 px-6 relative overflow-hidden bg-brand-deep">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-24">
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-cyan-glow font-mono text-[10px] tracking-[0.4em] uppercase mb-4"
            >
              System_Telemetry // Live_Metrics
            </motion.div>
            <h2 className="text-5xl md:text-8xl font-bold text-white font-display uppercase tracking-tighter italic">
              System <span className="gradient-text italic">Metrics</span>
            </h2>
          </div>
          <p className="text-white/40 font-mono text-[10px] uppercase tracking-[0.2em] max-w-sm leading-loose">
            Real-time performance indicators and operational scale of deployed digital ecosystems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="stat-card group">
              <div className="glass p-10 rounded-[3rem] border border-white/5 bg-white/[0.01] hover:border-cyan-glow/20 transition-all duration-700 h-full relative overflow-hidden">
                {/* Micro-grid background */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:10px_10px] opacity-10" />
                
                <div className="flex justify-between items-start mb-8">
                  <div className={cn("p-3 rounded-xl bg-white/5", stat.color)}>
                    {stat.icon}
                  </div>
                  <div className="text-[10px] font-mono text-green-500/80 bg-green-500/10 px-2 py-0.5 rounded-full">
                    {stat.trend}
                  </div>
                </div>

                <div className="relative mb-6">
                  <div className="flex items-baseline gap-1">
                    <span 
                      className="text-6xl font-bold text-white font-display stat-value tracking-tighter italic"
                      data-target={stat.value}
                    >
                      0
                    </span>
                    <span className="text-xl font-bold text-white/30 font-display italic">
                      {stat.suffix}
                    </span>
                  </div>
                  <div className="text-[10px] font-mono text-white/20 uppercase tracking-[0.3em] mt-2">
                    {stat.label}
                  </div>
                </div>

                <div className="pt-6 border-t border-white/5">
                  <div className="flex items-center gap-2 text-[8px] font-mono text-white/30 uppercase">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-glow/40 animate-pulse" />
                    Powered_By: {stat.tech}
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


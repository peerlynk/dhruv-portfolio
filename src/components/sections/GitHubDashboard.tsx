import { motion } from 'motion/react';
import { Github, Activity, Terminal, Zap } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useGitHubStats } from '@/src/hooks/useGitHubStats';

export default function GitHubDashboard() {
  // Replace 'your-username' with your actual GitHub username
  const { contributions, repoCount, loading, error } = useGitHubStats('peerlynk');

  // Prepare the stats for display, showing loading skeletons or error messages
  // const stats = [
  //   { 
  //     label: 'System Commits', 
  //     value: loading ? '...' : (error ? 'Err' : `${contributions?.toLocaleString() ?? 'N/A'}+`), 
  //     sub: loading ? 'Fetching from GitHub...' : (error ? 'Auth/Rate Limit?' : 'Last 12 Months'), 
  //     icon: <Github size={14} />, 
  //     color: 'text-cyan-glow' 
  //   },
  //   { 
  //     label: 'Architecture Level', 
  //     value: loading ? '...' : (error ? 'Offline' : 'L4'), 
  //     sub: loading ? '---' : (error ? 'Fetch Failed' : 'Foundational Ecosystem'), 
  //     icon: <Zap size={14} />, 
  //     color: 'text-neon-purple' 
  //   },
  //   { 
  //     label: 'Cloud Stability', 
  //     value: loading ? '...' : (error ? 'Degraded' : '99.9%'), 
  //     sub: loading ? '---' : (error ? 'Service Error' : 'Production Uptime'), 
  //     icon: <Activity size={14} />, 
  //     color: 'text-green-500' 
  //   },
  // ];
  const stats = [
  { 
    label: 'Contributions (last year)', 
    value: loading ? '...' : (error ? 'Err' : contributions.toLocaleString()), 
    sub: 'GitHub Activity', 
    icon: <Github size={14} />, 
    color: 'text-cyan-glow' 
  },
  { 
    label: 'Total Stars Earned', 
    value: loading ? '...' : (error ? 'Err' : totalStars.toLocaleString()), 
    sub: 'Across all repos', 
    icon: <Zap size={14} />, 
    color: 'text-neon-purple' 
  },
  { 
    label: 'Repositories', 
    value: loading ? '...' : (error ? 'Err' : repoCount), 
    sub: 'Public projects', 
    icon: <Activity size={14} />, 
    color: 'text-green-500' 
  },
];

  return (
    <section id="telemetry" className="py-32 px-6 relative overflow-hidden bg-brand-deep">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-cyan-glow font-mono text-[10px] tracking-[0.4em] uppercase mb-4"
            >
              Console // Realtime_Sync
            </motion.div>
            <h2 className="text-5xl md:text-8xl font-bold text-white font-display uppercase tracking-tighter">
              Live <span className="gradient-text italic">Console</span>
            </h2>
          </div>
          <div className="flex items-center gap-4">
             <div className="hidden lg:flex flex-col items-end text-right">
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Global_Status</span>
                <span className="text-sm font-bold text-cyan-glow flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-cyan-glow animate-pulse" />
                   ALL_SYSTEMS_OPERATIONAL
                </span>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Terminal Console */}
          <div className="lg:col-span-8 group">
            <div className="glass h-[500px] rounded-[3rem] border border-white/5 bg-black/40 overflow-hidden relative flex flex-col shadow-2xl group-hover:border-cyan-glow/20 transition-all duration-700">
               {/* Terminal Header */}
               <div className="px-8 py-4 bg-white/5 border-b border-white/5 flex items-center justify-between">
                  <div className="flex gap-2">
                     <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/40" />
                     <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/40" />
                     <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/40" />
                  </div>
                  <div className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em]">
                    system_console // root@dhruvpal.sh
                  </div>
               </div>

               {/* Console Content */}
               <div className="p-8 font-mono text-xs sm:text-sm text-cyan-glow/60 space-y-4 overflow-y-auto custom-scrollbar flex-1">
                  <div className="text-white/40 mb-8">[System Initialized] Loading core modules...</div>
                  
                  <div className="flex gap-4">
                     <span className="text-neon-purple opacity-50 italic">{'>'}</span>
                     <p className="text-white/80">initializing peerlynk ecosystem architecture...</p>
                  </div>
                  <div className="ml-8 space-y-2 opacity-50">
                     <div className="flex justify-between items-center bg-white/5 p-2 rounded">
                        <span>Database_Migrate: postgresql://dhruvpal_db</span>
                        <span className="text-green-500">[SUCCESS]</span>
                     </div>
                     <div className="flex justify-between items-center bg-white/5 p-2 rounded">
                        <span>Socket_Cluster: init_workers(8)</span>
                        <span className="text-green-500">[ONLINE]</span>
                     </div>
                     <div className="flex justify-between items-center bg-white/5 p-2 rounded">
                        <span>Load_Balancer: round_robin_sync</span>
                        <span className="text-green-500">[STABLE]</span>
                     </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                     <span className="text-neon-purple opacity-50 italic">{'>'}</span>
                     <p className="text-white/80 italic animate-pulse tracking-widest text-[10px] uppercase">Waiting for input_</p>
                  </div>

                  <div className="absolute bottom-8 right-8">
                     <div className="glass px-4 py-2 rounded-xl text-[10px] uppercase tracking-widest text-cyan-glow border-cyan-glow/20 flex items-center gap-3">
                        <Activity size={12} className="animate-pulse" />
                        84Hz Live Trace
                     </div>
                  </div>
               </div>
            </div>
          </div>

          {/* Activity Cards */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass p-8 rounded-[2.5rem] border border-white/5 group hover:border-cyan-glow/30 transition-all duration-700 bg-white/[0.01]"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={cn("p-3 glass rounded-xl border-white/5", stat.color)}>
                    {stat.icon}
                  </div>
                  <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest">{stat.label}</div>
                </div>
                <div className="flex items-end gap-3">
                  <span className="text-4xl font-bold text-white font-display italic tracking-tighter">{stat.value}</span>
                  <span className="text-[10px] font-mono text-green-500 mb-1 opacity-60 italic">{stat.sub}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

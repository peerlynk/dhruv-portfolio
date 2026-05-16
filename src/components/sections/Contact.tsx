import { motion } from 'motion/react';
import { Send, Mail, MapPin, Globe, Terminal, Shield, Zap, Radio, Briefcase, Github } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-32 px-6 relative overflow-hidden bg-brand-deep/20">
      {/* Background Transmission Waves */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.05]">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ scale: [1, 2], opacity: [0.5, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay: i * 1.5, ease: "easeOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-cyan-glow rounded-full"
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          {/* Left Side: Connection Info */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-cyan-glow font-mono text-[10px] tracking-[0.4em] uppercase mb-4 flex items-center gap-3"
            >
              <Radio size={14} className="animate-pulse" />
              Secure_System_Gateway
            </motion.div>
            <h2 className="text-5xl md:text-8xl font-bold text-white font-display mb-10 uppercase tracking-tighter">
              Let's build the <span className="gradient-text italic">Future</span>
            </h2>
            <p className="text-white/60 text-xl mb-12 max-w-md font-display italic leading-snug tracking-tight">
              Every scalable system starts with a single connection. Let's engineer the future of digital infrastructure together.
            </p>

            <div className="space-y-6">
              {[
                { icon: <Mail size={22} />, label: 'Email', value: 'pal664908@gmail.com', href: 'mailto:pal664908@gmail.com', color: 'text-neon-purple' },
                { icon: <MapPin size={22} />, label: 'Location', value: 'India', href: '#', color: 'text-cyan-glow' },
                { icon: <Briefcase size={22} />, label: 'Lead Contact', value: '8439621339', href: 'tel:8439621339', color: 'text-magenta' }
              ].map((item, i) => (
                <motion.a
                  key={i}
                  href={item.href}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-6 group cursor-pointer"
                >
                  <div className={`p-4 glass rounded-2xl border border-white/5 group-hover:border-cyan-glow/30 transition-all ${item.color} group-hover:scale-105 duration-500`}>
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-mono text-white/20 tracking-[0.3em] mb-0.5">{item.label}</div>
                    <div className="text-xl font-bold text-white group-hover:text-cyan-glow transition-colors font-display tracking-tight">{item.value}</div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Right Side: Deployment Form */}
          <div className="relative">
             <div className="absolute inset-0 bg-cyan-glow/5 blur-[120px] rounded-full pointer-events-none" />
             
             <div className="glass p-10 md:p-14 rounded-[4rem] border border-white/5 relative bg-brand-deep shadow-black shadow-2xl overflow-hidden group hover:border-cyan-glow/20 transition-all duration-700">
                <div className="flex items-center gap-3 mb-10 pb-6 border-b border-white/5 opacity-50">
                   <Terminal size={16} className="text-cyan-glow" />
                   <span className="text-[10px] font-mono tracking-[0.4em] uppercase font-bold text-white/50">Start a Conversation</span>
                </div>

                <form className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em] ml-1 font-bold">Identity</label>
                      <input 
                        type="text" 
                        placeholder="Full Name"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white focus:outline-none focus:border-cyan-glow/30 focus:bg-white/10 transition-all font-mono text-sm placeholder:opacity-20"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em] ml-1 font-bold">Email</label>
                      <input 
                        type="email" 
                        placeholder="email@example.com"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white focus:outline-none focus:border-cyan-glow/30 focus:bg-white/10 transition-all font-mono text-sm placeholder:opacity-20"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em] ml-1 font-bold">Message</label>
                    <textarea 
                      rows={5}
                      placeholder="Input project details or specific inquiries..."
                      className="w-full bg-white/5 border border-white/10 rounded-3xl p-6 text-white focus:outline-none focus:border-cyan-glow/30 focus:bg-white/10 transition-all font-mono text-sm resize-none placeholder:opacity-20"
                    />
                  </div>

                  <button className="w-full interactive group relative py-6 bg-cyan-glow text-brand-deep rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] overflow-hidden transition-all hover:scale-[1.02] active:scale-98 shadow-[0_20px_60px_-10px_rgba(6,182,212,0.4)]">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    <div className="relative z-10 flex items-center justify-center gap-4">
                      <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      <span>Send Message</span>
                    </div>
                  </button>
                </form>
             </div>
          </div>
        </div>

        {/* Cinematic Grand Finale */}
        <div className="pt-32 pb-16 text-center border-t border-white/5">
           <motion.div
             initial={{ opacity: 0, y: 40 }}
             whileInView={{ opacity: 1, y: 0 }}
             className="space-y-12"
           >
              <h3 className="text-6xl md:text-[8rem] font-bold text-white font-display uppercase tracking-tighter opacity-90 leading-none">
                 Building the <span className="gradient-text italic">Future</span>
              </h3>
              
              <div className="flex flex-col items-center gap-8">
                 <div className="flex items-center gap-4 text-cyan-glow font-mono text-[10px] tracking-[0.6em] uppercase">
                    <div className="w-12 h-[1px] bg-cyan-glow/30" />
                    Dhruv Pal // Software Engineer // System Architect
                    <div className="w-12 h-[1px] bg-cyan-glow/30" />
                 </div>
                 
                 <div className="flex gap-4">
                    {[
                      { icon: <Github size={20}/>, href: 'https://github.com/dhruvpal0' },
                      { icon: <Briefcase size={20}/>, href: 'https://www.linkedin.com/in/dhruv-pal-59b584253/' },
                      { icon: <Globe size={20}/>, href: 'https://peerlynk.com' }
                    ].map((item, i) => (
                       <a 
                        key={i} 
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-4 glass rounded-2xl border-white/5 hover:border-cyan-glow/30 transition-all cursor-pointer text-white/40 hover:text-cyan-glow"
                       >
                          {item.icon}
                       </a>
                    ))}
                 </div>
              </div>
           </motion.div>
        </div>
      </div>

    </section>
  );
}

import { Github, Linkedin, Twitter, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-20 px-6 mt-20">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[calc(100%-40px)] h-[1px] bg-gradient-to-r from-transparent via-neon-purple to-transparent" />

      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <div className="text-2xl font-bold gradient-text mb-8">
           {'{'} Dhruv Pal {'}'}
        </div>

        <div className="font-mono text-cyan-glow/60 mb-12 text-center text-sm md:text-base animate-pulse">
           {">"} Let's build something impactful together. <span className="w-2 h-4 bg-cyan-glow inline-block align-middle ml-1" />
        </div>

        <div className="flex gap-8 mb-16">
          {[
            { icon: <Github size={20} />, href: 'https://github.com/dhruvpal0' },
            { icon: <Linkedin size={20} />, href: 'https://www.linkedin.com/in/dhruv-pal-59b584253/' },
            { icon: <Twitter size={20} />, href: 'https://x.com/Dhruv_Pal0' }
          ].map((social, i) => (
             <a 
              key={i} 
              href={social.href} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-4 glass rounded-full text-white/40 hover:text-cyan-glow hover:scale-110 transition-all border-white/5"
             >
                {social.icon}
             </a>
          ))}
        </div>

        <div className="flex flex-col md:flex-row justify-between w-full border-t border-white/5 pt-8 text-[10px] text-white/20 font-mono uppercase tracking-[0.2em]">
           <div>© 2025 Dhruv Pal — Crafted with neon and code.</div>
           <div className="mt-4 md:mt-0 flex gap-6">
              <span className="hover:text-cyan-glow cursor-pointer">Security Protocol</span>
              <span className="hover:text-cyan-glow cursor-pointer">Terminal Access</span>
           </div>
        </div>
      </div>

      {/* Back to top */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-10 right-10 p-4 glass rounded-full text-white/40 hover:text-cyan-glow hover:border-cyan-glow transition-all group z-40 hidden md:flex"
      >
        <ArrowUp className="group-hover:-translate-y-1 transition-transform" />
      </button>
    </footer>
  );
}

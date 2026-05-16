import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import gsap from 'gsap';
import { 
  Terminal, 
  Cpu, 
  Github, 
  Linkedin, 
  Mail, 
  Globe, 
  ExternalLink, 
  Quote as QuoteIcon, 
  Activity,
  Zap,
  Download,
  Twitter,
  Instagram,
  X
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

const MONITOR_CODE = [
  {
    title: "React Component",
    lang: "tsx",
    content: `const HeroSection = () => {\n  const [active, setActive] = useState(false);\n\n  return (\n    <div className="hero-container">\n      <h1>Dhruv Pal</h1>\n    </div>\n  );\n};`,
    position: "top-[10%] left-[10%]",
    rotate: "rotate-3",
  },
  {
    title: "Node.js API",
    lang: "js",
    content: `router.post("/login", async (req, res) => {\n  const user = await User.findOne();\n  const token = jwt.sign({ id: user.id });\n  res.json({ token, user });\n});`,
    position: "bottom-[15%] left-[5%]",
    rotate: "-rotate-2",
  },
  {
    title: "Python AI",
    lang: "py",
    content: `def predict_user(data):\n  # Load trained weights\n  model.load('weights.h5')\n  return model.predict(data)\n\nprint(predict_user(user_data))`,
    position: "top-[20%] right-[10%]",
    rotate: "-rotate-3",
  },
  {
    title: "PostgreSQL",
    lang: "sql",
    content: `SELECT users.name, posts.title\nFROM users\nJOIN posts ON users.id = posts.user_id\nWHERE users.role = 'admin'\nORDER BY posts.created_at DESC;`,
    position: "bottom-[20%] right-[5%]",
    rotate: "rotate-2",
  },
  {
    title: "TypeScript Types",
    lang: "ts",
    content: `interface UserProps {\n  name: string;\n  role: 'founder' | 'engineer';\n  skills: string[];\n  isOnline: boolean;\n}`,
    position: "top-[40%] right-[15%]",
    rotate: "rotate-6",
  }
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [terminalText, setTerminalText] = useState('');
  const fullTerminalText = '// HELLO_WORLD();';

  useEffect(() => {
    // Terminal typing effect
    let i = 0;
    const interval = setInterval(() => {
      setTerminalText(fullTerminalText.slice(0, i));
      i++;
      if (i > fullTerminalText.length) clearInterval(interval);
    }, 100);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from(".hero-title-main", {
        opacity: 0,
        y: 100,
        skewY: 10,
        duration: 1.5,
        ease: "power4.out",
        stagger: 0.2
      })
      .from(".hero-subtitle", {
        opacity: 0,
        x: -50,
        duration: 1,
        ease: "power3.out"
      }, "-=1")
      .from(".hero-desc", {
        opacity: 0,
        duration: 1,
      }, "-=0.5")
      .from(".hero-cta", {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.8
      }, "-=0.8")
      .from(".floating-hud", {
        opacity: 0,
        scale: 0.8,
        stagger: 0.15,
        duration: 1.2,
        ease: "back.out(1.7)"
      }, "-=1");

      // Parallax effect
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 40;
        const yPos = (clientY / window.innerHeight - 0.5) * 40;

        gsap.to(".parallax-bg", {
          x: xPos * 0.5,
          y: yPos * 0.5,
          duration: 1,
          ease: "power2.out"
        });

        if (imageRef.current) {
          gsap.to(imageRef.current, {
            rotateY: xPos * 0.3,
            rotateX: -yPos * 0.3,
            duration: 1,
            ease: "power2.out"
          });
        }

        // Parallax for monitors (individual speeds)
        const monitorElements = document.querySelectorAll(".monitor-item");
        monitorElements.forEach((el, idx) => {
          const speed = 0.2 + (idx * 0.1);
          gsap.to(el, {
            x: xPos * -speed,
            y: yPos * -speed,
            duration: 1.5,
            ease: "power2.out"
          });
        });
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }, containerRef);

    return () => {
      ctx.revert();
      clearInterval(interval);
    };
  }, []);

  const scrollToSystems = () => {
    const element = document.getElementById('systems');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-[100svh] w-full flex items-center justify-center overflow-hidden"
    >
      {/* Background Layered Content - Realistic Monitors */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        <div className="absolute inset-0 opacity-20">
          {MONITOR_CODE.map((monitor, idx) => (
            <div 
              key={idx}
              className={cn(
                "absolute glass rounded-xl border border-white/10 p-0 w-[280px] md:w-[360px] blur-[0.5px] group monitor-item overflow-hidden shadow-2xl",
                monitor.position,
                monitor.rotate
              )}
            >
              {/* Window Title Bar */}
              <div className="bg-white/5 px-3 py-2 flex items-center justify-between border-b border-white/5">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-red-500/40" />
                  <div className="w-2 h-2 rounded-full bg-yellow-500/40" />
                  <div className="w-2 h-2 rounded-full bg-green-500/40" />
                </div>
                <div className="text-[9px] font-mono text-white/40 tracking-widest uppercase font-bold">
                  {monitor.title}
                </div>
                <div className="w-10" /> {/* Spacer */}
              </div>

              <div className="p-4 font-mono text-[9px] md:text-[10px] text-cyan-glow/60 leading-relaxed overflow-hidden bg-[#0a0a0f]/40 relative min-h-[120px]">
                <div className="absolute inset-0 bg-gradient-to-b from-cyan-glow/5 via-transparent to-transparent h-full w-full pointer-events-none opacity-20 animate-pulse" />
                <pre className="relative z-10">{monitor.content}</pre>
                <span className="w-1.5 h-3.5 bg-cyan-glow/40 inline-block animate-pulse ml-1 align-middle" />
                
                {/* Subtle Ambient Glow per monitor */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-glow/5 to-transparent opacity-30 group-hover:opacity-50 transition-opacity" />
              </div>

              {/* Scanline effect */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[size:100%_2px] pointer-events-none rounded-xl opacity-40" />
            </div>
          ))}
        </div>

        {/* Ambient atmospheric glows behind monitors */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-glow/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple/5 blur-[120px] rounded-full" />

        {/* Perspective Desk Projection */}
        <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[140%] h-[400px] border-t border-cyan-glow/20 bg-gradient-to-b from-cyan-glow/[0.03] to-transparent [transform:perspective(1000px)_rotateX(75deg)] z-0" />
      </div>

      {/* Vertical Social Dock - Left Side */}
      <div className="fixed left-6 md:left-12 top-1/2 -translate-y-1/2 flex flex-col gap-8 z-50 hidden md:flex">
        {[
          { icon: Github, href: "https://github.com/dhruvpal0", label: "GitHub" },
          { icon: Linkedin, href: "https://www.linkedin.com/in/dhruv-pal-59b584253/", label: "LinkedIn" },
          { icon: Twitter, href: "https://x.com/Dhruv_Pal0", label: "twitter" },
          { icon: Instagram, href: "https://www.instagram.com/rock._dhruv_/", label: "Instagram" },
        ].map((item, idx) => (
          <motion.a
            key={idx}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ x: 5, scale: 1.1 }}
            className="group relative flex items-center justify-center w-12 h-12 glass rounded-full text-white/40 hover:text-cyan-glow transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:border-cyan-glow/50"
          >
            <item.icon size={20} />
            <span className="absolute left-full ml-4 px-2 py-1 bg-brand-deep border border-white/10 rounded text-[10px] font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all pointer-events-none">
              {item.label}
            </span>
          </motion.a>
        ))}
      </div>

      <div className="app-container grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10 mx-auto justify-items-center mt-20 lg:mt-0">
        {/* Left SideContent */}
        <div className="text-center lg:text-left flex flex-col items-center lg:items-start w-full max-w-xl">
          {/* Terminal Intro */}
          <div className="mb-8 h-6">
            <span className="font-mono text-cyan-glow text-sm tracking-widest flex items-center justify-center lg:justify-start">
              {terminalText}
              <span className="w-2 h-4 bg-cyan-glow ml-1 animate-pulse" />
            </span>
          </div>

          <h1 className="hero-title mb-6 md:mb-8">
            <div className="hero-title-main text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40 font-display text-5xl sm:text-7xl md:text-[11rem] font-black leading-[1.1] md:leading-[0.8] tracking-tighter drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
              Dhruv Pal
            </div>
          </h1>

          <div className="hero-subtitle mb-6 md:mb-8 relative">
            <h2 className="text-sm sm:text-xl md:text-2xl font-bold font-mono tracking-widest text-cyan-glow uppercase leading-relaxed">
              Software Engineer • System Builder • Founder
            </h2>
          </div>

          <p className="hero-desc text-white/60 text-lg md:text-xl max-w-xl mb-12 leading-relaxed font-sans mx-auto lg:mx-0">
            Architecting <span className="text-white font-medium">scalable digital ecosystems</span> for the future of connected student infrastructure.
          </p>

          <div className="hero-cta flex flex-col lg:flex-row gap-4 justify-center lg:justify-start items-center w-full">
            <button 
              onClick={scrollToSystems}
              className="interactive w-[90%] lg:w-auto px-6 lg:px-10 py-4 lg:py-5 bg-cyan-glow text-brand-deep hover:bg-white rounded-2xl font-black text-xs tracking-widest uppercase transition-all flex items-center justify-center gap-3 group shadow-[0_20px_40px_-10px_rgba(6,182,212,0.4)]"
            >
              Explore Systems
              <Zap size={18} className="fill-current animate-pulse" />
            </button>
            <button 
              onClick={scrollToSystems}
              className="interactive w-[90%] lg:w-auto px-6 lg:px-10 py-4 lg:py-5 glass border border-white/10 rounded-2xl font-bold text-white text-sm hover:border-cyan-glow/50 hover:bg-white/5 transition-all flex items-center justify-center gap-3 group"
            >
              View Architecture
              <ExternalLink size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform opacity-40 group-hover:opacity-100" />
            </button>
            <button 
              onClick={scrollToContact}
              className="interactive w-[90%] lg:w-auto py-4 lg:py-0 text-white/40 hover:text-white font-bold transition-all flex items-center justify-center gap-2 px-4 group text-sm"
            >
              Contact
              <Mail size={18} className="group-hover:scale-110 transition-transform opacity-40 group-hover:opacity-100" />
            </button>
          </div>
        </div>

        {/* Right Side Image */}
        <div className="relative flex justify-center items-center w-full mt-10 lg:mt-0">
          <div className="relative w-[80%] md:w-full max-w-[280px] md:max-w-lg perspective-1000">
            {/* Glow Portal */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-cyan-glow/10 blur-[150px] rounded-full -z-10" />

            <div className="relative z-10 p-2 group">
              {/* Corner Glow Accents */}
              <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-cyan-glow/40 rounded-tl-[3rem] blur-[1px] opacity-30" />
              <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-neon-purple/40 rounded-br-[3rem] blur-[1px] opacity-30" />

              <div 
                ref={imageRef}
                className="relative z-10 transition-transform duration-300 ease-out preserve-3d"
              >
                <img
                  src="https://res.cloudinary.com/dqppqvblk/image/upload/v1778862265/dhruvPortfolioImage_n2o3c4.png"
                  alt="Dhruv Pal"
                  className="w-full h-auto rounded-[3rem] shadow-2xl brightness-90 group-hover:brightness-105 transition-all duration-700"
                />
                
                {/* Image Contours */}
                <div className="absolute inset-0 rounded-[3rem] border border-cyan-glow/20 group-hover:border-cyan-glow/40 transition-colors pointer-events-none" />
              </div>
            </div>

            {/* Floating HUD Panels */}
            
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="floating-hud absolute -top-12 -left-16 glass rounded-2xl z-20 hidden md:block border-cyan-glow/30 shadow-2xl overflow-hidden"
            >
              <div className="bg-white/5 p-2 px-4 border-b border-white/5 flex justify-between items-center gap-4">
                 <div className="text-[8px] font-mono text-white/40 tracking-tighter uppercase">Status_Feed</div>
                 <div className="w-1.5 h-1.5 rounded-full bg-cyan-glow animate-pulse" />
              </div>
              <div className="p-5 space-y-3">
                <div className="flex items-center gap-3">
                  <Activity size={12} className="text-cyan-glow" />
                  <div className="text-[9px] font-mono text-white/50">GRID: <span className="text-cyan-glow">ACTIVE</span></div>
                </div>
                <div className="flex items-center gap-3">
                  <Zap size={12} className="text-neon-purple" />
                  <div className="text-[9px] font-mono text-white/50">CORE: <span className="text-neon-purple">STABLE</span></div>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="floating-hud absolute top-20 -right-20 glass rounded-2xl z-20 hidden xl:block w-56 border-neon-purple/20 shadow-2xl overflow-hidden"
            >
              <div className="bg-white/5 p-3 flex items-center justify-between border-b border-white/5">
                <div className="flex gap-1 text-[8px] font-mono text-white/30 uppercase tracking-tighter">Terminal_v4</div>
              </div>
              <div className="p-4 font-mono text-[9px] leading-relaxed">
                <div className="text-cyan-glow">dhruv@dev:~$ <span className="text-white">whoami</span></div>
                <div className="text-white/60 mt-1">
                  {`> Software Engineer\n> Founder\n> Architect`}
                </div>
                <div className="mt-2 text-neon-purple animate-pulse">_</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
      `}</style>
    </section>
  );
}

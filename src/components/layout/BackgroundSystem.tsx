import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function BackgroundSystem() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const particles: Particle[] = [];
    const particleCount = window.innerWidth < 768 ? 40 : 120;
    const codeRainStrings: CodeRain[] = [];
    const codeRainCount = 8;

    class CodeRain {
      x: number;
      y: number;
      speed: number;
      chars: string[];
      opacity: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.speed = Math.random() * 2 + 1;
        this.chars = (Math.random() > 0.5 ? '01' : 'ABCDEF0123456789').split('');
        this.opacity = Math.random() * 0.15 + 0.05;
      }

      update() {
        this.y += this.speed;
        if (this.y > height) {
          this.y = -100;
          this.x = Math.random() * width;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.font = '10px monospace';
        ctx.fillStyle = '#06B6D4';
        ctx.globalAlpha = this.opacity;
        const char = this.chars[Math.floor(Math.random() * this.chars.length)];
        ctx.fillText(char, this.x, this.y);
        ctx.globalAlpha = 1;
      }
    }

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      color: string;
      originalSize: number;

      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 0.5;
        this.originalSize = this.size;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.4;
        this.opacity = Math.random() * 0.4 + 0.1;
        const colors = ['#8B5CF6', '#3B82F6', '#06B6D4', '#D946EF', '#FFFFFF'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > width) this.x = 0;
        else if (this.x < 0) this.x = width;
        if (this.y > height) this.y = 0;
        else if (this.y < 0) this.y = height;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    for (let i = 0; i < particleCount; i++) particles.push(new Particle());
    for (let i = 0; i < codeRainCount; i++) codeRainStrings.push(new CodeRain());

    let animationFrameId: number;
    let mouseX = width / 2;
    let mouseY = height / 2;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Deep layered gradient base
      const gradient = ctx.createRadialGradient(
        mouseX, mouseY, 0,
        width / 2, height / 2, width * 0.8
      );
      gradient.addColorStop(0, '#020617');
      gradient.addColorStop(0.4, '#050505');
      gradient.addColorStop(1, '#020617');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Subtle fog effect in background
      ctx.globalAlpha = 0.05;
      ctx.fillStyle = '#1e1b4b'; // Deep indigo/purple
      ctx.beginPath();
      ctx.arc(width * 0.7, height * 0.3, width * 0.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;

      codeRainStrings.forEach(s => {
        s.update();
        s.draw();
      });

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      const xPercent = (e.clientX / width - 0.5) * 2;
      const yPercent = (e.clientY / height - 0.5) * 2;

      // Parallax updates for various layers
      if (containerRef.current) {
        gsap.to('.layer-parallax-deep', { x: xPercent * 20, y: yPercent * 20, duration: 1.5, ease: 'power2.out' });
        gsap.to('.layer-parallax-mid', { x: xPercent * 40, y: yPercent * 40, duration: 1.2, ease: 'power2.out' });
        gsap.to('.layer-parallax-near', { x: xPercent * 60, y: yPercent * 60, duration: 1.0, ease: 'power2.out' });
        
        // Update custom cursor light position
        gsap.to('#cursor-light-advanced', { 
          left: e.clientX, 
          top: e.clientY, 
          duration: 0.2, 
          ease: 'power1.out' 
        });
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 -z-10 bg-[#020617] pointer-events-none overflow-hidden select-none">
      <canvas ref={canvasRef} className="w-full h-full opacity-60" />

      {/* Layer 1: Atmospheric Fog Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-neon-purple/10 blur-[180px] rounded-full animate-blob-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-glow/10 blur-[180px] rounded-full animate-blob-pulse-delayed" />
        <div className="absolute top-[30%] right-[20%] w-[40%] h-[40%] bg-electric-blue/5 blur-[150px] rounded-full" />
      </div>

      {/* Layer 2: Subtle Depth Blobs */}
      <div className="absolute inset-0 layer-parallax-deep opacity-20 pointer-events-none">
        <div className="absolute top-[20%] left-[15%] w-[400px] h-[400px] bg-neon-purple/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[20%] right-[15%] w-[400px] h-[400px] bg-cyan-glow/5 blur-[120px] rounded-full" />
      </div>

      {/* Layer 3: Cyber Floor Grid & Perspective */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200%] h-full pointer-events-none">
        <div 
          className="absolute bottom-0 left-0 w-full h-[60%] bg-[linear-gradient(to_right,#8B5CF60d_1px,transparent_1px),linear-gradient(to_bottom,#8B5CF60d_1px,transparent_1px)] bg-[size:100px_100px]"
          style={{ transform: 'perspective(1500px) rotateX(75deg) scale(2.5)', transformOrigin: 'bottom' }}
        />
        {/* Grid Intersections Glow (Fake) */}
        <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-[#020617] via-transparent to-transparent z-10" />
      </div>

      {/* Layer 4: Minimal UI Accents (Mid Parallax) */}
      <div className="absolute inset-0 layer-parallax-mid opacity-20 pointer-events-none">
        <div className="absolute top-[35%] right-[20%] w-px h-32 bg-gradient-to-b from-transparent via-cyan-glow/20 to-transparent" />
        <div className="absolute bottom-[35%] left-[20%] w-px h-32 bg-gradient-to-b from-transparent via-neon-purple/20 to-transparent" />
      </div>

      {/* Dynamic Advanced Cursor Glow */}
      <div
        id="cursor-light-advanced"
        className="absolute -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] rounded-full bg-gradient-to-r from-neon-purple/10 to-cyan-glow/5 blur-[200px] pointer-events-none mix-blend-screen opacity-60 z-10"
      />

      {/* Film Grain / Scanlines */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none z-20 mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_2px,3px_100%] pointer-events-none opacity-20 z-20 pointer-events-none" />

      {/* Energy Scanning Pulses */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-30">
        <div className="absolute top-0 left-0 w-full h-[40vh] bg-gradient-to-b from-transparent via-cyan-glow/[0.04] to-transparent animate-scanning-pulse" />
        <div className="absolute top-0 left-0 w-full h-[40vh] bg-gradient-to-b from-transparent via-neon-purple/[0.04] to-transparent animate-scanning-pulse [animation-delay:5s]" />
      </div>

      {/* Cyber Circuitry Texture (Low opacity background) */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none z-0" style={{ 
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 10 L40 10 L40 40 L60 40 L60 60 L90 60' stroke='%23ffffff' fill='none' /%3E%3C/svg%3E")`,
        backgroundSize: '300px 300px'
      }} />

      <style>{`
        @keyframes scanning-pulse {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(300%); }
        }
        .animate-scanning-pulse {
          animation: scanning-pulse 12s linear infinite;
        }
        @keyframes blob-pulse {
          0%, 100% { transform: scale(1); opacity: 0.1; }
          50% { transform: scale(1.2); opacity: 0.15; }
        }
        .animate-blob-pulse {
          animation: blob-pulse 15s ease-in-out infinite;
        }
        .animate-blob-pulse-delayed {
          animation: blob-pulse 15s ease-in-out infinite 7.5s;
        }
      `}</style>
    </div>
  );
}


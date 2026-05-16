import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function BackgroundSystem() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

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
    const particleCount = window.innerWidth < 768 ? 10 : 30; // Minimal particles

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      color: string;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.2;
        this.speedY = (Math.random() - 0.5) * 0.2;
        this.opacity = Math.random() * 0.3 + 0.1;
        const colors = ['#8B5CF6', '#06B6D4', '#FFFFFF'];
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

    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

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
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 1,
          ease: 'power2.out'
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
    <div 
      ref={containerRef} 
      className="fixed inset-0 -z-10 pointer-events-none overflow-hidden select-none"
      style={{ background: 'radial-gradient(circle at center, #0B0B12, #050505)' }}
    >
      {/* Layer 2: Ambient Glow */}
      <div
        ref={glowRef}
        className="absolute -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full mix-blend-screen opacity-40 z-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, rgba(6,182,212,0.1) 40%, transparent 70%)'
        }}
      />

      {/* Layer 3: Cyber Grid Overlay */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200%] h-full pointer-events-none opacity-[0.05]">
        <div 
          className="absolute bottom-0 left-0 w-full h-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:60px_60px]"
          style={{ transform: 'perspective(1000px) rotateX(60deg) scale(2)', transformOrigin: 'bottom' }}
        />
        {/* Fade grid at top */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-[#050505]/80 to-[#050505] z-10" />
      </div>

      {/* Layer 4: Minimal Particles */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60 z-10" />
    </div>
  );
}


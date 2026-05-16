import { useEffect, useState, useCallback, useRef } from 'react';
import { motion, useSpring, useMotionValue, AnimatePresence } from 'motion/react';

const SYMBOLS = ['</>', 'const', 'async', 'React', 'Node', 'SQL', '{}', '=>', 'useState()', 'npm'];

interface Particle {
  id: number;
  x: number;
  y: number;
  symbol: string;
}

export default function CustomCursor() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Faster, more responsive spring configuration
  const springConfig = { damping: 30, stiffness: 300, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const [isHovering, setIsHovering] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const lastPos = useRef({ x: 0, y: 0 });

  const addParticle = useCallback((x: number, y: number) => {
    const id = Date.now() + Math.random();
    const symbol = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
    
    setParticles(prev => {
      // Limit to max 3-5 active particles
      const next = [...prev, { id, x, y, symbol }];
      if (next.length > 4) return next.slice(1);
      return next;
    });

    // Life time: 400ms - 900ms
    const duration = 400 + Math.random() * 500;
    setTimeout(() => {
      setParticles(prev => prev.filter(p => p.id !== id));
    }, duration);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      let targetX = e.clientX;
      let targetY = e.clientY;

      const target = e.target as HTMLElement;
      const interactiveEl = target.closest('button, a, .interactive') as HTMLElement;
      
      if (interactiveEl) {
        setIsHovering(true);
        // Reduced magnetic effect (50% less pull than default might be)
        const rect = interactiveEl.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        targetX += (centerX - targetX) * 0.15;
        targetY += (centerY - targetY) * 0.15;
      } else {
        setIsHovering(false);
      }

      mouseX.set(targetX);
      mouseY.set(targetY);

      // Add particle if mouse moved enough
      const dist = Math.hypot(targetX - lastPos.current.x, targetY - lastPos.current.y);
      if (dist > 80) {
        addParticle(targetX, targetY);
        lastPos.current = { x: targetX, y: targetY };
      }
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [mouseX, mouseY, addParticle]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] hidden md:block">
      {/* Code Particles */}
      <AnimatePresence>
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            initial={{ opacity: 0, y: 0, scale: 1 }}
            animate={{ opacity: [0, 1, 0], y: -20, scale: 0.8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute text-[10px] font-mono text-cyan-glow/60 select-none"
            style={{ left: particle.x, top: particle.y, translateX: '-50%', translateY: '-50%' }}
          >
            {particle.symbol}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Main Cursor */}
      <motion.div
        className="absolute rounded-full border flex items-center justify-center pointer-events-none"
        style={{
          x: cursorX,
          y: cursorY,
          width: 20,
          height: 20,
          translateX: '-50%',
          translateY: '-50%',
          backgroundColor: isHovering ? 'rgba(139, 92, 246, 0.15)' : 'rgba(139, 92, 246, 0.08)',
          borderColor: 'rgba(6, 182, 212, 0.8)',
          scale: isHovering ? 1.3 : (clicked ? 0.9 : 1),
          backdropFilter: 'blur(4px)',
          boxShadow: '0 0 12px rgba(139, 92, 246, 0.5)',
        }}
      >
        {/* Inner core dot */}
        <div className="w-1 h-1 bg-cyan-glow rounded-full shadow-[0_0_8px_#06B6D4]" />
      </motion.div>

      {/* Subtle Click Ripple */}
      {clicked && (
        <motion.div
          className="absolute border border-cyan-glow/30 rounded-full"
          initial={{ width: 0, height: 0, opacity: 0.5 }}
          animate={{ width: 60, height: 60, opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{ x: mouseX, y: mouseY, translateX: '-50%', translateY: '-50%' }}
        />
      )}
    </div>
  );
}

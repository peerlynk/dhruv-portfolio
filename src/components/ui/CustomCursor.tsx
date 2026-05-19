import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

const SYMBOLS = [
  "</>",
  "const",
  "async",
  "React",
  "Node",
  "SQL",
  "{}",
  "=>",
  "useState()",
  "npm",
];

interface Particle {
  id: number;
  x: number;
  y: number;
  symbol: string;
}

export default function CustomCursor() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const lastPosition = useRef({ x: 0, y: 0 });

  const createParticle = useCallback((x: number, y: number) => {
    const id = Date.now() + Math.random();

    const symbol =
      SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];

    setParticles((prev) => {
      const updated = [
        ...prev,
        {
          id,
          x: x + (Math.random() * 30 - 15),
          y: y + (Math.random() * 20 - 10),
          symbol,
        },
      ];

      return updated.slice(-18);
    });

    setTimeout(() => {
      setParticles((prev) =>
        prev.filter((p) => p.id !== id)
      );
    }, 1200);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      const distance = Math.hypot(
        x - lastPosition.current.x,
        y - lastPosition.current.y
      );

      if (distance > 18) {
        createParticle(x, y);
        lastPosition.current = { x, y };
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );
    };
  }, [createParticle]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{
              opacity: 0,
              y: 0,
              scale: 0.8,
            }}
            animate={{
              opacity: [0, 1, 0],
              y: 50,
              scale: [0.8, 1, 0.7],
              rotate: [0, 8],
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 1.2,
              ease: "easeOut",
            }}
            className="absolute font-mono text-[11px] text-cyan-400/80 select-none"
            style={{
              left: particle.x,
              top: particle.y,
            }}
          >
            {particle.symbol}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
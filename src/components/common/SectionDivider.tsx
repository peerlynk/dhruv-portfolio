import { motion } from 'motion/react';

export default function SectionDivider() {
  return (
    <div className="relative w-full h-px py-12">
      <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <motion.div
        initial={{ left: '-100%' }}
        whileInView={{ left: '100%' }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 5, ease: "easeInOut" }}
        className="absolute bottom-0 w-64 h-px bg-gradient-to-r from-transparent via-cyan-glow to-transparent opacity-50"
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-4">
        <div className="w-1 h-1 rounded-full bg-cyan-glow/20" />
        <div className="w-1 h-1 rounded-full bg-neon-purple/20" />
        <div className="w-1 h-1 rounded-full bg-cyan-glow/20" />
      </div>
    </div>
  );
}

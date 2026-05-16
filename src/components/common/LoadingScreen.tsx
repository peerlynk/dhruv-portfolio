import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(0);

  const steps = [
    { text: 'SYSTEM_BOOT_INIT...', color: 'text-white/40' },
    { text: 'INITIALIZING_NEURAL_CORE (v0.4.1)', color: 'text-cyan-glow' },
    { text: 'SYNCING_REPOSITORY_ASSETS', color: 'text-neon-purple' },
    { text: 'DECRYPTING_EXPERIENCE_LOGS', color: 'text-magenta' },
    { text: 'INTERFACE_UNLOCKED', color: 'text-green-400' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => {
        if (prev < steps.length - 1) return prev + 1;
        clearInterval(timer);
        setTimeout(() => setLoading(false), 800);
        return prev;
      });
    }, 600);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center p-6 overflow-hidden"
        >
          {/* Background scanlines */}
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[linear-gradient(to_bottom,transparent_50%,#000_50%)] bg-[size:100%_4px]" />
          
          <div className="relative mb-20">
             {/* Logo / Abstract HUD */}
             <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-32 h-32 relative"
             >
                <div className="absolute inset-0 border-2 border-neon-purple rounded-full animate-ping opacity-20" />
                <div className="absolute inset-0 border-[4px] border-cyan-glow rounded-3xl opacity-20 rotate-45 animate-pulse" />
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="w-12 h-12 bg-white/10 glass rounded-xl flex items-center justify-center border border-white/20">
                      <div className="w-4 h-4 bg-neon-purple rounded-full" />
                   </div>
                </div>
             </motion.div>
          </div>

          <div className="w-full max-w-sm">
            {/* Progress bar */}
            <div className="h-1.5 w-full bg-white/5 rounded-full mb-8 relative overflow-hidden border border-white/5">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
                className="h-full bg-gradient-to-r from-neon-purple to-cyan-glow relative"
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-full bg-white blur-sm" />
              </motion.div>
            </div>

            {/* Step text */}
            <div className="h-6 overflow-hidden font-mono text-[10px] uppercase tracking-widest text-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  className={steps[step].color}
                >
                  {steps[step].text}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Visual fluff */}
            <div className="mt-8 flex justify-between px-2 text-[8px] font-mono text-white/20">
               <span>LATENCY: 14MS</span>
               <span>CPU_LOAD: {Math.floor(Math.random() * 40 + 20)}%</span>
               <span>MEM_ALLOC: 4.2GB</span>
            </div>
          </div>

          {/* Glitch Overlay */}
          <motion.div
             animate={{
                opacity: [0, 0.1, 0, 0.2, 0],
                x: [0, -2, 2, -1, 0]
             }}
             transition={{ duration: 0.1, repeat: Infinity, repeatDelay: 3 }}
             className="absolute inset-0 bg-cyan-glow/5 mix-blend-screen pointer-events-none"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

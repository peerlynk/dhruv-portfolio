import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [phase, setPhase] = useState<'scan' | 'terminal' | 'logo' | 'complete'>('scan');

  useEffect(() => {
    const logMessages = [
      '> System boot v2.4.1',
      '> Loading portfolio modules...',
      '> Initializing UI shaders...',
      '> Establishing neural link...',
      '> Welcome, Dhruv Pal.',
      '> Ready.'
    ];

    let currentLog = 0;
    const logInterval = setInterval(() => {
      if (currentLog < logMessages.length) {
        setLogs(prev => [...prev.slice(-3), logMessages[currentLog]]);
        currentLog++;
      } else {
        clearInterval(logInterval);
      }
    }, 400);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => setPhase('logo'), 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    setTimeout(() => setPhase('terminal'), 1000);

    return () => {
      clearInterval(logInterval);
      clearInterval(progressInterval);
    };
  }, []);

  useEffect(() => {
    if (phase === 'logo') {
      setTimeout(() => {
        setPhase('complete');
        setTimeout(onComplete, 500);
      }, 1500);
    }
  }, [phase, onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'complete' && (
        <motion.div
          className="fixed inset-0 z-[10000] bg-[#050505] flex flex-col items-center justify-center font-mono overflow-hidden"
          exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          {/* Digital Scan Line */}
          {phase === 'scan' && (
            <motion.div
              className="absolute top-0 left-0 w-full h-[2px] bg-cyan-glow shadow-[0_0_15px_#06B6D4]"
              animate={{ top: ['0%', '100%'] }}
              transition={{ duration: 1, ease: 'linear' }}
            />
          )}

          <div className="w-full max-w-md px-6">
            {/* Terminal Window */}
            {(phase === 'terminal' || phase === 'logo') && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass p-6 rounded-2xl mb-8 min-h-[160px] flex flex-col justify-end"
              >
                {logs.map((log, i) => (
                  <div key={i} className="text-cyan-glow/80 text-sm mb-1">
                    {log}
                  </div>
                ))}

                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="flex justify-between text-[10px] text-neon-purple mb-1">
                    <span>BOOTING_SEQUENCE</span>
                    <span>{Math.floor(progress)}%</span>
                  </div>
                  <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-neon-purple to-cyan-glow"
                      animate={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Logo Sequence */}
            {phase === 'logo' && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center"
              >
                <div className="text-4xl font-bold tracking-tighter gradient-text flex items-center gap-2">
                  <span className="text-neon-purple">{'{'}</span>
                  <span>DP</span>
                  <span className="text-neon-purple">{'}'}</span>
                </div>
                <motion.div
                  className="mt-2 text-[10px] text-white/40 tracking-[0.3em] uppercase"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  Authenticating...
                </motion.div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

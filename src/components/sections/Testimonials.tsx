import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, ChevronLeft, ChevronRight, User } from 'lucide-react';

const testimonials = [
  {
    text: "Dhruv built our entire MVP in 6 weeks. Code quality is insane – he thinks like a systems architect.",
    author: "CTO, StartupX",
    avatar: null
  },
  {
    text: "One of the most proactive full-stack engineers I’ve worked with. He brings product thinking to every line of code.",
    author: "Product Lead, FinTech Co.",
    avatar: null
  },
  {
    text: "Peerlynk’s backend is rock solid thanks to Dhruv. He’s a force multiplier.",
    author: "Co-founder, peerlynk",
    avatar: null
  }
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-24 px-6">
      <div className="app-container">
        <div className="text-center mb-16">
          <div className="text-neon-purple font-mono text-sm tracking-[0.3em] uppercase mb-4">
             Social Proof
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white font-display">
            💬 Voices from <span className="gradient-text">The Field</span>
          </h2>
        </div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50, filter: 'blur(10px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: -50, filter: 'blur(10px)' }}
              transition={{ duration: 0.5 }}
              className="glass p-10 md:p-16 rounded-[3rem] relative group"
            >
              <Quote className="absolute top-10 left-10 text-neon-purple/20 w-20 h-20 -z-10" />

              <div className="relative z-10 flex flex-col items-center text-center">
                <p className="text-2xl md:text-3xl text-white font-medium italic mb-10 leading-relaxed">
                  "{testimonials[current].text}"
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-neon-purple/20 rounded-full flex items-center justify-center text-neon-purple">
                    <User size={24} />
                  </div>
                  <div className="text-left">
                    <div className="text-white font-bold">{testimonials[current].author}</div>
                    <div className="text-cyan-glow/60 text-xs font-mono uppercase tracking-widest">Verified Endorsement</div>
                  </div>
                </div>
              </div>

              {/* Navigation arrows */}
              <div className="absolute top-1/2 -translate-y-1/2 left-4 md:-left-8">
                <button onClick={prev} className="p-4 glass rounded-full text-white hover:text-neon-purple hover:scale-110 transition-all">
                  <ChevronLeft />
                </button>
              </div>
              <div className="absolute top-1/2 -translate-y-1/2 right-4 md:-right-8">
                <button onClick={next} className="p-4 glass rounded-full text-white hover:text-neon-purple hover:scale-110 transition-all">
                  <ChevronRight />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="flex justify-center gap-3 mt-12">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  current === i ? "bg-neon-purple w-8" : "bg-white/10 hover:bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

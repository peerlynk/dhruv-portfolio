import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'ecosystem', label: 'Ecosystem' },
  { id: 'systems', label: 'Systems' },
  { id: 'journey', label: 'Journey' },
  { id: 'telemetry', label: 'Console' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
    setActiveTab(id);
  };

  return (
    <>
      <nav
        className={cn(
          "fixed top-5 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 w-[calc(100%-40px)] max-w-4xl",
          isScrolled ? "py-2 px-6 glass rounded-full" : "py-4 px-8"
        )}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div
            className="text-2xl font-bold cursor-pointer group flex items-center"
            onClick={() => scrollTo('home')}
          >
            <span className="text-neon-purple group-hover:text-cyan-glow transition-colors">{'{'}</span>
            <span className="mx-1 text-white">DP</span>
            <span className="text-neon-purple group-hover:text-cyan-glow transition-colors">{'}'}</span>
          </div>

          {/* Desktop Items */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium transition-colors hover:text-cyan-glow",
                  activeTab === item.id ? "text-white" : "text-white/60"
                )}
              >
                {item.label}
                {activeTab === item.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-neon-purple/20 border border-neon-purple/50 rounded-full -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-white interactive"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-brand-deep/90 backdrop-blur-2xl flex flex-col items-center justify-center"
          >
            <button
              className="absolute top-10 right-10 text-white interactive"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X size={32} />
            </button>

            <div className="flex flex-col items-center gap-8">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-4xl font-bold text-white hover:text-cyan-glow hover:scale-105 transition-all text-glow-purple"
                  onClick={() => scrollTo(item.id)}
                >
                  {item.label}
                </motion.button>
              ))}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.1 }}
                className="mt-8 px-10 py-4 glass rounded-full text-neon-purple font-bold hover:bg-neon-purple/10"
              >
                Resume
              </motion.button>

              <div className="mt-12 text-neon-purple/40 font-mono text-sm">
                {"> Let's connect"}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

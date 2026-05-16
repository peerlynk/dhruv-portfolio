import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import BackgroundSystem from './components/layout/BackgroundSystem';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Methodology from './components/sections/Methodology';
import Timeline from './components/sections/Timeline';
import GitHubDashboard from './components/sections/GitHubDashboard';
import Contact from './components/sections/Contact';
import Footer from './components/layout/Footer';
import CustomCursor from './components/ui/CustomCursor';
import LoadingScreen from './components/common/LoadingScreen';
import SectionDivider from './components/common/SectionDivider';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Lenis Smooth Scroll Initialization
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Sync loading state with the LoadingScreen's internal timer (~3-4s)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3800);

    return () => {
      lenis.destroy();
      clearTimeout(timer);
    };
  }, []);

  return (
    <main className="relative selection:bg-neon-purple selection:text-white bg-brand-deep">
      <LoadingScreen />

      <div className={`transition-opacity duration-1000 ${!isLoading ? 'opacity-100' : 'opacity-0'}`}>
        <CustomCursor />
        <BackgroundSystem />
        <Navbar />

        <Hero />
        <SectionDivider />
        <Skills />
        <SectionDivider />
        <Projects />
        <SectionDivider />
        <Timeline />
        <SectionDivider />
        <Methodology />
        <SectionDivider />
        <GitHubDashboard />
        <SectionDivider />
        <Contact />

        <Footer />
      </div>
    </main>
  );
}

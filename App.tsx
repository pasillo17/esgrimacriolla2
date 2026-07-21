
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import FeatureCard from './components/FeatureCard';
import AIHistorian from './components/AIHistorian';
import RevealOnScroll from './components/RevealOnScroll';
import ClasesGrid from './components/ClasesGrid';
import Merch from './components/Merch';
import Sedes from './components/Sedes';
import AcademiaOnline from './components/AcademiaOnline';
import Novedades from './components/Novedades';
import AdmissionModal from './components/AdmissionModal';
import { FEATURES, INSTRUCTORS } from './constants';

const DustParticles: React.FC = () => {
  return (
    <div className="dust-container">
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="dust-particle"
          style={{
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            background: `rgba(197, 160, 101, ${Math.random() * 0.2 + 0.15})`,
            '--duration': `${Math.random() * 15 + 10}s`,
            '--drift': `${Math.random() * 100 - 50}px`,
            animationDelay: `${Math.random() * 10}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
};

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button') || target.closest('a')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-6 h-6 border border-gold/50 rounded-full pointer-events-none z-[9999] hidden md:block"
      animate={{
        x: position.x - 12,
        y: position.y - 12,
        scale: isHovering ? 1.5 : 1,
        backgroundColor: isHovering ? 'rgba(197, 160, 101, 0.1)' : 'transparent',
      }}
      transition={{ type: 'spring', damping: 20, stiffness: 250, mass: 0.5 }}
    />
  );
};

const App: React.FC = () => {
  const [isLoadingApp, setIsLoadingApp] = useState(true);
  const [currentView, setCurrentView] = useState<'home' | 'merch' | 'sedes' | 'academia-online' | 'novedades'>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdmissionModalOpen, setIsAdmissionModalOpen] = useState(false);
  const [currentInstructor, setCurrentInstructor] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  React.useEffect(() => {
    // Simulate loading for professional feel
    const loadTimer = setTimeout(() => setIsLoadingApp(false), 2000);

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(loadTimer);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-void text-stone-300 selection:bg-gold selection:text-void paper-texture overflow-x-hidden">
      <AnimatePresence>
        {isLoadingApp && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="fixed inset-0 z-[1000] bg-void flex flex-col items-center justify-center overflow-hidden"
          >
            {/* Background Decorative Panels */}
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: '-100%' }}
              exit={{ x: '-110%' }}
              transition={{ duration: 1, ease: [0.7, 0, 0.3, 1] }}
              className="absolute inset-y-0 left-0 w-1/2 bg-card-depth border-r border-gold/10 z-0"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: '100%' }}
              exit={{ x: '110%' }}
              transition={{ duration: 1, ease: [0.7, 0, 0.3, 1] }}
              className="absolute inset-y-0 right-0 w-1/2 bg-card-depth border-l border-gold/10 z-0"
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                filter: ["drop-shadow(0 0 10px rgba(197, 160, 101, 0.2))", "drop-shadow(0 0 30px rgba(197, 160, 101, 0.5))", "drop-shadow(0 0 10px rgba(197, 160, 101, 0.2))"]
              }}
              transition={{ 
                scale: { duration: 1.5, ease: "easeOut" },
                opacity: { duration: 1 },
                filter: { duration: 3, repeat: Infinity, ease: "easeInOut" }
              }}
              className="relative z-10"
            >
              <img 
                src="https://i.imgur.com/cbCrHDB.png" 
                alt="Logo Loading" 
                className="w-32 h-32 md:w-48 md:h-48"
              />
            </motion.div>

            <div className="relative z-10 mt-12 flex flex-col items-center">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: 160 }}
                transition={{ duration: 1.5, delay: 0.3 }}
                className="h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent"
              />
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 0.6, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="mt-6 font-display text-[0.6rem] tracking-[0.6em] text-gold uppercase font-bold"
              >
                Arte Marcial Argentino
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CustomCursor />
      <DustParticles />
      
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-[2px] z-[100] pointer-events-none">
        <motion.div 
          className="h-full bg-gold shadow-[0_0_10px_rgba(197,160,101,0.8)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Scroll To Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-8 left-8 z-[60] w-12 h-12 rounded-full bg-gold text-void flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-transform shine-effect"
          >
            <ChevronLeft className="rotate-90" size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Vignette Overlay - Hidden on mobile as requested */}
      <div className="fixed inset-0 pointer-events-none z-50 vignette-overlay opacity-60 hidden md:block"></div>
      
      {/* Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none z-40 bg-grain opacity-5 mix-blend-overlay"></div>
      
      <Header 
        onNavigate={(view) => {
          setCurrentView(view);
          setIsMenuOpen(false);
        }} 
        isMenuOpen={isMenuOpen}
        onToggleMenu={() => setIsMenuOpen(!isMenuOpen)}
      />
      
      <div className={`transition-opacity duration-300 ${isMenuOpen ? 'opacity-10 pointer-events-none blur-sm' : 'opacity-100'}`}>
        {currentView === 'home' ? (
        <>
          <main className="relative z-20">
            <div id="inicio">
              <Hero />
            </div>

            {/* Core Pillars - Nuestra Estructura */}
            <section id="estructura" className="py-10 md:py-24 bg-void relative overflow-hidden border-b border-gold/5">
              <div className="absolute inset-0 bg-paper-texture opacity-5 pointer-events-none"></div>
              
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <RevealOnScroll direction="down">
                  <div className="flex flex-col items-center mb-16 md:mb-20 text-center mx-auto">
                    <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-stone-100 tracking-[0.2em] md:tracking-[0.3em] uppercase mb-4 text-center w-full text-glow-white">Nuestra Estructura</h2>
                    <div className="flex items-center justify-center gap-4 w-full">
                      <div className="h-px bg-gold/30 w-8 md:w-12"></div>
                      <p className="text-[0.5rem] md:text-[0.6rem] text-gold tracking-[0.4em] md:tracking-[0.5em] uppercase font-bold text-center text-glow-gold">Pilares Fundamentales</p>
                      <div className="h-px bg-gold/30 w-8 md:w-12"></div>
                    </div>
                  </div>
                </RevealOnScroll>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-12">
                  {FEATURES.map((feature, idx) => (
                    <RevealOnScroll key={feature.id} delay={idx * 150} direction={idx % 2 === 0 ? 'left' : 'right'}>
                      <FeatureCard feature={feature} />
                    </RevealOnScroll>
                  ))}
                </div>
              </div>
            </section>

            {/* Nosotros Section (formerly Los Maestros) - Scrolling Marquee */}
            <section id="nosotros" className="py-24 md:py-32 bg-card-depth relative overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/5 rounded-full blur-[150px] pointer-events-none"></div>
              <div className="relative z-10 w-full">
                <RevealOnScroll direction="down">
                  <div className="flex flex-col items-center mb-16 md:mb-24 text-center mx-auto px-4">
                    <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-stone-100 tracking-[0.2em] md:tracking-[0.3em] uppercase mb-4 text-center w-full text-glow-white">Nosotros</h2>
                    <div className="flex items-center justify-center gap-4 w-full">
                      <div className="h-px bg-gold/30 w-8 md:w-12"></div>
                      <p className="text-[0.5rem] md:text-[0.6rem] text-gold tracking-[0.4em] md:tracking-[0.5em] uppercase font-bold text-center text-glow-gold">Custodios de la Tradición</p>
                      <div className="h-px bg-gold/30 w-8 md:w-12"></div>
                    </div>
                  </div>
                </RevealOnScroll>
                
                {/* Desktop Marquee Container - Hidden on Mobile */}
                <div className="w-full overflow-hidden hidden md:block">
                  <div className="flex w-max animate-scroll hover:pause">
                    {[...INSTRUCTORS, ...INSTRUCTORS].map((instructor, idx) => (
                      <div key={`${instructor.id}-${idx}`} className="w-[300px] md:w-[350px] mx-6 md:mx-8 flex-shrink-0 group relative flex flex-col items-center">
                        {/* Instructor Image with Frame */}
                        <div className="relative w-full aspect-[4/5] mb-8 md:mb-10 p-3 bg-card-depth border border-divider shadow-2xl rounded-sm">
                          {/* Inner decorative frame */}
                          <div className="absolute inset-2 border border-gold/20 z-20 pointer-events-none"></div>
                          
                          <div className="relative w-full h-full overflow-hidden bg-black">
                            <img 
                              alt={instructor.name} 
                              className={`absolute inset-0 w-full h-full object-cover ${instructor.objectPosition || 'object-top'} filter sepia-[0.2] contrast-110 opacity-80 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-105`}
                              src={instructor.image}
                            />
                            <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(0,0,0,0.5)] z-10 pointer-events-none"></div>
                          </div>
                        </div>
                        
                        <div className="text-center max-w-xs flex flex-col items-center mx-auto">
                          <h3 className="font-display text-lg md:text-xl text-stone-200 uppercase tracking-[0.2em] mb-2 group-hover:text-gold transition-colors text-center w-full">{instructor.name}</h3>
                          <p className="font-display text-gold text-[0.6rem] md:text-[0.65rem] tracking-[0.3em] uppercase mb-6 opacity-60 font-bold text-center w-full">{instructor.role}</p>
                          <p className="text-stone-400 text-sm leading-relaxed italic border-t border-gold/10 pt-6 mt-2 font-serif text-center w-full">
                            {instructor.quote}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mobile Slider Container - Visible only on Mobile */}
                <div className="md:hidden px-4 relative">
                  <div className="relative h-[520px] flex items-center justify-center">
                    {/* Navigation Buttons - Side Positioned */}
                    <button 
                      onClick={() => setCurrentInstructor((prev) => (prev - 1 + INSTRUCTORS.length) % INSTRUCTORS.length)}
                      className="absolute left-0 top-[40%] -translate-y-1/2 z-50 w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center text-gold bg-void/80 backdrop-blur-sm shadow-xl active:scale-95 transition-transform"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    
                    <button 
                      onClick={() => setCurrentInstructor((prev) => (prev + 1) % INSTRUCTORS.length)}
                      className="absolute right-0 top-[40%] -translate-y-1/2 z-50 w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center text-gold bg-void/80 backdrop-blur-sm shadow-xl active:scale-95 transition-transform"
                    >
                      <ChevronRight size={24} />
                    </button>

                    <div className="relative w-full max-w-[260px] h-full flex items-center justify-center">
                      <AnimatePresence initial={false}>
                        {[...Array(3)].map((_, i) => {
                          const index = (currentInstructor + i) % INSTRUCTORS.length;
                          const instructor = INSTRUCTORS[index];
                          
                          return (
                            <motion.div
                              key={instructor.id}
                              style={{
                                zIndex: 30 - i,
                              }}
                              initial={{ opacity: 0, scale: 0.8, y: 20 }}
                              animate={{ 
                                opacity: 1 - i * 0.2, 
                                scale: 1 - i * 0.05, 
                                y: i * 15,
                                rotate: i * 2
                              }}
                              exit={{ 
                                opacity: 0, 
                                x: -200, 
                                rotate: -20,
                                transition: { duration: 0.4 } 
                              }}
                              className="absolute inset-0 flex flex-col items-center"
                            >
                              {/* Instructor Image with Frame */}
                              <div className="relative w-full aspect-[4/5] mb-6 p-3 bg-card-depth border border-divider shadow-2xl rounded-sm">
                                <div className="absolute inset-2 border border-gold/20 z-20 pointer-events-none"></div>
                                <div className="relative w-full h-full overflow-hidden bg-black">
                                  <img 
                                    alt={instructor.name} 
                                    className={`absolute inset-0 w-full h-full object-cover ${instructor.objectPosition || 'object-top'} filter sepia-[0.2] contrast-110 opacity-90`}
                                    src={instructor.image}
                                  />
                                  <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(0,0,0,0.5)] z-10 pointer-events-none"></div>
                                </div>
                              </div>
                              
                              {i === 0 && (
                                <motion.div 
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className="text-center max-w-xs flex flex-col items-center mx-auto"
                                >
                                  <h3 className="font-display text-xl text-stone-200 uppercase tracking-[0.2em] mb-1 text-center w-full">{instructor.name}</h3>
                                  <p className="font-display text-gold text-[0.6rem] tracking-[0.3em] uppercase mb-2 opacity-60 font-bold text-center w-full">{instructor.role}</p>
                                </motion.div>
                              )}
                            </motion.div>
                          );
                        })}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Pagination Dots */}
                  <div className="flex justify-center gap-2 mt-4">
                    {INSTRUCTORS.map((_, idx) => (
                      <div 
                        key={idx} 
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${idx === currentInstructor ? 'bg-gold w-4' : 'bg-gold/20'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Unified Historia and Classes Section */}
            <section id="clases" className="py-24 md:py-40 bg-void relative border-t border-gold/5 overflow-hidden">
              <div className="absolute inset-0 bg-paper-texture opacity-5 pointer-events-none"></div>
              
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <RevealOnScroll direction="down">
                  <div className="flex flex-col items-center mb-24 md:mb-40 text-center mx-auto relative">
                    {/* New Title Design: Gaucho Monumental */}
                    <div className="w-full max-w-4xl flex flex-col items-center">
                      <div className="guardapampa-divider w-full h-8 opacity-40 mb-12 animate-guardapampa"></div>
                      
                      <h2 className="font-display text-4xl sm:text-6xl md:text-8xl text-stone-100 tracking-[0.1em] uppercase text-glow-white relative z-10">LEGADO Y CLASES</h2>
                      
                      <div className="guardapampa-divider w-full h-8 opacity-40 mt-12 animate-guardapampa"></div>
                    </div>
                    
                    <div className="mt-16 flex flex-col items-center justify-center gap-8 relative z-10 max-w-4xl mx-auto">
                      <div className="flex items-center gap-6">
                        <div className="h-[1px] bg-gold/30 w-12 md:w-20"></div>
                        <p className="text-[0.7rem] md:text-sm text-gold tracking-[0.6em] uppercase font-bold text-glow-gold">Nuestra Historia</p>
                        <div className="h-[1px] bg-gold/30 w-12 md:w-20"></div>
                      </div>
                      
                      <div className="font-serif text-stone-400 text-sm md:text-base leading-relaxed md:leading-loose text-center space-y-4 px-4">
                        <p>
                          El inicio real de la esgrima criolla se remonta a los duelos de honor en las pulperías y los campos de batalla de nuestra independencia. Una técnica forjada en la necesidad y templada en el coraje.
                        </p>
                        <p>
                          Hoy, en nuestra academia, mantenemos viva esa llama. No solo enseñamos a combatir, sino a comprender la filosofía de vida de quienes nos precedieron, adaptando su legado a los tiempos modernos sin perder su esencia.
                        </p>
                      </div>

                      <div className="flex items-center gap-6 mt-12">
                        <div className="h-[1px] bg-gold/30 w-12 md:w-20"></div>
                        <p className="text-[0.7rem] md:text-sm text-gold tracking-[0.6em] uppercase font-bold text-glow-gold">Programa de Estudio</p>
                        <div className="h-[1px] bg-gold/30 w-12 md:w-20"></div>
                      </div>
                    </div>
                  </div>
                </RevealOnScroll>

                <ClasesGrid />
              </div>
            </section>

            {/* Dónde Aprender Section */}
            <section id="donde-aprender" className="pt-16 pb-24 md:py-40 bg-gradient-to-b from-void to-card-depth relative overflow-hidden">
              <div className="absolute inset-0 bg-paper-texture opacity-5 pointer-events-none"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/5 rounded-full blur-[150px] pointer-events-none"></div>
              
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <RevealOnScroll delay={300} direction="up">
                  <div className="flex flex-col items-center">
                    <div className="text-center mb-16 md:mb-24 w-full">
                      <h2 className="font-display text-5xl sm:text-6xl md:text-8xl text-stone-100 tracking-[0.1em] uppercase mb-4 text-glow-white flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6">
                        <span>¿DÓNDE</span>
                        <span className="text-gold text-glow-gold">APRENDER?</span>
                      </h2>
                      <div className="w-24 md:w-40 h-[2px] bg-gradient-to-r from-transparent via-gold/50 to-transparent mx-auto mt-8"></div>
                    </div>
                    
                    <div className="bg-gradient-to-b from-card-depth to-void border border-gold/15 p-6 md:p-16 max-w-4xl w-full text-center lg:text-left mb-16 relative overflow-hidden group shadow-[0_0_50px_rgba(0,0,0,0.8)] rounded-lg">
                      {/* Ambient background glow */}
                      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-gold/5 via-transparent to-transparent pointer-events-none"></div>
                      <div className="absolute -top-32 -right-32 w-96 h-96 bg-gold/10 blur-[100px] rounded-full pointer-events-none"></div>
                      
                      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12 relative z-10">
                        {/* Video / Visual Column */}
                        <div className="w-full lg:w-1/2 relative group/video">
                          <div className="absolute -inset-2 bg-gradient-to-r from-gold/20 via-gold/5 to-gold/20 rounded-xl blur-md opacity-0 group-hover/video:opacity-100 transition-opacity duration-700"></div>
                          <div className="relative w-full aspect-video lg:aspect-[4/5] bg-black border border-gold/20 rounded-xl overflow-hidden shadow-2xl pointer-events-none">
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10 pointer-events-none"></div>
                            <iframe 
                              className="absolute inset-0 w-[150%] h-[150%] -left-[25%] -top-[25%] opacity-80 mix-blend-screen"
                              src="https://www.youtube.com/embed/p_MVjDzK4v8?autoplay=1&mute=1&loop=1&playlist=p_MVjDzK4v8&controls=0&modestbranding=1&rel=0&playsinline=1&vq=hd1080&cc_load_policy=0&iv_load_policy=3&disablekb=1" 
                              title="Esgrima Criolla Institucional" 
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                              allowFullScreen
                            ></iframe>
                            <div className="absolute bottom-4 left-4 lg:bottom-6 lg:left-6 z-20 flex items-center gap-4">
                              <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-black/80 border border-gold/40 flex items-center justify-center backdrop-blur-md shadow-[0_0_15px_rgba(197,160,101,0.2)]">
                                <span className="material-icons-outlined text-gold text-base lg:text-lg">play_arrow</span>
                              </div>
                              <div className="flex flex-col items-start">
                                <span className="text-stone-200 text-[0.65rem] lg:text-xs font-display tracking-[0.2em] uppercase font-bold text-glow-white">Video</span>
                                <span className="text-gold/70 text-[0.55rem] lg:text-[0.6rem] font-display tracking-[0.3em] uppercase">Institucional</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Content Column */}
                        <div className="w-full lg:w-1/2 flex flex-col justify-center h-full pt-2 lg:pt-4">
                          <div className="inline-flex items-center gap-3 px-4 py-1.5 border border-gold/30 bg-gold/10 text-gold text-xs font-display tracking-[0.3em] uppercase mb-4 lg:mb-6 rounded-full w-fit mx-auto lg:mx-0">
                            <span className="w-2 h-2 rounded-full bg-gold animate-pulse"></span>
                            Sede Principal
                          </div>
                          
                          <h3 className="font-display text-4xl md:text-5xl text-stone-100 mb-2 lg:mb-3 uppercase tracking-widest text-glow-white">Sede Central</h3>
                          <h4 className="font-display text-2xl md:text-3xl text-gold mb-4 lg:mb-6 uppercase tracking-[0.2em] element-glow-gold font-bold">Montal Gym</h4>
                          
                          <div className="flex items-center justify-center lg:justify-start gap-3 text-stone-300 mb-8 lg:mb-10 text-sm tracking-[0.1em] font-serif border-b border-gold/10 pb-6">
                            <span className="material-icons-outlined text-gold/80">location_on</span>
                            Mitre 1851, CABA, Argentina
                          </div>

                          <div className="space-y-4 mb-8 lg:mb-10 text-center lg:text-left flex flex-col items-center lg:items-stretch">
                            <div className="p-5 bg-void/60 border border-gold/15 rounded-lg hover:bg-void/80 transition-colors group/card w-full flex flex-col items-center lg:items-start">
                              <p className="text-gold font-display font-bold uppercase tracking-widest mb-2 text-[0.7rem] flex items-center justify-center lg:justify-start gap-2">
                                <span className="material-icons-outlined text-base">sports_martial_arts</span>
                                Clases Principales
                              </p>
                              <div className="flex flex-col items-center lg:items-start">
                                <p className="text-stone-200 text-base font-serif mb-1">Sábados 10:00 a 12:00hs</p>
                                <p className="text-stone-500 text-xs font-display uppercase tracking-[0.1em]">Maestro Jorge Prina</p>
                              </div>
                            </div>
                            
                            <div className="p-5 bg-void/60 border border-gold/15 rounded-lg hover:bg-void/80 transition-colors group/card w-full flex flex-col items-center lg:items-start">
                              <p className="text-gold font-display font-bold uppercase tracking-widest mb-2 text-[0.7rem] flex items-center justify-center lg:justify-start gap-2">
                                <span className="material-icons-outlined text-base">hardware</span>
                                Disciplina Complementaria
                              </p>
                              <div className="flex flex-col items-center lg:items-start">
                                <p className="text-stone-200 text-base font-serif mb-1">Bastón Bonafont (12 a 13hs)</p>
                                <p className="text-stone-500 text-xs font-display uppercase tracking-[0.1em]">Prof. Florentino Abad Troncoso</p>
                              </div>
                            </div>
                          </div>

                          <a 
                            href="https://www.google.com/maps/search/?api=1&query=Mitre+1851,+CABA" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-4 w-full px-8 py-5 border border-gold/40 text-gold hover:text-void hover:bg-gold transition-all duration-500 font-display text-xs tracking-[0.3em] uppercase font-bold group rounded-sm"
                          >
                            <span className="material-icons-outlined text-lg group-hover:scale-110 transition-transform">map</span>
                            <span className="relative">
                              CÓMO LLEGAR
                              <span className="absolute -bottom-1 left-0 w-0 h-px bg-void group-hover:w-full transition-all duration-300"></span>
                            </span>
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="relative group">
                      <div className="absolute -inset-4 border border-gold/20 scale-90 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                      
                      <button 
                        data-sedes-btn
                        onClick={() => setCurrentView('sedes')}
                        className="relative px-12 md:px-20 py-6 md:py-8 bg-gradient-to-r from-gold/90 via-gold to-gold/90 text-void font-display font-black text-xs md:text-base uppercase tracking-[0.4em] md:tracking-[0.6em] hover:scale-105 transition-all shadow-[0_0_60px_rgba(197,160,101,0.3)] overflow-hidden group border-b-4 border-void/20 hover:shadow-[0_0_80px_rgba(197,160,101,0.5)]"
                      >
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-void/10 overflow-hidden">
                          <div className="guardapampa-divider h-full opacity-40 scale-y-50 mix-blend-multiply"></div>
                        </div>
                        <div className="absolute bottom-0 left-0 w-full h-1.5 bg-void/10 overflow-hidden">
                          <div className="guardapampa-divider h-full opacity-40 scale-y-50 mix-blend-multiply"></div>
                        </div>
                        
                        <div className="absolute inset-0 opacity-[0.08] pointer-events-none guardapampa-divider scale-125 -rotate-6 mix-blend-multiply"></div>
                        
                        <span className="relative z-10 flex items-center gap-4 md:gap-6">
                          <div className="w-6 md:w-8 h-px bg-void/30 group-hover:w-12 transition-all duration-500"></div>
                          VER TODAS LAS SEDES
                          <div className="w-6 md:w-8 h-px bg-void/30 group-hover:w-12 transition-all duration-500"></div>
                        </span>
                        
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                      </button>
                    </div>
                  </div>
                </RevealOnScroll>
              </div>
            </section>

            {/* Blog/Novedades/Tienda Section */}
            <section id="novedades" className="py-24 md:py-32 bg-void border-t border-gold/5 relative overflow-hidden">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto">
                  {/* Academia Online Card */}
                  <RevealOnScroll delay={0} direction="left">
                    <div 
                      onClick={() => setCurrentView('academia-online')}
                      className="bg-card-depth p-10 md:p-12 shadow-2xl relative overflow-hidden group border border-gold/5 rounded-sm mx-auto w-full max-w-lg md:max-w-none cursor-pointer hover:border-gold/30 transition-all h-full flex flex-col"
                    >
                       <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                        <span className="material-icons-outlined text-7xl md:text-8xl text-gold">menu_book</span>
                      </div>
                      <h3 className="font-display text-2xl md:text-3xl text-stone-200 mb-6 tracking-[0.2em] md:tracking-[0.3em] uppercase text-center md:text-left group-hover:text-gold transition-colors text-glow-white leading-tight">Aprende de <br className="hidden lg:block"/> Manera Online</h3>
                      <p className="text-stone-500 mb-10 font-serif text-sm md:text-base leading-relaxed max-w-sm italic mx-auto md:mx-0 text-center md:text-left flex-grow">
                        Acceso a los tratados digitalizados y lecciones en video para el mundo.
                      </p>
                      <div className="flex justify-center md:justify-start">
                        <span className="inline-flex items-center text-gold font-display uppercase tracking-[0.4em] text-[0.6rem] md:text-[0.65rem] group-hover:text-white transition-all group-hover:gap-6 gap-3 font-bold">
                            ENTRAR <span className="material-icons-outlined text-xs">east</span>
                        </span>
                      </div>
                    </div>
                  </RevealOnScroll>

                  {/* Tienda Card */}
                  <RevealOnScroll delay={150} direction="right">
                    <div 
                      onClick={() => setCurrentView('merch')}
                      className="bg-card-depth p-10 md:p-12 shadow-2xl relative overflow-hidden group border border-gold/5 rounded-sm mx-auto w-full max-w-lg md:max-w-none cursor-pointer hover:border-gold/30 transition-all h-full flex flex-col"
                    >
                       <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                        <span className="material-icons-outlined text-7xl md:text-8xl text-gold">shopping_bag</span>
                      </div>
                      <h3 className="font-display text-2xl md:text-3xl text-stone-200 mb-6 tracking-[0.2em] md:tracking-[0.3em] uppercase text-center md:text-left group-hover:text-gold transition-colors text-glow-white leading-tight">Conseguí <br className="hidden lg:block"/> Tu Remera</h3>
                      <p className="text-stone-500 mb-10 font-serif text-sm md:text-base leading-relaxed max-w-sm italic mx-auto md:mx-0 text-center md:text-left flex-grow">
                        Equipamiento oficial, libros y vestimenta de nuestra academia.
                      </p>
                      <div className="flex justify-center md:justify-start">
                        <span className="inline-flex items-center text-gold font-display uppercase tracking-[0.4em] text-[0.6rem] md:text-[0.65rem] group-hover:text-white transition-all group-hover:gap-6 gap-3 font-bold">
                            ENTRAR <span className="material-icons-outlined text-xs">east</span>
                        </span>
                      </div>
                    </div>
                  </RevealOnScroll>
                </div>
              </div>
            </section>
          </main>

          <footer className="bg-card-depth text-stone-500 py-16 md:py-24 relative z-10 overflow-hidden">
            <div className="guardapampa-divider absolute top-0 left-0 w-full animate-guardapampa"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center w-full mt-12 md:mt-16">
              <RevealOnScroll className="w-full flex flex-col items-center">
                <div className="mb-12 md:mb-16 flex justify-center w-full">
                   <img 
                     src="https://i.imgur.com/cbCrHDB.png" 
                     className="w-24 h-24 md:w-32 md:h-32 opacity-60 grayscale mx-auto"
                     alt="Footer Logo"
                   />
                </div>
                <h2 className="font-display text-xl md:text-2xl text-stone-300 tracking-[0.4em] md:tracking-[0.5em] uppercase mb-6 text-center w-full">Esgrima Criolla</h2>
                <p className="font-serif text-xs md:text-sm italic text-stone-600 mb-16 md:mb-20 tracking-[0.2em] md:tracking-[0.3em] uppercase text-center font-bold w-full">Buenas y Santas • Arte Marcial Argentino</p>
                
                <div className="flex flex-wrap justify-center gap-8 md:gap-12 mb-16 md:mb-20 w-full">
                  {[
                    { name: 'INSTAGRAM', url: 'https://www.instagram.com/esgrima_criolla?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==' },
                    { name: 'YOUTUBE', url: 'https://www.youtube.com/c/esgrimacriolla' },
                    { name: 'TIKTOK', url: 'https://www.tiktok.com/@esgrimacriolla?is_from_webapp=1&sender_device=pc' },
                    { name: 'FACEBOOK', url: 'https://www.facebook.com/esgrimacriolla' },
                    { name: 'BIBLIOTECA', url: 'https://esgrimacriolla.blogspot.com/?zx=47e698f86cb74a4e' }
                  ].map((social) => (
                    <a 
                      key={social.name} 
                      className="hover:text-gold transition-colors text-xs md:text-sm font-display tracking-[0.3em] md:tracking-[0.4em] cursor-pointer opacity-60 hover:opacity-100 font-bold text-stone-400" 
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {social.name}
                    </a>
                  ))}
                </div>
                
                <div className="text-xs md:text-sm text-stone-700 font-display tracking-[0.2em] md:tracking-[0.3em] text-center uppercase space-y-4 font-bold">
                  <p className="mb-4 text-gold/40 text-glow-gold">"LA TECNOLOGIA DEL ARTE AL SERVICIO DEL ARTE DEL AYER"</p>
                  <p>© 2026 Esgrima Criolla.</p>
                  <p className="opacity-40 italic">"Fundada sobre principios gauchos"</p>
                </div>
              </RevealOnScroll>
            </div>
            <div className="guardapampa-divider absolute bottom-0 left-0 w-full opacity-20 animate-guardapampa"></div>
          </footer>
        </>
      ) : currentView === 'merch' ? (
        <Merch onBack={() => setCurrentView('home')} />
      ) : currentView === 'sedes' ? (
        <Sedes onBack={() => setCurrentView('home')} />
      ) : currentView === 'academia-online' ? (
        <AcademiaOnline onBack={() => setCurrentView('home')} />
      ) : (
        <Novedades onBack={() => setCurrentView('home')} />
      )}

      {/* Admission Modal - NEW ELEGANT INTERFACE */}
      <AnimatePresence>
        <AdmissionModal 
          isOpen={isAdmissionModalOpen} 
          onClose={() => setIsAdmissionModalOpen(false)} 
        />
      </AnimatePresence>

      <AIHistorian />
      </div>
    </div>
  );
};

export default App;

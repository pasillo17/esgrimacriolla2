import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import FeatureCard from './components/FeatureCard';
import AIHistorian from './components/AIHistorian';
import RevealOnScroll from './components/RevealOnScroll';
import ClasesGrid from './components/ClasesGrid';
import Merch from './components/Merch';
import Sedes from './components/Sedes';
import AcademiaOnline from './components/AcademiaOnline';
import BibliotecaBlog, { BlogTeaserSection } from './components/BibliotecaBlog';
import AdmissionModal from './components/AdmissionModal';
import FaqSection from './components/FaqSection';
import FloatingCloser from './components/FloatingCloser';
import { FEATURES } from './constants';

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
            background: `rgba(212, 170, 106, ${Math.random() * 0.2 + 0.15})`,
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
        backgroundColor: isHovering ? 'rgba(212, 170, 106, 0.12)' : 'transparent',
      }}
      transition={{ type: 'spring', damping: 20, stiffness: 250, mass: 0.5 }}
    />
  );
};

const App: React.FC = () => {
  const [isLoadingApp, setIsLoadingApp] = useState(true);
  const [currentView, setCurrentView] = useState<'home' | 'merch' | 'sedes' | 'academia-online' | 'novedades'>('home');
  const [selectedBlogPostId, setSelectedBlogPostId] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdmissionModalOpen, setIsAdmissionModalOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  React.useEffect(() => {
    const loadTimer = setTimeout(() => setIsLoadingApp(false), 1800);

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
            transition={{ duration: 1.1 }}
            className="fixed inset-0 z-[1000] bg-void flex flex-col items-center justify-center overflow-hidden"
          >
            <div className="relative z-10">
              <motion.img
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  filter: [
                    'drop-shadow(0 0 10px rgba(212, 170, 106, 0.2))',
                    'drop-shadow(0 0 30px rgba(212, 170, 106, 0.5))',
                    'drop-shadow(0 0 10px rgba(212, 170, 106, 0.2))'
                  ]
                }}
                transition={{ duration: 1.5 }}
                src="https://i.imgur.com/cbCrHDB.png"
                alt="Logo Loading"
                referrerPolicy="no-referrer"
                className="w-32 h-32 md:w-44 md:h-44"
              />
            </div>

            <div className="relative z-10 mt-10 flex flex-col items-center">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 160 }}
                transition={{ duration: 1.2, delay: 0.2 }}
                className="h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent"
              />
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 0.7, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="mt-4 font-display text-xs tracking-[0.5em] text-gold uppercase font-bold"
              >
                Esgrima Criolla
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
          className="h-full bg-gold shadow-[0_0_10px_rgba(212,170,106,0.8)]"
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

      {/* Vignette Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 vignette-overlay opacity-60 hidden md:block"></div>

      {/* Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none z-40 bg-grain opacity-5 mix-blend-overlay"></div>

      <Header
        onNavigate={(view) => {
          if (view === 'novedades') {
            setSelectedBlogPostId(null);
          }
          setCurrentView(view);
          setIsMenuOpen(false);
        }}
        isMenuOpen={isMenuOpen}
        onToggleMenu={() => setIsMenuOpen(!isMenuOpen)}
        onOpenModal={() => setIsAdmissionModalOpen(true)}
      />

      <div className={`transition-opacity duration-300 ${isMenuOpen ? 'opacity-10 pointer-events-none blur-sm' : 'opacity-100'}`}>
        {currentView === 'home' ? (
          <>
            <main className="relative z-20">
              <div id="inicio">
                <Hero onOpenModal={() => setIsAdmissionModalOpen(true)} />
              </div>

              {/* NUESTRA ESTRUCTURA */}
              <section id="estructura" className="py-16 md:py-24 bg-void relative overflow-hidden border-t border-gold/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                  <RevealOnScroll direction="down">
                    <div className="flex flex-col items-center mb-16 md:mb-20 text-center mx-auto">
                      <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-stone-100 tracking-[0.2em] md:tracking-[0.3em] uppercase mb-4 text-center w-full text-glow-white">
                        Nuestra Estructura
                      </h2>
                      <div className="flex items-center justify-center gap-4 w-full">
                        <div className="h-px bg-gold/30 w-8 md:w-12"></div>
                        <p className="text-[0.5rem] md:text-[0.6rem] text-gold tracking-[0.4em] md:tracking-[0.5em] uppercase font-bold text-center text-glow-gold">
                          Pilares Fundamentales
                        </p>
                        <div className="h-px bg-gold/30 w-8 md:w-12"></div>
                      </div>
                    </div>
                  </RevealOnScroll>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
                    {FEATURES.map((feature, idx) => (
                      <RevealOnScroll key={feature.id} delay={idx * 150} direction={idx % 2 === 0 ? 'left' : 'right'}>
                        <FeatureCard feature={feature} />
                      </RevealOnScroll>
                    ))}
                  </div>
                </div>
              </section>

              {/* LEGADO Y CLASES */}
              <section id="clases" className="py-24 md:py-40 bg-card-depth relative border-t border-gold/10 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                  <RevealOnScroll direction="down">
                    <div className="flex flex-col items-center mb-20 md:mb-32 text-center mx-auto relative">
                      <div className="w-full max-w-4xl flex flex-col items-center">
                        <div className="guardapampa-divider w-full h-8 opacity-40 mb-12 animate-guardapampa"></div>

                        <h2 className="font-display text-4xl sm:text-6xl md:text-8xl text-stone-100 tracking-[0.15em] uppercase text-glow-white relative z-10">
                          LEGADO Y CLASES
                        </h2>

                        <div className="guardapampa-divider w-full h-8 opacity-40 mt-12 animate-guardapampa"></div>
                      </div>

                      <div className="mt-14 flex flex-col items-center justify-center gap-8 relative z-10 max-w-3xl mx-auto">
                        <div className="flex items-center gap-6">
                          <div className="h-[1px] bg-gold/40 w-12 md:w-20"></div>
                          <p className="text-[0.7rem] md:text-xs text-gold tracking-[0.5em] uppercase font-bold text-glow-gold">
                            Crónicas de Nuestra Tierra
                          </p>
                          <div className="h-[1px] bg-gold/40 w-12 md:w-20"></div>
                        </div>

                        <div className="font-serif text-stone-300 text-sm md:text-base leading-relaxed md:leading-loose text-center space-y-4 px-4 italic">
                          <p>
                            El inicio real de la esgrima criolla se remonta a los duelos de honor en las pulperías y los campos de batalla de nuestra independencia. Una técnica forjada en la necesidad y templada en el coraje.
                          </p>
                          <p>
                            Hoy, en nuestra academia, mantenemos viva esa llama. No solo enseñamos a combatir, sino a comprender la filosofía de vida de quienes nos precedieron, adaptando su legado a los tiempos modernos sin perder su esencia.
                          </p>
                        </div>

                        <div className="flex items-center gap-6 mt-8">
                          <div className="h-[1px] bg-gold/40 w-12 md:w-20"></div>
                          <p className="text-[0.7rem] md:text-xs text-gold tracking-[0.5em] uppercase font-bold text-glow-gold">
                            Programa de Estudio
                          </p>
                          <div className="h-[1px] bg-gold/40 w-12 md:w-20"></div>
                        </div>
                      </div>
                    </div>
                  </RevealOnScroll>

                  <ClasesGrid />
                </div>
              </section>

              {/* DÓNDE APRENDER */}
              <section id="donde-aprender" className="pt-16 pb-24 md:py-36 bg-gradient-to-b from-void to-card-depth relative overflow-hidden border-t border-gold/10">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/5 rounded-full blur-[150px] pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                  <RevealOnScroll delay={200} direction="up">
                    <div className="flex flex-col items-center">
                      <div className="text-center mb-16 md:mb-20 w-full">
                        <h2 className="font-display text-4xl sm:text-6xl md:text-8xl text-stone-100 tracking-[0.15em] uppercase mb-4 text-glow-white flex flex-col md:flex-row items-center justify-center gap-2 md:gap-5">
                          <span>¿DÓNDE</span>
                          <span className="text-gold text-glow-gold">APRENDER?</span>
                        </h2>
                        <div className="w-24 md:w-40 h-[2px] bg-gradient-to-r from-transparent via-gold/50 to-transparent mx-auto mt-6"></div>
                      </div>

                      <div className="bg-card-depth border border-gold/25 p-6 md:p-14 max-w-4xl w-full text-center lg:text-left shadow-2xl mb-16 relative overflow-hidden group rounded-sm">
                        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12 relative z-10">
                          {/* Video Column */}
                          <div className="w-full lg:w-1/2 relative group/video">
                            <div className="relative w-full aspect-video lg:aspect-[4/5] bg-black border border-gold/25 rounded-sm overflow-hidden shadow-2xl pointer-events-none">
                              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10 pointer-events-none"></div>
                              <iframe
                                className="absolute inset-0 w-[150%] h-[150%] -left-[25%] -top-[25%] opacity-80 mix-blend-screen"
                                src="https://www.youtube.com/embed/p_MVjDzK4v8?autoplay=1&mute=1&loop=1&playlist=p_MVjDzK4v8&controls=0&modestbranding=1&rel=0&playsinline=1&vq=hd1080&cc_load_policy=0&iv_load_policy=3&disablekb=1"
                                title="Esgrima Criolla Institucional"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              ></iframe>
                              <div className="absolute bottom-4 left-4 lg:bottom-6 lg:left-6 z-20 flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-black/80 border border-gold/40 flex items-center justify-center backdrop-blur-md">
                                  <span className="material-icons-outlined text-gold text-base">play_arrow</span>
                                </div>
                                <div className="flex flex-col items-start">
                                  <span className="text-stone-100 text-[0.65rem] font-display tracking-[0.25em] uppercase font-bold">
                                    Video Institucional
                                  </span>
                                  <span className="text-gold/80 text-[0.55rem] font-display tracking-[0.3em] uppercase">
                                    Sede Central
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Content Column */}
                          <div className="w-full lg:w-1/2 flex flex-col justify-center h-full pt-2">
                            <div className="inline-flex items-center gap-3 px-4 py-1.5 border border-gold/30 bg-gold/10 text-gold text-xs font-display tracking-[0.3em] uppercase mb-5 rounded-sm w-fit mx-auto lg:mx-0">
                              Buenos Aires
                            </div>

                            <h3 className="font-display text-3xl md:text-4xl text-stone-100 mb-2 uppercase tracking-[0.18em] text-glow-white font-bold">
                              Sede Central
                            </h3>
                            <h4 className="font-display text-xl md:text-2xl text-gold mb-5 uppercase tracking-[0.25em] font-bold">
                              Montal Gym — Congreso
                            </h4>

                            <div className="flex items-center justify-center lg:justify-start gap-3 text-stone-300 mb-6 text-sm tracking-[0.1em] font-serif border-b border-gold/15 pb-5">
                              <span className="material-icons-outlined text-gold">location_on</span>
                              Bartolomé Mitre 1851, CABA, Argentina
                            </div>

                            <div className="space-y-4 mb-6 text-center lg:text-left flex flex-col items-center lg:items-stretch">
                              <div className="p-4 bg-void/70 border border-gold/20 rounded-sm w-full flex flex-col items-center lg:items-start">
                                <p className="text-gold font-display font-bold uppercase tracking-widest mb-1.5 text-[0.68rem] flex items-center gap-2">
                                  <span className="material-icons-outlined text-base">sports_martial_arts</span>
                                  Clases Principales
                                </p>
                                <p className="text-stone-100 text-base font-serif">Sábados 10:00 a 12:00hs</p>
                                <p className="text-stone-400 text-xs font-display uppercase tracking-[0.15em] mt-0.5">
                                  Maestro Jorge Prina
                                </p>
                              </div>

                              <div className="p-4 bg-void/70 border border-gold/20 rounded-sm w-full flex flex-col items-center lg:items-start">
                                <p className="text-gold font-display font-bold uppercase tracking-widest mb-1.5 text-[0.68rem] flex items-center gap-2">
                                  <span className="material-icons-outlined text-base">hardware</span>
                                  Disciplina Complementaria
                                </p>
                                <p className="text-stone-100 text-base font-serif">Bastón Bonafont (12:00 a 13:00hs)</p>
                                <p className="text-stone-400 text-xs font-display uppercase tracking-[0.15em] mt-0.5">
                                  Prof. Florentino Abad Troncoso
                                </p>
                              </div>
                            </div>

                            <div className="p-3.5 mb-5 bg-gold/10 border border-gold/30 rounded-sm text-center lg:text-left">
                              <p className="font-display text-[0.65rem] text-gold uppercase tracking-[0.2em] font-bold">
                                ✓ 1° Clase de Prueba con Equipo Prestado Incluido
                              </p>
                              <p className="font-serif italic text-xs text-stone-300 mt-0.5">
                                No necesitás experiencia ni facón propio. Vení con ropa cómoda.
                              </p>
                            </div>

                            <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
                              <a
                                href="https://api.whatsapp.com/send?phone=5492216246179&text=%C2%A1Buenas%20y%20Santas!%20Quiero%20reservar%20mi%20Clase%20de%20Prueba%20(con%20equipo%20prestado%20incluido)%20en%20Sede%20Central%20(Montal%20Gym)."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-3 w-full px-6 py-4 bg-gold text-void hover:bg-stone-100 transition-all duration-300 font-display text-xs tracking-[0.22em] uppercase font-black rounded-sm shadow-[0_0_25px_rgba(212,170,106,0.3)]"
                              >
                                <span className="material-icons-outlined text-base">chat</span>
                                <span>RESERVAR CLASE DE PRUEBA</span>
                              </a>

                              <a
                                href="https://www.google.com/maps/search/?api=1&query=Mitre+1851,+CABA"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-4 w-full px-8 py-4 border border-gold/40 text-gold hover:text-void hover:bg-gold transition-all duration-500 font-display text-xs tracking-[0.3em] uppercase font-bold group rounded-sm"
                              >
                                <span className="material-icons-outlined text-lg">map</span>
                                <span>CÓMO LLEGAR</span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full max-w-3xl">
                        <button
                          data-sedes-btn
                          onClick={() => setCurrentView('sedes')}
                          className="w-full sm:w-auto relative px-10 md:px-14 py-6 bg-gradient-to-r from-gold/90 via-gold to-gold/90 text-void font-display font-black text-xs md:text-sm uppercase tracking-[0.35em] hover:scale-105 transition-all shadow-[0_0_60px_rgba(212,170,106,0.3)] overflow-hidden group border-b-4 border-void/20 cursor-pointer"
                        >
                          <span className="relative z-10 flex items-center justify-center gap-4">
                            VER TODAS LAS SEDES
                          </span>
                        </button>

                        <button
                          onClick={() => setIsAdmissionModalOpen(true)}
                          className="w-full sm:w-auto px-8 md:px-10 py-6 bg-void border border-gold/50 hover:bg-gold/10 text-gold font-display font-bold text-xs md:text-sm uppercase tracking-[0.25em] transition-all flex items-center justify-center gap-3 rounded-sm cursor-pointer shadow-xl"
                        >
                          <span className="material-icons-outlined text-base">my_location</span>
                          BUSCAR SEDE POR GPS
                        </button>
                      </div>
                    </div>
                  </RevealOnScroll>
                </div>
              </section>

              {/* ACADEMIA ONLINE & TIENDA OFICIAL */}
              <section id="novedades" className="py-24 md:py-32 bg-void border-t border-gold/15 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto">
                    {/* Academia Online Card */}
                    <RevealOnScroll delay={0} direction="left">
                      <div
                        onClick={() => setCurrentView('academia-online')}
                        className="bg-card-depth border border-gold/20 p-10 md:p-12 relative overflow-hidden group rounded-sm mx-auto w-full max-w-lg md:max-w-none cursor-pointer hover:border-gold/50 transition-all h-full flex flex-col shadow-2xl"
                      >
                        <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                          <span className="material-icons-outlined text-7xl md:text-8xl text-gold">menu_book</span>
                        </div>
                        <span className="inline-block w-fit mx-auto md:mx-0 px-3 py-1 mb-4 bg-gold/10 border border-gold/30 text-gold font-display text-[0.55rem] tracking-[0.25em] uppercase font-bold">
                          Certificación Oficial Univ. de Catamarca
                        </span>
                        <h3 className="font-display text-2xl md:text-3xl text-stone-100 mb-4 tracking-[0.18em] uppercase text-center md:text-left group-hover:text-gold transition-colors text-glow-white leading-tight font-bold">
                          Aprende de <br className="hidden lg:block" /> Manera Online
                        </h3>
                        <p className="text-stone-300 mb-8 font-serif text-sm md:text-base leading-relaxed max-w-sm italic mx-auto md:mx-0 text-center md:text-left flex-grow">
                          Clases personalizadas a distancia, Curso de Monitor (64 módulos) y formación en Cultura Gaucha para alumnos de todo el país y el exterior.
                        </p>
                        <div className="flex justify-center md:justify-start pt-4 border-t border-gold/15">
                          <span className="inline-flex items-center text-gold font-display uppercase tracking-[0.35em] text-xs group-hover:text-white transition-all group-hover:gap-5 gap-3 font-bold">
                            VER PROGRAMAS ONLINE <span className="material-icons-outlined text-xs">east</span>
                          </span>
                        </div>
                      </div>
                    </RevealOnScroll>

                    {/* Tienda Card */}
                    <RevealOnScroll delay={150} direction="right">
                      <div
                        onClick={() => setCurrentView('merch')}
                        className="bg-card-depth border border-gold/20 p-10 md:p-12 relative overflow-hidden group rounded-sm mx-auto w-full max-w-lg md:max-w-none cursor-pointer hover:border-gold/50 transition-all h-full flex flex-col shadow-2xl"
                      >
                        <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                          <span className="material-icons-outlined text-7xl md:text-8xl text-gold">shopping_bag</span>
                        </div>
                        <span className="inline-block w-fit mx-auto md:mx-0 px-3 py-1 mb-4 bg-gold text-void font-display text-[0.55rem] tracking-[0.25em] uppercase font-black">
                          $32.000 ARS · Talles S al XL
                        </span>
                        <h3 className="font-display text-2xl md:text-3xl text-stone-100 mb-4 tracking-[0.18em] uppercase text-center md:text-left group-hover:text-gold transition-colors text-glow-white leading-tight font-bold">
                          Conseguí <br className="hidden lg:block" /> Tu Remera
                        </h3>
                        <p className="text-stone-300 mb-8 font-serif text-sm md:text-base leading-relaxed max-w-sm italic mx-auto md:mx-0 text-center md:text-left flex-grow">
                          Remera oficial "Juan Moreira" en algodón 100% peinado premium. Elegí tu talle y comprá directo con Envío y Compra Protegida por Mercado Libre.
                        </p>
                        <div className="flex justify-center md:justify-start pt-4 border-t border-gold/15">
                          <span className="inline-flex items-center text-gold font-display uppercase tracking-[0.35em] text-xs group-hover:text-white transition-all group-hover:gap-5 gap-3 font-bold">
                            ELEGIR TALLE Y COMPRAR <span className="material-icons-outlined text-xs">east</span>
                          </span>
                        </div>
                      </div>
                    </RevealOnScroll>
                  </div>
                </div>
              </section>

              {/* BIBLIOTECA & BLOG OFICIAL (esgrimacriolla.blogspot.com) */}
              <BlogTeaserSection
                onOpenLibrary={(postId) => {
                  setSelectedBlogPostId(postId || null);
                  setCurrentView('novedades');
                }}
              />

              {/* Preguntas Frecuentes & Cierre de Objeciones */}
              <FaqSection
                onOpenModal={() => setIsAdmissionModalOpen(true)}
                onNavigate={(view) => setCurrentView(view)}
              />
            </main>

            <footer className="bg-void text-stone-400 py-16 md:py-24 relative z-10 overflow-hidden">
              <div className="guardapampa-divider absolute top-0 left-0 w-full animate-guardapampa"></div>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center w-full mt-12 md:mt-16">
                <RevealOnScroll className="w-full flex flex-col items-center">
                  <div className="mb-10 flex justify-center w-full">
                    <img
                      src="https://i.imgur.com/cbCrHDB.png"
                      referrerPolicy="no-referrer"
                      className="w-24 h-24 md:w-32 md:h-32 opacity-85 mx-auto"
                      alt="Footer Logo"
                    />
                  </div>
                  <h2 className="font-display text-xl md:text-2xl text-stone-200 tracking-[0.4em] uppercase mb-4 text-center w-full font-bold">
                    Esgrima Criolla
                  </h2>
                  <p className="font-serif text-xs md:text-sm italic text-stone-400 mb-14 tracking-[0.2em] uppercase text-center font-bold w-full">
                    Buenas y Santas · Arte Marcial Argentino
                  </p>

                  <div className="flex flex-wrap justify-center gap-8 md:gap-12 mb-14 w-full">
                    {[
                      { name: 'INSTAGRAM', url: 'https://www.instagram.com/esgrima_criolla?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==' },
                      { name: 'YOUTUBE', url: 'https://www.youtube.com/c/esgrimacriolla' },
                      { name: 'TIKTOK', url: 'https://www.tiktok.com/@esgrimacriolla?is_from_webapp=1&sender_device=pc' },
                      { name: 'FACEBOOK', url: 'https://www.facebook.com/esgrimacriolla' },
                      { name: 'BIBLIOTECA', url: 'https://esgrimacriolla.blogspot.com/?zx=ce8a900e74a110d' }
                    ].map((social) => (
                      <a
                        key={social.name}
                        className="hover:text-gold transition-colors text-xs md:text-sm font-display tracking-[0.3em] md:tracking-[0.4em] cursor-pointer opacity-75 hover:opacity-100 font-bold text-stone-300"
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {social.name}
                      </a>
                    ))}
                  </div>

                  <div className="text-xs md:text-sm text-stone-400 font-display tracking-[0.2em] md:tracking-[0.3em] text-center uppercase space-y-3 font-bold">
                    <p className="mb-3 text-gold/70 text-glow-gold">"LA TECNOLOGÍA DEL ARTE AL SERVICIO DEL ARTE DEL AYER"</p>
                    <p>© 2026 Academia de Esgrima Criolla — Buenas y Santas.</p>
                    <p className="opacity-70 italic font-serif">"Fundada sobre principios gauchos"</p>
                  </div>
                </RevealOnScroll>
              </div>
              <div className="guardapampa-divider absolute bottom-0 left-0 w-full opacity-20 animate-guardapampa"></div>
            </footer>
          </>
        ) : currentView === 'merch' ? (
          <Merch onBack={() => setCurrentView('home')} />
        ) : currentView === 'sedes' ? (
          <Sedes onBack={() => setCurrentView('home')} onOpenModal={() => setIsAdmissionModalOpen(true)} />
        ) : currentView === 'academia-online' ? (
          <AcademiaOnline onBack={() => setCurrentView('home')} />
        ) : (
          <BibliotecaBlog
            onBack={() => setCurrentView('home')}
            initialPostId={selectedBlogPostId}
          />
        )}

        {/* Admission Modal - GPS SEDE FINDER & TRIAL CLASS */}
        <AnimatePresence>
          <AdmissionModal
            isOpen={isAdmissionModalOpen}
            onClose={() => setIsAdmissionModalOpen(false)}
          />
        </AnimatePresence>

        <FloatingCloser onOpenModal={() => setIsAdmissionModalOpen(true)} />
        <AIHistorian />
      </div>
    </div>
  );
};

export default App;

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
import CursoVisteador, { PaymentApprovedModal } from './components/CursoVisteador';
import BibliotecaBlog from './components/BibliotecaBlog';
import FaqSection from './components/FaqSection';
import { FEATURES } from './constants';

type AppView = 'home' | 'merch' | 'sedes' | 'academia-online' | 'novedades' | 'curso-visteador';

const getInitialUrlParams = () => {
  if (typeof window === 'undefined') {
    return { isPagoAprobado: false, isCursoVisteador: false };
  }
  const params = new URLSearchParams(window.location.search);
  return {
    isPagoAprobado: params.get('pago') === 'aprobado',
    isCursoVisteador: params.get('curso') === 'de-cero-a-visteador',
  };
};

const DustParticles: React.FC = () => {
  return (
    <div className="dust-container hidden md:block">
      {[...Array(24)].map((_, i) => (
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
  const initialUrl = getInitialUrlParams();
  const [isLoadingApp, setIsLoadingApp] = useState(!(initialUrl.isPagoAprobado || initialUrl.isCursoVisteador));
  const [currentView, setCurrentView] = useState<AppView>(
    initialUrl.isPagoAprobado || initialUrl.isCursoVisteador ? 'curso-visteador' : 'home'
  );
  const [isPaymentApprovedOpen, setIsPaymentApprovedOpen] = useState(initialUrl.isPagoAprobado);
  const [selectedBlogPostId, setSelectedBlogPostId] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const navigateToView = (view: AppView) => {
    setCurrentView(view);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (view === 'curso-visteador') {
        url.searchParams.set('curso', 'de-cero-a-visteador');
      } else {
        url.searchParams.delete('curso');
      }
      const nextUrl = `${url.pathname}${url.search}${url.hash}`;
      window.history.replaceState({}, '', nextUrl);
    }
  };

  const handleClosePaymentApproved = () => {
    setIsPaymentApprovedOpen(false);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.delete('pago');
      const nextUrl = `${url.pathname}${url.search}${url.hash}`;
      window.history.replaceState({}, '', nextUrl);
    }
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  React.useEffect(() => {
    const loadTimer = isLoadingApp ? setTimeout(() => setIsLoadingApp(false), 1800) : null;

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (loadTimer) clearTimeout(loadTimer);
    };
  }, [isLoadingApp]);

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

      {/* Scroll To Top Button (Non-colliding on mobile, hidden on course mobile where bottom CTA sits) */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            onClick={scrollToTop}
            aria-label="Volver arriba"
            className={`fixed bottom-20 left-3 sm:bottom-6 sm:left-6 z-[60] w-11 h-11 md:w-12 md:h-12 rounded-full bg-gold text-void items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-transform shine-effect cursor-pointer ${
              currentView === 'curso-visteador' ? 'hidden lg:flex' : 'flex'
            }`}
          >
            <ChevronLeft className="rotate-90" size={22} />
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
          navigateToView(view);
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

              {/* NUESTRA ESTRUCTURA */}
              <section id="estructura" className="py-16 md:py-24 bg-void relative overflow-hidden border-t border-gold/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                  <RevealOnScroll direction="down">
                    <div className="flex flex-col items-center mb-12 md:mb-16 text-center mx-auto">
                      <p className="text-xs sm:text-sm text-gold tracking-[0.16em] uppercase font-semibold mb-2">
                        Pilares Fundamentales
                      </p>
                      <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-stone-100 tracking-tight text-center w-full">
                        Nuestra Estructura
                      </h2>
                    </div>
                  </RevealOnScroll>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {FEATURES.map((feature, idx) => (
                      <RevealOnScroll key={feature.id} delay={idx * 120} direction={idx % 2 === 0 ? 'left' : 'right'}>
                        <FeatureCard feature={feature} />
                      </RevealOnScroll>
                    ))}
                  </div>
                </div>
              </section>

              {/* LEGADO Y CLASES */}
              <section id="clases" className="py-16 md:py-28 bg-card-depth relative border-t border-gold/10 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                  <RevealOnScroll direction="down">
                    <div className="flex flex-col items-center mb-12 md:mb-20 text-center mx-auto relative">
                      <div className="w-full max-w-4xl flex flex-col items-center">
                        <div className="guardapampa-divider w-full h-8 opacity-40 mb-8 animate-guardapampa"></div>

                        <p className="text-xs sm:text-sm text-gold tracking-[0.16em] uppercase font-semibold mb-2">
                          Crónicas de Nuestra Tierra
                        </p>
                        <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold text-stone-100 tracking-tight relative z-10">
                          Legado y Clases
                        </h2>

                        <div className="guardapampa-divider w-full h-8 opacity-40 mt-8 animate-guardapampa"></div>
                      </div>

                      <div className="mt-8 flex flex-col items-center justify-center gap-5 relative z-10 max-w-2xl mx-auto">
                        <div className="font-sans text-stone-200 text-base md:text-lg leading-relaxed text-center space-y-4 px-2">
                          <p>
                            El inicio real de la esgrima criolla se remonta a los duelos de honor en las pulperías y los campos de batalla de nuestra independencia. Una técnica forjada en la necesidad y templada en el coraje.
                          </p>
                          <p>
                            Hoy, en nuestra academia, mantenemos viva esa llama. No solo enseñamos a combatir, sino a comprender la filosofía de vida de quienes nos precedieron, adaptando su legado a los tiempos modernos sin perder su esencia.
                          </p>
                        </div>

                        <p className="text-xs sm:text-sm text-gold tracking-[0.18em] uppercase font-semibold mt-4">
                          Programa de Estudio
                        </p>
                      </div>
                    </div>
                  </RevealOnScroll>

                  <ClasesGrid />
                </div>
              </section>

              {/* DÓNDE APRENDER — NUEVA INTERFAZ EDITORIAL */}
              <section id="donde-aprender" className="py-16 md:py-28 bg-gradient-to-b from-void to-card-depth relative overflow-hidden border-t border-gold/10">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                  <RevealOnScroll delay={100} direction="up">
                    {/* Cabecera asimétrica limpia */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 md:mb-12">
                      <div>
                        <p className="text-xs sm:text-sm text-gold uppercase tracking-[0.16em] font-semibold mb-2">
                          Entrenamiento Presencial y Online
                        </p>
                        <h2 className="font-display text-3xl sm:text-5xl font-bold text-stone-100 tracking-tight">
                          ¿Dónde <span className="text-gold">aprender?</span>
                        </h2>
                        <p className="font-sans text-stone-300 text-base md:text-lg mt-2 max-w-xl">
                          Entrená en nuestra Sede Central en Buenos Aires, en cualquiera de nuestras sedes del país o desde casa.
                        </p>
                      </div>

                      <button
                        data-sedes-btn
                        type="button"
                        onClick={() => navigateToView('sedes')}
                        className="self-start md:self-auto min-h-[48px] px-6 py-3 border border-gold/45 text-gold hover:bg-gold hover:text-void font-display font-semibold text-sm rounded-md transition-colors inline-flex items-center gap-2 cursor-pointer whitespace-nowrap"
                      >
                        <span>Ver todas las sedes</span>
                        <span className="material-icons-outlined text-base">east</span>
                      </button>
                    </div>

                    {/* Split arquitectónico: Video showcase + Panel Sede Central */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
                      {/* Columna Video */}
                      <div className="lg:col-span-7 relative min-h-[280px] sm:min-h-[380px] lg:min-h-[480px] rounded-lg overflow-hidden bg-black border border-gold/20 shadow-2xl pointer-events-none">
                        <iframe
                          className="absolute inset-0 w-[140%] h-[140%] -left-[20%] -top-[20%] opacity-85"
                          src="https://www.youtube.com/embed/p_MVjDzK4v8?autoplay=1&mute=1&loop=1&playlist=p_MVjDzK4v8&controls=0&modestbranding=1&rel=0&playsinline=1&vq=hd1080&cc_load_policy=0&iv_load_policy=3&disablekb=1"
                          title="Esgrima Criolla Sede Central"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent"></div>

                        <div className="absolute bottom-5 left-5 right-5 flex flex-wrap items-end justify-between gap-3">
                          <div>
                            <p className="text-xs font-semibold text-gold uppercase tracking-wider mb-1">
                              Sede Central · Congreso, CABA
                            </p>
                            <p className="font-display text-xl sm:text-2xl font-bold text-stone-100">
                              Montal Gym — Bartolomé Mitre 1851
                            </p>
                          </div>
                          <span className="text-xs sm:text-sm font-sans text-stone-200 font-medium">
                            Sábados de 10:00 a 13:00hs
                          </span>
                        </div>
                      </div>

                      {/* Columna Info & Reserva */}
                      <div className="lg:col-span-5 bg-card-depth border border-gold/20 rounded-lg p-6 sm:p-8 flex flex-col justify-between shadow-2xl">
                        <div>
                          <div className="flex items-start justify-between gap-3 pb-5 border-b border-gold/15">
                            <div>
                              <p className="text-xs font-semibold text-gold uppercase tracking-wider mb-1">
                                Buenos Aires
                              </p>
                              <h3 className="font-display text-2xl sm:text-3xl font-bold text-stone-100 tracking-tight">
                                Sede Central
                              </h3>
                              <p className="font-sans text-stone-300 text-sm mt-1">
                                Montal Gym · Bartolomé Mitre 1851
                              </p>
                            </div>

                            <a
                              href="https://www.google.com/maps/search/?api=1&query=Mitre+1851,+CABA"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="min-h-[40px] px-3 py-2 text-xs font-display font-semibold text-gold border border-gold/35 hover:bg-gold hover:text-void rounded-md transition-colors inline-flex items-center gap-1.5 whitespace-nowrap shrink-0"
                            >
                              <span className="material-icons-outlined text-sm">map</span>
                              <span>Mapa</span>
                            </a>
                          </div>

                          {/* Horarios limpios sin cajas anidadas */}
                          <div className="divide-y divide-gold/15 my-2">
                            <div className="py-4">
                              <div className="flex items-center justify-between gap-2 mb-1">
                                <span className="font-display text-base font-bold text-stone-100">
                                  Esgrima Criolla
                                </span>
                                <span className="text-sm font-semibold text-gold tabular-nums">
                                  Sáb 10:00 – 12:00hs
                                </span>
                              </div>
                              <p className="font-sans text-sm text-stone-300">
                                Dictada por el Maestro Jorge Prina
                              </p>
                            </div>

                            <div className="py-4">
                              <div className="flex items-center justify-between gap-2 mb-1">
                                <span className="font-display text-base font-bold text-stone-100">
                                  Bastón Bonafont
                                </span>
                                <span className="text-sm font-semibold text-gold tabular-nums">
                                  Sáb 12:00 – 13:00hs
                                </span>
                              </div>
                              <p className="font-sans text-sm text-stone-300">
                                Prof. Florentino Abad Troncoso
                              </p>
                            </div>
                          </div>

                          <p className="text-sm font-sans text-stone-200 leading-relaxed pt-4 border-t border-gold/15">
                            <span className="text-gold font-semibold">Primera clase con equipo prestado incluido.</span> No necesitás experiencia previa ni facón propio; solo vení con ropa cómoda.
                          </p>
                        </div>

                        <div className="pt-6">
                          <a
                            href="https://api.whatsapp.com/send?phone=5492216246179&text=%C2%A1Buenas%20y%20Santas!%20Quiero%20reservar%20mi%20clase%20en%20Sede%20Central%20(Montal%20Gym)."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2.5 w-full min-h-[52px] px-6 py-3.5 bg-gold text-void hover:bg-stone-100 transition-colors font-display text-sm sm:text-base font-bold rounded-md shadow-[0_0_24px_rgba(212,170,106,0.28)]"
                          >
                            <span className="material-icons-outlined text-lg">chat</span>
                            <span>Reservar Clase</span>
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Franja inferior de accesos rápidos a otras sedes y modalidad online */}
                    <div className="mt-8 pt-6 border-t border-gold/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <p className="font-sans text-sm sm:text-base text-stone-200">
                        ¿Vivís en otra ciudad o preferís aprender desde casa?
                      </p>
                      <div className="flex flex-wrap items-center gap-5">
                        <button
                          type="button"
                          onClick={() => navigateToView('sedes')}
                          className="font-display text-sm font-semibold text-gold hover:text-stone-100 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                        >
                          <span>Ver las 8 sedes del país</span>
                          <span className="material-icons-outlined text-base">east</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => navigateToView('curso-visteador')}
                          className="font-display text-sm font-semibold text-[#78B7E8] hover:text-stone-100 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                        >
                          <span>Curso Online De Cero a Visteador</span>
                          <span className="material-icons-outlined text-base">east</span>
                        </button>
                      </div>
                    </div>
                  </RevealOnScroll>
                </div>
              </section>

              {/* ACADEMIA ONLINE & TIENDA OFICIAL */}
              <section id="novedades" className="py-16 md:py-28 bg-void border-t border-gold/15 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 max-w-4xl mx-auto">
                    {/* Academia Online Card */}
                    <RevealOnScroll delay={0} direction="left">
                      <div
                        onClick={() => navigateToView('academia-online')}
                        className="bg-card-depth border border-gold/25 p-7 sm:p-10 relative overflow-hidden group rounded-md mx-auto w-full max-w-lg md:max-w-none cursor-pointer hover:border-gold/55 transition-all h-full flex flex-col shadow-2xl"
                      >
                        <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                          <span className="material-icons-outlined text-7xl md:text-8xl text-gold">menu_book</span>
                        </div>
                        <p className="text-xs text-gold tracking-wide font-semibold mb-3 text-center md:text-left">
                          Certificación Oficial Univ. de Catamarca
                        </p>
                        <h3 className="font-display text-2xl md:text-3xl text-stone-100 mb-3 tracking-tight text-center md:text-left group-hover:text-gold transition-colors leading-tight font-bold">
                          Aprendé de Manera Online
                        </h3>
                        <p className="text-stone-200 mb-7 font-sans text-sm sm:text-base leading-relaxed max-w-sm mx-auto md:mx-0 text-center md:text-left flex-grow">
                          Curso De Cero a Visteador, Clases Personalizadas a distancia, Curso de Monitor (64 módulos) y formación en Cultura Gaucha.
                        </p>
                        <div className="flex justify-center md:justify-start pt-4 border-t border-gold/15">
                          <span className="inline-flex items-center text-gold font-display text-sm tracking-wide group-hover:text-white transition-all group-hover:gap-3 gap-2 font-semibold">
                            Ver programas online <span className="material-icons-outlined text-base">east</span>
                          </span>
                        </div>
                      </div>
                    </RevealOnScroll>

                    {/* Tienda Card */}
                    <RevealOnScroll delay={150} direction="right">
                      <div
                        onClick={() => navigateToView('merch')}
                        className="bg-card-depth border border-gold/25 p-7 sm:p-10 relative overflow-hidden group rounded-md mx-auto w-full max-w-lg md:max-w-none cursor-pointer hover:border-gold/55 transition-all h-full flex flex-col shadow-2xl"
                      >
                        <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                          <span className="material-icons-outlined text-7xl md:text-8xl text-gold">shopping_bag</span>
                        </div>
                        <p className="text-xs text-gold tracking-wide font-semibold mb-3 text-center md:text-left">
                          $32.000 ARS · Talles S al XL
                        </p>
                        <h3 className="font-display text-2xl md:text-3xl text-stone-100 mb-3 tracking-tight text-center md:text-left group-hover:text-gold transition-colors leading-tight font-bold">
                          Conseguí Tu Remera
                        </h3>
                        <p className="text-stone-200 mb-7 font-sans text-sm sm:text-base leading-relaxed max-w-sm mx-auto md:mx-0 text-center md:text-left flex-grow">
                          Remera oficial "Juan Moreira" en algodón 100% peinado premium. Elegí tu talle y comprá directo con Envío y Compra Protegida por Mercado Libre.
                        </p>
                        <div className="flex justify-center md:justify-start pt-4 border-t border-gold/15">
                          <span className="inline-flex items-center text-gold font-display text-sm tracking-wide group-hover:text-white transition-all group-hover:gap-3 gap-2 font-semibold">
                            Elegir talle y comprar <span className="material-icons-outlined text-base">east</span>
                          </span>
                        </div>
                      </div>
                    </RevealOnScroll>
                  </div>
                </div>
              </section>

              {/* Preguntas Frecuentes */}
              <FaqSection />
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
                  <h2 className="font-display text-2xl md:text-3xl text-stone-100 tracking-tight mb-2 text-center w-full font-bold">
                    Esgrima Criolla
                  </h2>
                  <p className="font-sans text-sm md:text-base text-stone-300 mb-10 text-center w-full">
                    Buenas y Santas · Arte Marcial Argentino
                  </p>

                  <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-12 w-full">
                    {[
                      { name: 'Instagram', url: 'https://www.instagram.com/esgrima_criolla?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==' },
                      { name: 'YouTube', url: 'https://www.youtube.com/c/esgrimacriolla' },
                      { name: 'TikTok', url: 'https://www.tiktok.com/@esgrimacriolla?is_from_webapp=1&sender_device=pc' },
                      { name: 'Facebook', url: 'https://www.facebook.com/esgrimacriolla' },
                      { name: 'Biblioteca', url: 'https://esgrimacriolla.blogspot.com/?zx=ce8a900e74a110d' }
                    ].map((social) => (
                      <a
                        key={social.name}
                        className="hover:text-gold transition-colors text-sm font-display font-semibold cursor-pointer text-stone-200"
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {social.name}
                      </a>
                    ))}
                  </div>

                  <div className="text-sm text-stone-300 font-sans text-center space-y-2.5">
                    <p className="text-gold font-medium">"La tecnología del arte al servicio del arte del ayer"</p>
                    <p>© 2026 Academia de Esgrima Criolla — Buenas y Santas.</p>
                    <p className="text-stone-400">Fundada sobre principios gauchos</p>
                  </div>
                </RevealOnScroll>
              </div>
              <div className="guardapampa-divider absolute bottom-0 left-0 w-full opacity-20 animate-guardapampa"></div>
            </footer>
          </>
        ) : currentView === 'merch' ? (
          <Merch onBack={() => navigateToView('home')} />
        ) : currentView === 'sedes' ? (
          <Sedes onBack={() => navigateToView('home')} />
        ) : currentView === 'academia-online' ? (
          <AcademiaOnline
            onBack={() => navigateToView('home')}
            onOpenVisteador={() => navigateToView('curso-visteador')}
          />
        ) : currentView === 'curso-visteador' ? (
          <CursoVisteador onBack={() => navigateToView('home')} />
        ) : (
          <BibliotecaBlog
            onBack={() => navigateToView('home')}
            initialPostId={selectedBlogPostId}
          />
        )}

        {/* Payment Approved Modal (?pago=aprobado) */}
        <PaymentApprovedModal
          isOpen={isPaymentApprovedOpen}
          onClose={handleClosePaymentApproved}
        />

        {currentView !== 'curso-visteador' && <AIHistorian />}
      </div>
    </div>
  );
};

export default App;

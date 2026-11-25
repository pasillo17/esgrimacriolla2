import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';

const CLASES = [
  {
    id: '01',
    title: 'Visteo / Duelo Criollo',
    description: 'Técnica pura de combate singular. Geometría y distancia en el arte del acero.',
    icon: 'gps_fixed',
    image: 'https://i.imgur.com/s65N47d.jpeg',
    classNameDesktop: 'md:col-span-8 md:row-span-2',
  },
  {
    id: '02',
    title: 'Arsenal Gaucho',
    description: 'Uso de boleadoras, facón, rebenque, poncho, verijero, entre otros.',
    icon: 'waves',
    image: 'https://i.imgur.com/tQQRD6x.jpeg',
    classNameDesktop: 'md:col-span-4 md:row-span-3',
  },
  {
    id: '03',
    title: 'Momento Cultural',
    description: 'Hablamos sobre la historia y cultura gaucha.',
    icon: 'shield',
    image: 'https://i.imgur.com/d8AbAg9.jpeg',
    classNameDesktop: 'md:col-span-4 md:row-span-2',
  },
  {
    id: '04',
    title: 'Acondicionamiento Físico',
    description: 'Preparación física orientada al combate y la resistencia.',
    icon: 'fitness_center',
    image: 'https://i.imgur.com/0xAYDbQ.jpeg',
    classNameDesktop: 'md:col-span-4 md:row-span-2',
  }
];

const ClasesGrid: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPaused, setIsAutoPaused] = useState(false);

  useEffect(() => {
    if (isAutoPaused) return;
    let timer: ReturnType<typeof setInterval> | undefined;
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % CLASES.length);
      }, 4500);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isAutoPaused]);

  const goToSlide = (index: number) => {
    setIsAutoPaused(true);
    setCurrentSlide((index + CLASES.length) % CLASES.length);
  };

  return (
    <>
      {/* MOBILE LAYOUT (TOUCH-INTERACTIVE CAROUSEL) */}
      <div className="md:hidden space-y-3">
        <div className="relative h-[420px] w-full overflow-hidden rounded-md border border-gold/25">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 32 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -32 }}
              transition={{ duration: 0.35 }}
              className="absolute inset-0 h-full w-full"
            >
              <div className="group relative h-full w-full overflow-hidden bg-black flex flex-col justify-end p-6 pb-8">
                <div className="absolute inset-0 z-0">
                  <img
                    src={CLASES[currentSlide].image}
                    alt={CLASES[currentSlide].title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover filter sepia-[0.15] contrast-115 opacity-50 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/65 to-transparent"></div>
                </div>
                <div className="relative z-10 pr-2">
                  <span className="material-icons-outlined text-gold text-3xl mb-3 block">
                    {CLASES[currentSlide].icon}
                  </span>
                  <h3 className="font-display text-white text-2xl font-bold tracking-tight leading-snug mb-2">
                    {CLASES[currentSlide].title}
                  </h3>
                  <p className="text-stone-200 text-sm font-sans leading-relaxed">
                    {CLASES[currentSlide].description}
                  </p>
                </div>
                <div className="absolute top-5 right-5 text-gold/30 font-display font-bold text-4xl select-none tabular-nums">
                  {CLASES[currentSlide].id}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Ergonomic Touch Controls Row */}
        <div className="flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => goToSlide(currentSlide - 1)}
            aria-label="Clase anterior"
            className="min-w-[44px] min-h-[44px] rounded-md bg-void border border-gold/30 text-gold flex items-center justify-center active:scale-95 transition-transform cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-1.5 flex-1 justify-center">
            {CLASES.map((clase, idx) => (
              <button
                key={clase.id}
                type="button"
                onClick={() => goToSlide(idx)}
                aria-label={`Ver ${clase.title}`}
                className={`min-h-[44px] min-w-[44px] px-2 font-display text-xs font-bold rounded-md border transition-colors cursor-pointer tabular-nums ${
                  currentSlide === idx
                    ? 'bg-gold text-void border-gold'
                    : 'bg-void/70 text-stone-300 border-gold/20 hover:text-gold'
                }`}
              >
                {clase.id}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => goToSlide(currentSlide + 1)}
            aria-label="Siguiente clase"
            className="min-w-[44px] min-h-[44px] rounded-md bg-void border border-gold/30 text-gold flex items-center justify-center active:scale-95 transition-transform cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* DESKTOP LAYOUT (BENTO GRID) */}
      <div className="hidden md:grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-7 h-auto md:h-[820px]">
        {CLASES.map((clase, idx) => (
          <div key={clase.id} className={clase.classNameDesktop}>
            <RevealOnScroll direction={idx % 2 === 0 ? 'left' : 'right'} className="h-full">
              <div className="group relative h-full min-h-[300px] overflow-hidden border border-gold/15 rounded-md bg-black flex flex-col justify-end p-6 lg:p-8 hover:border-gold/50 transition-all duration-500">
                <div className="absolute inset-0 z-0">
                  <img
                    src={clase.image}
                    alt={clase.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover filter sepia-[0.15] contrast-115 opacity-45 group-hover:opacity-65 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-transparent"></div>
                </div>
                <div className="relative z-10 w-full max-w-lg">
                  <span className="material-icons-outlined text-gold text-3xl lg:text-4xl mb-4 block">
                    {clase.icon}
                  </span>
                  <h3 className="font-display text-white text-xl lg:text-2xl xl:text-[1.65rem] font-bold tracking-tight leading-tight mb-2.5">
                    {clase.title}
                  </h3>
                  <p className="text-stone-200 text-sm lg:text-[0.95rem] font-sans leading-relaxed">
                    {clase.description}
                  </p>
                </div>
                <div className="absolute top-5 right-6 text-gold/25 font-display font-bold text-5xl lg:text-7xl select-none tabular-nums">
                  {clase.id}
                </div>
              </div>
            </RevealOnScroll>
          </div>
        ))}
      </div>
    </>
  );
};

export default ClasesGrid;

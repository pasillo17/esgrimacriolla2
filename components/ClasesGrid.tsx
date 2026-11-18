import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
    description: 'Preparación física orientada al combate y resistencia.',
    icon: 'fitness_center',
    image: 'https://i.imgur.com/0xAYDbQ.jpeg',
    classNameDesktop: 'md:col-span-4 md:row-span-2',
  }
];

const ClasesGrid: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (window.innerWidth < 768) {
      timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % CLASES.length);
      }, 4000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, []);

  return (
    <>
      {/* MOBILE LAYOUT (CAROUSEL) */}
      <div className="md:hidden relative h-[450px] w-full overflow-hidden rounded-sm border border-gold/20">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 h-full w-full"
          >
            <div className="group relative h-full w-full overflow-hidden bg-black flex flex-col justify-end p-8">
              <div className="absolute inset-0 z-0">
                <img
                  src={CLASES[currentSlide].image}
                  alt={CLASES[currentSlide].title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover filter sepia-[0.2] contrast-125 opacity-40 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
              </div>
              <div className="relative z-10">
                <span className="material-icons-outlined text-gold text-3xl mb-4 block">
                  {CLASES[currentSlide].icon}
                </span>
                <h3 className="font-display text-white text-2xl uppercase tracking-[0.2em] mb-3">
                  {CLASES[currentSlide].title}
                </h3>
                <p className="text-stone-300 text-sm font-serif italic leading-relaxed">
                  {CLASES[currentSlide].description}
                </p>
              </div>
              <div className="absolute top-6 right-6 text-gold/20 font-display text-5xl select-none">
                {CLASES[currentSlide].id}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Indicators */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
          {CLASES.map((_, idx) => (
            <div
              key={idx}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentSlide === idx ? 'bg-gold w-6' : 'bg-gold/30'
              }`}
            />
          ))}
        </div>
      </div>

      {/* DESKTOP LAYOUT (BENTO GRID) */}
      <div className="hidden md:grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 h-auto md:h-[900px]">
        {CLASES.map((clase, idx) => (
          <div key={clase.id} className={clase.classNameDesktop}>
            <RevealOnScroll direction={idx % 2 === 0 ? 'left' : 'right'} className="h-full">
              <div className="group relative h-full min-h-[300px] overflow-hidden border border-gold/15 rounded-sm bg-black flex flex-col justify-end p-10 hover:border-gold/50 transition-all duration-700">
                <div className="absolute inset-0 z-0">
                  <img
                    src={clase.image}
                    alt={clase.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover filter sepia-[0.2] contrast-125 opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                </div>
                <div className="relative z-10 max-w-lg">
                  <span className="material-icons-outlined text-gold text-4xl mb-6 block">{clase.icon}</span>
                  <h3 className="font-display text-white text-2xl lg:text-3xl uppercase tracking-[0.2em] mb-4">
                    {clase.title}
                  </h3>
                  <p className="text-stone-400 text-sm lg:text-base font-serif italic leading-relaxed opacity-80 group-hover:opacity-100 transition-all duration-500">
                    {clase.description}
                  </p>
                </div>
                <div className="absolute top-8 right-10 text-gold/20 font-display text-6xl lg:text-8xl select-none">
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

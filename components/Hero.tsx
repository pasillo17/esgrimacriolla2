import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ChevronDown } from 'lucide-react';

interface HeroProps {
  onOpenModal?: () => void;
}

const Hero: React.FC<HeroProps> = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative h-[100dvh] flex flex-col items-center justify-center px-4 text-center overflow-hidden bg-void">
      {/* Warm Brown & Golden Ambient Backdrop */}
      <motion.div
        style={{ y: y1, opacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-gold/12 rounded-full blur-[160px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-void via-transparent to-void"></div>
      </motion.div>

      {/* --- DESKTOP LAYOUT --- */}
      <div className="hidden md:flex relative z-10 w-full max-w-5xl mx-auto flex-col items-center text-center h-full justify-center pt-16">
        {/* LARGER HERO LOGO */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
            filter: [
              'drop-shadow(0 0 15px rgba(212, 170, 106, 0.25))',
              'drop-shadow(0 0 40px rgba(212, 170, 106, 0.55))',
              'drop-shadow(0 0 15px rgba(212, 170, 106, 0.25))'
            ]
          }}
          transition={{
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1],
            filter: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
          }}
          className="mb-5 relative"
        >
          <div className="relative w-auto h-[35vh] lg:h-[43vh] aspect-square flex items-center justify-center mx-auto">
            <img
              src="https://i.imgur.com/cbCrHDB.png"
              alt="Buenas y Santas Logo"
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain logo-glow"
            />
          </div>
        </motion.div>

        {/* TÍTULO */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-5xl md:text-6xl lg:text-7xl text-stone-100 font-bold tracking-[0.2em] md:tracking-[0.25em] mb-3 uppercase leading-tight w-full text-center drop-shadow-sm text-glow-white"
        >
          <span>BUENAS Y </span>
          <span className="text-gold">SANTAS</span>
        </motion.h1>

        {/* SUBTÍTULO */}
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 0.9, width: '100%' }}
          transition={{ duration: 1.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center gap-8 mb-5 animate-reveal w-full px-4 mx-auto overflow-hidden"
        >
          <div className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-transparent to-gold"></div>
          <p className="font-display text-gold text-lg lg:text-xl tracking-[0.6em] uppercase whitespace-nowrap font-medium text-center text-glow-gold">
            ESGRIMA CRIOLLA
          </p>
          <div className="h-px flex-1 max-w-[120px] bg-gradient-to-l from-transparent to-gold"></div>
        </motion.div>

        {/* QUOTE */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.85 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-stone-300 max-w-xl mx-auto mb-8 font-serif italic text-base leading-relaxed px-4 text-center"
        >
          "En el filo se encuentra la verdad, y en la guarda el destino de un hombre."
        </motion.p>

        {/* CTA BUTTON */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="flex items-center justify-center mb-10"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const elem = document.getElementById('donde-aprender');
              if (elem) {
                elem.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="px-10 py-4 bg-gold text-void font-display text-xs lg:text-sm tracking-[0.3em] uppercase font-bold rounded-sm shadow-2xl hover:shadow-gold/40 transition-all shine-effect border border-gold/30 relative overflow-hidden group cursor-pointer"
          >
            <span className="relative z-10 flex items-center gap-3">
              Sumate a la Academia
              <span className="material-icons-outlined text-sm group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </span>
          </motion.button>
        </motion.div>

        {/* SCROLL INDICATOR */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.35 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="animate-bounce opacity-35 mt-2 absolute bottom-6"
        >
          <ChevronDown className="text-gold w-8 h-8" />
        </motion.div>
      </div>

      {/* --- MOBILE LAYOUT --- */}
      <div className="md:hidden relative z-10 w-full h-full flex flex-col items-center justify-between px-6 pb-20 pt-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 flex items-center justify-center w-full"
        >
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 bg-gold/25 blur-3xl rounded-full scale-90"></div>
            <img
              src="https://i.imgur.com/cbCrHDB.png"
              alt="Buenas y Santas Logo"
              referrerPolicy="no-referrer"
              className="relative z-10 w-64 h-64 min-[390px]:w-72 min-[390px]:h-72 min-[430px]:w-80 min-[430px]:h-80 object-contain drop-shadow-[0_0_45px_rgba(212,170,106,0.55)]"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="flex flex-col items-center w-full text-center"
        >
          <h1 className="font-display text-[3.1rem] min-[380px]:text-[3.7rem] min-[430px]:text-[4.2rem] text-stone-100 font-bold uppercase tracking-[0.12em] text-glow-white leading-none mb-1 text-center w-full whitespace-nowrap">
            BUENAS Y
          </h1>
          <h1 className="font-display text-[3.1rem] min-[380px]:text-[3.7rem] min-[430px]:text-[4.2rem] text-gold font-bold uppercase tracking-[0.15em] text-glow-gold leading-none mb-8 text-center w-full whitespace-nowrap">
            SANTAS
          </h1>

          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              const elem = document.getElementById('donde-aprender');
              if (elem) {
                elem.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="w-full max-w-[320px] py-4 bg-gold text-void font-display text-[0.75rem] tracking-[0.25em] uppercase font-bold rounded-sm shadow-[0_0_25px_rgba(212,170,106,0.35)] flex justify-center items-center gap-3 relative overflow-hidden group transition-colors"
          >
            <span className="relative z-10 flex items-center gap-3">
              ENTRAR A LA ACADEMIA
              <span className="material-icons-outlined text-sm group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

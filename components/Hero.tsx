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
    <section className="relative min-h-[100dvh] md:h-[100dvh] flex flex-col items-center justify-center px-4 text-center overflow-hidden bg-void">
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
          className="font-display text-5xl md:text-6xl lg:text-7xl text-stone-100 font-extrabold tracking-tight mb-3 uppercase leading-tight w-full text-center drop-shadow-sm text-glow-white"
        >
          <span>BUENAS Y </span>
          <span className="text-gold">SANTAS</span>
        </motion.h1>

        {/* SUBTÍTULO */}
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 0.95, width: '100%' }}
          transition={{ duration: 1.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center gap-6 mb-5 animate-reveal w-full px-4 mx-auto overflow-hidden"
        >
          <div className="h-px flex-1 max-w-[110px] bg-gradient-to-r from-transparent to-gold"></div>
          <p className="font-display text-gold text-base lg:text-lg tracking-[0.26em] uppercase whitespace-nowrap font-semibold text-center text-glow-gold">
            Esgrima Criolla
          </p>
          <div className="h-px flex-1 max-w-[110px] bg-gradient-to-l from-transparent to-gold"></div>
        </motion.div>

        {/* QUOTE */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.92 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-stone-200 max-w-xl mx-auto mb-8 font-sans text-base md:text-lg leading-relaxed px-4 text-center"
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
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => {
              const elem = document.getElementById('donde-aprender');
              if (elem) {
                elem.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="px-9 py-4 bg-gold text-void font-display text-sm lg:text-base tracking-wide font-bold rounded-md shadow-2xl hover:shadow-gold/40 transition-all shine-effect border border-gold/30 relative overflow-hidden group cursor-pointer"
          >
            <span className="relative z-10 flex items-center gap-2.5">
              Sumate a la Academia
              <span className="material-icons-outlined text-base group-hover:translate-x-1 transition-transform">
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
      <div className="md:hidden relative z-10 w-full min-h-[100dvh] flex flex-col items-center justify-between px-4 sm:px-6 pb-24 pt-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: -12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 flex items-center justify-center w-full py-4"
        >
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 bg-gold/25 blur-3xl rounded-full scale-90"></div>
            <img
              src="https://i.imgur.com/cbCrHDB.png"
              alt="Buenas y Santas Logo"
              referrerPolicy="no-referrer"
              className="relative z-10 w-52 h-52 min-[380px]:w-64 min-[380px]:h-64 min-[430px]:w-72 min-[430px]:h-72 object-contain drop-shadow-[0_0_40px_rgba(212,170,106,0.5)]"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.3 }}
          className="flex flex-col items-center w-full text-center"
        >
          <h1 className="font-display text-[clamp(2.5rem,11vw,3.8rem)] text-stone-100 font-extrabold uppercase tracking-tight text-glow-white leading-[1] mb-1 text-center w-full">
            <span>BUENAS Y</span>
            <span className="block text-gold text-glow-gold mt-1">SANTAS</span>
          </h1>

          <p className="font-display text-gold/95 text-xs tracking-[0.24em] uppercase font-semibold mt-3 mb-7">
            Esgrima Criolla
          </p>

          <motion.button
            type="button"
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              const elem = document.getElementById('donde-aprender');
              if (elem) {
                elem.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="w-full max-w-[320px] min-h-[52px] py-3.5 px-6 bg-gold text-void font-display text-sm tracking-wide font-bold rounded-md shadow-[0_0_25px_rgba(212,170,106,0.35)] flex justify-center items-center gap-2.5 relative overflow-hidden group transition-colors cursor-pointer"
          >
            <span className="relative z-10 flex items-center gap-2">
              Entrar a la Academia
              <span className="material-icons-outlined text-base group-hover:translate-x-1 transition-transform">
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

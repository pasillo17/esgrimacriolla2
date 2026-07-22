
import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative h-[100dvh] flex flex-col items-center justify-center px-4 text-center overflow-hidden">
      <motion.div 
        style={{ y: y1, opacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 z-0"
      >
        <img 
          alt="Antique Paper" 
          className="w-full h-full object-cover opacity-[0.08] mix-blend-overlay grayscale contrast-150" 
          src="https://images.unsplash.com/photo-1599408162172-ef06132d436a?q=80&w=2070&auto=format&fit=crop"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-void via-transparent to-void"></div>
      </motion.div>
      
      {/* --- DESKTOP LAYOUT --- */}
      <div className="hidden md:flex relative z-10 w-full max-w-5xl mx-auto flex-col items-center text-center h-full justify-center">
        {/* LOGO */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            y: 0,
            filter: ["drop-shadow(0 0 10px rgba(197, 160, 101, 0.2))", "drop-shadow(0 0 30px rgba(197, 160, 101, 0.5))", "drop-shadow(0 0 10px rgba(197, 160, 101, 0.2))"]
          }}
          transition={{ 
            duration: 1.2, 
            ease: [0.16, 1, 0.3, 1],
            filter: { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }}
          className="mb-6"
        >
          <div className="relative w-auto h-[30vh] lg:h-[35vh] aspect-square flex items-center justify-center mx-auto">
            <img 
              src="https://i.imgur.com/cbCrHDB.png" 
              alt="Buenas y Santas Logo" 
              className="w-full h-full object-contain logo-glow"
            />
          </div>
        </motion.div>
        
        {/* TÍTULO */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-5xl md:text-6xl lg:text-7xl text-stone-100 font-bold tracking-[0.2em] mb-10 uppercase leading-tight w-full text-center drop-shadow-sm text-glow-white"
        >
          <span>BUENAS Y </span>
          <span>SANTAS</span>
        </motion.h1>
        
        {/* SUBTÍTULO */}
        <motion.div 
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 0.8, width: '100%' }}
          transition={{ duration: 1.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center gap-10 mb-12 animate-reveal w-full px-4 mx-auto overflow-hidden"
        >
          <div className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-transparent via-gold/50 to-transparent"></div>
          <p className="font-display text-gold text-lg tracking-[0.6em] uppercase whitespace-nowrap font-semibold text-center text-glow-gold">
            ESGRIMA CRIOLLA
          </p>
          <div className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-gold/50 via-gold/50 to-transparent"></div>
        </motion.div>

        {/* QUOTE */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-stone-400 max-w-xl mx-auto mb-12 font-serif italic text-base leading-relaxed px-4 text-center font-medium"
        >
          "En el filo se encuentra la verdad, y en la guarda el destino de un hombre."
        </motion.p>

        {/* CTA BUTTON */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            const elem = document.getElementById('donde-aprender');
            if (elem) {
              elem.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="px-8 py-4 bg-gold text-void font-display text-sm tracking-[0.3em] uppercase font-bold rounded-sm shadow-2xl hover:shadow-gold/40 transition-all shine-effect mb-12 border border-gold/50 relative overflow-hidden group"
        >
          <span className="relative z-10 flex items-center gap-3">
            Sumate a la Academia
            <span className="material-icons-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </span>
        </motion.button>
        
        {/* SCROLL INDICATOR */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="animate-bounce opacity-40 mt-2 absolute bottom-8"
        >
          <ChevronDown className="text-gold w-10 h-10" />
        </motion.div>
      </div>

      {/* --- MOBILE LAYOUT PROPOSAL --- */}
      <div className="md:hidden relative z-10 w-full h-full flex flex-col items-center justify-between px-6 pb-12 pt-24">
        
        {/* Huge Logo Dominating Top Space */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 flex items-center justify-center w-full mt-2"
        >
          <div className="relative">
            {/* Background glowing effect behind logo */}
            <div className="absolute inset-0 bg-gold/20 blur-3xl rounded-full scale-75"></div>
            <img 
              src="https://i.imgur.com/cbCrHDB.png" 
              alt="Buenas y Santas Logo" 
              className="relative z-10 w-64 h-64 min-[400px]:w-80 min-[400px]:h-80 object-contain drop-shadow-[0_0_40px_rgba(197,160,101,0.5)]"
            />
          </div>
        </motion.div>

        {/* Text & CTA at the bottom */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="flex flex-col items-center w-full text-center"
        >
          <h1 className="font-display text-[3.2rem] min-[380px]:text-[3.8rem] text-stone-100 font-bold uppercase tracking-widest text-glow-white leading-none mb-1 text-center w-full whitespace-nowrap">
            BUENAS Y
          </h1>
          <h1 className="font-display text-[3.2rem] min-[380px]:text-[3.8rem] text-gold font-bold uppercase tracking-[0.15em] text-glow-gold leading-none mb-6 text-center w-full whitespace-nowrap">
            SANTAS
          </h1>

          <div className="flex items-center justify-center gap-2 min-[400px]:gap-4 mb-10 w-full overflow-hidden">
            <div className="h-px flex-grow max-w-[40px] min-[400px]:max-w-[60px] bg-gold/40"></div>
            <p className="font-display text-stone-300 tracking-[0.2em] min-[400px]:tracking-[0.3em] uppercase font-bold text-[0.6rem] min-[400px]:text-[0.65rem] whitespace-nowrap">
              Esgrima Criolla
            </p>
            <div className="h-px flex-grow max-w-[40px] min-[400px]:max-w-[60px] bg-gold/40"></div>
          </div>
          
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              const elem = document.getElementById('donde-aprender');
              if (elem) {
                elem.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="w-full max-w-[320px] py-4 bg-void border border-gold/50 text-gold font-display text-[0.75rem] tracking-[0.3em] uppercase font-bold rounded-sm shadow-[0_0_20px_rgba(197,160,101,0.2)] flex justify-center items-center gap-3 relative overflow-hidden group hover:bg-gold hover:text-void transition-colors"
          >
            <span className="relative z-10 flex items-center gap-3">
              ENTRAR A LA ACADEMIA
              <span className="material-icons-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

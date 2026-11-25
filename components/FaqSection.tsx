import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ShieldCheck, Compass, Sparkles, ShoppingBag, MessageCircle } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';

interface FaqSectionProps {
  onOpenModal: () => void;
  onNavigate: (view: 'home' | 'merch' | 'sedes' | 'academia-online' | 'novedades' | 'curso-visteador') => void;
}

const FAQS = [
  {
    question: '¿Necesito experiencia previa en artes marciales o buen estado físico para empezar?',
    answer:
      'No, en absoluto. El método de Buenas y Santas está diseñado para que cualquier persona pueda iniciarse desde cero, sin importar su edad ni su condición física actual. Aprenderás paso a paso desde la guardia criolla, el desplazamiento y el manejo básico hasta técnicas avanzadas a tu propio ritmo.',
    tag: 'INICIACIÓN DESDE CERO'
  },
  {
    question: '¿Tengo que comprar facón, poncho o equipo antes de mi primera clase?',
    answer:
      'No tenés que comprar nada para empezar. Tu primera Clase de Prueba incluye todo el equipo de entrenamiento prestado por la academia (facones de madera y aluminio templado sin filo y elementos de guardia). Solo tenés que asistir con ropa cómoda deportiva.',
    tag: 'EQUIPO PRESTADO INCLUIDO'
  },
  {
    question: '¿Es peligroso el entrenamiento? ¿Cómo se cuida la integridad física?',
    answer:
      'La seguridad y la camaradería son sagradas en nuestro fogón. Jamás se entrena con armas de filo real durante las prácticas formativas. Utilizamos simuladores seguros, progresión técnica controlada y supervisión constante de instructores certificados por el Maestro Jorge Prina.',
    tag: '100% SEGURO Y SUPERVISADO'
  },
  {
    question: '¿Qué pasa si vivo lejos de las sedes presenciales o en otra provincia/país?',
    answer:
      'Podés formarte desde cualquier rincón del país o del mundo a través de nuestra Academia Online. Contamos con Clases Personalizadas en vivo con corrección por video, el Curso de Monitor (64 módulos) y el Curso Universitario de Cultura Gaucha con Certificación Oficial de la Universidad Nacional de Catamarca.',
    tag: 'MODALIDAD ONLINE Y FEDERAL'
  },
  {
    question: '¿Cómo compro las remeras oficiales "Juan Moreira" y cómo es el envío?',
    answer:
      'Toda nuestra indumentaria oficial en algodón 100% peinado premium ($32.000 ARS) se adquiere directamente a través de Mercado Libre con Compra Protegida. Elegís tu talle (S, M, L o XL) en nuestra tienda y recibís el pedido en la puerta de tu casa en cualquier punto del país.',
    tag: 'COMPRA PROTEGIDA MERCADO LIBRE'
  }
];

const FaqSection: React.FC<FaqSectionProps> = ({ onOpenModal, onNavigate }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="preguntas-frecuentes" className="py-24 md:py-36 bg-card-depth relative border-t border-gold/15 overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gold/5 rounded-full blur-[160px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <RevealOnScroll direction="down">
          <div className="flex flex-col items-center text-center mb-14 md:mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gold/10 border border-gold/30 text-gold font-display text-[0.6rem] md:text-xs tracking-[0.3em] uppercase font-bold mb-6 rounded-sm">
              <ShieldCheck className="w-4 h-4 text-gold" />
              Empezá Sin Dudas · Primera Clase con Equipo Prestado
            </div>

            <h2 className="font-display text-3xl sm:text-5xl md:text-6xl text-stone-100 tracking-[0.12em] uppercase mb-4 text-glow-white">
              Preguntas <span className="text-gold text-glow-gold">Frecuentes</span>
            </h2>

            <p className="font-serif italic text-stone-300 text-sm md:text-base max-w-2xl leading-relaxed">
              Derribamos los mitos más comunes antes de cruzar la puerta de la academia. La tradición criolla está abierta para quien tenga voluntad de aprender.
            </p>
          </div>
        </RevealOnScroll>

        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <RevealOnScroll key={index} delay={index * 80}>
                <div
                  className={`border transition-all duration-300 rounded-sm overflow-hidden ${
                    isOpen
                      ? 'bg-void/90 border-gold/40 shadow-[0_0_30px_rgba(212,170,106,0.12)]'
                      : 'bg-void/45 border-gold/15 hover:border-gold/30'
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full px-6 py-5 md:px-8 md:py-6 text-left flex items-center justify-between gap-4 group cursor-pointer"
                  >
                    <div className="flex flex-col gap-1.5">
                      <span className="font-display text-[0.55rem] tracking-[0.3em] text-gold/80 uppercase font-bold">
                        {faq.tag}
                      </span>
                      <h3 className="font-display text-sm sm:text-base md:text-lg text-stone-100 tracking-[0.08em] uppercase group-hover:text-gold transition-colors">
                        {faq.question}
                      </h3>
                    </div>
                    <div
                      className={`w-9 h-9 flex-shrink-0 rounded-sm border flex items-center justify-center transition-all duration-300 ${
                        isOpen
                          ? 'bg-gold text-void border-gold rotate-180'
                          : 'border-gold/30 text-gold group-hover:border-gold'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        <div className="px-6 pb-6 md:px-8 md:pb-8 pt-2 border-t border-gold/10">
                          <p className="font-serif text-stone-300 text-sm md:text-base leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>

        {/* High-Conversion Closing Box */}
        <RevealOnScroll delay={300}>
          <div className="mt-14 md:mt-20 p-8 md:p-12 bg-void border border-gold/30 rounded-sm shadow-2xl relative overflow-hidden">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
              <div className="text-center lg:text-left max-w-xl">
                <div className="inline-flex items-center gap-2 text-gold font-display text-[0.65rem] tracking-[0.3em] uppercase font-bold mb-2">
                  <Sparkles className="w-4 h-4" />
                  Garantía de Iniciación Criolla
                </div>
                <h3 className="font-display text-2xl md:text-3xl text-stone-100 uppercase tracking-[0.12em] mb-3 text-glow-white">
                  Reservá tu Clase de Prueba con Equipo Prestado
                </h3>
                <p className="font-serif text-stone-300 text-sm md:text-base italic leading-relaxed">
                  Usá nuestro buscador GPS para ubicar la sede más cercana a tu domicilio o escribinos directo por WhatsApp para separar tu lugar esta semana.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-center gap-4 w-full lg:w-auto">
                <button
                  onClick={onOpenModal}
                  className="w-full sm:w-auto px-7 py-4 bg-gold text-void font-display font-black text-xs uppercase tracking-[0.25em] hover:bg-stone-100 transition-all shadow-[0_0_30px_rgba(212,170,106,0.3)] flex items-center justify-center gap-3 rounded-sm cursor-pointer whitespace-nowrap"
                >
                  <Compass className="w-4 h-4" />
                  Buscar Mi Sede (GPS)
                </button>

                <button
                  onClick={() => onNavigate('merch')}
                  className="w-full sm:w-auto px-7 py-4 bg-card-depth border border-gold/40 text-gold hover:bg-gold/10 font-display font-bold text-xs uppercase tracking-[0.25em] transition-all flex items-center justify-center gap-3 rounded-sm cursor-pointer whitespace-nowrap"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Ver Remeras ($32.000)
                </button>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gold/15 flex flex-wrap items-center justify-center lg:justify-between gap-4 text-[0.65rem] font-display tracking-[0.2em] uppercase text-stone-300">
              <span>✓ Facón de práctica incluido en tu 1° clase</span>
              <span>✓ 8 Sedes Presenciales + Academia Online</span>
              <a
                href="https://api.whatsapp.com/send?phone=5492216246179&text=Buenas%20y%20Santas!%20Tengo%20una%20consulta%20sobre%20las%20clases%20de%20Esgrima%20Criolla"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold hover:underline flex items-center gap-1.5 font-bold"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                Hablar con un Instructor ahora
              </a>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};

export default FaqSection;

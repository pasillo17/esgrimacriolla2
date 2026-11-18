import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ShieldCheck, Compass, Sparkles, ShoppingBag, MessageCircle } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';
import { TornPaperEdge, GauchoWatermark } from './TornPaperDivider';

interface FaqSectionProps {
  onOpenModal: () => void;
  onNavigate: (view: 'home' | 'merch' | 'sedes' | 'academia-online' | 'novedades') => void;
}

const FAQS = [
  {
    question: '¿Necesito experiencia previa en artes marciales o buen estado físico para empezar?',
    answer:
      'No, en absoluto. El método de Buenas y Santas está diseñado para que cualquier persona pueda iniciarse desde cero, sin importar su edad ni su condición física actual. Aprenderás paso a paso desde la guardia criolla, el desplazamiento y el manejo básico hasta técnicas avanzadas a tu propio ritmo.',
    tag: 'FOLIO I · INICIACIÓN DESDE CERO'
  },
  {
    question: '¿Tengo que comprar facón, poncho o equipo antes de mi primera clase?',
    answer:
      'No tenés que comprar nada para empezar. Tu primera Clase de Prueba incluye todo el equipo de entrenamiento prestado por la academia (facones de madera y aluminio templado sin filo y elementos de guardia). Solo tenés que asistir con ropa cómoda deportiva.',
    tag: 'FOLIO II · EQUIPO PRESTADO INCLUIDO'
  },
  {
    question: '¿Es peligroso el entrenamiento? ¿Cómo se cuida la integridad física?',
    answer:
      'La seguridad y la camaradería son sagradas en nuestro fogón. Jamás se entrena con armas de filo real durante las prácticas formativas. Utilizamos simuladores seguros, progresión técnica controlada y supervisión constante de instructores certificados por el Maestro Jorge Prina.',
    tag: 'FOLIO III · 100% SEGURO Y SUPERVISADO'
  },
  {
    question: '¿Qué pasa si vivo lejos de las sedes presenciales o en otra provincia/país?',
    answer:
      'Podés formarte desde cualquier rincón del país o del mundo a través de nuestra Academia Online. Contamos con Clases Personalizadas en vivo con corrección por video, el Curso de Monitor (64 módulos) y el Curso Universitario de Cultura Gaucha con Certificación Oficial de la Universidad Nacional de Catamarca.',
    tag: 'FOLIO IV · MODALIDAD ONLINE Y FEDERAL'
  },
  {
    question: '¿Cómo compro las remeras oficiales "Juan Moreira" y cómo es el envío?',
    answer:
      'Toda nuestra indumentaria oficial en algodón 100% peinado premium ($32.000 ARS) se adquiere directamente a través de Mercado Libre con Compra Protegida. Elegís tu talle (S, M, L o XL) en nuestra tienda y recibís el pedido en la puerta de tu casa en cualquier punto del país.',
    tag: 'FOLIO V · COMPRA PROTEGIDA MERCADO LIBRE'
  }
];

const FaqSection: React.FC<FaqSectionProps> = ({ onOpenModal, onNavigate }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="preguntas-frecuentes" className="pt-20 pb-28 md:pt-28 md:pb-40 bg-gaucho-cuero relative overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gold/5 rounded-full blur-[160px] pointer-events-none"></div>
      <GauchoWatermark
        variant="compass"
        className="absolute -left-28 top-16 w-[440px] h-[440px] opacity-[0.045]"
      />
      <GauchoWatermark
        variant="rosette"
        className="absolute -right-28 bottom-16 w-[440px] h-[440px] opacity-[0.045]"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <RevealOnScroll direction="down">
          <div className="flex flex-col items-center text-center mb-14 md:mb-20">
            <div className="torn-note inline-flex items-center gap-2 px-5 py-2 border-x border-gold/30 text-gold font-display text-[0.6rem] md:text-xs tracking-[0.3em] uppercase font-bold mb-6">
              <ShieldCheck className="w-4 h-4 text-gold shrink-0" />
              <span>Empezá Sin Dudas · Primera Clase con Equipo Prestado</span>
            </div>

            <h2 className="font-heritage text-3xl sm:text-5xl md:text-6xl text-stone-100 tracking-[0.12em] uppercase mb-4 text-glow-white font-bold">
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
                      ? 'heritage-card border-gold/45 shadow-[0_0_30px_rgba(202,164,98,0.14)]'
                      : 'bg-void/60 border-gold/20 hover:border-gold/35'
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
                      <h3 className="font-heritage text-sm sm:text-base md:text-lg text-stone-100 tracking-[0.08em] uppercase group-hover:text-gold transition-colors font-bold">
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
                        <div className="px-6 pb-6 md:px-8 md:pb-8 pt-3 border-t border-dashed border-gold/25">
                          <p className="font-serif text-stone-300 text-sm md:text-base leading-relaxed italic">
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

        {/* High-Conversion Torn Parchment Closing Box (Bando de Admisión) */}
        <RevealOnScroll delay={300}>
          <div className="mt-14 md:mt-20 torn-paper-slip p-8 md:p-12 border-x border-gold/30 relative overflow-hidden">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
              <div className="text-center lg:text-left max-w-xl">
                <div className="inline-flex items-center gap-2 text-gold font-display text-[0.65rem] tracking-[0.3em] uppercase font-bold mb-2">
                  <Sparkles className="w-4 h-4" />
                  <span>Bando de Admisión · Garantía de Iniciación Criolla</span>
                </div>
                <h3 className="font-heritage text-2xl md:text-3xl text-stone-100 uppercase tracking-[0.12em] mb-3 text-glow-white font-bold">
                  Reservá tu Clase de Prueba con Equipo Prestado
                </h3>
                <p className="font-serif text-stone-300 text-sm md:text-base italic leading-relaxed">
                  Usá nuestro buscador GPS para ubicar la sede más cercana a tu domicilio o escribinos directo por WhatsApp para separar tu lugar esta semana.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-center gap-4 w-full lg:w-auto">
                <button
                  onClick={onOpenModal}
                  className="w-full sm:w-auto px-7 py-4 bg-gold text-void font-display font-black text-xs uppercase tracking-[0.25em] hover:bg-stone-100 transition-all shadow-[0_0_30px_rgba(202,164,98,0.3)] flex items-center justify-center gap-3 rounded-sm cursor-pointer whitespace-nowrap"
                >
                  <Compass className="w-4 h-4 shrink-0" />
                  Buscar Mi Sede (GPS)
                </button>

                <button
                  onClick={() => onNavigate('merch')}
                  className="w-full sm:w-auto px-7 py-4 bg-void border border-gold/40 text-gold hover:bg-gold/10 font-display font-bold text-xs uppercase tracking-[0.25em] transition-all flex items-center justify-center gap-3 rounded-sm cursor-pointer whitespace-nowrap"
                >
                  <ShoppingBag className="w-4 h-4 shrink-0" />
                  Ver Remeras ($32.000)
                </button>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-dashed border-gold/25 flex flex-wrap items-center justify-center lg:justify-between gap-4 text-[0.65rem] font-display tracking-[0.2em] uppercase text-stone-300">
              <span>✦ Facón de práctica incluido en tu 1° clase</span>
              <span>✦ 8 Sedes Presenciales + Academia Online</span>
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

      {/* Hand-Torn Paper Transition into Footer */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <TornPaperEdge position="bottom" fillClass="text-void" />
      </div>
    </section>
  );
};

export default FaqSection;

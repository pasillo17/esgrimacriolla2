import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ShieldCheck, MessageCircle } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';

const FAQS = [
  {
    question: '¿Necesito experiencia previa en artes marciales o buen estado físico para empezar?',
    answer:
      'No, en absoluto. El método de Buenas y Santas está diseñado para que cualquier persona pueda iniciarse desde cero, sin importar su edad ni su condición física actual. Aprenderás paso a paso desde la guardia criolla, el desplazamiento y el manejo básico hasta técnicas avanzadas a tu propio ritmo.',
    tag: 'Iniciación desde cero'
  },
  {
    question: '¿Tengo que comprar facón, poncho o equipo antes de mi primera clase?',
    answer:
      'No tenés que comprar nada para empezar. Tu primera clase de prueba incluye todo el equipo de entrenamiento prestado por la academia (facones de madera y aluminio templado sin filo y elementos de guardia). Solo tenés que asistir con ropa cómoda deportiva.',
    tag: 'Equipo prestado incluido'
  },
  {
    question: '¿Es peligroso el entrenamiento? ¿Cómo se cuida la integridad física?',
    answer:
      'La seguridad y la camaradería son sagradas en nuestro fogón. Jamás se entrena con armas de filo real durante las prácticas formativas. Utilizamos simuladores seguros, progresión técnica controlada y supervisión constante de instructores certificados por el Maestro Jorge Prina.',
    tag: '100% seguro y supervisado'
  },
  {
    question: '¿Qué pasa si vivo lejos de las sedes presenciales o en otra provincia/país?',
    answer:
      'Podés formarte desde cualquier rincón del país o del mundo a través de nuestra Academia Online. Contamos con el curso De Cero a Visteador, Clases Personalizadas en vivo con corrección por video, el Curso de Monitor y el Curso Universitario de Cultura Gaucha con Certificación Oficial de la Universidad Nacional de Catamarca.',
    tag: 'Modalidad online y federal'
  },
  {
    question: '¿Cómo compro las remeras oficiales "Juan Moreira" y cómo es el envío?',
    answer:
      'Toda nuestra indumentaria oficial en algodón 100% peinado premium ($32.000 ARS) se adquiere directamente a través de Mercado Libre con Compra Protegida. Elegís tu talle (S, M, L o XL) en nuestra tienda y recibís el pedido en la puerta de tu casa en cualquier punto del país.',
    tag: 'Compra protegida Mercado Libre'
  }
];

const RESERVE_WHATSAPP_URL =
  'https://api.whatsapp.com/send?phone=5492216246179&text=' +
  encodeURIComponent(
    '¡Buenas y Santas! Quiero reservar mi clase de Esgrima Criolla.'
  );

const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="preguntas-frecuentes" className="py-16 md:py-28 bg-card-depth relative border-t border-gold/15 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <RevealOnScroll direction="down">
          <div className="flex flex-col items-center text-center mb-10 md:mb-14">
            <div className="inline-flex items-center gap-2 text-gold font-display text-xs sm:text-sm tracking-wide font-semibold mb-3">
              <ShieldCheck className="w-4 h-4 text-gold shrink-0" />
              <span>Empezá sin dudas · 1° clase con equipo prestado</span>
            </div>

            <h2 className="font-display text-3xl sm:text-5xl font-bold text-stone-100 tracking-tight mb-3">
              Preguntas <span className="text-gold">Frecuentes</span>
            </h2>

            <p className="font-sans text-stone-200 text-base md:text-lg max-w-2xl leading-relaxed">
              Derribamos los mitos más comunes antes de cruzar la puerta de la academia. La tradición criolla está abierta para quien tenga voluntad de aprender.
            </p>
          </div>
        </RevealOnScroll>

        <div className="space-y-3.5">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <RevealOnScroll key={index} delay={index * 50}>
                <div
                  className={`border transition-all duration-300 rounded-md overflow-hidden ${
                    isOpen
                      ? 'bg-void/90 border-gold/45 shadow-[0_0_24px_rgba(212,170,106,0.12)]'
                      : 'bg-void/55 border-gold/15 hover:border-gold/35'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full px-5 py-4 sm:px-7 sm:py-5 text-left flex items-center justify-between gap-4 group cursor-pointer"
                  >
                    <div className="flex flex-col gap-1">
                      <span className="font-sans text-xs text-gold font-semibold">
                        {faq.tag}
                      </span>
                      <h3 className="font-display text-base sm:text-lg font-semibold text-stone-100 leading-snug group-hover:text-gold transition-colors">
                        {faq.question}
                      </h3>
                    </div>
                    <div
                      className={`w-9 h-9 flex-shrink-0 rounded-md border flex items-center justify-center transition-all duration-300 ${
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
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      >
                        <div className="px-5 pb-5 sm:px-7 sm:pb-6 pt-3 border-t border-gold/10">
                          <p className="font-sans text-stone-200 text-sm sm:text-base leading-relaxed">
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

        {/* Focused Closing CTA: Reservar Clase */}
        <RevealOnScroll delay={200}>
          <div className="mt-12 md:mt-16 p-6 sm:p-10 bg-void border border-gold/30 rounded-lg shadow-2xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left max-w-xl">
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-stone-100 tracking-tight mb-2">
                  ¿Listo para dar el primer paso?
                </h3>
                <p className="font-sans text-stone-200 text-sm sm:text-base leading-relaxed">
                  Vení a probar tu primera clase sin necesidad de experiencia ni equipo propio. Nosotros te prestamos todo para entrenar.
                </p>
              </div>

              <a
                href={RESERVE_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full md:w-auto min-h-[52px] px-8 py-3.5 bg-gold text-void font-display font-bold text-sm sm:text-base hover:bg-stone-100 transition-colors shadow-[0_0_24px_rgba(212,170,106,0.28)] flex items-center justify-center gap-2.5 rounded-md whitespace-nowrap shrink-0"
              >
                <MessageCircle className="w-4 h-4 shrink-0" />
                <span>Reservar Clase</span>
              </a>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};

export default FaqSection;

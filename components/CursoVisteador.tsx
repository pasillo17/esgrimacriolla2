import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  ArrowDown,
  BookOpen,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  MessageCircle,
  Mail,
  X,
  PlayCircle,
  Clock,
  Award,
} from 'lucide-react';

// ============================================================================
// CONFIGURACIÓN EDITABLE DEL CURSO "DE CERO A VISTEADOR"
// Reemplazá estos valores con tu imagen de portada, precios y enlaces reales.
// No requiere backend ni claves privadas.
// ============================================================================
export const COURSE_COVER_IMAGE = ''; // Ej: '/images/portada-de-cero-a-visteador.jpg' o 'https://...'

export const COURSE_CONFIG = {
  portadaImagen: COURSE_COVER_IMAGE,
  precioArs: '$[PONER PRECIO EN PESOS]',
  cuotasTexto: 'o en cuotas con Mercado Pago',
  precioUsd: 'US$[PONER PRECIO EN DÓLARES]',
  linkMercadoPago: 'https://mpago.la/TU-LINK-AQUI',
  linkPayPal: 'https://www.paypal.com/ncp/payment/TU-LINK-AQUI',
  linkWhatsappSoporte: 'https://wa.me/549XXXXXXXXXX',
} as const;

interface CourseBlock {
  id: string;
  label: string;
  title: string;
  isBonus?: boolean;
}

const COURSE_BLOCKS: CourseBlock[] = [
  {
    id: 'intro',
    label: 'Introducción',
    title: 'Bienvenida, equipo de práctica en casa e historia',
  },
  {
    id: 'm1',
    label: 'Módulo 1',
    title: 'El Hierro, la Postura y el Paso',
  },
  {
    id: 'm2',
    label: 'Módulo 2',
    title: 'Cómo Pegar',
  },
  {
    id: 'm3',
    label: 'Módulo 3',
    title: 'Fluidez de Mano y Combinaciones',
  },
  {
    id: 'm4',
    label: 'Módulo 4',
    title: 'El Poncho',
  },
  {
    id: 'm5',
    label: 'Módulo 5',
    title: 'El Visteo y las Destrezas de Esquive',
  },
  {
    id: 'm6',
    label: 'Módulo 6 · Teórico',
    title: 'Técnica, Táctica y Estrategia',
  },
  {
    id: 'bonus',
    label: 'Bonus Incluido',
    title: 'Acondicionamiento, Legislación, Primeros Auxilios + Libro Digital',
    isBonus: true,
  },
];

interface CursoVisteadorProps {
  onBack: () => void;
}

const CursoVisteador: React.FC<CursoVisteadorProps> = ({ onBack }) => {
  const [coverError, setCoverError] = useState(false);
  const [isCheckoutVisible, setIsCheckoutVisible] = useState(false);

  const inscripcionRef = useRef<HTMLElement | null>(null);
  const recorridoRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const checkoutEl = inscripcionRef.current;
    if (!checkoutEl || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]) {
          setIsCheckoutVisible(entries[0].isIntersecting);
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(checkoutEl);
    return () => observer.disconnect();
  }, []);

  const scrollToCheckout = () => {
    inscripcionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToRecorrido = () => {
    recorridoRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const hasCoverImage = Boolean(COURSE_CONFIG.portadaImagen.trim()) && !coverError;

  return (
    <div className="min-h-screen bg-[#1C1E21] text-[#F2EFE9] font-sans selection:bg-[#2B6592] selection:text-[#F2EFE9] pt-20 md:pt-28 pb-28 lg:pb-20 relative z-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Barra superior de regreso */}
        <div className="mb-6 md:mb-8 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={onBack}
            className="min-h-[44px] inline-flex items-center gap-2 text-sm font-medium text-[#D6D2CA] hover:text-[#F2EFE9] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#78B7E8]" />
            <span>Volver al inicio</span>
          </button>

          <span className="text-xs sm:text-sm font-medium text-[#B8B4AC]">
            Maestro Jorge Prina
          </span>
        </div>

        {/* ============================================================
            1. CABECERA CLARA Y DIRECTA
           ============================================================ */}
        <section className="pb-10 md:pb-14 border-b border-[#F2EFE9]/12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-5"
          >
            <p className="text-sm font-semibold tracking-wide text-[#78B7E8]">
              CURSO ONLINE • DESDE CERO
            </p>

            <h1
              className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.08] text-[#F2EFE9]"
              style={{ textWrap: 'balance' }}
            >
              DE CERO A VISTEADOR
            </h1>

            <p className="text-base sm:text-lg md:text-xl leading-relaxed text-[#E4E0D8] max-w-2xl">
              Aprendé el sistema completo de Esgrima Criolla con facón y poncho paso a paso desde tu casa, sin necesidad de experiencia previa.
            </p>

            {/* Portada 16:9 */}
            <div className="pt-2">
              <div className="rounded-lg overflow-hidden bg-[#23262A] border border-[#2B6592]/60 shadow-[0_18px_45px_rgba(0,0,0,0.4)]">
                <div className="relative aspect-video w-full bg-[#17191C]">
                  {hasCoverImage ? (
                    <img
                      src={COURSE_CONFIG.portadaImagen}
                      alt="Portada del curso online De Cero a Visteador — Maestro Jorge Prina"
                      referrerPolicy="no-referrer"
                      onError={() => setCoverError(true)}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 sm:p-10 text-center">
                      <img
                        src="https://i.imgur.com/cbCrHDB.png"
                        alt="Academia de Esgrima Criolla"
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 sm:w-20 sm:h-20 object-contain mb-4"
                      />
                      <p className="font-display text-xl sm:text-2xl font-bold text-[#F2EFE9]">
                        De Cero a Visteador
                      </p>
                      <p className="text-sm sm:text-base text-[#D0CCC4] mt-1">
                        Esgrima Criolla con facón y poncho · Maestro Jorge Prina
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={scrollToCheckout}
                className="min-h-[54px] flex-1 sm:flex-none inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-[#2B6592] hover:bg-[#3577AA] active:scale-[0.99] text-[#F2EFE9] font-display text-base font-semibold rounded-md transition-colors cursor-pointer shadow-[0_10px_28px_rgba(43,101,146,0.35)]"
              >
                <span>Quiero inscribirme al curso</span>
                <ArrowDown className="w-4 h-4 shrink-0" />
              </button>

              <button
                type="button"
                onClick={scrollToRecorrido}
                className="min-h-[54px] inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#23262A] hover:bg-[#2B2F35] text-[#F2EFE9] font-display text-base font-medium rounded-md border border-[#6E4726] transition-colors cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-[#DFB285] shrink-0" />
                <span>Ver recorrido</span>
              </button>
            </div>
          </motion.div>
        </section>

        {/* ============================================================
            2. ¿CÓMO FUNCIONA?
           ============================================================ */}
        <section className="py-10 md:py-14 border-b border-[#F2EFE9]/12">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#F2EFE9] mb-2">
            ¿Cómo funciona este curso?
          </h2>
          <p className="text-base text-[#D6D2CA] mb-6 leading-relaxed">
            Está pensado para que cualquier persona pueda aprender Esgrima Criolla desde cero, sin apuros y desde su casa.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#23262A] border border-[#2B6592]/45 rounded-lg p-5 space-y-2">
              <div className="flex items-center gap-2.5 text-[#78B7E8]">
                <PlayCircle className="w-5 h-5 shrink-0" />
                <h3 className="font-display text-lg font-semibold text-[#F2EFE9]">
                  Videos paso a paso
                </h3>
              </div>
              <p className="text-[0.95rem] leading-relaxed text-[#DCD8D0]">
                El Maestro Jorge Prina te explica cada guardia, corte, manejo del poncho y esquive con prácticas guiadas para entrenar solo en casa.
              </p>
            </div>

            <div className="bg-[#23262A] border border-[#6E4726]/70 rounded-lg p-5 space-y-2">
              <div className="flex items-center gap-2.5 text-[#DFB285]">
                <Clock className="w-5 h-5 shrink-0" />
                <h3 className="font-display text-lg font-semibold text-[#F2EFE9]">
                  A tu ritmo, para siempre
                </h3>
              </div>
              <p className="text-[0.95rem] leading-relaxed text-[#DCD8D0]">
                No tiene horarios fijos ni vencimiento. Mirás las clases desde tu celular o computadora las veces que quieras.
              </p>
            </div>

            <div className="bg-[#23262A] border border-[#2B6592]/45 rounded-lg p-5 space-y-2">
              <div className="flex items-center gap-2.5 text-[#78B7E8]">
                <Award className="w-5 h-5 shrink-0" />
                <h3 className="font-display text-lg font-semibold text-[#F2EFE9]">
                  Sin experiencia previa
                </h3>
              </div>
              <p className="text-[0.95rem] leading-relaxed text-[#DCD8D0]">
                Arrancás desde lo más básico: cómo armar tu equipo seguro en casa, cómo agarrar el facón y cómo moverte desde el primer día.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================
            3. RECORRIDO DEL CURSO (CONCISO Y FÁCIL DE LEER)
           ============================================================ */}
        <section ref={recorridoRef} id="temario-visteador" className="py-10 md:py-14 border-b border-[#F2EFE9]/12 scroll-mt-24">
          <div className="mb-6">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#F2EFE9]">
              Recorrido del curso
            </h2>
            <p className="text-base text-[#D6D2CA] mt-1">
              6 módulos progresivos con prácticas guiadas, introducción inicial y material bonus de regalo.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {COURSE_BLOCKS.map((block) => (
              <div
                key={block.id}
                className={`rounded-lg px-5 py-4 border ${
                  block.isBonus
                    ? 'bg-[#252321] border-[#6E4726]'
                    : 'bg-[#23262A] border-[#F2EFE9]/12'
                }`}
              >
                <p
                  className={`text-xs sm:text-sm font-semibold mb-1 ${
                    block.isBonus ? 'text-[#DFB285]' : 'text-[#78B7E8]'
                  }`}
                >
                  {block.label}
                </p>
                <h3 className="font-display text-base sm:text-lg font-semibold text-[#F2EFE9] leading-snug">
                  {block.title}
                </h3>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================
            4. CAJA DE INSCRIPCIÓN Y PAGOS (SIN BACKEND)
           ============================================================ */}
        <section ref={inscripcionRef} id="inscripcion-visteador" className="pt-10 md:pt-14 scroll-mt-24">
          <div className="bg-[#23262A] border border-[#2B6592]/75 rounded-lg overflow-hidden shadow-[0_20px_55px_rgba(0,0,0,0.45)]">
            <div className="h-1.5 w-full bg-gradient-to-r from-[#2B6592] via-[#6E4726] to-[#2B6592]" />

            <div className="p-5 sm:p-8 md:p-10">
              <div className="text-center mb-7">
                <p className="text-sm font-semibold text-[#78B7E8] mb-1.5">
                  Inscripción Online
                </p>
                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-[#F2EFE9] mb-2">
                  Elegí cómo querés pagar
                </h2>
                <p className="text-base text-[#DCD8D0] max-w-xl mx-auto leading-relaxed">
                  Un solo pago. Incluye el programa completo, prácticas guiadas, módulo bonus y el Libro Digital de regalo.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-[#1C1E21] border border-[#2B6592]/60 rounded-lg p-5">
                  <p className="text-sm font-semibold text-[#78B7E8]">
                    Desde Argentina (Pesos)
                  </p>
                  <p className="font-display text-2xl sm:text-3xl font-bold text-[#F2EFE9] tabular-nums mt-1.5">
                    {COURSE_CONFIG.precioArs}
                  </p>
                  <p className="text-sm text-[#C8C4BC] mt-1">
                    {COURSE_CONFIG.cuotasTexto}
                  </p>
                </div>

                <div className="bg-[#1C1E21] border border-[#6E4726] rounded-lg p-5">
                  <p className="text-sm font-semibold text-[#DFB285]">
                    Desde el Exterior (Dólares)
                  </p>
                  <p className="font-display text-2xl sm:text-3xl font-bold text-[#F2EFE9] tabular-nums mt-1.5">
                    {COURSE_CONFIG.precioUsd}
                  </p>
                  <p className="text-sm text-[#C8C4BC] mt-1">
                    Pago único internacional con PayPal o tarjeta
                  </p>
                </div>
              </div>

              <div className="space-y-3.5">
                <a
                  href={COURSE_CONFIG.linkMercadoPago}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-full min-h-[68px] flex items-center justify-between gap-4 px-5 sm:px-6 py-4 bg-[#2B6592] hover:bg-[#3577AA] active:scale-[0.995] text-[#F2EFE9] rounded-md border border-[#78B7E8]/40 shadow-[0_12px_30px_rgba(43,101,146,0.35)] transition-all"
                >
                  <div className="text-left">
                    <span className="block font-display text-base sm:text-lg font-bold leading-snug">
                      INSCRIBIRME DESDE ARGENTINA
                    </span>
                    <span className="block text-sm text-[#E8F2FA] mt-0.5">
                      Pesos / Mercado Pago / Tarjetas
                    </span>
                  </div>
                  <ExternalLink className="w-5 h-5 flex-shrink-0 text-[#F2EFE9] group-hover:translate-x-0.5 transition-transform" />
                </a>

                <a
                  href={COURSE_CONFIG.linkPayPal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-full min-h-[68px] flex items-center justify-between gap-4 px-5 sm:px-6 py-4 bg-[#1C1E21] hover:bg-[#2A2D32] active:scale-[0.995] text-[#F2EFE9] rounded-md border border-[#6E4726] hover:border-[#9E6B3E] transition-all"
                >
                  <div className="text-left">
                    <span className="block font-display text-base sm:text-lg font-bold leading-snug text-[#F2EFE9]">
                      INSCRIBIRME DESDE EL EXTERIOR
                    </span>
                    <span className="block text-sm text-[#D6D2CA] mt-0.5">
                      USD / PayPal / Tarjeta Internacional
                    </span>
                  </div>
                  <ExternalLink className="w-5 h-5 flex-shrink-0 text-[#DFB285] group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>

              <div className="mt-6 pt-5 border-t border-[#F2EFE9]/12 text-center">
                <p className="text-sm sm:text-base font-medium text-[#F2EFE9] flex items-center justify-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#78B7E8] flex-shrink-0" />
                  <span>Acceso automático por email al acreditarse el pago. Acceso de por vida.</span>
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ============================================================
          BARRA FIJA MÓVIL (DESAPARECE SOLA AL LLEGAR AL PAGO)
         ============================================================ */}
      <AnimatePresence>
        {!isCheckoutVisible && (
          <motion.div
            key="mobile-course-sticky-cta"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#181A1D]/96 backdrop-blur-md border-t border-[#2B6592]/60 px-4 py-3 shadow-[0_-10px_30px_rgba(0,0,0,0.65)]"
            style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
          >
            <div className="max-w-xl mx-auto flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="font-display text-sm font-bold text-[#F2EFE9] truncate">
                  De Cero a Visteador
                </p>
                <p className="text-xs text-[#C8C4BC] truncate">
                  Curso online · Acceso de por vida
                </p>
              </div>

              <button
                type="button"
                onClick={scrollToCheckout}
                className="min-h-[44px] px-5 py-2.5 bg-[#2B6592] hover:bg-[#3577AA] text-[#F2EFE9] font-display text-sm font-semibold rounded-md transition-colors shrink-0 cursor-pointer whitespace-nowrap"
              >
                Inscribirme
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ============================================================================
// PANTALLA / MODAL DE CONFIRMACIÓN DE PAGO (?pago=aprobado)
// ============================================================================
interface PaymentApprovedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PaymentApprovedModal: React.FC<PaymentApprovedModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="payment-approved-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[120] bg-[#121417]/90 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="payment-approved-title"
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl max-h-[92dvh] overflow-y-auto bg-[#23262A] border-t sm:border border-[#2B6592]/75 rounded-t-2xl sm:rounded-lg shadow-[0_30px_80px_rgba(0,0,0,0.65)] text-[#F2EFE9] font-sans"
            style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
          >
            <div className="sm:hidden pt-3 pb-1 flex justify-center">
              <div className="w-10 h-1 bg-[#F2EFE9]/25 rounded-full" />
            </div>

            <div className="hidden sm:block h-1.5 w-full bg-gradient-to-r from-[#2B6592] via-[#6E4726] to-[#2B6592]" />

            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar confirmación"
              className="absolute top-3 right-3 min-w-[44px] min-h-[44px] flex items-center justify-center text-[#C8C4BC] hover:text-[#F2EFE9] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 sm:p-9 text-center">
              <div className="w-14 h-14 mx-auto mb-5 rounded-lg bg-[#2B6592]/20 border border-[#2B6592]/70 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-[#78B7E8]" />
              </div>

              <p className="text-sm font-semibold text-[#78B7E8] mb-2">
                Pago aprobado
              </p>

              <h2
                id="payment-approved-title"
                className="font-display text-2xl sm:text-3xl font-bold text-[#F2EFE9] leading-tight mb-4"
                style={{ textWrap: 'balance' }}
              >
                ¡Inscripción confirmada! Bienvenido a De Cero a Visteador.
              </h2>

              <p className="text-base text-[#E4E0D8] leading-relaxed mb-5">
                En los próximos 2 minutos vas a recibir un correo automático con tu acceso al aula y el Libro Digital (revisá también las carpetas de Spam o Promociones).
              </p>

              <div className="bg-[#1C1E21] border border-[#6E4726] rounded-md px-4 py-3.5 mb-6 flex items-center justify-center gap-2.5 text-left sm:text-center">
                <Mail className="w-5 h-5 text-[#DFB285] flex-shrink-0" />
                <p className="text-sm sm:text-base font-semibold text-[#F2EFE9]">
                  Importante: ingresá al aula desde una cuenta de Gmail.
                </p>
              </div>

              <div className="space-y-3">
                <a
                  href={COURSE_CONFIG.linkWhatsappSoporte}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full min-h-[54px] inline-flex items-center justify-center gap-2.5 px-5 py-3.5 bg-[#2B6592] hover:bg-[#3577AA] text-[#F2EFE9] font-display text-sm sm:text-base font-semibold rounded-md transition-colors leading-snug"
                >
                  <MessageCircle className="w-5 h-5 flex-shrink-0" />
                  <span>¿No te llegó el mail o pagaste con otro correo? Escribinos por WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full min-h-[44px] py-2.5 text-sm font-medium text-[#C8C4BC] hover:text-[#F2EFE9] transition-colors cursor-pointer"
                >
                  Cerrar aviso
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CursoVisteador;

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  ArrowDown,
  ChevronDown,
  BookOpen,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  MessageCircle,
  Mail,
  Sparkles,
  Award,
  X,
  CreditCard,
  Globe,
  PlayCircle,
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

interface CurriculumModule {
  id: string;
  code: string;
  title: string;
  summary: string;
  topics: string[];
  highlightNote?: string;
  isBonus?: boolean;
}

const CURRICULUM_MODULES: CurriculumModule[] = [
  {
    id: 'introduccion',
    code: '00',
    title: 'Introducción',
    summary: 'Bienvenida, equipo de práctica en casa, qué es la Esgrima Criolla y su historia.',
    topics: [
      'Bienvenida al curso y metodología de entrenamiento en casa',
      'Equipo de práctica seguro y económico para entrenar desde cero',
      'Qué es la Esgrima Criolla y cómo se estructura el sistema',
      'Historia, origen y raíces del arte marcial argentino',
    ],
  },
  {
    id: 'modulo-1',
    code: '01',
    title: 'Módulo 1: El Hierro, la Postura y el Paso',
    summary: 'Partes del cuchillo, empuñe criollo, guardia base, compás en cruz, desenvaine + práctica guiada.',
    topics: [
      'Partes del cuchillo y características del facón',
      'Empuñe criollo correcto y sujeción segura',
      'Guardia base, equilibrio y estructura corporal',
      'Desplazamiento fundamental: el compás en cruz',
      'Desenvaine limpio y pasaje a guardia',
    ],
    highlightNote: 'Incluye práctica guiada paso a paso',
  },
  {
    id: 'modulo-2',
    code: '02',
    title: 'Módulo 2: Cómo Pegar',
    summary: 'Tiro de punta, tiro de hacha, mecánica de corte, achure, picotazo, planazo y cintarazo + práctica guiada.',
    topics: [
      'Tiro de punta y líneas de proyección',
      'Tiro de hacha y generación de potencia',
      'Mecánica de corte y ángulos de filo',
      'Achure y picotazo a distancia corta y media',
      'Planazo y cintarazo en el repertorio criollo',
    ],
    highlightNote: 'Incluye práctica guiada paso a paso',
  },
  {
    id: 'modulo-3',
    code: '03',
    title: 'Módulo 3: Fluidez de Mano y Combinaciones',
    summary: 'Molinetes internos y externos, dobletes, tripletes, Serie Primera y Serie La Viborita + práctica guiada.',
    topics: [
      'Molinetes internos y externos para soltura de muñeca',
      'Encadenamiento de dobletes y tripletes',
      'Desarrollo completo de la Serie Primera',
      'Desarrollo completo de la Serie La Viborita',
    ],
    highlightNote: 'Incluye práctica guiada paso a paso',
  },
  {
    id: 'modulo-4',
    code: '04',
    title: 'Módulo 4: El Poncho',
    summary: 'Enrolle básico y medio, guardia de poncho y facón, defensa activa, flecazo, manteada, enterrada y pisar el poncho + práctica guiada.',
    topics: [
      'Enrolle básico y enrollado medio del poncho',
      'Guardia combinada de poncho y facón',
      'Defensa activa y control de la línea de ataque',
      'Técnicas clásicas: flecazo, manteada y enterrada',
      'Recursos avanzados: pisar el poncho y salidas',
    ],
    highlightNote: 'Incluye práctica guiada paso a paso',
  },
  {
    id: 'modulo-5',
    code: '05',
    title: 'Módulo 5: El Visteo y las Destrezas de Esquive',
    summary: 'Esquives de tronco y cabeza, barridas, saltos criollos, topada y retirada.',
    topics: [
      'Esquives de tronco y cabeza sin perder la postura',
      'Barridas y lectura de distancia en el visteo',
      'Saltos criollos y cambios de ángulo',
      'Topada, cierre de distancia y retirada controlada',
    ],
  },
  {
    id: 'modulo-6',
    code: '06',
    title: 'Módulo 6 (Teórico): Técnica, Táctica y Estrategia',
    summary: 'Mentalidad del visteador, tipos de ataque, tiempos, "cada cuchillo para cada pelea" y qué no hacer en un visteo.',
    topics: [
      'Mentalidad del visteador y lectura del oponente',
      'Tipos de ataque y manejo de los tiempos de combate',
      'Principio táctico: "cada cuchillo para cada pelea"',
      'Errores críticos y qué no hacer en un visteo',
    ],
  },
  {
    id: 'modulo-bonus',
    code: 'BONUS',
    title: 'Módulo Bonus Incluido',
    summary: 'Acondicionamiento físico criollo, legislación sobre portación de arma blanca en Argentina y primeros auxilios ante heridas de arma blanca + Libro Digital de regalo.',
    topics: [
      'Acondicionamiento físico criollo aplicado al entrenamiento en casa',
      'Legislación vigente sobre portación de arma blanca en Argentina',
      'Primeros auxilios esenciales ante heridas de arma blanca',
      'Libro Digital de Esgrima Criolla de regalo con tu inscripción',
    ],
    highlightNote: 'Incluido sin costo adicional + Libro Digital de regalo',
    isBonus: true,
  },
];

interface CursoVisteadorProps {
  onBack: () => void;
}

const CursoVisteador: React.FC<CursoVisteadorProps> = ({ onBack }) => {
  const [openModules, setOpenModules] = useState<string[]>(['introduccion']);
  const [coverError, setCoverError] = useState(false);

  const toggleModule = (id: string) => {
    setOpenModules((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const allExpanded = openModules.length === CURRICULUM_MODULES.length;

  const toggleAllModules = () => {
    if (allExpanded) {
      setOpenModules([]);
    } else {
      setOpenModules(CURRICULUM_MODULES.map((m) => m.id));
    }
  };

  const scrollToSection = (sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const hasCoverImage = Boolean(COURSE_CONFIG.portadaImagen.trim()) && !coverError;

  return (
    <div className="min-h-screen bg-[#1C1E21] text-[#F2EFE9] selection:bg-[#2B6592] selection:text-[#F2EFE9] pt-24 md:pt-28 pb-20 relative z-20">
      {/* Subtle athletic radial lighting (dark charcoal & Azul Patria) */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-70"
        style={{
          background:
            'radial-gradient(circle at 18% 12%, rgba(43, 101, 146, 0.14) 0%, transparent 45%), radial-gradient(circle at 85% 75%, rgba(110, 71, 38, 0.12) 0%, transparent 48%)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Back Navigation */}
        <div className="mb-8 md:mb-10 flex items-center justify-between gap-4 border-b border-[#F2EFE9]/10 pb-4">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-display uppercase tracking-[0.2em] text-[#C8C4BC] hover:text-[#F2EFE9] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#6BA8D9]" />
            <span>Volver a Esgrima Criolla</span>
          </button>

          <span className="hidden sm:inline-block font-display text-[0.68rem] uppercase tracking-[0.22em] text-[#9AA0A6]">
            Maestro Jorge Prina · Formación Online
          </span>
        </div>

        {/* ============================================================
            1. HERO / CABECERA DEL CURSO
           ============================================================ */}
        <section className="pb-14 md:pb-20 border-b border-[#F2EFE9]/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Copy Column */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="lg:col-span-6 flex flex-col items-start text-left"
            >
              <p className="font-display text-xs sm:text-[0.8rem] font-semibold uppercase tracking-[0.26em] text-[#6BA8D9] mb-4">
                CURSO ONLINE • DESDE CERO
              </p>

              <h1
                className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-bold uppercase tracking-[0.06em] leading-[1.04] text-[#F2EFE9] mb-5"
                style={{ textWrap: 'balance' }}
              >
                DE CERO A VISTEADOR
              </h1>

              <p className="font-serif text-base sm:text-lg leading-relaxed text-[#D8D3CA] mb-6 max-w-xl">
                Aprendé el sistema completo de Esgrima Criolla con facón y poncho paso a paso desde tu casa, sin necesidad de experiencia previa.
              </p>

              <p className="font-display text-xs uppercase tracking-[0.18em] text-[#A8A39B] mb-8">
                Dictado por el <span className="text-[#F2EFE9]">Maestro Jorge Prina</span> · 8 bloques completos · Acceso de por vida
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => scrollToSection('inscripcion-visteador')}
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-[#2B6592] hover:bg-[#3475A8] active:scale-[0.99] text-[#F2EFE9] font-display text-sm font-bold uppercase tracking-[0.18em] rounded-sm border border-[#5DA3D9]/40 shadow-[0_12px_30px_rgba(43,101,146,0.32)] transition-all duration-200 cursor-pointer whitespace-nowrap"
                >
                  <span>Inscribirme al curso</span>
                  <ArrowDown className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => scrollToSection('temario-visteador')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-[#23262A] hover:bg-[#2B2F35] text-[#F2EFE9] font-display text-xs font-semibold uppercase tracking-[0.2em] rounded-sm border border-[#6E4726]/80 hover:border-[#8D5D34] transition-all duration-200 cursor-pointer whitespace-nowrap"
                >
                  <BookOpen className="w-4 h-4 text-[#C4966C]" />
                  <span>Ver temario</span>
                </button>
              </div>
            </motion.div>

            {/* Cover Image Column (16:9 prepared slot) */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="lg:col-span-6 w-full"
            >
              <div className="relative rounded-sm overflow-hidden bg-[#23262A] border border-[#2B6592]/50 shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
                {/* Subtle Madera hairline accent on top edge */}
                <div className="h-[2px] w-full bg-gradient-to-r from-[#2B6592] via-[#6E4726] to-[#2B6592]" />

                <div className="relative aspect-video w-full overflow-hidden bg-[#181A1D]">
                  {hasCoverImage ? (
                    <img
                      src={COURSE_CONFIG.portadaImagen}
                      alt="Portada del curso online De Cero a Visteador — Maestro Jorge Prina"
                      referrerPolicy="no-referrer"
                      onError={() => setCoverError(true)}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 sm:p-10 text-center relative">
                      {/* Subtle technical framing lines */}
                      <div className="absolute inset-4 border border-[#2B6592]/25 pointer-events-none" />
                      <div className="absolute top-4 left-4 w-5 h-5 border-t-2 border-l-2 border-[#6E4726] pointer-events-none" />
                      <div className="absolute top-4 right-4 w-5 h-5 border-t-2 border-r-2 border-[#6E4726] pointer-events-none" />
                      <div className="absolute bottom-4 left-4 w-5 h-5 border-b-2 border-l-2 border-[#6E4726] pointer-events-none" />
                      <div className="absolute bottom-4 right-4 w-5 h-5 border-b-2 border-r-2 border-[#6E4726] pointer-events-none" />

                      <img
                        src="https://i.imgur.com/cbCrHDB.png"
                        alt="Emblema Academia de Esgrima Criolla"
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 sm:w-20 sm:h-20 object-contain mb-4 opacity-90"
                      />

                      <p className="font-display text-[0.7rem] uppercase tracking-[0.28em] text-[#6BA8D9] mb-1.5">
                        Facón y Poncho · Sistema Completo
                      </p>
                      <p className="font-display text-xl sm:text-2xl font-bold uppercase tracking-[0.14em] text-[#F2EFE9] mb-1">
                        De Cero a Visteador
                      </p>
                      <p className="font-serif italic text-xs sm:text-sm text-[#B8B3AA]">
                        Maestro Jorge Prina — Academia Buenas y Santas
                      </p>
                    </div>
                  )}
                </div>

                {/* Clean bottom info bar */}
                <div className="px-4 sm:px-5 py-3 bg-[#23262A] border-t border-[#F2EFE9]/10 flex flex-wrap items-center justify-between gap-2 text-[0.72rem] font-display uppercase tracking-[0.16em] text-[#C8C4BC]">
                  <span className="inline-flex items-center gap-1.5">
                    <PlayCircle className="w-3.5 h-3.5 text-[#6BA8D9]" />
                    Clases grabadas + Prácticas guiadas
                  </span>
                  <span className="text-[#C4966C]">+ Libro Digital de regalo</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sober 3-item summary strip */}
          <div className="mt-10 md:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-[#23262A] border border-[#2B6592]/35 rounded-sm px-5 py-4">
              <p className="font-display text-[0.68rem] uppercase tracking-[0.22em] text-[#6BA8D9] mb-1">
                Nivel Inicial a Completo
              </p>
              <p className="font-serif text-sm text-[#E5E1D8]">
                Pensado desde cero absoluto, paso a paso y entrenable en tu casa.
              </p>
            </div>
            <div className="bg-[#23262A] border border-[#6E4726]/55 rounded-sm px-5 py-4">
              <p className="font-display text-[0.68rem] uppercase tracking-[0.22em] text-[#C4966C] mb-1">
                Método Tradicional + Práctica
              </p>
              <p className="font-serif text-sm text-[#E5E1D8]">
                Facón, poncho, visteo, estrategia, legislación y primeros auxilios.
              </p>
            </div>
            <div className="bg-[#23262A] border border-[#2B6592]/35 rounded-sm px-5 py-4">
              <p className="font-display text-[0.68rem] uppercase tracking-[0.22em] text-[#6BA8D9] mb-1">
                Entrega Automática
              </p>
              <p className="font-serif text-sm text-[#E5E1D8]">
                Recibís tu acceso al aula y el Libro Digital por email al acreditarse el pago.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================
            2. TEMARIO DEL CURSO (ACORDEÓN DESPLEGABLE)
           ============================================================ */}
        <section id="temario-visteador" className="py-14 md:py-20 border-b border-[#F2EFE9]/10 scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 md:mb-10">
            <div>
              <p className="font-display text-xs uppercase tracking-[0.24em] text-[#6BA8D9] mb-2">
                Programa Completo · 8 Bloques
              </p>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-[0.08em] text-[#F2EFE9]">
                Temario del Curso
              </h2>
            </div>

            <button
              type="button"
              onClick={toggleAllModules}
              className="self-start sm:self-auto font-display text-xs uppercase tracking-[0.18em] text-[#C8C4BC] hover:text-[#F2EFE9] border-b border-[#2B6592]/60 hover:border-[#6BA8D9] pb-1 transition-colors cursor-pointer"
            >
              {allExpanded ? 'Contraer todos los módulos' : 'Desplegar todo el temario'}
            </button>
          </div>

          <div className="space-y-3">
            {CURRICULUM_MODULES.map((mod) => {
              const isOpen = openModules.includes(mod.id);
              const isBonus = Boolean(mod.isBonus);

              return (
                <div
                  key={mod.id}
                  className={`rounded-sm border transition-colors duration-200 overflow-hidden ${
                    isBonus
                      ? isOpen
                        ? 'bg-[#262422] border-[#8D5D34]'
                        : 'bg-[#232324] border-[#6E4726]/80 hover:border-[#8D5D34]'
                      : isOpen
                        ? 'bg-[#25292E] border-[#2B6592]'
                        : 'bg-[#23262A] border-[#F2EFE9]/12 hover:border-[#2B6592]/60'
                  }`}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => toggleModule(mod.id)}
                    className="w-full px-4 sm:px-6 py-4 sm:py-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <div className="flex items-start sm:items-center gap-3.5 sm:gap-5 min-w-0">
                      <span
                        className={`flex-shrink-0 font-display text-xs sm:text-sm font-bold tracking-[0.16em] uppercase tabular-nums pt-0.5 sm:pt-0 ${
                          isBonus ? 'text-[#D4A373]' : 'text-[#6BA8D9]'
                        }`}
                      >
                        {mod.code}
                      </span>

                      <div className="min-w-0">
                        <h3 className="font-display text-base sm:text-lg font-semibold uppercase tracking-[0.06em] text-[#F2EFE9] leading-snug">
                          {mod.title}
                        </h3>
                        {!isOpen && (
                          <p className="font-serif text-xs sm:text-sm text-[#A8A39B] mt-1 line-clamp-1">
                            {mod.summary}
                          </p>
                        )}
                      </div>
                    </div>

                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-sm border flex items-center justify-center transition-transform duration-200 ${
                        isBonus
                          ? isOpen
                            ? 'bg-[#6E4726] border-[#8D5D34] text-[#F2EFE9] rotate-180'
                            : 'border-[#6E4726]/70 text-[#D4A373]'
                          : isOpen
                            ? 'bg-[#2B6592] border-[#2B6592] text-[#F2EFE9] rotate-180'
                            : 'border-[#2B6592]/50 text-[#6BA8D9]'
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
                        transition={{ duration: 0.22, ease: 'easeInOut' }}
                      >
                        <div className="px-4 sm:px-6 pb-5 sm:pb-6 pt-3 border-t border-[#F2EFE9]/10">
                          <p className="font-serif text-sm sm:text-[0.95rem] text-[#D8D3CA] leading-relaxed mb-4">
                            {mod.summary}
                          </p>

                          <ul className="space-y-2.5">
                            {mod.topics.map((topic, index) => (
                              <li
                                key={index}
                                className="flex items-start gap-2.5 text-sm text-[#E5E1D8] font-serif leading-relaxed"
                              >
                                <CheckCircle2
                                  className={`w-4 h-4 flex-shrink-0 mt-1 ${
                                    isBonus ? 'text-[#C4966C]' : 'text-[#6BA8D9]'
                                  }`}
                                />
                                <span>{topic}</span>
                              </li>
                            ))}
                          </ul>

                          {mod.highlightNote && (
                            <div
                              className={`mt-4 pt-3 border-t border-[#F2EFE9]/10 flex items-center gap-2 font-display text-xs uppercase tracking-[0.16em] ${
                                isBonus ? 'text-[#D4A373]' : 'text-[#6BA8D9]'
                              }`}
                            >
                              {isBonus ? (
                                <Sparkles className="w-3.5 h-3.5 flex-shrink-0" />
                              ) : (
                                <Award className="w-3.5 h-3.5 flex-shrink-0" />
                              )}
                              <span>{mod.highlightNote}</span>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

        {/* ============================================================
            3. CAJA DE INSCRIPCIÓN Y PAGOS (SIN BACKEND)
           ============================================================ */}
        <section id="inscripcion-visteador" className="pt-14 md:pt-20 scroll-mt-24">
          <div className="max-w-3xl mx-auto">
            <div className="bg-[#23262A] border border-[#2B6592]/70 rounded-sm overflow-hidden shadow-[0_24px_65px_rgba(0,0,0,0.5)]">
              {/* Top structural Madera & Azul Patria strip */}
              <div className="h-1 w-full bg-gradient-to-r from-[#2B6592] via-[#6E4726] to-[#2B6592]" />

              <div className="p-6 sm:p-8 md:p-10">
                <div className="text-center mb-8">
                  <p className="font-display text-xs uppercase tracking-[0.26em] text-[#6BA8D9] mb-2">
                    Inscripción Online Inmediata
                  </p>
                  <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-[0.08em] text-[#F2EFE9] mb-3">
                    De Cero a Visteador
                  </h2>
                  <p className="font-serif text-sm sm:text-base text-[#C8C4BC] max-w-xl mx-auto">
                    Elegí tu medio de pago según tu país. Incluye los 6 módulos completos, Introducción, Módulo Bonus y el Libro Digital de regalo.
                  </p>
                </div>

                {/* Pricing Overview Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {/* Argentina Pricing */}
                  <div className="bg-[#1C1E21] border border-[#2B6592]/60 rounded-sm p-5 text-center sm:text-left">
                    <div className="flex items-center justify-center sm:justify-between gap-2 mb-2">
                      <span className="font-display text-xs font-bold uppercase tracking-[0.2em] text-[#6BA8D9]">
                        Argentina (ARS)
                      </span>
                      <CreditCard className="w-4 h-4 text-[#6BA8D9] hidden sm:block" />
                    </div>
                    <p className="font-display text-2xl sm:text-3xl font-bold text-[#F2EFE9] tracking-wide tabular-nums">
                      {COURSE_CONFIG.precioArs}
                    </p>
                    <p className="font-serif text-xs sm:text-sm text-[#B8B3AA] mt-1">
                      {COURSE_CONFIG.cuotasTexto}
                    </p>
                  </div>

                  {/* Exterior Pricing */}
                  <div className="bg-[#1C1E21] border border-[#6E4726]/75 rounded-sm p-5 text-center sm:text-left">
                    <div className="flex items-center justify-center sm:justify-between gap-2 mb-2">
                      <span className="font-display text-xs font-bold uppercase tracking-[0.2em] text-[#D4A373]">
                        Exterior (USD)
                      </span>
                      <Globe className="w-4 h-4 text-[#D4A373] hidden sm:block" />
                    </div>
                    <p className="font-display text-2xl sm:text-3xl font-bold text-[#F2EFE9] tracking-wide tabular-nums">
                      {COURSE_CONFIG.precioUsd}
                    </p>
                    <p className="font-serif text-xs sm:text-sm text-[#B8B3AA] mt-1">
                      Pago único internacional vía PayPal
                    </p>
                  </div>
                </div>

                {/* Two Big Differentiated Payment Buttons */}
                <div className="space-y-4">
                  {/* Botón 1: Argentina (Mercado Pago) */}
                  <a
                    href={COURSE_CONFIG.linkMercadoPago}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group w-full flex items-center justify-between gap-4 px-5 sm:px-7 py-4 sm:py-5 bg-[#2B6592] hover:bg-[#3475A8] active:scale-[0.995] text-[#F2EFE9] rounded-sm border border-[#6BA8D9]/45 shadow-[0_12px_32px_rgba(43,101,146,0.35)] transition-all duration-200"
                  >
                    <div className="flex flex-col text-left">
                      <span className="font-display text-sm sm:text-base font-bold uppercase tracking-[0.12em] leading-snug">
                        INSCRIBIRME DESDE ARGENTINA
                      </span>
                      <span className="font-serif text-xs sm:text-sm text-[#E5EFF7]/90 mt-0.5">
                        Pesos / Mercado Pago / Tarjetas
                      </span>
                    </div>
                    <ExternalLink className="w-5 h-5 flex-shrink-0 text-[#F2EFE9] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>

                  {/* Botón 2: Exterior (PayPal) */}
                  <a
                    href={COURSE_CONFIG.linkPayPal}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group w-full flex items-center justify-between gap-4 px-5 sm:px-7 py-4 sm:py-5 bg-[#1C1E21] hover:bg-[#2A2D32] active:scale-[0.995] text-[#F2EFE9] rounded-sm border border-[#6E4726] hover:border-[#9E6B3E] transition-all duration-200"
                  >
                    <div className="flex flex-col text-left">
                      <span className="font-display text-sm sm:text-base font-bold uppercase tracking-[0.12em] leading-snug text-[#F2EFE9]">
                        INSCRIBIRME DESDE EL EXTERIOR
                      </span>
                      <span className="font-serif text-xs sm:text-sm text-[#C8C4BC] mt-0.5">
                        USD / PayPal / Tarjeta Internacional
                      </span>
                    </div>
                    <ExternalLink className="w-5 h-5 flex-shrink-0 text-[#D4A373] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>

                {/* Required Access Note */}
                <div className="mt-6 pt-5 border-t border-[#F2EFE9]/10 text-center space-y-3">
                  <p className="font-serif text-sm sm:text-[0.95rem] text-[#E5E1D8] flex items-center justify-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#6BA8D9] flex-shrink-0" />
                    <span>Acceso automático por email al acreditarse el pago. Acceso de por vida.</span>
                  </p>

                  <p className="font-serif text-xs text-[#A8A39B]">
                    ¿Tenés alguna consulta antes de inscribirte?{' '}
                    <a
                      href={COURSE_CONFIG.linkWhatsappSoporte}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#6BA8D9] hover:text-[#8DC2EA] underline underline-offset-4 transition-colors"
                    >
                      Escribinos por WhatsApp
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

// ============================================================================
// 4. PANTALLA / MODAL DE CONFIRMACIÓN DE PAGO (?pago=aprobado)
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
          className="fixed inset-0 z-[120] bg-[#121417]/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="payment-approved-title"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl bg-[#23262A] border border-[#2B6592]/75 rounded-sm shadow-[0_30px_80px_rgba(0,0,0,0.65)] overflow-hidden text-[#F2EFE9]"
          >
            {/* Top accent bar */}
            <div className="h-1 w-full bg-gradient-to-r from-[#2B6592] via-[#6E4726] to-[#2B6592]" />

            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar confirmación"
              className="absolute top-4 right-4 p-2 text-[#A8A39B] hover:text-[#F2EFE9] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 sm:p-9 text-center">
              <div className="w-14 h-14 mx-auto mb-5 rounded-sm bg-[#2B6592]/20 border border-[#2B6592]/70 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-[#6BA8D9]" />
              </div>

              <p className="font-display text-xs uppercase tracking-[0.26em] text-[#6BA8D9] mb-2">
                Pago Aprobado · De Cero a Visteador
              </p>

              <h2
                id="payment-approved-title"
                className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-[0.06em] text-[#F2EFE9] leading-tight mb-4"
                style={{ textWrap: 'balance' }}
              >
                ¡Inscripción confirmada! Bienvenido a De Cero a Visteador.
              </h2>

              <p className="font-serif text-sm sm:text-base text-[#D8D3CA] leading-relaxed mb-5">
                En los próximos 2 minutos vas a recibir un correo automático con tu acceso al aula y el Libro Digital (revisá también las carpetas de Spam o Promociones).
              </p>

              <div className="bg-[#1C1E21] border border-[#6E4726]/85 rounded-sm px-4 py-3.5 mb-7 flex items-center justify-center gap-2.5 text-left sm:text-center">
                <Mail className="w-4 h-4 text-[#D4A373] flex-shrink-0" />
                <p className="font-display text-xs sm:text-sm uppercase tracking-[0.1em] text-[#F2EFE9]">
                  Importante: ingresá al aula desde una cuenta de Gmail.
                </p>
              </div>

              <div className="space-y-3">
                <a
                  href={COURSE_CONFIG.linkWhatsappSoporte}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 px-5 py-4 bg-[#2B6592] hover:bg-[#3475A8] text-[#F2EFE9] font-display text-xs sm:text-sm font-bold uppercase tracking-[0.12em] rounded-sm border border-[#6BA8D9]/45 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 flex-shrink-0" />
                  <span>¿No te llegó el mail o pagaste con otro correo? Escribinos por WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-3 font-display text-xs uppercase tracking-[0.2em] text-[#A8A39B] hover:text-[#F2EFE9] transition-colors cursor-pointer"
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

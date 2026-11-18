import React from 'react';
import { Compass, MessageCircle } from 'lucide-react';

interface FloatingCloserProps {
  onOpenModal: () => void;
}

const FloatingCloser: React.FC<FloatingCloserProps> = ({ onOpenModal }) => {
  const whatsappHref =
    'https://api.whatsapp.com/send?phone=5492216246179&text=' +
    encodeURIComponent(
      '¡Buenas y Santas! Quiero reservar mi Clase de Prueba (con equipo prestado incluido) o consultar horarios.'
    );

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-8 z-[65] flex items-center gap-2.5">
      {/* GPS Nearest Sede & Trial Class Button */}
      <button
        onClick={onOpenModal}
        className="group flex items-center gap-2.5 px-4 py-3 md:px-5 md:py-3.5 bg-void/95 backdrop-blur-md border border-gold/50 hover:border-gold text-gold hover:bg-gold hover:text-void transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.85)] rounded-sm cursor-pointer"
        title="Encontrar mi sede más cercana y reservar clase de prueba"
      >
        <Compass className="w-4 h-4 text-gold group-hover:text-void transition-colors animate-pulse" />
        <div className="flex flex-col items-start text-left leading-none">
          <span className="font-display text-[0.6rem] md:text-[0.65rem] font-black tracking-[0.2em] uppercase">
            Clase de Prueba
          </span>
          <span className="font-serif italic text-[0.6rem] text-stone-400 group-hover:text-void/80 hidden sm:inline mt-0.5">
            Buscador GPS • Equipo incluido
          </span>
        </div>
      </button>

      {/* Direct WhatsApp Button */}
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2 px-4 py-3 md:px-5 md:py-3.5 bg-[#1f7a4c] hover:bg-[#18633d] text-white border border-emerald-400/30 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.85)] rounded-sm"
        title="Escribir por WhatsApp directo"
      >
        <MessageCircle className="w-4 h-4 fill-current" />
        <div className="flex flex-col items-start text-left leading-none">
          <span className="font-display text-[0.6rem] md:text-[0.65rem] font-black tracking-[0.2em] uppercase">
            WhatsApp
          </span>
          <span className="font-serif italic text-[0.6rem] text-emerald-100/90 hidden sm:inline mt-0.5">
            Respuesta directa
          </span>
        </div>
      </a>
    </div>
  );
};

export default FloatingCloser;

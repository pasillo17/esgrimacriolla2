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
    <div
      className="fixed bottom-3 right-3 sm:bottom-6 sm:right-6 z-[65] flex items-center gap-2"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      {/* GPS Nearest Sede & Trial Class Button */}
      <button
        type="button"
        onClick={onOpenModal}
        className="group min-h-[44px] flex items-center gap-2 px-3.5 py-2.5 sm:px-5 sm:py-3 bg-void/95 backdrop-blur-md border border-gold/55 hover:border-gold text-gold hover:bg-gold hover:text-void transition-all duration-200 shadow-[0_10px_28px_rgba(0,0,0,0.8)] rounded-sm cursor-pointer whitespace-nowrap"
        title="Encontrar mi sede más cercana y reservar clase de prueba"
      >
        <Compass className="w-4 h-4 text-gold group-hover:text-void transition-colors shrink-0" />
        <div className="flex flex-col items-start text-left leading-none">
          <span className="font-display text-[0.65rem] font-black tracking-[0.16em] uppercase">
            Clase de Prueba
          </span>
          <span className="font-serif italic text-[0.62rem] text-stone-400 group-hover:text-void/80 hidden sm:inline mt-0.5">
            Buscador GPS · Equipo incluido
          </span>
        </div>
      </button>

      {/* Direct WhatsApp Button */}
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="group min-h-[44px] flex items-center gap-2 px-3.5 py-2.5 sm:px-5 sm:py-3 bg-[#1f7a4c] hover:bg-[#18633d] text-white border border-emerald-400/30 transition-all duration-200 shadow-[0_10px_28px_rgba(0,0,0,0.8)] rounded-sm whitespace-nowrap"
        title="Escribir por WhatsApp directo"
      >
        <MessageCircle className="w-4 h-4 fill-current shrink-0" />
        <div className="flex flex-col items-start text-left leading-none">
          <span className="font-display text-[0.65rem] font-black tracking-[0.16em] uppercase">
            WhatsApp
          </span>
          <span className="font-serif italic text-[0.62rem] text-emerald-100/90 hidden sm:inline mt-0.5">
            Respuesta directa
          </span>
        </div>
      </a>
    </div>
  );
};

export default FloatingCloser;

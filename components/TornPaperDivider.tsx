import React from 'react';

interface TornPaperEdgeProps {
  position?: 'top' | 'bottom';
  fillClass?: string;
  flip?: boolean;
  className?: string;
}

/**
 * Renders a multi-layered hand-torn parchment/leather edge ("papel roto gaucho")
 * with an aged brass/burnt-sepia deckle under-layer and deep drop shadow.
 */
export const TornPaperEdge: React.FC<TornPaperEdgeProps> = ({
  position = 'bottom',
  fillClass = 'text-void',
  flip = false,
  className = '',
}) => {
  const isTop = position === 'top';

  return (
    <div
      aria-hidden="true"
      className={`w-full overflow-hidden leading-none pointer-events-none select-none z-20 ${fillClass} ${
        isTop ? 'rotate-180 -mt-px' : '-mb-px'
      } ${flip ? 'scale-x-[-1]' : ''} ${className}`}
    >
      <svg
        viewBox="0 0 1440 54"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="w-full h-6 sm:h-9 md:h-12 drop-shadow-[0_-6px_12px_rgba(0,0,0,0.85)]"
      >
        {/* Aged Burnt Deckle / Brass Fiber Sub-Layer */}
        <path
          d="M0,26 L28,14 L54,25 L88,10 L118,22 L152,8 L189,24 L224,12 L262,27 L298,9 L335,21 L374,6 L412,24 L448,13 L489,28 L526,10 L568,23 L609,7 L646,24 L688,11 L725,26 L764,8 L802,22 L842,10 L881,27 L919,12 L958,24 L996,7 L1035,23 L1076,11 L1115,26 L1154,9 L1194,22 L1235,8 L1276,25 L1318,12 L1358,24 L1398,10 L1440,22 L1440,54 L0,54 Z"
          fill="rgb(var(--color-gold) / 0.28)"
        />
        {/* Secondary Charred Umber Tear Layer */}
        <path
          d="M0,31 L32,19 L61,29 L94,15 L126,27 L160,14 L196,28 L231,17 L270,31 L306,15 L342,26 L381,12 L419,29 L456,18 L496,32 L534,16 L575,28 L616,13 L654,29 L695,17 L732,31 L771,14 L810,27 L849,16 L888,31 L926,18 L965,29 L1004,13 L1042,28 L1083,17 L1122,31 L1161,15 L1201,27 L1242,14 L1283,29 L1325,17 L1365,28 L1404,15 L1440,27 L1440,54 L0,54 Z"
          fill="rgba(42, 24, 12, 0.85)"
        />
        {/* Primary Torn Surface Layer */}
        <path
          d="M0,35 L35,23 L65,33 L98,19 L131,31 L165,18 L201,32 L236,21 L275,35 L311,19 L348,30 L386,16 L425,33 L461,22 L501,36 L539,20 L580,32 L621,17 L659,33 L700,21 L738,35 L776,18 L815,31 L854,20 L893,35 L931,22 L970,33 L1009,17 L1048,32 L1088,21 L1127,35 L1166,19 L1206,31 L1247,18 L1288,33 L1330,21 L1370,32 L1409,19 L1440,31 L1440,54 L0,54 Z"
          className="fill-current"
        />
      </svg>
    </div>
  );
};

/**
 * Complex Gaucho Heritage background ornament (Platería Criolla Rosette & Estancia Compass)
 */
export const GauchoWatermark: React.FC<{ variant?: 'rosette' | 'compass' | 'guarda'; className?: string }> = ({
  variant = 'rosette',
  className = '',
}) => {
  if (variant === 'compass') {
    return (
      <svg
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className={`pointer-events-none select-none ${className}`}
      >
        <circle cx="200" cy="200" r="185" stroke="rgb(var(--color-gold))" strokeWidth="0.75" strokeDasharray="4 6" />
        <circle cx="200" cy="200" r="160" stroke="rgb(var(--color-gold))" strokeWidth="0.5" />
        <circle cx="200" cy="200" r="120" stroke="rgb(var(--color-gold))" strokeWidth="0.75" strokeDasharray="2 4" />
        <circle cx="200" cy="200" r="75" stroke="rgb(var(--color-gold))" strokeWidth="0.5" />
        {/* Compass Points */}
        <path
          d="M200 10 L216 184 L390 200 L216 216 L200 390 L184 216 L10 200 L184 184 Z"
          stroke="rgb(var(--color-gold))"
          strokeWidth="0.8"
        />
        <path
          d="M66 66 L190 178 L334 66 L222 190 L334 334 L210 222 L66 334 L178 210 Z"
          stroke="rgb(var(--color-gold))"
          strokeWidth="0.5"
        />
        {/* Pampa Stepped Diamond Center */}
        <path
          d="M185 165 H215 V180 H230 V220 H215 V235 H185 V220 H170 V180 H185 Z"
          stroke="rgb(var(--color-gold))"
          strokeWidth="1"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={`pointer-events-none select-none ${className}`}
    >
      <circle cx="200" cy="200" r="190" stroke="rgb(var(--color-gold))" strokeWidth="0.75" strokeDasharray="6 4" />
      <circle cx="200" cy="200" r="165" stroke="rgb(var(--color-gold))" strokeWidth="1" />
      <circle cx="200" cy="200" r="135" stroke="rgb(var(--color-gold))" strokeWidth="0.5" />
      {/* Platería Criolla Stepped Pampa Cross */}
      <path
        d="M175 40 H225 V80 H265 V120 H305 V160 H360 V240 H305 V280 H265 V320 H225 V360 H175 V320 H135 V280 H95 V240 H40 V160 H95 V120 H135 V80 H175 Z"
        stroke="rgb(var(--color-gold))"
        strokeWidth="0.9"
      />
      <rect x="115" y="115" width="170" height="170" transform="rotate(45 200 200)" stroke="rgb(var(--color-gold))" strokeWidth="0.6" />
      <rect x="115" y="115" width="170" height="170" stroke="rgb(var(--color-gold))" strokeWidth="0.6" />
    </svg>
  );
};

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Truck, CreditCard, Check } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';

interface MerchProps {
  onBack: () => void;
}

const SIZE_GUIDE: Record<string, string> = {
  S: 'Ancho 50 cm × Largo 68 cm',
  M: 'Ancho 53 cm × Largo 71 cm',
  L: 'Ancho 56 cm × Largo 74 cm',
  XL: 'Ancho 59 cm × Largo 77 cm'
};

const PRODUCTS = [
  {
    id: 1,
    name: 'Remera "Juan Moreira"',
    edition: 'AZUL CRIOLLO',
    price: '$32.000 ARS',
    images: [
      'https://i.imgur.com/02WkVzL.jpeg',
      'https://i.imgur.com/lglJcJo.jpeg',
      'https://i.imgur.com/Yf8taGR.jpeg'
    ],
    description:
      'Tributo al mítico gaucho matrero de nuestra historia. Confeccionada en algodón peinado premium de alto gramaje, ideal tanto para el entrenamiento en pedana como para vestir con orgullo criollo todos los días.',
    sizes: ['S', 'M', 'L', 'XL'],
    link: 'https://www.mercadolibre.com.ar/up/MLAU4371625525?matt_tool=89488245&pdp_filters=item_id:MLA1911337643&ua=f9wi8yv9-uf6jrKmMMhKkEaf6m_60DSd4t79pf_r0weR0iWv#origin=share&sid=share&wid=MLA1911337643&action=copy',
    code: 'IND-001 · CONFECCIÓN OFICIAL',
    specs: [
      'Algodón 100% Peinado 24/1 Premium',
      'Estampa serigráfica de alta resistencia',
      'Costuras reforzadas para entrenamiento'
    ],
    stockLabel: 'EDICIÓN LIMITADA'
  },
  {
    id: 2,
    name: 'Remera "Juan Moreira"',
    edition: 'ROSA PAMPA',
    price: '$32.000 ARS',
    images: [
      'https://i.imgur.com/tymB2sh.jpeg',
      'https://i.imgur.com/S7C7L6r.jpeg'
    ],
    description:
      'Diseño exclusivo de la Academia Buenas y Santas con arte ilustrado de época. Calce cómodo, tela respirable y terminación suave al tacto con despacho inmediato a todo el país.',
    sizes: ['S', 'M', 'L', 'XL'],
    link: 'https://www.mercadolibre.com.ar/up/MLAU4371625525?matt_tool=89488245&pdp_filters=item_id:MLA1911337643&ua=f9wi8yv9-uf6jrKmMMhKkEaf6m_60DSd4t79pf_r0weR0iWv#origin=share&sid=share&wid=MLA1911337643&action=copy',
    code: 'IND-002 · CONFECCIÓN OFICIAL',
    specs: [
      'Algodón 100% Peinado 24/1 Premium',
      'Arte exclusivo Juan Moreira al dorso y frente',
      'Envío rápido por Mercado Envíos'
    ],
    stockLabel: 'TIRADA LIMITADA'
  }
];

const ProductGallery: React.FC<{ images: string[]; alt: string }> = ({ images, alt }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="absolute inset-0 w-full h-full">
      <AnimatePresence initial={false} mode="wait">
        <motion.img
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          src={images[currentIndex]}
          alt={`${alt} - vista ${currentIndex + 1}`}
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover filter sepia-[0.2] contrast-115 brightness-95 group-hover:scale-110 transition-transform duration-1000 ease-out"
        />
      </AnimatePresence>
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              aria-label={`Ver imagen ${i + 1}`}
              className={`w-2 h-2 rounded-full transition-colors cursor-pointer ${
                i === currentIndex ? 'bg-gold' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const Merch: React.FC<MerchProps> = ({ onBack }) => {
  const [selectedSizes, setSelectedSizes] = useState<Record<number, string>>({
    1: 'L',
    2: 'M'
  });

  const handleSizeSelect = (productId: number, size: string) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }));
  };

  return (
    <div className="min-h-screen bg-void text-stone-300 selection:bg-gold selection:text-void paper-texture pt-28 pb-24 overflow-x-hidden relative">
      <div className="fixed inset-0 pointer-events-none z-40 bg-grain opacity-5 mix-blend-overlay"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <RevealOnScroll>
          <div className="flex flex-col items-center mb-10 md:mb-16 text-center mx-auto">
            <button
              onClick={onBack}
              className="mb-8 group flex items-center gap-2 text-stone-400 hover:text-gold transition-colors cursor-pointer"
            >
              <span className="material-icons-outlined text-sm group-hover:-translate-x-1 transition-transform">
                arrow_back
              </span>
              <span className="text-xs font-display font-bold uppercase tracking-[0.25em]">
                Volver al Inicio
              </span>
            </button>

            <h2 className="font-display text-3xl sm:text-4xl md:text-6xl text-stone-100 tracking-[0.2em] uppercase mb-4 text-center w-full text-glow-white leading-tight font-bold">
              Tienda Oficial
            </h2>
            <div className="flex items-center justify-center gap-4 w-full mb-10">
              <div className="h-px bg-gold/40 w-10 md:w-16"></div>
              <p className="text-[0.55rem] md:text-[0.65rem] text-gold tracking-[0.4em] md:tracking-[0.5em] uppercase font-bold text-center text-glow-gold">
                Indumentaria de Esgrima Criolla
              </p>
              <div className="h-px bg-gold/40 w-10 md:w-16"></div>
            </div>

            {/* Clean Guarantee Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-4xl bg-card-depth border border-gold/20 p-5 rounded-sm shadow-xl">
              <div className="flex items-center justify-center gap-2.5 text-xs font-display uppercase tracking-[0.18em] text-stone-200">
                <ShieldCheck className="w-4 h-4 text-gold flex-shrink-0" />
                <span>Compra Protegida Mercado Libre</span>
              </div>
              <div className="flex items-center justify-center gap-2.5 text-xs font-display uppercase tracking-[0.18em] text-stone-200 border-y sm:border-y-0 sm:border-x border-gold/15 py-2 sm:py-0">
                <Truck className="w-4 h-4 text-gold flex-shrink-0" />
                <span>Envíos a Todo el País</span>
              </div>
              <div className="flex items-center justify-center gap-2.5 text-xs font-display uppercase tracking-[0.18em] text-stone-200">
                <CreditCard className="w-4 h-4 text-gold flex-shrink-0" />
                <span>Algodón Peinado 24/1 Premium</span>
              </div>
            </div>
          </div>
        </RevealOnScroll>

        <div className="relative w-[100vw] left-1/2 -translate-x-1/2 mb-12 md:mb-20">
          <div className="guardapampa-divider opacity-80 animate-guardapampa"></div>
        </div>

        <div className="flex flex-col gap-16 md:gap-32 max-w-6xl mx-auto px-4 sm:px-6">
          {PRODUCTS.map((product, idx) => {
            const currentSize = selectedSizes[product.id] || 'L';

            return (
              <RevealOnScroll key={product.id} delay={100}>
                <div
                  className={`relative flex flex-col ${
                    idx % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'
                  } items-center gap-8 md:gap-14 group p-5 md:p-0 border border-gold/20 md:border-none bg-card-depth/70 md:bg-transparent shadow-2xl md:shadow-none rounded-sm`}
                >
                  {/* Product Image Container */}
                  <div className="relative w-full md:w-3/5 aspect-[4/5] md:aspect-square overflow-hidden border border-gold/25 shadow-2xl z-10 rounded-sm bg-black">
                    <ProductGallery images={product.images} alt={product.name} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent md:hidden opacity-50"></div>

                    {product.stockLabel && (
                      <div className="absolute top-6 left-6 z-30">
                        <span className="bg-gold text-void text-[0.6rem] md:text-xs font-display font-black px-3.5 py-1.5 uppercase tracking-[0.25em] rounded-sm">
                          {product.stockLabel}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Product Details Card */}
                  <div className="relative w-full md:w-2/5 z-20 self-center bg-card-depth border border-gold/20 p-6 sm:p-8 md:p-10 rounded-sm text-left shadow-2xl">
                    <div className="flex flex-wrap justify-between items-center gap-2 pb-4 mb-5 border-b border-gold/15">
                      <span className="font-display text-[0.6rem] tracking-[0.3em] text-gold uppercase font-bold">
                        {product.code}
                      </span>
                      <span className="font-display text-[0.55rem] tracking-[0.25em] text-stone-400 uppercase">
                        {product.edition}
                      </span>
                    </div>

                    <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl uppercase tracking-[0.12em] mb-2 leading-tight text-stone-100 font-bold">
                      {product.name}
                    </h3>

                    <span className="block font-display text-2xl md:text-3xl text-gold tracking-widest font-bold mb-5">
                      {product.price}
                    </span>

                    <p className="font-serif text-stone-300 text-sm leading-relaxed mb-6 italic">
                      {product.description}
                    </p>

                    <div className="space-y-2 mb-6 border-y border-gold/15 py-4">
                      {product.specs.map((spec, i) => (
                        <div key={i} className="flex items-center gap-2.5">
                          <Check className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                          <span className="font-display text-[0.65rem] uppercase tracking-[0.18em] text-stone-300">
                            {spec}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Interactive Size Selector */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2.5">
                        <span className="font-display text-xs uppercase tracking-[0.2em] text-stone-200 font-bold">
                          Talle: <span className="text-gold">{currentSize}</span>
                        </span>
                        <span className="font-serif italic text-xs text-stone-400">
                          {SIZE_GUIDE[currentSize]}
                        </span>
                      </div>

                      <div className="grid grid-cols-4 gap-2">
                        {product.sizes.map((size) => {
                          const isSelected = currentSize === size;
                          return (
                            <button
                              key={size}
                              type="button"
                              onClick={() => handleSizeSelect(product.id, size)}
                              className={`py-2.5 font-display text-xs font-black uppercase tracking-[0.2em] border transition-all rounded-sm cursor-pointer ${
                                isSelected
                                  ? 'bg-gold text-void border-gold shadow-[0_0_15px_rgba(212,170,106,0.4)]'
                                  : 'bg-void/70 text-stone-300 border-gold/25 hover:border-gold/60 hover:text-gold'
                              }`}
                            >
                              {size}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <a
                      href={product.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative overflow-hidden w-full py-4 md:py-5 bg-gold text-void font-display font-black text-xs md:text-sm uppercase tracking-[0.22em] hover:bg-stone-100 transition-colors flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(212,170,106,0.25)] group/btn rounded-sm"
                    >
                      <span className="relative z-10">Comprar Talle {currentSize} en Mercado Libre</span>
                      <span className="material-icons-outlined relative z-10 group-hover/btn:translate-x-2 transition-transform">
                        shopping_cart
                      </span>
                    </a>
                  </div>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>

        {/* Coming Soon Text */}
        <RevealOnScroll delay={300}>
          <div className="max-w-3xl mx-auto mt-24 mb-12 text-center relative">
            <h3 className="font-serif italic text-xl md:text-3xl text-stone-300 leading-relaxed font-light">
              Próximamente más remeras, artículos y libros de esta disciplina gaucha...
            </h3>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
};

export default Merch;

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import RevealOnScroll from './RevealOnScroll';

interface MerchProps {
  onBack: () => void;
}

const PRODUCTS = [
  {
    id: 1,
    name: 'Remera "Juan Moreira"',
    price: '4.000',
    images: [
      'https://i.imgur.com/Yf8taGR.jpeg',
      'https://i.imgur.com/lglJcJo.jpeg',
      'https://i.imgur.com/02WkVzL.jpeg'
    ],
    description: 'Algodón 100% peinado. Estampa exclusiva de Juan Moreira. Ideal para entrenamiento ligero o uso casual.',
    sizes: ['S', 'M', 'L', 'XL'],
    link: 'https://www.mercadolibre.com.ar',
    code: 'IND-001',
    specs: ['Algodón 24/1', 'Estampa Serigrafía', 'Corte Regular'],
    stockLabel: 'NUEVO INGRESO'
  },
  {
    id: 5,
    name: 'Remera "Guardapampa"',
    price: '$24.000',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=2000&auto=format&fit=crop',
    description: 'Nuestra clásica remera de entrenamiento con detalles de guardapampa en las mangas. Resistencia y tradición.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    link: 'https://www.mercadolibre.com.ar',
    code: 'IND-002',
    specs: ['Algodón 24/1', 'Detalles Bordados', 'Corte Deportivo'],
    stockLabel: 'NUEVO INGRESO'
  }
];


const ProductGallery: React.FC<{ images: string[], alt: string }> = ({ images, alt }) => {
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
          className="absolute inset-0 w-full h-full object-cover filter sepia-[0.3] contrast-125 brightness-90 group-hover:scale-110 transition-transform duration-1000 ease-out"
        />
      </AnimatePresence>
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
          {images.map((_, i) => (
            <div key={i} className={`w-1.5 h-1.5 rounded-full transition-colors ${i === currentIndex ? 'bg-gold' : 'bg-white/30'}`} />
          ))}
        </div>
      )}
    </div>
  );
};

const Merch: React.FC<MerchProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-void text-stone-300 selection:bg-gold selection:text-void paper-texture pt-24 pb-12 overflow-x-hidden">
      {/* Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none z-40 bg-grain opacity-5 mix-blend-overlay"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <RevealOnScroll>
          <div className="flex flex-col items-center mb-10 md:mb-16 text-center mx-auto">
            <button 
              onClick={onBack} 
              className="mb-8 group flex items-center gap-2 text-stone-500 hover:text-gold transition-colors"
            >
              <span className="material-icons-outlined text-sm group-hover:-translate-x-1 transition-transform">arrow_back</span>
              <span className="text-xs font-display font-bold uppercase tracking-[0.2em]">Volver al Inicio</span>
            </button>
            
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-stone-100 tracking-[0.15em] md:tracking-[0.2em] uppercase mb-4 text-center w-full text-glow-white leading-tight">
              Conseguí tus <br className="md:hidden" /> Remeras
            </h2>
            <div className="flex items-center justify-center gap-4 w-full mb-12">
              <div className="h-px bg-gold/30 w-8 md:w-12"></div>
              <p className="text-[0.5rem] md:text-[0.6rem] text-gold tracking-[0.4em] md:tracking-[0.5em] uppercase font-bold text-center text-glow-gold">De Esgrima Criolla</p>
              <div className="h-px bg-gold/30 w-8 md:w-12"></div>
            </div>
          </div>
        </RevealOnScroll>
        
        <div className="relative w-[100vw] left-1/2 -translate-x-1/2 mb-12 md:mb-16">
          <div className="guardapampa-divider opacity-80 animate-guardapampa"></div>
        </div>

        <div className="flex flex-col gap-12 md:gap-32 max-w-6xl mx-auto px-4 sm:px-6">
          {PRODUCTS.map((product, idx) => (
            <RevealOnScroll key={product.id} delay={100}>
              <div className={`relative flex flex-col ${idx % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-6 md:gap-16 group p-5 md:p-0 border border-gold/20 md:border-none bg-void/80 md:bg-transparent shadow-2xl md:shadow-none rounded-sm`}>
                
                {/* Immersive Image Container */}
                <div className="relative w-full md:w-3/5 aspect-[4/5] md:aspect-square overflow-hidden border border-gold/20 shadow-2xl z-10 rounded-sm">
                  {product.images ? (
                    <ProductGallery images={product.images} alt={product.name} />
                  ) : (
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="absolute inset-0 w-full h-full object-cover filter sepia-[0.3] contrast-125 brightness-90 group-hover:scale-110 transition-transform duration-1000 ease-out"
                    />
                  )}
                  {/* Aggressive Overlay for Mobile */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent md:hidden opacity-50"></div>
                  <div className="absolute inset-0 bg-gold/5 mix-blend-overlay group-hover:bg-transparent transition-colors duration-700"></div>
                  
                  {product.stockLabel && (
                     <div className="absolute top-4 md:top-6 right-4 md:right-auto md:left-6 z-20">
                        <span className="bg-gold text-void text-[0.6rem] md:text-xs font-display font-black px-3 py-1.5 uppercase tracking-[0.3em] shadow-[0_0_20px_rgba(197,160,101,0.4)]">
                          {product.stockLabel}
                        </span>
                     </div>
                  )}
                  
                  {/* Giant Background Number for "alocado" feel - Hidden on mobile for cleaner look */}
                  <div className="hidden md:block absolute -bottom-10 -right-10 md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:left-1/2 md:-translate-x-1/2 font-display text-[15rem] md:text-[25rem] font-bold text-white/[0.04] select-none pointer-events-none z-0 mix-blend-overlay">
                    0{idx + 1}
                  </div>
                </div>
                
                {/* Content Card */}
                <div className="relative w-full md:w-2/5 md:-mt-0 z-20 self-center md:bg-void/95 md:backdrop-blur-xl md:border md:border-gold/10 md:p-8 md:shadow-2xl rounded-sm text-center md:text-left">
                  
                  <div className="hidden md:flex flex-row justify-between items-center mb-6">
                     <span className="font-display text-[0.6rem] md:text-xs tracking-[0.4em] text-gold uppercase border-b border-gold/30 pb-1">{product.code}</span>
                  </div>
                  
                  <h3 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-5xl uppercase tracking-[0.1em] mb-1 md:mb-4 leading-[1.2] md:leading-[1.1]">
                    {product.name.split(' ').map((word, i) => (
                        <span key={i} className={i === 0 ? "text-stone-100 text-glow-white mr-2 md:block md:mr-0 md:text-gold md:text-glow-gold md:mb-1" : "text-gold text-glow-gold mr-2 md:block md:mr-0 md:text-stone-100 md:text-glow-white"}>
                          {word.replace(/["']/g, '')}
                        </span>
                    ))}
                  </h3>
                  
                  <span className="block font-display text-lg sm:text-xl md:text-3xl text-stone-300 tracking-widest font-bold mb-4 md:mb-6">
                    {product.price}
                  </span>
                  
                  <p className="hidden md:block font-serif text-stone-400 text-sm md:text-base italic mb-8 leading-relaxed">
                    {product.description}
                  </p>

                  <div className="hidden md:block space-y-3 mb-10">
                    {product.specs?.map((spec, i) => (
                      <div key={i} className="flex items-center gap-4">
                         <div className="w-1.5 h-1.5 bg-gold rotate-45 flex-shrink-0"></div>
                         <span className="font-display text-[0.65rem] md:text-xs uppercase tracking-[0.2em] text-stone-400">{spec}</span>
                      </div>
                    ))}
                  </div>

                  <a 
                    href={product.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative overflow-hidden w-full sm:w-4/5 md:w-full mx-auto md:mx-0 py-3 md:py-5 bg-gold text-void font-display font-black text-[0.65rem] sm:text-xs md:text-sm uppercase tracking-[0.2em] md:tracking-[0.3em] hover:bg-stone-100 transition-colors flex flex-wrap items-center justify-center gap-2 shadow-[0_0_30px_rgba(197,160,101,0.2)] group/btn rounded-sm"
                  >
                    <span className="relative z-10 hidden md:block">Comprar Ahora</span>
                    <span className="relative z-10 flex md:hidden items-center gap-2">
                      Adquirir por
                      <img src="https://http2.mlstatic.com/frontend-assets/ml-web-navigation/ui-navigation/5.21.22/mercadolibre/logo__small.png" alt="Mercado Libre" className="h-2.5 sm:h-3 w-auto filter grayscale opacity-90 mix-blend-multiply ml-1" />
                    </span>
                    <span className="material-icons-outlined relative z-10 group-hover/btn:translate-x-2 transition-transform hidden md:block">shopping_cart</span>
                  </a>
                </div>

              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Merch;

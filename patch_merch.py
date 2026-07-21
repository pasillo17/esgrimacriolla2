import re

with open('components/Merch.tsx', 'r') as f:
    content = f.read()

content = content.replace("import React from 'react';", "import React, { useState, useEffect } from 'react';\nimport { motion, AnimatePresence } from 'motion/react';")

new_products = """const PRODUCTS = [
  {
    id: 1,
    name: 'Remera "Juan Moreira"',
    price: '$24.000',
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
  },"""

content = re.sub(r"const PRODUCTS = \[\s*\{\s*id: 1,.*?stockLabel: 'ÚLTIMAS 12 UNIDADES'\s*\},", new_products, content, flags=re.DOTALL)

gallery_component = """
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
"""

content = content.replace('const Merch: React.FC<MerchProps> = ({ onBack }) => {', gallery_component + '\nconst Merch: React.FC<MerchProps> = ({ onBack }) => {')

img_tag = """                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover filter sepia-[0.3] contrast-125 brightness-90 group-hover:scale-110 transition-transform duration-1000 ease-out"
                  />"""

new_img_tag = """                  {product.images ? (
                    <ProductGallery images={product.images} alt={product.name} />
                  ) : (
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="absolute inset-0 w-full h-full object-cover filter sepia-[0.3] contrast-125 brightness-90 group-hover:scale-110 transition-transform duration-1000 ease-out"
                    />
                  )}"""

content = content.replace(img_tag, new_img_tag)

with open('components/Merch.tsx', 'w') as f:
    f.write(content)

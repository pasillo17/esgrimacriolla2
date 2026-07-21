import re

# Update Merch.tsx
with open('components/Merch.tsx', 'r') as f:
    merch = f.read()

new_products = """const PRODUCTS = [
  {
    id: 1,
    name: 'Remera "Juan Moreira"',
    price: '$24.000',
    images: [
      'https://i.imgur.com/02WkVzL.jpeg',
      'https://i.imgur.com/lglJcJo.jpeg',
      'https://i.imgur.com/Yf8taGR.jpeg'
    ],
    description: 'Algodón 100% peinado. Estampa exclusiva de Juan Moreira. Ideal para entrenamiento ligero o uso casual.',
    sizes: ['S', 'M', 'L', 'XL'],
    link: 'https://www.mercadolibre.com.ar',
    code: 'IND-001',
    specs: ['Algodón 24/1', 'Estampa Serigrafía', 'Corte Regular'],
    stockLabel: 'NUEVO INGRESO',
    colorClass: 'text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]'
  },
  {
    id: 2,
    name: 'Remera "Juan Moreira"',
    price: '$24.000',
    images: [
      'https://i.imgur.com/tymB2sh.jpeg',
      'https://i.imgur.com/S7C7L6r.jpeg'
    ],
    description: 'Algodón 100% peinado. Estampa exclusiva de Juan Moreira en tonos rosa. Ideal para entrenamiento o uso casual.',
    sizes: ['S', 'M', 'L', 'XL'],
    link: 'https://www.mercadolibre.com.ar',
    code: 'IND-002',
    specs: ['Algodón 24/1', 'Estampa Serigrafía', 'Corte Regular'],
    stockLabel: 'NUEVO INGRESO',
    colorClass: 'text-pink-400 drop-shadow-[0_0_10px_rgba(244,114,182,0.5)]'
  },
  {
    id: 3,
    name: 'Próximamente',
    price: '-',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=2000&auto=format&fit=crop'
    ],
    description: 'Estamos diseñando nueva indumentaria y equipamiento. ¡Mantenete atento a las novedades!',
    sizes: [],
    link: '#',
    code: 'IND-PROX',
    specs: [],
    stockLabel: 'MUY PRONTO',
    colorClass: 'text-stone-300 drop-shadow-[0_0_10px_rgba(214,211,209,0.5)]'
  }
];"""

# Replace PRODUCTS
merch = re.sub(r'const PRODUCTS = \[.*?\];', new_products, merch, flags=re.DOTALL)

# Replace rendering logic for title
old_title_render = r"\{product\.name\.split\(' '\)\.map\(\(word, i\) => \(\s*<span key=\{i\}.*?>\s*\{word\.replace\(/\[\"'\]/g, ''\)\}\s*</span>\s*\)\)\}"

new_title_render = "{product.name.replace(/[\"']/g, '')}"

merch = re.sub(old_title_render, new_title_render, merch, flags=re.DOTALL)

# Update h3 class for colorClass
merch = re.sub(
    r'<h3 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-5xl uppercase tracking-\[0\.1em\] mb-1 md:mb-4 leading-\[1\.2\] md:leading-\[1\.1\]">',
    r'<h3 className={`font-display text-xl sm:text-2xl md:text-3xl lg:text-5xl uppercase tracking-[0.1em] mb-1 md:mb-4 leading-[1.2] md:leading-[1.1] ${product.colorClass || "text-stone-100"}`}>',
    merch
)

# Fix product.images logic for map
merch = merch.replace('product.images ?', '(product.images && product.images.length > 0) ?')
# Also remove fallback to product.image as we just use product.images now (except for the 3rd which has 1 element in array). 
# Wait, product 3 has 1 image array.
merch = merch.replace('product.image', 'product.images[0]')

with open('components/Merch.tsx', 'w') as f:
    f.write(merch)

# Update Sedes.tsx
with open('components/Sedes.tsx', 'r') as f:
    sedes = f.read()

sedes = sedes.replace(
    "'https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=2069&auto=format&fit=crop'",
    "'https://www.lanus.gob.ar/storage/fichas/imagenes/whatsapp-image-2024-09-24-at-51236-pm-Dlg7w.jpeg'"
)

with open('components/Sedes.tsx', 'w') as f:
    f.write(sedes)


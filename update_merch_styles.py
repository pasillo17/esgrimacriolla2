import re

with open('components/Merch.tsx', 'r') as f:
    merch = f.read()

# Update the PRODUCTS array
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
    highlightColor: '#0852ce'
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
    highlightColor: '#f472b6'
  },
  {
    id: 3,
    name: 'Próximamente',
    price: '-',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=2000&auto=format&fit=crop'
    ],
    description: 'Próximamente más remeras, artículos y libros de esta disciplina gaucha...',
    sizes: [],
    link: '#',
    code: 'IND-PROX',
    specs: [],
    stockLabel: 'MUY PRONTO'
  }
];"""

merch = re.sub(r'const PRODUCTS = \[.*?\];', new_products, merch, flags=re.DOTALL)

# Update rendering of h3
old_h3 = r'<h3 className=\{`font-display text-xl sm:text-2xl md:text-3xl lg:text-5xl uppercase tracking-\[0\.1em\] mb-1 md:mb-4 leading-\[1\.2\] md:leading-\[1\.1\] \$\{product\.colorClass \|\| "text-stone-100"\}\`\}>\s*\{product\.name\.replace\(\/\["\'\]/g, \'\'\)\}\s*</h3>'

new_h3 = """<h3 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-5xl uppercase tracking-[0.1em] mb-1 md:mb-4 leading-[1.2] md:leading-[1.1] text-stone-100">
                    {product.name.replace(/["']/g, '').split(' ').map((word, i) => {
                      if (product.highlightColor && word.toUpperCase() !== 'REMERA') {
                        return <span key={i} style={{ color: product.highlightColor, textShadow: `0 0 10px ${product.highlightColor}80` }}>{word} </span>;
                      }
                      return <span key={i} className="text-stone-100 text-glow-white">{word} </span>;
                    })}
                  </h3>"""

merch = re.sub(old_h3, new_h3, merch, flags=re.DOTALL)

with open('components/Merch.tsx', 'w') as f:
    f.write(merch)

import re

with open('components/Merch.tsx', 'r') as f:
    merch = f.read()

# Update PRODUCTS array (Remove description and product 3)
new_products = """const PRODUCTS = [
  {
    id: 1,
    name: 'Remera "Juan Moreira"',
    price: '$24.000 ARS',
    images: [
      'https://i.imgur.com/02WkVzL.jpeg',
      'https://i.imgur.com/lglJcJo.jpeg',
      'https://i.imgur.com/Yf8taGR.jpeg'
    ],
    description: '',
    sizes: ['S', 'M', 'L', 'XL'],
    link: 'https://www.mercadolibre.com.ar',
    code: 'IND-001',
    specs: [],
    stockLabel: 'NUEVO INGRESO',
    highlightColor: '#0852ce'
  },
  {
    id: 2,
    name: 'Remera "Juan Moreira"',
    price: '$24.000 ARS',
    images: [
      'https://i.imgur.com/tymB2sh.jpeg',
      'https://i.imgur.com/S7C7L6r.jpeg'
    ],
    description: '',
    sizes: ['S', 'M', 'L', 'XL'],
    link: 'https://www.mercadolibre.com.ar',
    code: 'IND-002',
    specs: [],
    stockLabel: 'NUEVO INGRESO',
    highlightColor: '#f472b6'
  }
];"""

merch = re.sub(r'const PRODUCTS = \[.*?\];', new_products, merch, flags=re.DOTALL)

# Let's see how the loop ends
# 214:           ))}
# 215:         </div>
# 216:       </div>

proximamente_html = """
          ))}
        </div>

        {/* Elegant Coming Soon Text */}
        <RevealOnScroll delay={300}>
          <div className="max-w-3xl mx-auto mt-24 mb-12 text-center relative">
            <div className="absolute left-1/2 -top-12 -translate-x-1/2 w-px h-8 bg-gradient-to-b from-transparent to-gold/50"></div>
            <h3 className="font-serif italic text-2xl md:text-4xl text-stone-300 leading-relaxed font-light">
              Próximamente más remeras, artículos y libros de esta disciplina gaucha...
            </h3>
            <div className="absolute left-1/2 -bottom-12 -translate-x-1/2 w-px h-8 bg-gradient-to-t from-transparent to-gold/50"></div>
          </div>
        </RevealOnScroll>

      </div>
    </div>
"""

merch = merch.replace('          ))}\n        </div>\n      </div>\n    </div>', proximamente_html)

# Clean up any description or specs rendering just to be safe, if description is empty it won't show anything visible, but let's hide the empty tags
merch = merch.replace('{product.description}', '{product.description && <>{product.description}</>}')

with open('components/Merch.tsx', 'w') as f:
    f.write(merch)

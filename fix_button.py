import re
with open('components/Merch.tsx', 'r') as f:
    merch = f.read()

# Make sure we don't show the button if product.link is '#'
old_button = r'<a\s+href=\{product\.link\}\s+target="_blank"\s+rel="noopener noreferrer".*?</a>'
new_button = """{product.link !== '#' && (
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
                  )}"""

merch = re.sub(old_button, new_button, merch, flags=re.DOTALL)

with open('components/Merch.tsx', 'w') as f:
    f.write(merch)

import re

with open('components/Merch.tsx', 'r') as f:
    merch = f.read()

old_specs = r'<div className="hidden md:block space-y-3 mb-10">\s*\{product\.specs\?\.map\(\(spec, i\) => \(\s*<div key=\{i\} className="flex items-center gap-4">\s*<div className="w-1\.5 h-1\.5 bg-gold rotate-45 flex-shrink-0"></div>\s*<span className="font-display text-\[0\.65rem\] md:text-xs uppercase tracking-\[0\.2em\] text-stone-400">\{spec\}</span>\s*</div>\s*\)\)\}\s*</div>'

new_specs = """{product.specs && product.specs.length > 0 && (
                  <div className="hidden md:block space-y-3 mb-10">
                    {product.specs.map((spec, i) => (
                      <div key={i} className="flex items-center gap-4">
                         <div className="w-1.5 h-1.5 bg-gold rotate-45 flex-shrink-0"></div>
                         <span className="font-display text-[0.65rem] md:text-xs uppercase tracking-[0.2em] text-stone-400">{spec}</span>
                      </div>
                    ))}
                  </div>
                  )}"""

merch = re.sub(old_specs, new_specs, merch, flags=re.DOTALL)

with open('components/Merch.tsx', 'w') as f:
    f.write(merch)

import re

with open('components/Merch.tsx', 'r') as f:
    merch = f.read()

old_desc = r'<p className="font-serif text-stone-400 text-sm md:text-base italic mb-8 leading-relaxed">\s*\{product\.description && <>\s*\{product\.description\}\s*</>\}\s*</p>'
new_desc = """{product.description && (
                  <p className="font-serif text-stone-400 text-sm md:text-base italic mb-8 leading-relaxed">
                    {product.description}
                  </p>
                  )}"""

merch = re.sub(old_desc, new_desc, merch, flags=re.DOTALL)

with open('components/Merch.tsx', 'w') as f:
    f.write(merch)

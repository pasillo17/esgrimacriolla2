import re

with open('components/Merch.tsx', 'r') as f:
    merch = f.read()

# I will just replace the h3 block completely
old_h3 = r'<h3 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-5xl uppercase tracking-\[0\.1em\] mb-1 md:mb-4 leading-\[1\.2\] md:leading-\[1\.1\] text-stone-100">\s*\{product\.name\.replace\(\/\["\'\]/g, \'\'\)\.split\(\' \'\)\.map\(\(word, i\) => \{\s*if \(product\.highlightColor && word\.toUpperCase\(\) !== \'REMERA\'\) \{\s*return <span key=\{i\} style=\{\{ color: product\.highlightColor \}\} className="drop-shadow-lg">\{word\} </span>;\s*\}\s*return <span key=\{i\}>\{word\} </span>;\s*\}\)\}\s*</h3>'

new_h3 = """<h3 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-5xl uppercase tracking-[0.1em] mb-1 md:mb-4 leading-[1.2] md:leading-[1.1] text-stone-100">
                    {product.name.replace(/["']/g, '').split(' ').map((word, i) => {
                      if (product.highlightColor && word.toUpperCase() !== 'REMERA') {
                        return <span key={i} style={{ color: product.highlightColor, textShadow: `0 0 10px ${product.highlightColor}80` }} className="drop-shadow-lg">{word} </span>;
                      }
                      return <span key={i} className="text-stone-100 text-glow-white">{word} </span>;
                    })}
                  </h3>"""

merch = re.sub(old_h3, new_h3, merch, flags=re.DOTALL)

with open('components/Merch.tsx', 'w') as f:
    f.write(merch)

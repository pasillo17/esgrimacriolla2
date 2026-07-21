with open('components/Merch.tsx', 'r') as f:
    merch = f.read()

merch = merch.replace('product.images[0]s', 'product.images')
merch = merch.replace('product.images[0] ?', '(product.images && product.images.length > 0) ?')

with open('components/Merch.tsx', 'w') as f:
    f.write(merch)

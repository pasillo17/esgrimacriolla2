import re

with open('components/Merch.tsx', 'r') as f:
    content = f.read()

# remove duplicate ProductGallery
content = re.sub(r'const ProductGallery: React\.FC<\{ images: string\[\], alt: string \}> = \(\{ images, alt \}\) => \{.*?\}\);\n\};', '', content, count=1, flags=re.DOTALL)

with open('components/Merch.tsx', 'w') as f:
    f.write(content)


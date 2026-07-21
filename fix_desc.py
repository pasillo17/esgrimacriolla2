import re
with open('components/Merch.tsx', 'r') as f:
    merch = f.read()

# Make description visible on mobile
merch = merch.replace('className="hidden md:block font-serif', 'className="font-serif')

with open('components/Merch.tsx', 'w') as f:
    f.write(merch)

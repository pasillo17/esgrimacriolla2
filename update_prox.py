with open('components/Merch.tsx', 'r') as f:
    merch = f.read()

merch = merch.replace("name: 'Próximamente',", "name: 'Próximamente más modelos...',")

with open('components/Merch.tsx', 'w') as f:
    f.write(merch)

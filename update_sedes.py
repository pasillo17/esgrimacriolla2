import re

with open('components/Sedes.tsx', 'r') as f:
    sedes = f.read()

# Update La Marca
sedes = sedes.replace(
    "'https://www.google.com/maps/search/?api=1&query=Morales+y+Albarracin,+Bariloche'",
    "'https://maps.app.goo.gl/wR2ccySjM5dXHowm7'"
)

# Update Poncho y Acero (mapUrl)
sedes = sedes.replace(
    "'https://www.google.com/maps/search/?api=1&query=Beschett+y+Moreno,+Bariloche'",
    "'https://maps.app.goo.gl/PFrZZNDaiDeYAAc19'"
)

# Update Poncho y Acero (instructor)
sedes = sedes.replace(
    "instructor: 'Inst. a confirmar',",
    "instructor: 'Inst. Walter Medel',"
)

with open('components/Sedes.tsx', 'w') as f:
    f.write(sedes)

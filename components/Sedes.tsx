import React from 'react';
import { ShieldCheck, MessageCircle } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';

interface SedesProps {
  onBack: () => void;
}

const LOCATIONS = [
  {
    id: 4,
    city: 'Lanús',
    name: 'Sede Zona Sur',
    address: 'Gym ESN, Enrique Fernández 2066',
    schedule: 'Mar y Jue 8:30hs · Lun y Vie 19:00hs',
    image: 'https://www.lanus.gob.ar/storage/fichas/imagenes/whatsapp-image-2024-09-24-at-51236-pm-Dlg7w.jpeg',
    instructor: 'Inst. Augusto Miranda',
    mapUrl: 'https://maps.app.goo.gl/vQTk5ugv5eXhjrMt9',
    instagramUrl: 'https://www.instagram.com/agus_esgrimacriolla/'
  },
  {
    id: 3,
    city: 'Belgrano',
    name: 'Sede Belgrano',
    address: 'Plaza Juan José Paso, Moldes 1300',
    schedule: 'Jueves 19:00 - 21:00hs',
    image: 'https://upload.wikimedia.org/wikipedia/commons/2/28/Plaza_Juan_Jos%C3%A9_Paso.jpg',
    instructor: 'Inst. Eliseo Dulon',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Plaza+Juan+Jose+Paso,+Moldes+1300',
    instagramUrl: 'https://www.instagram.com/esgrima_criolla_belgrano/'
  },
  {
    id: 2,
    city: 'Caballito',
    name: 'Sede Caballito',
    address: 'Parque Rivadavia, CABA',
    schedule: 'Miércoles 19:00 - 20:00hs',
    image: 'https://turismo.buenosaires.gob.ar/sites/turismo/files/parque_rivadavia_1200_0.jpg',
    instructor: 'Inst. Luisina Montero',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Parque+Rivadavia,+CABA',
    instagramUrl: 'https://www.instagram.com/esgrimacriolla.caballito/'
  },
  {
    id: 7,
    city: 'Mar del Plata',
    name: 'Sede Mar del Plata',
    address: 'Plaza Mitre',
    schedule: 'Miércoles 19:00 - 20:30hs',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Mar-del-plata.JPG/1280px-Mar-del-plata.JPG',
    instructor: 'Inst. Sebastián Javier Chehin',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Plaza+Mitre,+Mar+del+Plata',
    instagramUrl: 'https://www.instagram.com/esgrima_criolla'
  },
  {
    id: 5,
    city: 'Bariloche',
    name: 'Poncho y Acero',
    address: 'Beschett y Moreno (Gimnasio de Bomberos)',
    schedule: 'Martes y Jueves 19:30hs',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Catedral_desde_el_Lago_Nahuel_Huapi_-_panoramio.jpg/1280px-Catedral_desde_el_Lago_Nahuel_Huapi_-_panoramio.jpg',
    instructor: 'Inst. Walter Medel',
    mapUrl: 'https://maps.app.goo.gl/PFrZZNDaiDeYAAc19',
    instagramUrl: 'https://www.instagram.com/p_oncho1980/'
  },
  {
    id: 6,
    city: 'Bariloche',
    name: 'La Marca',
    address: 'Morales y Albarracín (Salón Bailarás)',
    schedule: 'Sábados 18:00hs',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Catedral_desde_el_Lago_Nahuel_Huapi_-_panoramio.jpg/1280px-Catedral_desde_el_Lago_Nahuel_Huapi_-_panoramio.jpg',
    instructor: 'Inst. Ismael Devalle',
    mapUrl: 'https://maps.app.goo.gl/wR2ccySjM5dXHowm7',
    instagramUrl: 'https://www.instagram.com/esgrimacriollabariloche/'
  },
  {
    id: 8,
    city: 'La Plata',
    name: 'Sede La Plata',
    address: 'Sindicato Gráfico',
    schedule: 'Jueves 19:00 - 20:30hs',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Palacio_Municipal_de_La_Plata_20..JPG/1280px-Palacio_Municipal_de_La_Plata_20..JPG',
    instructor: 'Maestro Jorge Prina',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Sindicato+Grafico,+La+Plata',
    instagramUrl: 'https://www.instagram.com/esgrima_criolla'
  }
];

const buildSedeWhatsapp = (name: string, city: string) => {
  const text = `¡Buenas y Santas! Quiero reservar mi clase en ${name} (${city}).`;
  return `https://api.whatsapp.com/send?phone=5492216246179&text=${encodeURIComponent(text)}`;
};

const Sedes: React.FC<SedesProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-void text-stone-200 selection:bg-gold selection:text-void paper-texture pt-20 md:pt-28 pb-24 overflow-x-hidden relative">
      <div className="fixed inset-0 pointer-events-none z-50 vignette-overlay opacity-60 hidden md:block"></div>
      <div className="fixed inset-0 pointer-events-none z-40 bg-grain opacity-5 mix-blend-overlay"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <RevealOnScroll>
          <div className="flex flex-col items-center mb-10 md:mb-14 text-center mx-auto">
            <button
              type="button"
              onClick={onBack}
              className="mb-6 min-h-[44px] px-3 group flex items-center gap-2 text-stone-300 hover:text-gold transition-colors cursor-pointer"
            >
              <span className="material-icons-outlined text-base group-hover:-translate-x-1 transition-transform">
                arrow_back
              </span>
              <span className="text-sm font-display font-semibold">
                Volver al inicio
              </span>
            </button>

            <p className="text-xs sm:text-sm text-gold uppercase tracking-[0.16em] font-semibold mb-2">
              Donde vive la tradición
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-stone-100 tracking-tight mb-6 text-center w-full">
              Nuestras Sedes
            </h2>

            {/* Clean Included Equipment Note */}
            <div className="w-full max-w-3xl bg-card-depth border border-gold/25 p-5 sm:p-6 rounded-md shadow-xl text-center">
              <div className="inline-flex items-center justify-center gap-2 text-gold font-display text-sm font-semibold mb-1.5">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>Material de entrenamiento incluido en todas las clases</span>
              </div>
              <p className="font-sans text-stone-200 text-sm sm:text-base leading-relaxed">
                En cada clase te entregamos poncho y cuchillos de entrenamiento. No necesitás experiencia previa ni comprar equipo: solo tenés que traer ganas y ropa cómoda.
              </p>
            </div>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {LOCATIONS.map((sede, idx) => (
            <RevealOnScroll key={sede.id} delay={idx * 60}>
              <div className="group relative bg-card-depth border border-gold/15 shadow-2xl hover:border-gold/40 transition-all duration-300 flex flex-col h-full rounded-md overflow-hidden">
                <div className="relative h-56 sm:h-64 overflow-hidden bg-black">
                  <img
                    src={sede.image}
                    alt={sede.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover filter sepia-[0.15] contrast-110 opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
                    <div>
                      <p className="text-gold font-display text-xs font-semibold uppercase tracking-wider">
                        {sede.city}
                      </p>
                      <h3 className="font-display text-2xl font-bold text-stone-100 leading-tight">
                        {sede.name}
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="p-5 sm:p-7 flex flex-col flex-grow">
                  <p className="font-sans text-stone-300 text-sm font-medium mb-4">
                    {sede.instructor}
                  </p>

                  <div className="space-y-2.5 border-t border-gold/15 pt-4 mb-6">
                    <div className="flex items-start gap-2.5 text-stone-200">
                      <span className="material-icons-outlined text-gold text-base mt-0.5 shrink-0">location_on</span>
                      <span className="font-sans text-sm sm:text-[0.95rem]">{sede.address}</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-stone-200">
                      <span className="material-icons-outlined text-gold text-base mt-0.5 shrink-0">schedule</span>
                      <span className="font-sans text-sm sm:text-[0.95rem]">{sede.schedule}</span>
                    </div>
                  </div>

                  <div className="mt-auto flex flex-col gap-2.5">
                    <a
                      href={buildSedeWhatsapp(sede.name, sede.city)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full min-h-[48px] py-3 bg-gold text-void font-display font-bold text-sm hover:bg-stone-100 transition-colors flex items-center justify-center gap-2 rounded-md"
                    >
                      <MessageCircle className="w-4 h-4 shrink-0" />
                      Reservar Clase
                    </a>

                    <div className="grid grid-cols-2 gap-2.5">
                      <a
                        href={sede.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full min-h-[44px] py-2.5 border border-gold/25 text-stone-200 font-display text-xs font-semibold hover:bg-gold/5 hover:border-gold/50 hover:text-gold transition-colors flex items-center justify-center gap-1.5 rounded-md"
                      >
                        <span className="material-icons-outlined text-base">map</span>
                        Ver Mapa
                      </a>
                      <a
                        href={sede.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full min-h-[44px] py-2.5 bg-gold/10 border border-gold/25 text-gold font-display text-xs font-semibold hover:bg-gold/20 hover:border-gold/60 transition-colors flex items-center justify-center gap-1.5 rounded-md"
                      >
                        <span className="material-icons-outlined text-base">camera_alt</span>
                        Instagram
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sedes;

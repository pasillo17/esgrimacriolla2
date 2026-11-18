import React from 'react';
import { ShieldCheck, Compass, MessageCircle } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';
import { GauchoWatermark } from './TornPaperDivider';

interface SedesProps {
  onBack: () => void;
  onOpenModal?: () => void;
}

const LOCATIONS = [
  {
    id: 4,
    city: 'Lanus',
    name: 'Sede Zona Sur',
    address: 'Gym ESN, Enrique Fernandez 2066',
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
    address: 'Plaza Juan Jose Paso, Moldes 1300',
    schedule: 'Jueves 19:00 - 21:00',
    image: 'https://upload.wikimedia.org/wikipedia/commons/2/28/Plaza_Juan_Jos%C3%A9_Paso.jpg',
    instructor: 'Inst. Eliseo Dulon',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Plaza+Juan+Jose+Paso,+Moldes+1300',
    instagramUrl: 'https://www.instagram.com/esgrima_criolla_belgrano/'
  },
  {
    id: 2,
    city: 'Caballito',
    name: 'Sede Caballito',
    address: 'Parque Rivadavia, CABA ',
    schedule: 'Miercoles 19:00 - 20:00',
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
    schedule: 'Miércoles 19:00 - 20:30',
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
    address: 'Morales y Albarracin (Salón Bailarás)',
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
    schedule: 'Jueves 19:00 - 20:30',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Palacio_Municipal_de_La_Plata_20..JPG/1280px-Palacio_Municipal_de_La_Plata_20..JPG',
    instructor: 'Maestro Jorge Prina',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Sindicato+Grafico,+La+Plata',
    instagramUrl: 'https://www.instagram.com/esgrima_criolla'
  }
];

const buildSedeWhatsapp = (name: string, city: string) => {
  const text = `¡Buenas y Santas! Quiero reservar mi Clase de Prueba (con equipo prestado incluido) en ${name} (${city}).`;
  return `https://api.whatsapp.com/send?phone=5492216246179&text=${encodeURIComponent(text)}`;
};

const Sedes: React.FC<SedesProps> = ({ onBack, onOpenModal }) => {
  return (
    <div className="min-h-screen bg-gaucho-estancia text-stone-300 selection:bg-gold selection:text-void pt-24 pb-24 overflow-x-hidden relative">
      {/* Vignette Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 vignette-overlay opacity-60"></div>

      {/* Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none z-40 bg-grain opacity-5 mix-blend-overlay"></div>

      {/* Estancia Compass & Rosette Watermarks */}
      <GauchoWatermark
        variant="compass"
        className="fixed -left-32 top-1/4 w-[480px] h-[480px] opacity-[0.045] pointer-events-none"
      />
      <GauchoWatermark
        variant="rosette"
        className="fixed -right-32 bottom-1/4 w-[480px] h-[480px] opacity-[0.045] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <RevealOnScroll>
          <div className="flex flex-col items-center mb-12 md:mb-16 text-center mx-auto">
            <button
              onClick={onBack}
              className="mb-8 group flex items-center gap-2 text-stone-400 hover:text-gold transition-colors cursor-pointer"
            >
              <span className="material-icons-outlined text-sm group-hover:-translate-x-1 transition-transform">
                arrow_back
              </span>
              <span className="text-xs font-display font-bold uppercase tracking-[0.2em]">
                Volver al Inicio
              </span>
            </button>

            <div className="torn-note px-5 py-1.5 mb-4 border-x border-gold/30">
              <span className="font-display text-[0.55rem] tracking-[0.45em] text-gold uppercase font-bold">
                ✦ MAPA DE POSTAS Y SALAS DE ARMAS ✦
              </span>
            </div>

            <h2 className="font-heritage text-3xl sm:text-4xl md:text-5xl text-stone-100 tracking-[0.2em] md:tracking-[0.25em] uppercase mb-4 text-center w-full font-bold">
              Nuestras Sedes
            </h2>
            <div className="flex items-center justify-center gap-4 w-full mb-10">
              <div className="h-px bg-gold/30 w-8 md:w-12"></div>
              <p className="text-[0.55rem] md:text-[0.65rem] text-gold tracking-[0.4em] md:tracking-[0.5em] uppercase font-bold text-center">
                Donde vive la tradición
              </p>
              <div className="h-px bg-gold/30 w-8 md:w-12"></div>
            </div>

            {/* High-Converting Torn Parchment Trial Class + GPS Banner */}
            <div className="w-full max-w-4xl torn-paper-slip border-x border-gold/30 p-6 md:p-9 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
              <div>
                <div className="inline-flex items-center gap-2 text-gold font-display text-[0.65rem] tracking-[0.25em] uppercase font-bold mb-2">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>1° Clase de Prueba con Equipo Prestado Incluido</span>
                </div>
                <p className="font-serif text-stone-200 text-sm md:text-base italic">
                  No necesitás experiencia previa ni comprar facón propio. Vení con ropa cómoda deportiva: nosotros te prestamos todo el equipo de entrenamiento.
                </p>
              </div>

              {onOpenModal && (
                <button
                  onClick={onOpenModal}
                  className="flex-shrink-0 px-6 py-4 bg-gold text-void font-display font-black text-xs uppercase tracking-[0.2em] hover:bg-stone-100 transition-all shadow-[0_0_25px_rgba(202,164,98,0.3)] flex items-center gap-2.5 rounded-sm cursor-pointer whitespace-nowrap"
                >
                  <Compass className="w-4 h-4 shrink-0" />
                  Detectar Sede Cercana (GPS)
                </button>
              )}
            </div>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {LOCATIONS.map((sede, idx) => (
            <RevealOnScroll key={sede.id} delay={idx * 120}>
              <div className="group relative heritage-card heritage-double-border p-3 shadow-2xl hover:border-gold/55 transition-all duration-500 flex flex-col h-full rounded-sm">
                <div className="relative h-64 overflow-hidden mb-6 bg-black border border-gold/20">
                  <img
                    src={sede.image}
                    alt={sede.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover filter sepia-[0.3] contrast-110 opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
                  <div className="absolute top-4 left-4 torn-note px-3.5 py-1.5 border-x border-gold/35">
                    <span className="text-gold font-display text-[0.55rem] tracking-[0.2em] uppercase font-bold">
                      Equipo Prestado en 1° Clase
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                    <span className="text-gold font-display text-xs tracking-[0.2em] uppercase font-bold">
                      {sede.city}
                    </span>
                  </div>
                </div>

                <div className="px-5 pb-6 text-center flex flex-col flex-grow">
                  <h3 className="font-heritage text-xl text-stone-100 uppercase tracking-[0.18em] mb-1.5 group-hover:text-gold transition-colors font-bold">
                    {sede.name}
                  </h3>
                  <p className="font-serif text-stone-400 text-sm italic mb-5">{sede.instructor}</p>

                  <div className="space-y-3 border-t border-dashed border-gold/25 pt-5 mb-7">
                    <div className="flex items-center justify-center gap-3 text-stone-300">
                      <span className="material-icons-outlined text-gold/70 text-sm">location_on</span>
                      <span className="font-display text-xs tracking-widest uppercase">{sede.address}</span>
                    </div>
                    <div className="flex items-center justify-center gap-3 text-stone-300">
                      <span className="material-icons-outlined text-gold/70 text-sm">schedule</span>
                      <span className="font-display text-xs tracking-widest uppercase">{sede.schedule}</span>
                    </div>
                  </div>

                  <div className="mt-auto flex flex-col gap-3">
                    <a
                      href={buildSedeWhatsapp(sede.name, sede.city)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3.5 bg-gold text-void font-display font-black text-xs uppercase tracking-[0.2em] hover:bg-stone-100 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(202,164,98,0.2)] rounded-sm"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Reservar Clase de Prueba
                    </a>

                    <div className="grid grid-cols-2 gap-3">
                      <a
                        href={sede.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3 border border-gold/20 text-stone-300 font-display text-[0.6rem] uppercase tracking-[0.25em] hover:bg-gold/5 hover:border-gold/40 hover:text-gold transition-all flex items-center justify-center gap-2 rounded-sm"
                      >
                        <span className="material-icons-outlined text-sm">map</span>
                        Ver Mapa
                      </a>
                      <a
                        href={sede.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3 bg-gold/10 border border-gold/20 text-gold font-display text-[0.6rem] uppercase tracking-[0.25em] hover:bg-gold/20 hover:border-gold/60 transition-all flex items-center justify-center gap-2 rounded-sm"
                      >
                        <span className="material-icons-outlined text-sm">camera_alt</span>
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

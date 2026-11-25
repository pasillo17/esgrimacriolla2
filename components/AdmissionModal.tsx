import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Dumbbell, Trees, Landmark, Globe, LocateFixed, Loader2, ShieldCheck, Mountain, Waves, MessageCircle, X } from 'lucide-react';

interface AdmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SEDES_DATA = [
  {
    name: 'SEDE CENTRAL CABA (MONTAL GYM)',
    location: 'Mitre 1851, Congreso, CABA',
    schedule: 'Sábados 10:00 a 12:00hs • Maestro Jorge Prina',
    icon: MapPin,
    coords: { lat: -34.6083, lng: -58.3934 }
  },
  {
    name: 'SEDE ZONA SUR (LANÚS)',
    location: 'Gym ESN, Enrique Fernández 2066',
    schedule: 'Mar y Jue 8:30hs • Lun y Vie 19:00hs • Inst. Augusto Miranda',
    icon: Dumbbell,
    coords: { lat: -34.7077, lng: -58.4069 }
  },
  {
    name: 'SEDE BELGRANO (CABA)',
    location: 'Plaza Juan José Paso, Moldes 1300',
    schedule: 'Jueves 19:00 a 21:00hs • Inst. Eliseo Dulon',
    icon: Trees,
    coords: { lat: -34.5682, lng: -58.4552 }
  },
  {
    name: 'SEDE CABALLITO (CABA)',
    location: 'Parque Rivadavia, CABA',
    schedule: 'Miércoles 19:00 a 20:00hs • Inst. Luisina Montero',
    icon: MapPin,
    coords: { lat: -34.6186, lng: -58.4338 }
  },
  {
    name: 'SEDE LA PLATA',
    location: 'Sindicato Gráfico, La Plata',
    schedule: 'Jueves 19:00 a 20:30hs • Maestro Jorge Prina',
    icon: Landmark,
    coords: { lat: -34.9205, lng: -57.9536 }
  },
  {
    name: 'SEDE MAR DEL PLATA',
    location: 'Plaza Mitre, Mar del Plata',
    schedule: 'Miércoles 19:00 a 20:30hs • Inst. Sebastián Chehin',
    icon: Waves,
    coords: { lat: -38.0023, lng: -57.5562 }
  },
  {
    name: 'BARILOCHE — PONCHO Y ACERO',
    location: 'Beschtedt y Moreno (Gimnasio de Bomberos)',
    schedule: 'Martes y Jueves 19:30hs • Inst. Walter Medel',
    icon: Mountain,
    coords: { lat: -41.1355, lng: -71.3005 }
  },
  {
    name: 'BARILOCHE — LA MARCA',
    location: 'Morales y Albarracín (Salón Bailarás)',
    schedule: 'Sábados 18:00hs • Inst. Ismael Devalle',
    icon: Mountain,
    coords: { lat: -41.1382, lng: -71.3089 }
  },
];

const VIRTUAL_SEDE = {
  name: 'ACADEMIA ONLINE (DESDE CUALQUIER LUGAR)',
  location: 'Clases Personalizadas en Vivo • Curso de Monitor • Cultura Gaucha (Aval UNCA)',
  schedule: 'Horarios a medida y acceso global',
  icon: Globe
};

function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

const buildWhatsappUrl = (sedeName: string) => {
  const message = `¡Buenas y Santas! Quiero reservar mi Clase de Prueba (con equipo prestado incluido) en ${sedeName}.`;
  return `https://api.whatsapp.com/send?phone=5492216246179&text=${encodeURIComponent(message)}`;
};

const AdmissionModal: React.FC<AdmissionModalProps> = ({ isOpen, onClose }) => {
  const [findingLocation, setFindingLocation] = useState(false);
  const [nearestSede, setNearestSede] = useState<typeof SEDES_DATA[0] | null>(null);
  const [distanceInfo, setDistanceInfo] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState('');

  const findNearestSede = () => {
    setErrorMsg('');
    setFindingLocation(true);
    setNearestSede(null);
    setDistanceInfo('');

    if (!navigator.geolocation) {
      setErrorMsg('Geolocalización no soportada en este navegador. Elegí tu sede de la lista.');
      setFindingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        let minDistance = Infinity;
        let closestSede: typeof SEDES_DATA[0] | null = null;

        SEDES_DATA.forEach((sede) => {
          const d = getDistance(latitude, longitude, sede.coords.lat, sede.coords.lng);
          if (d < minDistance) {
            minDistance = d;
            closestSede = sede;
          }
        });

        if (closestSede) {
          setNearestSede(closestSede);
          setDistanceInfo(`Tu sede más cercana está a ${minDistance.toFixed(1)} km de tu ubicación actual`);
        }
        setFindingLocation(false);
      },
      () => {
        setErrorMsg('No pudimos detectar tu ubicación por GPS. Seleccioná tu sede directamente abajo.');
        setFindingLocation(false);
      },
      { timeout: 10000 }
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-void/90 backdrop-blur-md"
        onClick={onClose}
      />
      <motion.div
        initial={{ scale: 0.98, opacity: 0, y: 24 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.98, opacity: 0, y: 24 }}
        className="relative w-full max-w-5xl max-h-[92dvh] sm:max-h-[90vh] bg-void border-t sm:border border-gold/30 shadow-[0_0_60px_rgba(0,0,0,0.9)] flex flex-col md:flex-row overflow-hidden rounded-t-2xl sm:rounded-sm z-10"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 z-30 min-w-[44px] min-h-[44px] rounded-sm bg-void/90 border border-gold/30 text-stone-200 hover:text-gold hover:border-gold flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Cerrar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Branding & Trial Class Offer */}
        <div className="hidden md:flex md:w-4/12 bg-zinc-950 relative p-10 flex-col justify-between border-r border-gold/15">
          <div className="absolute inset-0 opacity-20">
            <img
              src="https://images.unsplash.com/photo-1519791883288-dc8bd696e667?q=80&w=2070&auto=format&fit=crop"
              className="w-full h-full object-cover grayscale"
              alt="Esgrima Criolla"
            />
          </div>
          <div className="relative z-10">
            <img src="https://i.imgur.com/cbCrHDB.png" className="w-16 h-16 mb-6 opacity-90" alt="Logo" />
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold/15 border border-gold/30 text-gold font-display text-[0.6rem] tracking-[0.25em] uppercase font-bold mb-4">
              <ShieldCheck className="w-3.5 h-3.5" />
              Inscripciones Abiertas
            </div>
            <h3 className="font-display text-3xl lg:text-4xl text-stone-100 tracking-[0.15em] uppercase mb-4 leading-tight">
              Reservá Tu<br />
              <span className="text-gold">Clase de Prueba</span>
            </h3>
            <div className="w-12 h-0.5 bg-gold mb-6"></div>
            <p className="text-stone-300 font-serif italic text-base leading-relaxed mb-6">
              "No necesitás experiencia previa ni comprar facón propio. En tu primera clase te prestamos todo el equipo de práctica."
            </p>
            <ul className="space-y-2.5 text-xs font-display tracking-[0.15em] uppercase text-stone-300">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-gold rotate-45"></span>
                Facón de práctica incluido
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-gold rotate-45"></span>
                Todos los niveles y edades
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-gold rotate-45"></span>
                Contacto directo por WhatsApp
              </li>
            </ul>
          </div>
          <div className="relative z-10 pt-6">
            <div className="guardapampa-divider h-3 opacity-25 mb-3"></div>
            <p className="text-[0.55rem] text-stone-500 tracking-[0.35em] uppercase font-bold">
              Esgrima Criolla • Buenas y Santas
            </p>
          </div>
        </div>

        {/* Right Side: GPS Locator & Sede Selection */}
        <div className="flex-1 flex flex-col p-5 sm:p-8 md:p-10 overflow-y-auto custom-scrollbar">
          <div className="md:hidden mb-6 pr-8">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gold/15 border border-gold/30 text-gold font-display text-[0.55rem] tracking-[0.2em] uppercase font-bold mb-2">
              <ShieldCheck className="w-3 h-3" />
              Equipo de práctica prestado incluido
            </div>
            <h3 className="font-display text-2xl text-stone-100 tracking-[0.15em] uppercase">
              Reservá Tu <span className="text-gold">Clase de Prueba</span>
            </h3>
          </div>

          <div className="bg-card-depth/90 border border-gold/25 p-4 sm:p-5 rounded-sm mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="text-gold font-display text-xs uppercase tracking-[0.2em] font-bold mb-1">
                  Buscador GPS de Sede Más Cercana
                </h4>
                <p className="text-stone-400 font-serif text-xs sm:text-sm">
                  Detectá automáticamente cuál de nuestras 8 sedes está más cerca tuyo.
                </p>
              </div>

              <button
                onClick={findNearestSede}
                disabled={findingLocation}
                className="flex-shrink-0 flex items-center justify-center gap-2.5 bg-gold hover:bg-stone-100 text-void py-3 px-5 transition-all uppercase tracking-[0.2em] font-display text-xs font-black disabled:opacity-50 rounded-sm cursor-pointer shadow-[0_0_20px_rgba(197,160,101,0.3)]"
              >
                {findingLocation ? (
                  <Loader2 className="animate-spin w-4 h-4" />
                ) : (
                  <LocateFixed className="w-4 h-4" />
                )}
                {findingLocation ? 'Localizando...' : 'Usar Mi GPS'}
              </button>
            </div>

            {errorMsg && (
              <p className="text-amber-400 text-xs mt-3 font-serif italic">{errorMsg}</p>
            )}

            {nearestSede && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 border border-gold/40 bg-gold/10 rounded-sm flex flex-col sm:flex-row items-center justify-between gap-4"
              >
                <div className="text-center sm:text-left">
                  <p className="text-gold font-serif italic text-xs mb-1">{distanceInfo}</p>
                  <h5 className="font-display text-stone-100 tracking-[0.15em] uppercase text-sm font-bold">
                    {nearestSede.name}
                  </h5>
                  <p className="text-stone-400 text-xs font-serif">{nearestSede.location} • {nearestSede.schedule}</p>
                </div>
                <a
                  href={buildWhatsappUrl(nearestSede.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onClose}
                  className="flex-shrink-0 inline-flex items-center gap-2 bg-[#1f7a4c] hover:bg-[#18633d] text-white font-display font-black text-xs px-5 py-3 uppercase tracking-[0.2em] transition-colors rounded-sm shadow-lg"
                >
                  <MessageCircle className="w-4 h-4" />
                  Reservar en esta Sede
                </a>
              </motion.div>
            )}
          </div>

          <div className="mb-6">
            <h4 className="text-stone-400 font-display text-[0.65rem] uppercase tracking-[0.25em] mb-3 font-bold">
              O elegí tu sede presencial directamente (Tocá para reservar por WhatsApp):
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SEDES_DATA.map((sede) => (
                <a
                  key={sede.name}
                  href={buildWhatsappUrl(sede.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onClose}
                  className="group relative flex items-start gap-3.5 p-3.5 border border-gold/15 bg-card-depth/50 hover:bg-gold/10 hover:border-gold/50 transition-all duration-300 text-left rounded-sm"
                >
                  <div className="w-9 h-9 flex-shrink-0 flex items-center justify-center bg-gold/10 border border-gold/20 text-gold group-hover:bg-gold group-hover:text-void transition-all duration-300 rounded-sm mt-0.5">
                    <sede.icon size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h5 className="text-stone-100 font-display text-xs uppercase tracking-[0.1em] font-bold group-hover:text-gold transition-colors truncate">
                        {sede.name}
                      </h5>
                      <MessageCircle className="w-3.5 h-3.5 text-gold opacity-60 group-hover:opacity-100 flex-shrink-0" />
                    </div>
                    <p className="text-stone-400 text-[0.65rem] uppercase tracking-wider font-display mt-0.5 truncate">
                      {sede.location}
                    </p>
                    <p className="text-gold/80 text-[0.65rem] font-serif italic mt-0.5">
                      {sede.schedule}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="border-t border-gold/15 pt-5 mt-auto">
            <a
              href={buildWhatsappUrl(VIRTUAL_SEDE.name)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="group w-full relative flex items-center gap-4 p-4 border border-gold/30 bg-card-depth hover:bg-gold/10 transition-all duration-300 text-left overflow-hidden rounded-sm"
            >
              <div className="w-11 h-11 flex-shrink-0 flex items-center justify-center bg-gold/15 border border-gold/30 text-gold group-hover:bg-gold group-hover:text-void transition-all duration-300 rounded-sm">
                <VIRTUAL_SEDE.icon size={20} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-gold font-display text-xs sm:text-sm uppercase tracking-[0.2em] font-bold">
                    {VIRTUAL_SEDE.name}
                  </h4>
                  <span className="text-[0.6rem] font-display uppercase tracking-[0.2em] text-stone-300 group-hover:text-gold hidden sm:inline font-bold">
                    Consultar por WhatsApp →
                  </span>
                </div>
                <p className="text-stone-300 text-xs font-serif mt-0.5">{VIRTUAL_SEDE.location}</p>
              </div>
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdmissionModal;

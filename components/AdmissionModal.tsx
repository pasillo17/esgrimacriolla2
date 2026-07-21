import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Dumbbell, Trees, Landmark, Globe, LocateFixed, Loader2 } from 'lucide-react';

interface AdmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SEDES_DATA = [
  { name: 'SEDE CABA (CENTRAL)', location: 'Mitre 1851, CABA', schedule: 'Sábados 10:00 - 12:00', icon: MapPin, coords: { lat: -34.6083, lng: -58.3934 } },
  { name: 'SEDE LANÚS', location: 'Gym ESN, Enrique Fernandez 2066', schedule: 'Mar y Jue 8:30hs • Lun y Vie 19:00hs', icon: Dumbbell, coords: { lat: -34.7077, lng: -58.4069 } },
  { name: 'SEDE BELGRANO', location: 'Plaza Juan Jose Paso, Moldes 1300', schedule: 'Jueves 19:00 - 21:00', icon: Trees, coords: { lat: -34.5682, lng: -58.4552 } },
  { name: 'SEDE CABALLITO', location: 'Parque Rivadavia, CABA', schedule: 'Miércoles 19:00 - 20:00', icon: MapPin, coords: { lat: -34.6186, lng: -58.4338 } },
  { name: 'SEDE LA PLATA', location: 'Casa Pulsar / Plaza Malvinas', schedule: 'Lun 20:30hs • Mar 15:00hs', icon: Landmark, coords: { lat: -34.9205, lng: -57.9536 } },
];

const VIRTUAL_SEDE = { name: 'ACADEMIA ONLINE', location: 'Online (Zoom/Meet y Tutoriales)', schedule: 'Cursos y Clases a Distancia', icon: Globe };

function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
  const d = R * c; 
  return d;
}

const AdmissionModal: React.FC<AdmissionModalProps> = ({ isOpen, onClose }) => {
  const [findingLocation, setFindingLocation] = useState(false);
  const [nearestSede, setNearestSede] = useState<any>(null);
  const [distanceInfo, setDistanceInfo] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState('');

  const findNearestSede = () => {
    setErrorMsg('');
    setFindingLocation(true);
    setNearestSede(null);
    setDistanceInfo('');
    
    if (!navigator.geolocation) {
      setErrorMsg('Geolocalización no soportada en este navegador.');
      setFindingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        let minDistance = Infinity;
        let closestSede = null;

        SEDES_DATA.forEach(sede => {
          const d = getDistance(latitude, longitude, sede.coords.lat, sede.coords.lng);
          if (d < minDistance) {
            minDistance = d;
            closestSede = sede;
          }
        });

        if (closestSede) {
          setNearestSede(closestSede);
          setDistanceInfo(`Tu sede más cercana está a ${minDistance.toFixed(1)} km`);
        }
        setFindingLocation(false);
      },
      (error) => {
        console.error(error);
        setErrorMsg('No se pudo acceder a la ubicación. Intenta elegir manualmente.');
        setFindingLocation(false);
      },
      { timeout: 10000 }
    );
  };

  const handleSelectSede = (sedeName: string) => {
    const message = `Buenas y santas quiero entrenar en ${sedeName}`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=5492216246179&text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-void/90 backdrop-blur-md"
        onClick={onClose}
      />
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className="relative w-full max-w-5xl h-[85vh] md:h-[80vh] bg-void border border-gold/20 shadow-2xl flex flex-col md:flex-row overflow-hidden rounded-sm z-10"
      >
        {/* Left Side: Branding & Story */}
        <div className="hidden md:flex md:w-5/12 bg-zinc-900 relative p-12 flex-col justify-between">
          <div className="absolute inset-0 opacity-20">
            <img 
              src="https://images.unsplash.com/photo-1519791883288-dc8bd696e667?q=80&w=2070&auto=format&fit=crop" 
              className="w-full h-full object-cover grayscale"
              alt="Background"
            />
          </div>
          <div className="relative z-10">
            <img src="https://i.imgur.com/cbCrHDB.png" className="w-16 h-16 mb-8 opacity-80" alt="Logo" />
            <h3 className="font-display text-4xl text-stone-100 tracking-widest uppercase mb-6">Unite al<br/>Fogón</h3>
            <div className="w-12 h-1 bg-gold mb-8"></div>
            <p className="text-stone-400 font-serif italic text-lg leading-relaxed">
              "Encontrá tu lugar. Forjá tu técnica. Defendé la tradición."
            </p>
          </div>
          <div className="relative z-10">
            <div className="guardapampa-divider h-4 opacity-20 mb-4"></div>
            <p className="text-[0.6rem] text-stone-600 tracking-[0.4em] uppercase font-bold">Esgrima Criolla • Buenas y Santas</p>
          </div>
        </div>

        {/* Right Side: Selection List */}
        <div className="flex-1 flex flex-col p-6 md:p-12 overflow-y-auto custom-scrollbar bg-paper-texture bg-opacity-5">
          <div className="md:hidden text-center mb-8">
            <h3 className="font-display text-2xl text-stone-100 tracking-widest uppercase mb-4">Unite al Fogón</h3>
            <div className="w-12 h-0.5 bg-gold mx-auto"></div>
          </div>

          <div className="mb-8">
            <h4 className="text-gold font-display text-xs uppercase tracking-widest mb-4">Encontrá tu Sede</h4>
            
            <div className="bg-void/40 border border-gold/10 p-5 rounded-sm mb-6">
              <p className="text-stone-300 text-sm mb-4">
                Permitinos usar tu ubicación para indicarte la sede más cercana a vos.
              </p>
              
              <button
                onClick={findNearestSede}
                disabled={findingLocation}
                className="w-full flex items-center justify-center gap-3 bg-gold/10 hover:bg-gold/20 border border-gold/30 text-gold py-3 px-4 transition-all uppercase tracking-widest text-xs font-bold disabled:opacity-50"
              >
                {findingLocation ? (
                  <Loader2 className="animate-spin w-4 h-4" />
                ) : (
                  <LocateFixed className="w-4 h-4" />
                )}
                {findingLocation ? 'Buscando...' : 'Descubrir mi sede cercana'}
              </button>

              {errorMsg && (
                <p className="text-red-400/80 text-xs mt-3 text-center">{errorMsg}</p>
              )}

              {nearestSede && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 border border-gold/30 bg-gold/5 text-center"
                >
                  <p className="text-stone-300 font-serif italic text-sm mb-1">{distanceInfo}</p>
                  <h5 className="font-display text-gold tracking-widest uppercase text-sm mb-3">{nearestSede.name}</h5>
                  <button 
                    onClick={() => handleSelectSede(nearestSede.name)}
                    className="bg-gold text-void font-bold text-xs px-6 py-2 uppercase tracking-widest hover:bg-white transition-colors"
                  >
                    Quiero ir a esta sede
                  </button>
                </motion.div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
              {SEDES_DATA.map((sede) => (
                <button
                  key={sede.name}
                  onClick={() => handleSelectSede(sede.name)}
                  className="group relative flex items-start gap-4 p-4 border border-gold/5 bg-void/30 hover:bg-gold/5 transition-all duration-300 text-left"
                >
                  <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-gold/5 border border-gold/10 group-hover:bg-gold group-hover:text-void transition-all duration-500">
                    <sede.icon size={16} />
                  </div>
                  <div>
                    <h4 className="text-stone-200 font-display text-xs uppercase tracking-[0.1em] mb-1 group-hover:text-gold transition-colors">{sede.name}</h4>
                    <p className="text-stone-500 text-[0.6rem] uppercase tracking-wider font-bold">{sede.location}</p>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-700"></div>
                </button>
              ))}
            </div>

            <div className="mt-8 border-t border-gold/10 pt-8">
              <div className="text-center mb-6">
                <span className="inline-block px-3 py-1 bg-gold/10 border border-gold/20 text-gold font-display text-[0.65rem] tracking-widest uppercase">Para todo el mundo</span>
              </div>
              <button
                onClick={() => handleSelectSede(VIRTUAL_SEDE.name)}
                className="group w-full relative flex items-center gap-6 p-5 border border-gold/20 bg-void hover:bg-gold/5 transition-all duration-500 text-left overflow-hidden"
              >
                <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-gold/10 border border-gold/30 group-hover:bg-gold group-hover:text-void transition-all duration-500 z-10">
                  <VIRTUAL_SEDE.icon size={20} />
                </div>
                <div className="flex-1 z-10">
                  <h4 className="text-gold font-display text-sm md:text-base uppercase tracking-[0.2em] mb-1">{VIRTUAL_SEDE.name}</h4>
                  <p className="text-stone-400 text-xs md:text-sm">{VIRTUAL_SEDE.location}</p>
                  <p className="text-stone-500 text-[0.65rem] uppercase tracking-widest font-bold mt-1">Tutoriales, Cursos y Clases a Distancia</p>
                </div>
                
                <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-gold/10 to-transparent transform translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
              </button>
            </div>
          </div>

          <div className="mt-auto text-center md:text-left pt-6">
            <button 
              onClick={onClose}
              className="text-stone-600 hover:text-gold transition-colors font-display text-[0.6rem] tracking-[0.4em] uppercase flex items-center gap-2 justify-center md:justify-start"
            >
              <span className="material-icons-outlined text-sm">west</span>
              Volver al sitio
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdmissionModal;

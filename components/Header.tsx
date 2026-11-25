import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Sun, Moon, Compass } from 'lucide-react';

interface HeaderProps {
  onNavigate: (view: 'home' | 'merch' | 'sedes' | 'academia-online' | 'novedades' | 'curso-visteador') => void;
  isMenuOpen: boolean;
  onToggleMenu: () => void;
  onOpenModal?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, isMenuOpen, onToggleMenu, onOpenModal }) => {
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    if (document.documentElement.classList.contains('light')) {
      setIsLightMode(true);
    }
  }, []);

  const toggleTheme = () => {
    const isLight = document.documentElement.classList.toggle('light');
    setIsLightMode(isLight);
  };

  const handleNavClick = (href: string) => {
    if (isMenuOpen) onToggleMenu();
    if (href === '#merch') {
      onNavigate('merch');
    } else if (href === '#sedes') {
      onNavigate('sedes');
    } else if (href === '#academia-online') {
      onNavigate('academia-online');
    } else if (href === '#curso-visteador') {
      onNavigate('curso-visteador');
    } else if (href === '#novedades') {
      onNavigate('novedades');
    } else {
      onNavigate('home');
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else if (href === '#inicio') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const navItems: Array<{ name: string; href: string; highlight?: boolean; courseHighlight?: boolean }> = [
    { name: 'INICIO', href: '#inicio' },
    { name: 'CLASES', href: '#clases' },
    { name: 'SEDES', href: '#sedes' },
    { name: 'APRENDE ONLINE', href: '#academia-online' },
    { name: 'DE CERO A VISTEADOR', href: '#curso-visteador', courseHighlight: true },
    { name: 'BIBLIOTECA', href: '#novedades' },
    { name: 'PREGUNTAS', href: '#preguntas-frecuentes' },
    { name: 'TIENDA', href: '#merch', highlight: true },
  ];

  const mobileNavItems: Array<{ name: string; href: string; highlight?: boolean; courseHighlight?: boolean }> = [
    { name: 'INICIO', href: '#inicio' },
    { name: 'CLASES', href: '#clases' },
    { name: 'SEDES', href: '#sedes' },
    { name: 'APRENDE ONLINE', href: '#academia-online' },
    { name: 'DE CERO A VISTEADOR', href: '#curso-visteador', courseHighlight: true },
    { name: 'BIBLIOTECA & BLOG', href: '#novedades' },
    { name: 'PREGUNTAS FRECUENTES', href: '#preguntas-frecuentes' },
    { name: 'TIENDA OFICIAL', href: '#merch', highlight: true },
  ];

  return (
    <header className="fixed w-full z-50 bg-void/90 backdrop-blur-xl border-b border-gold/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 md:h-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex-shrink-0 flex items-center group cursor-pointer"
            onClick={() => handleNavClick('#inicio')}
          >
            <div className="relative mr-3 md:mr-4">
              <img
                src="https://i.imgur.com/cbCrHDB.png"
                referrerPolicy="no-referrer"
                className="w-12 h-12 md:w-16 md:h-16 logo-glow opacity-90 group-hover:opacity-100 transition-opacity"
                alt="Logo Nav"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-stone-100 tracking-[0.2em] text-xs sm:text-sm md:text-base group-hover:text-gold transition-colors uppercase whitespace-nowrap text-glow-white">
                ESGRIMA CRIOLLA
              </span>
              <span className="font-serif italic text-[0.45rem] md:text-[0.55rem] text-gold tracking-[0.25em] uppercase opacity-90 font-bold whitespace-nowrap">
                Buenas y Santas
              </span>
            </div>
          </motion.div>

          <nav className="hidden lg:flex space-x-4 xl:space-x-6 items-center">
            {navItems.map((item, idx) => (
              <motion.button
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                onClick={() => handleNavClick(item.href)}
                className={`font-display text-[0.56rem] xl:text-[0.6rem] tracking-[0.18em] xl:tracking-[0.2em] transition-all duration-300 font-bold uppercase whitespace-nowrap cursor-pointer ${
                  item.courseHighlight
                    ? 'text-[#6BA8D9] hover:text-[#96C7EC] border-b border-[#2B6592] pb-1'
                    : item.highlight
                      ? 'text-gold border-b border-gold pb-1'
                      : 'text-stone-400 hover:text-gold'
                }`}
              >
                {item.name}
              </motion.button>
            ))}

            {onOpenModal && (
              <motion.button
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: navItems.length * 0.08 }}
                onClick={onOpenModal}
                className="px-4 py-2.5 bg-gold text-void font-display text-[0.58rem] xl:text-[0.62rem] font-black tracking-[0.22em] uppercase rounded-sm hover:bg-stone-100 transition-all shadow-[0_0_20px_rgba(197,160,101,0.3)] flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <Compass className="w-3.5 h-3.5" />
                CLASE DE PRUEBA
              </motion.button>
            )}

            <motion.button
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: (navItems.length + 1) * 0.08 }}
              onClick={toggleTheme}
              className="text-stone-400 hover:text-gold transition-colors ml-2 focus:outline-none cursor-pointer"
              aria-label="Toggle Theme"
            >
              {isLightMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </motion.button>
          </nav>

          <div className="lg:hidden flex items-center gap-3">
            {onOpenModal && (
              <button
                onClick={() => {
                  if (isMenuOpen) onToggleMenu();
                  onOpenModal();
                }}
                className="px-3 py-2 bg-gold text-void font-display text-[0.55rem] font-black tracking-[0.15em] uppercase rounded-sm shadow-md flex items-center gap-1"
              >
                <Compass className="w-3 h-3" />
                PRUEBA
              </button>
            )}
            <button
              onClick={toggleTheme}
              className="text-stone-400 hover:text-gold transition-colors focus:outline-none p-1"
              aria-label="Toggle Theme"
            >
              {isLightMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            <button
              onClick={onToggleMenu}
              className="text-stone-300 hover:text-gold p-2 focus:outline-none"
              aria-label="Abrir menú"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden bg-void/98 border-b border-gold/20 backdrop-blur-md absolute w-full top-20 left-0 overflow-y-auto max-h-[calc(100vh-5rem)]"
          >
            <div className="px-6 pt-6 pb-12 space-y-3 flex flex-col items-center">
              {mobileNavItems.map((item, idx) => (
                <motion.button
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  onClick={() => handleNavClick(item.href)}
                  className={`block font-display text-sm tracking-[0.28em] py-3 border-b border-gold/10 font-bold uppercase transition-colors w-full text-center hover:bg-gold/5 ${
                    item.courseHighlight
                      ? 'text-[#6BA8D9]'
                      : item.highlight
                        ? 'text-gold'
                        : 'text-stone-300 hover:text-stone-100'
                  }`}
                >
                  {item.name}
                </motion.button>
              ))}

              {onOpenModal && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  onClick={() => {
                    onToggleMenu();
                    onOpenModal();
                  }}
                  className="w-full max-w-xs mt-4 py-4 bg-gold text-void font-display text-xs tracking-[0.25em] font-black uppercase rounded-sm shadow-[0_0_25px_rgba(197,160,101,0.3)] flex items-center justify-center gap-2"
                >
                  <Compass className="w-4 h-4" />
                  RESERVAR CLASE DE PRUEBA
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;

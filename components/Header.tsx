import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  onNavigate: (view: 'home' | 'merch' | 'sedes' | 'academia-online' | 'novedades' | 'curso-visteador') => void;
  isMenuOpen: boolean;
  onToggleMenu: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, isMenuOpen, onToggleMenu }) => {
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
        if (href === '#inicio') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          const element = document.querySelector(href);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, 100);
    }
  };

  const navItems: Array<{ name: string; href: string; highlight?: boolean; courseHighlight?: boolean }> = [
    { name: 'Inicio', href: '#inicio' },
    { name: 'Sedes', href: '#sedes' },
    { name: 'Aprende Online', href: '#academia-online' },
    { name: 'De Cero a Visteador', href: '#curso-visteador', courseHighlight: true },
    { name: 'Biblioteca', href: '#novedades' },
    { name: 'Tienda', href: '#merch', highlight: true },
  ];

  return (
    <header className="fixed w-full z-50 bg-void/95 backdrop-blur-xl border-b border-gold/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-22 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex-shrink-0 flex items-center group cursor-pointer min-h-[44px]"
            onClick={() => handleNavClick('#inicio')}
          >
            <div className="relative mr-2.5 md:mr-3.5">
              <img
                src="https://i.imgur.com/cbCrHDB.png"
                referrerPolicy="no-referrer"
                className="w-10 h-10 md:w-14 md:h-14 logo-glow opacity-90 group-hover:opacity-100 transition-opacity"
                alt="Logo Esgrima Criolla"
              />
            </div>
            <span className="font-display font-bold text-stone-100 tracking-tight text-base md:text-lg group-hover:text-gold transition-colors whitespace-nowrap">
              Esgrima Criolla
            </span>
          </motion.div>

          <nav className="hidden lg:flex items-center gap-7">
            {navItems.map((item, idx) => (
              <motion.button
                key={item.name}
                type="button"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.04 }}
                onClick={() => handleNavClick(item.href)}
                className={`font-display text-sm transition-colors duration-200 font-semibold whitespace-nowrap shrink-0 cursor-pointer ${
                  item.courseHighlight
                    ? 'text-[#78B7E8] hover:text-[#A3CFF0] border-b-2 border-[#2B6592] pb-0.5'
                    : item.highlight
                      ? 'text-gold hover:text-stone-100'
                      : 'text-stone-200 hover:text-gold'
                }`}
              >
                {item.name}
              </motion.button>
            ))}

            <button
              type="button"
              onClick={toggleTheme}
              className="text-stone-300 hover:text-gold transition-colors ml-1 focus:outline-none cursor-pointer min-w-[40px] min-h-[40px] flex items-center justify-center"
              aria-label="Cambiar tema claro u oscuro"
            >
              {isLightMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
          </nav>

          <div className="lg:hidden flex items-center gap-1.5">
            <button
              type="button"
              onClick={toggleTheme}
              className="text-stone-200 hover:text-gold transition-colors focus:outline-none min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer"
              aria-label="Cambiar tema claro u oscuro"
            >
              {isLightMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            <button
              type="button"
              onClick={onToggleMenu}
              className="text-stone-100 hover:text-gold min-w-[44px] min-h-[44px] flex items-center justify-center focus:outline-none cursor-pointer"
              aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden bg-void/98 border-b border-gold/20 backdrop-blur-xl absolute w-full top-16 md:top-22 left-0 overflow-y-auto max-h-[calc(100dvh-4rem)] shadow-2xl"
            style={{ paddingBottom: 'max(1.25rem, env(safe-area-inset-bottom))' }}
          >
            <div className="px-5 pt-3 pb-5 space-y-1 flex flex-col items-stretch">
              {navItems.map((item, idx) => (
                <motion.button
                  key={item.name}
                  type="button"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: idx * 0.03 }}
                  onClick={() => handleNavClick(item.href)}
                  className={`min-h-[48px] flex items-center justify-center font-display text-base py-3 border-b border-gold/10 last:border-b-0 font-semibold transition-colors w-full text-center hover:bg-gold/5 cursor-pointer ${
                    item.courseHighlight
                      ? 'text-[#78B7E8] bg-[#2B6592]/15 rounded-md border-b-0 my-1'
                      : item.highlight
                        ? 'text-gold'
                        : 'text-stone-100 hover:text-gold'
                  }`}
                >
                  {item.name}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;

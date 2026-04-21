import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from './LanguageContext';
import { Menu, X, ArrowRight } from 'lucide-react';

export default function NavBar() {
  const { lang, switchLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: t.nav.servicios, href: '#video-types' },
    { label: t.nav.reseñas, href: '#portfolio' },
    { label: t.nav.metodo, href: '#pricing' },
    { label: t.nav.contacto, href: '#pricing' },
  ];

  return (
    <nav
      className="z-50 transition-all duration-300 overflow-x-hidden"
      style={{
        backgroundColor: scrolled ? 'white' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0,0,0,0.06)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo — GZ Agency, ajustado al navbar */}
          <a href="#hero" className="flex items-center shrink-0">
            <img
              src="/logo-gz-agency.png"
              alt="GZ Agency"
              className="h-12 sm:h-14 lg:h-16 w-auto object-contain"
            />
          </a>

          {/* Nav links — Servicios, Reseñas, Método, Contacto */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-normal transition-colors hover:opacity-80"
                style={{ color: '#1C2D43' }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right side — CTA + Language */}
          <div className="flex items-center gap-4">
            <Link
              to="/book"
              className="hidden sm:inline-flex items-stretch rounded-[9999px] overflow-hidden transition-all hover:opacity-95"
              style={{
                backgroundColor: '#142133',
                color: 'white',
                height: '44px',
              }}
            >
              <span className="flex items-center pl-6 pr-5 text-sm font-medium shrink-0">{t.nav.cta}</span>
              <span
                className="flex items-center justify-center rounded-full shrink-0 m-1"
                style={{ backgroundColor: 'white', width: '36px', height: '36px' }}
              >
                <ArrowRight className="w-3 h-3 text-[#142133]" />
              </span>
            </Link>

            {/* Language Switcher — pill, gris claro, ES activo = azul navy */}
            <button
              type="button"
              aria-label={lang === 'es' ? t.nav.ariaLangToEn : t.nav.ariaLangToEs}
              onClick={() => switchLang(lang === 'es' ? 'en' : 'es')}
              className="flex relative items-center rounded-full cursor-pointer select-none w-[92px] h-10 p-1 outline-none focus:outline-none"
              style={{
                backgroundColor: '#e0e0e0',
                border: '1px solid #c4c4c4',
              }}
            >
              <span
                className="absolute inset-y-1 left-1 w-[42px] rounded-full transition-transform duration-300 ease-out"
                style={{
                  backgroundColor: '#1C2D43',
                  transform: lang === 'es' ? 'translateX(0)' : 'translateX(42px)',
                }}
              />
              <span className="relative z-10 w-1/2 flex justify-center text-xs font-semibold" style={{ color: lang === 'es' ? 'white' : '#808080' }}>
                ES
              </span>
              <span className="relative z-10 w-1/2 flex justify-center text-xs font-normal" style={{ color: lang === 'en' ? 'white' : '#808080' }}>
                EN
              </span>
            </button>

            <button
              aria-label={mobileOpen ? t.nav.ariaMenuClose : t.nav.ariaMenuOpen}
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2.5 rounded-xl transition-colors"
              style={{ color: '#1C2D43' }}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div
            className="md:hidden pb-6 pt-2 border-t"
            style={{
              borderColor: 'rgba(0,0,0,0.08)',
              backgroundColor: scrolled ? 'transparent' : 'rgba(255,255,255,0.98)',
              backdropFilter: scrolled ? 'none' : 'blur(12px)',
            }}
          >
            <div className="flex flex-col gap-1 pt-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 text-sm font-medium"
                  style={{ color: '#1C2D43' }}
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="flex items-center gap-3 mt-4 px-4">
              <Link
                to="/book"
                onClick={() => setMobileOpen(false)}
                className="flex-1 inline-flex items-stretch rounded-[9999px] overflow-hidden"
                style={{
                  backgroundColor: '#142133',
                  color: 'white',
                  height: '44px',
                }}
              >
                <span className="flex items-center pl-6 pr-5 text-sm font-medium shrink-0">{t.nav.cta}</span>
                <span
                  className="flex items-center justify-center rounded-full shrink-0 m-1"
                  style={{ backgroundColor: 'white', width: '36px', height: '36px' }}
                >
                  <ArrowRight className="w-3 h-3 text-[#142133]" />
                </span>
              </Link>
              <button
                type="button"
                aria-label={lang === 'es' ? t.nav.ariaLangToEn : t.nav.ariaLangToEs}
                onClick={() => switchLang(lang === 'es' ? 'en' : 'es')}
                className="flex relative items-center rounded-full w-[92px] h-10 p-1 cursor-pointer select-none"
                style={{ backgroundColor: '#e0e0e0', border: '1px solid #c4c4c4' }}
              >
                <span
                  className="absolute inset-y-1 left-1 w-[42px] rounded-full transition-transform duration-300"
                  style={{
                    backgroundColor: '#1C2D43',
                    transform: lang === 'es' ? 'translateX(0)' : 'translateX(42px)',
                  }}
                />
                <span className="relative z-10 w-1/2 flex justify-center text-xs font-semibold" style={{ color: lang === 'es' ? 'white' : '#808080' }}>ES</span>
                <span className="relative z-10 w-1/2 flex justify-center text-xs font-normal" style={{ color: lang === 'en' ? 'white' : '#808080' }}>EN</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

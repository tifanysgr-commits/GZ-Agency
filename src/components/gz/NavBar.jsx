import React, { useState, useEffect } from 'react';
import { useLanguage } from './LanguageContext';
import { Menu, X } from 'lucide-react';

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
    { label: t.nav.forWhom, href: '#hero' },
    { label: t.nav.pricing, href: '#pricing' },
    { label: t.nav.videoTypes, href: '#video-types' },
  ];

  return (
    <nav
      className="sticky top-0 z-50 transition-all duration-300 overflow-x-hidden"
      style={{
        backgroundColor: scrolled ? 'rgba(239,234,230,0.95)' : 'rgba(239,234,230,0.88)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: scrolled ? '1px solid rgba(12,44,71,0.1)' : '1px solid transparent',
        boxShadow: scrolled ? '0 4px 30px rgba(12,44,71,0.1)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2.5">
          <div className="w-[88px] shrink-0" aria-hidden="true" />

          {/* Center links — desktop */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium transition-colors relative group/link"
                style={{ color: '#0C2C47' }}
                onMouseEnter={e => e.currentTarget.style.color = '#2D5652'}
                onMouseLeave={e => e.currentTarget.style.color = '#0C2C47'}
              >
                {link.label}
                <span
                  className="absolute -bottom-0.5 left-0 w-0 h-[1.5px] transition-all duration-300 group-hover/link:w-full"
                  style={{ backgroundColor: '#2D5652' }}
                />
              </a>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Language Switcher — click anywhere, slider transition */}
            <button
              type="button"
              onClick={() => switchLang(lang === 'es' ? 'en' : 'es')}
              className="hidden sm:flex relative items-center rounded-full cursor-pointer select-none w-[96px] h-10 p-1 outline-none focus:outline-none"
              style={{
                border: '1.5px solid rgba(12,44,71,0.15)',
                backgroundColor: 'rgba(12,44,71,0.04)',
              }}
            >
              <span
                className="absolute top-1/2 left-1 w-[46px] h-8 -translate-y-1/2 rounded-full transition-transform duration-300 ease-out"
                style={{
                  backgroundColor: '#0C2C47',
                  transform: lang === 'es' ? 'translateX(0) translateY(-50%)' : 'translateX(46px) translateY(-50%)',
                }}
              />
              <span className="relative z-10 w-1/2 flex justify-center text-xs font-bold" style={{ color: lang === 'es' ? '#EFEAE6' : 'rgba(12,44,71,0.45)' }}>
                ES
              </span>
              <span className="relative z-10 w-1/2 flex justify-center text-xs font-bold" style={{ color: lang === 'en' ? '#EFEAE6' : 'rgba(12,44,71,0.45)' }}>
                EN
              </span>
            </button>

            <a
              href="#pricing"
              className="hidden sm:inline-flex items-center px-5 py-2.5 text-sm font-semibold rounded-full transition-all hover:shadow-xl active:scale-[0.97]"
              style={{
                backgroundColor: '#2D5652',
                color: '#E2A54D',
                boxShadow: '0 4px 14px rgba(45,86,82,0.25)',
                transition: 'all 0.3s ease',
              }}
            >
              {t.nav.cta}
            </a>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2.5 rounded-xl transition-colors"
              style={{ color: '#0C2C47' }}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div
            className="md:hidden pb-6 pt-2 mt-1"
            style={{ borderTop: '1px solid rgba(12,44,71,0.1)' }}
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 text-sm font-medium rounded-xl"
                  style={{ color: '#0C2C47' }}
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="flex items-center gap-3 mt-4 px-4">
              <button
                type="button"
                onClick={() => switchLang(lang === 'es' ? 'en' : 'es')}
                className="flex relative items-center rounded-full w-[96px] h-10 p-1 cursor-pointer select-none outline-none focus:outline-none"
                style={{
                  border: '1.5px solid rgba(12,44,71,0.15)',
                  backgroundColor: 'rgba(12,44,71,0.04)',
                }}
              >
                <span
                  className="absolute top-1/2 left-1 w-[46px] h-8 -translate-y-1/2 rounded-full transition-transform duration-300 ease-out"
                  style={{
                    backgroundColor: '#0C2C47',
                    transform: lang === 'es' ? 'translateX(0) translateY(-50%)' : 'translateX(46px) translateY(-50%)',
                  }}
                />
                <span className="relative z-10 w-1/2 flex justify-center text-xs font-bold" style={{ color: lang === 'es' ? '#EFEAE6' : 'rgba(12,44,71,0.45)' }}>
                  ES
                </span>
                <span className="relative z-10 w-1/2 flex justify-center text-xs font-bold" style={{ color: lang === 'en' ? '#EFEAE6' : 'rgba(12,44,71,0.45)' }}>
                  EN
                </span>
              </button>
              <a
                href="#pricing"
                onClick={() => setMobileOpen(false)}
                className="flex-1 text-center px-5 py-2.5 text-sm font-semibold rounded-full"
                style={{ backgroundColor: '#2D5652', color: '#E2A54D' }}
              >
                {t.nav.cta}
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
import React, { useState, useEffect } from 'react';
import { useLanguage } from './LanguageContext';
import { Menu, X } from 'lucide-react';

const LOGO_URL = 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/699ad01ace6c66924ebbe714/d1ed0ee5c_logoGZ.png';

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
      className="sticky top-0 z-50 transition-all duration-300"
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
          {/* Logo — PNG image */}
          <a href="#" className="flex items-center group">
            <img
              src={LOGO_URL}
              alt="Gz Agency"
              className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03]"
              style={{ maxWidth: '160px' }}
            />
          </a>

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
            {/* Language Switcher — expanded hitbox, smooth transition */}
            <div
              className="hidden sm:flex items-center rounded-full cursor-pointer select-none"
              style={{
                border: '1.5px solid rgba(12,44,71,0.15)',
                backgroundColor: 'rgba(12,44,71,0.04)',
                padding: '3px',
              }}
            >
              {['es', 'en'].map((l) => (
                <button
                  key={l}
                  onClick={() => switchLang(l)}
                  className="relative px-4 py-2 text-xs font-bold rounded-full outline-none focus:outline-none"
                  style={{
                    transition: 'background-color 0.4s ease-in-out, color 0.4s ease-in-out, opacity 0.4s ease-in-out',
                    backgroundColor: lang === l ? '#0C2C47' : 'transparent',
                    color: lang === l ? '#EFEAE6' : 'rgba(12,44,71,0.45)',
                    minWidth: '42px',
                  }}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>

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
              <div
                className="flex items-center rounded-full"
                style={{ border: '1.5px solid rgba(12,44,71,0.15)', padding: '3px' }}
              >
                {['es', 'en'].map(l => (
                  <button
                    key={l}
                    onClick={() => switchLang(l)}
                    className="px-4 py-2 text-xs font-bold rounded-full"
                    style={{
                      transition: 'all 0.4s ease-in-out',
                      backgroundColor: lang === l ? '#0C2C47' : 'transparent',
                      color: lang === l ? '#EFEAE6' : 'rgba(12,44,71,0.45)',
                      minWidth: '42px',
                    }}
                  >
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>
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
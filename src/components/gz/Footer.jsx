import React from 'react';
import { useLanguage } from './LanguageContext';
import { Mail } from 'lucide-react';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer style={{ backgroundColor: '#0C2C47' }}>
      <div className="gz-mobile-shell max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-10">
          {/* Brand */}
          <div className="text-center lg:text-left">
            <div className="flex items-center gap-2 justify-center lg:justify-start mb-4">
              <div className="flex items-baseline gap-0.5">
                <span
                  className="font-black leading-none tracking-tighter text-3xl"
                  style={{ color: '#E2A54D', fontFamily: 'Georgia, serif', fontStyle: 'italic' }}
                >
                  G
                </span>
                <span
                  className="font-black leading-none tracking-tighter text-3xl"
                  style={{ color: '#EFEAE6', fontFamily: 'Georgia, serif', fontStyle: 'italic' }}
                >
                  z
                </span>
                <span className="font-black leading-none text-3xl" style={{ color: '#97D3CD' }}>.</span>
              </div>
              <span
                className="text-sm font-medium tracking-widest uppercase"
                style={{ color: 'rgba(239,234,230,0.6)', letterSpacing: '0.2em' }}
              >
                Agency
              </span>
            </div>
            <p className="text-sm max-w-xs" style={{ color: 'rgba(239,234,230,0.45)' }}>
              {t.footer.tagline}
            </p>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-center lg:items-end gap-2">
            <a
              href="mailto:hello@gz.agency"
              className="flex items-center gap-2 text-sm transition-colors"
              style={{ color: '#97D3CD' }}
            >
              <Mail className="w-4 h-4" />
              hello@gz.agency
            </a>
          </div>
        </div>

        <div
          className="mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(151,211,205,0.12)' }}
        >
          <p className="text-xs" style={{ color: 'rgba(239,234,230,0.3)' }}>{t.footer.copyright}</p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs transition-colors" style={{ color: 'rgba(239,234,230,0.3)' }}
              onMouseEnter={e => e.target.style.color = 'rgba(239,234,230,0.7)'}
              onMouseLeave={e => e.target.style.color = 'rgba(239,234,230,0.3)'}
            >{t.footer.privacy}</a>
            <a href="#" className="text-xs transition-colors" style={{ color: 'rgba(239,234,230,0.3)' }}
              onMouseEnter={e => e.target.style.color = 'rgba(239,234,230,0.7)'}
              onMouseLeave={e => e.target.style.color = 'rgba(239,234,230,0.3)'}
            >{t.footer.terms}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
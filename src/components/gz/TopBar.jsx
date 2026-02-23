import React from 'react';
import { useLanguage } from './LanguageContext';
import { Phone, Mail, Clock } from 'lucide-react';

export default function TopBar() {
  const { t } = useLanguage();

  return (
    <div className="w-full text-xs" style={{ backgroundColor: '#0C2C47', color: '#97D3CD' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center">
          <span className="flex items-center gap-1.5">
            <Phone className="w-3 h-3" />
            {t.topbar.phone}
          </span>
          <span className="flex items-center gap-1.5">
            <Mail className="w-3 h-3" />
            <a href={`mailto:${t.topbar.email}`} className="hover:text-white transition-colors">
              {t.topbar.email}
            </a>
          </span>
          <span className="hidden sm:flex items-center gap-1.5">
            <Clock className="w-3 h-3" />
            {t.topbar.hours}
          </span>
        </div>
        <div className="flex items-center gap-5">
          <a href="#portfolio" className="hover:text-white transition-colors">{t.topbar.portfolio}</a>
          <a href="#video-types" className="hover:text-white transition-colors">{t.topbar.about}</a>
          <a href="#pricing" className="hover:text-white transition-colors">{t.topbar.contact}</a>
        </div>
      </div>
    </div>
  );
}
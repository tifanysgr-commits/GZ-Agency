import React from 'react';
import { useLanguage } from './LanguageContext';
import { Phone, Mail, Clock } from 'lucide-react';

export default function TopBar() {
  const { t } = useLanguage();

  return (
    <div className="w-full min-h-[85px] text-base flex items-center" style={{ backgroundColor: '#0C2C47', color: '#97D3CD' }}>
      <a href="#" className="pl-4 sm:pl-6 lg:pl-8 pr-4 text-3xl font-bold shrink-0 text-white hover:text-white/90 transition-colors">
        GZ Agency
      </a>
      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full min-h-[85px] flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-5 sm:gap-8 flex-wrap justify-center">
          <span className="flex items-center gap-2">
            <Phone className="w-4 h-4 shrink-0" />
            <span className="text-[15px] sm:text-base">{t.topbar.phone}</span>
          </span>
          <span className="flex items-center gap-2">
            <Mail className="w-4 h-4 shrink-0" />
            <a href={`mailto:${t.topbar.email}`} className="hover:text-white transition-colors text-[15px] sm:text-base">
              {t.topbar.email}
            </a>
          </span>
          <span className="hidden sm:flex items-center gap-2">
            <Clock className="w-4 h-4 shrink-0" />
            <span className="text-base">{t.topbar.hours}</span>
          </span>
        </div>
        <div className="flex items-center gap-6 text-[15px] sm:text-base">
          <a href="#portfolio" className="hover:text-white transition-colors">{t.topbar.portfolio}</a>
          <a href="#video-types" className="hover:text-white transition-colors">{t.topbar.about}</a>
          <a href="#pricing" className="hover:text-white transition-colors">{t.topbar.contact}</a>
        </div>
      </div>
    </div>
  );
}
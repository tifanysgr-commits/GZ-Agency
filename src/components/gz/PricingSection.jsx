import React from 'react';
import { useLanguage } from './LanguageContext';
import { ArrowRight, ChevronDown } from 'lucide-react';

export default function PricingSection() {
  const { t, lang } = useLanguage();
  const HERO_CONTAINER_COLOR = '#142133';
  const PORTFOLIO_CTA_COLOR = '#0f2e44';
  const labels = {
    eyebrow: lang === 'es' ? 'Contáctenos' : 'Contact us',
    title: lang === 'es'
      ? 'Estaremos encantados\nde ofrecerle\nasesoramiento\npersonalizado.'
      : 'We would be delighted\nto offer you\npersonalized\nadvice.',
    name: lang === 'es' ? 'Nombre completo*' : 'Full name*',
    email: lang === 'es' ? 'Dirección de correo electrónico*' : 'Email address*',
    phone: lang === 'es' ? 'Número de teléfono*' : 'Phone number*',
    company: lang === 'es' ? 'Nombre de empresa*' : 'Company name*',
    help: lang === 'es' ? '¿Cómo podemos ayudarle?*' : 'How can we help?*',
    message: lang === 'es' ? 'Su mensaje o pregunta*' : 'Your message or question*',
    cta: lang === 'es' ? 'No funciona' : 'Not working',
  };

  return (
    <section id="pricing" className="py-20 sm:py-24" style={{ backgroundColor: '#EFEAE6' }}>
      <div className="mx-auto max-w-[1080px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-8 lg:gap-10 items-start">
          <div className="max-w-[560px]">
            <div className="inline-flex items-center gap-2 mb-3 text-[#d7ece8]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#d7ece8]" />
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.08em]">{labels.eyebrow}</span>
            </div>
            <h2
              className="leading-[1.05] mb-6 whitespace-pre-line"
              style={{ fontFamily: '"Crimson Text", serif', fontSize: 'clamp(2rem, 4vw, 3.6rem)', fontWeight: 400, color: HERO_CONTAINER_COLOR }}
            >
              {labels.title}
            </h2>

            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input type="text" placeholder={labels.name} className="h-11 rounded-md px-3 text-sm text-[#f4f4f2] placeholder:text-[#f4f4f2]/80 border border-white/10 outline-none" style={{ backgroundColor: PORTFOLIO_CTA_COLOR }} />
                <input type="email" placeholder={labels.email} className="h-11 rounded-md px-3 text-sm text-[#f4f4f2] placeholder:text-[#f4f4f2]/80 border border-white/10 outline-none" style={{ backgroundColor: PORTFOLIO_CTA_COLOR }} />
                <input type="tel" placeholder={labels.phone} className="h-11 rounded-md px-3 text-sm text-[#f4f4f2] placeholder:text-[#f4f4f2]/80 border border-white/10 outline-none" style={{ backgroundColor: PORTFOLIO_CTA_COLOR }} />
                <input type="text" placeholder={labels.company} className="h-11 rounded-md px-3 text-sm text-[#f4f4f2] placeholder:text-[#f4f4f2]/80 border border-white/10 outline-none" style={{ backgroundColor: PORTFOLIO_CTA_COLOR }} />
              </div>

              <div className="relative">
                <select className="w-full h-11 rounded-md px-3 pr-10 text-sm text-[#f4f4f2] border border-white/10 appearance-none outline-none" style={{ backgroundColor: PORTFOLIO_CTA_COLOR }}>
                  <option>{labels.help}</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/60 pointer-events-none" />
              </div>

              <textarea
                placeholder={labels.message}
                className="w-full min-h-[118px] rounded-md px-3 py-2.5 text-sm text-[#f4f4f2] placeholder:text-[#f4f4f2]/80 border border-white/10 outline-none resize-none"
                style={{ backgroundColor: PORTFOLIO_CTA_COLOR }}
              />

              <a
                href={`mailto:hello@gz.agency?subject=${encodeURIComponent(t.services.cta)}`}
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white border border-white/10"
                style={{ backgroundColor: HERO_CONTAINER_COLOR }}
              >
                {labels.cta}
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#f2f0ea]">
                  <ArrowRight className="w-3 h-3" style={{ color: HERO_CONTAINER_COLOR }} />
                </span>
              </a>
            </form>
          </div>

          <div className="min-h-[420px] rounded-[22px] border border-[#d5d8db] bg-[#efefef]" />
        </div>
      </div>
    </section>
  );
}
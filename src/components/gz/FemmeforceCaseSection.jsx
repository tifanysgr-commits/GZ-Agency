import React from 'react';
import { useLanguage } from './LanguageContext';
import { ArrowUpRight } from 'lucide-react';

const caseBtnStyle = {
  backgroundColor: '#e5e7eb',
  color: '#111827',
  border: '1px solid rgba(0,0,0,0.06)',
  boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
};

export default function FemmeforceCaseSection() {
  const { t } = useLanguage();

  return (
    <section id="femmeforce" className="py-20 sm:py-24 bg-white">
      <div className="gz-mobile-shell max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header — misma estética que portfolio */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 text-[#213743] mb-4">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#12323f]" />
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.08em]">{t.caseStudies.eyebrow}</span>
          </div>
          <h2
            className="text-[#111827] leading-tight"
            style={{
              fontFamily: '"Crimson Text", serif',
              fontWeight: 400,
              fontSize: 'clamp(1.3rem, 2.5vw, 2.4rem)',
            }}
          >
            {t.caseStudies.title}
          </h2>
          <p className="mt-3 text-base max-w-2xl mx-auto" style={{ color: 'rgba(20,40,64,0.58)' }}>
            {t.caseStudies.subtitle}
          </p>
        </div>

        <div className="space-y-24 sm:space-y-28">
        {/* ——— Femmeforce ——— */}
        <div>
          <div className="w-full aspect-[16/10] sm:aspect-[16/9] rounded-xl overflow-hidden mb-10 sm:mb-12">
            <img src="/images/femmeforce-hero.png" alt="Femmeforce - Gimnasio femenino" className="w-full h-full object-cover" />
          </div>
          <h2 className="text-[1.75rem] sm:text-[2.25rem] font-bold text-[#111827] leading-tight mb-6 text-center" style={{ fontFamily: '"Figtree", sans-serif' }}>
            {t.femmeforce.title}
          </h2>
          <p className="text-[0.95rem] sm:text-[1rem] text-[#374151] leading-relaxed mb-8 max-w-[680px] mx-auto text-center">
            {t.femmeforce.description}
          </p>
          <div className="flex justify-center mb-12 sm:mb-14">
            <a href="https://femme-force.nl/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-90" style={caseBtnStyle}>
              {t.femmeforce.visitBtn}
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
            <div className="aspect-square sm:aspect-[4/3] overflow-hidden">
              <img src="/images/femmeforce-gym.jpg" alt="Entrenamiento en Femmeforce" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-square sm:aspect-[4/3] overflow-hidden">
              <img src="/images/femmeforce-ropes.png" alt="Battle ropes en Femmeforce" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* ——— Arie Keijzer ——— */}
        <div id="ariekeijzer">
          <div className="w-full aspect-[16/10] sm:aspect-[16/9] rounded-xl overflow-hidden mb-10 sm:mb-12">
            <img src="/images/ariekeijzer-hero.png" alt="Arie Keijzer - Tienda de pianos" className="w-full h-full object-cover" />
          </div>
          <h2 className="text-[1.75rem] sm:text-[2.25rem] font-bold text-[#111827] leading-tight mb-6 text-center" style={{ fontFamily: '"Figtree", sans-serif' }}>
            {t.ariekeijzer.title}
          </h2>
          <p className="text-[0.95rem] sm:text-[1rem] text-[#374151] leading-relaxed mb-8 max-w-[680px] mx-auto text-center">
            {t.ariekeijzer.description}
          </p>
          <div className="flex justify-center mb-12 sm:mb-14">
            <a href="https://www.ariekeijzer.nl/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-90" style={caseBtnStyle}>
              {t.ariekeijzer.visitBtn}
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
            <div className="aspect-square sm:aspect-[4/3] overflow-hidden">
              <img src="/images/ariekeijzer-pianos.png" alt="Pianos Steinway y Yamaha - Arie Keijzer" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-square sm:aspect-[4/3] overflow-hidden">
              <img src="/images/ariekeijzer-workshop.png" alt="Taller de afinación - Arie Keijzer" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}

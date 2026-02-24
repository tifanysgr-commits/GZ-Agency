import React, { useEffect, useRef } from 'react';
import { useLanguage } from './LanguageContext';
import { ArrowRight, Play, Sparkles } from 'lucide-react';
import logoGZ from '../../assets/logoGZ.png';

const GOOGLE_CALENDAR_BOOKING_URL = 'https://calendar.app.google/DeeZzudAuKoAVaRk8';

export default function HeroSection() {
  const { t } = useLanguage();
  const parallaxRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!parallaxRef.current) return;
      const y = window.scrollY;
      // Subtle parallax on decorative blobs
      const blobs = parallaxRef.current.querySelectorAll('[data-parallax]');
      blobs.forEach((el, i) => {
        const speed = i % 2 === 0 ? 0.06 : 0.04;
        el.style.transform = el.getAttribute('data-base') + ` translateY(${y * speed}px)`;
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="hero"
      ref={parallaxRef}
      className="relative overflow-x-hidden"
      style={{
        backgroundColor: '#EFEAE6',
        zIndex: 2,
        position: 'relative',
      }}
    >
      {/* ── Decorative geometric orbs (parallax) ── */}
      {/* Top-right aqua orb */}
      <div
        data-parallax="true"
        data-base="translate(35%, -35%)"
        className="absolute top-0 right-0 w-[650px] h-[650px] rounded-full blur-3xl pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(151,211,205,0.35) 0%, transparent 68%)',
          transform: 'translate(35%, -35%)',
          opacity: 0.9,
        }}
      />
      {/* Bottom-left yellow orb */}
      <div
        data-parallax="true"
        data-base="translate(-35%, 30%)"
        className="absolute bottom-0 left-0 w-[480px] h-[480px] rounded-full blur-3xl pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(226,165,77,0.22) 0%, transparent 68%)',
          transform: 'translate(-35%, 30%)',
        }}
      />
      {/* Center-left green accent */}
      <div
        data-parallax="true"
        data-base="translate(-50%, -50%)"
        className="absolute top-1/2 left-0 w-[200px] h-[200px] rounded-full blur-2xl pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(45,86,82,0.08) 0%, transparent 70%)',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* ── Geometric line decorations ── */}
      <div className="absolute top-16 left-10 pointer-events-none opacity-[0.06] hidden lg:block">
        <svg width="180" height="180" viewBox="0 0 180 180" fill="none">
          <circle cx="90" cy="90" r="88" stroke="#0C2C47" strokeWidth="1.5" />
          <circle cx="90" cy="90" r="60" stroke="#0C2C47" strokeWidth="1" />
          <line x1="90" y1="2" x2="90" y2="178" stroke="#0C2C47" strokeWidth="0.8" />
          <line x1="2" y1="90" x2="178" y2="90" stroke="#0C2C47" strokeWidth="0.8" />
        </svg>
      </div>
      <div className="absolute bottom-20 right-12 pointer-events-none opacity-[0.07] hidden lg:block">
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
          <rect x="10" y="10" width="100" height="100" rx="8" stroke="#2D5652" strokeWidth="1.5" />
          <rect x="30" y="30" width="60" height="60" rx="4" stroke="#2D5652" strokeWidth="1" />
          <rect x="50" y="50" width="20" height="20" rx="2" fill="#E2A54D" fillOpacity="0.6" />
        </svg>
      </div>
      {/* Scattered dots top-right */}
      <div className="absolute top-10 right-24 pointer-events-none opacity-[0.08] hidden md:block">
        <svg width="90" height="90" viewBox="0 0 90 90" fill="none">
          {[10,30,50,70].map(x => [10,30,50,70].map(y => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="2.5" fill="#0C2C47" />
          )))}
        </svg>
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32 sm:pt-32 sm:pb-40 lg:pt-40 lg:pb-48 text-center">
        {/* Logo — primera diapositiva */}
        <div className="flex justify-center mb-8 sm:mb-10">
          <img
            src={logoGZ}
            alt="GZ Agency"
            className="h-28 sm:h-36 lg:h-44 xl:h-52 w-auto object-contain drop-shadow-lg"
            style={{ maxWidth: 'min(520px, 90vw)' }}
          />
        </div>
        {/* Eyebrow */}
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-10 border"
          style={{
            backgroundColor: 'rgba(151,211,205,0.18)',
            borderColor: 'rgba(151,211,205,0.5)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <Sparkles className="w-3.5 h-3.5" style={{ color: '#2D5652' }} />
          <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#2D5652' }}>
            {t.hero.eyebrow}
          </span>
        </div>

        {/* Main headline — 40px, Figtree, bold phrase */}
        <h1
          className="leading-[1.15] tracking-tight mb-6"
          style={{
            color: '#0C2C47',
            fontSize: '40px',
            fontFamily: '"Figtree", sans-serif',
          }}
        >
          {t.hero.titleBefore}
          <strong className="font-bold">{t.hero.titleBold}</strong>
          {t.hero.titleAfter}
        </h1>

        {/* Subtitle — resalta innovadora / innovative */}
        <p
          className="text-lg sm:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
          style={{ color: 'rgba(12,44,71,0.6)' }}
        >
          {t.hero.subtitleBefore}
          <strong className="font-bold" style={{ color: 'rgba(12,44,71,0.85)' }}>{t.hero.subtitleBold}</strong>
          {t.hero.subtitleAfter}
        </p>

        {/* CTAs */}
        <div className="flex flex-col items-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={GOOGLE_CALENDAR_BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2.5 px-10 py-5 font-semibold rounded-full text-base w-full sm:w-auto min-h-[56px] transition-all duration-200 hover:shadow-xl active:scale-[0.95]"
              style={{
                backgroundColor: '#2D5652',
                color: '#E2A54D',
                boxShadow: '0 4px 20px rgba(45,86,82,0.3)',
              }}
            >
              {t.hero.cta}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a
              href="#portfolio"
              className="group inline-flex items-center gap-3 px-8 py-4 font-medium rounded-full border transition-all hover:shadow-md active:scale-[0.98] text-base"
              style={{
                backgroundColor: 'rgba(12,44,71,0.04)',
                borderColor: 'rgba(12,44,71,0.15)',
                color: '#0C2C47',
              }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'rgba(12,44,71,0.08)' }}
              >
                <Play className="w-3.5 h-3.5 ml-0.5" style={{ fill: '#0C2C47', color: '#0C2C47' }} />
              </div>
              {t.hero.secondary}
            </a>
          </div>
          <p className="mt-4 w-full max-w-xl mx-auto px-4 text-sm text-center" style={{ color: '#475569' }}>
            {t.hero.ctaCaption}
          </p>
          <p className="mt-1 text-xs text-center" style={{ color: '#475569', opacity: 0.9 }}>
            {t.hero.bookingHint}
          </p>
        </div>

        {/* Trust row */}
        <div className="mt-16 flex flex-col items-center gap-4">
          <div className="flex -space-x-2.5">
            {[
              'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face',
              'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
              'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
              'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
            ].map((src, i) => (
              <img
                key={i}
                src={src}
                alt=""
                className="w-10 h-10 rounded-full object-cover"
                style={{ border: '2.5px solid #EFEAE6' }}
              />
            ))}
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#0C2C47', border: '2.5px solid #EFEAE6' }}
            >
              <span className="text-white text-xs font-bold">+50</span>
            </div>
          </div>
          <p className="text-sm font-medium" style={{ color: 'rgba(12,44,71,0.5)' }}>{t.hero.trusted}</p>
        </div>
      </div>
    </section>
  );
}
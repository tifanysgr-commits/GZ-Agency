import React from 'react';
import { useLanguage } from './LanguageContext';
import { ArrowRight } from 'lucide-react';

const GOOGLE_CALENDAR_BOOKING_URL = 'https://calendar.app.google/DeeZzudAuKoAVaRk8';

// Logos para el carrusel — URLs públicas o SVG placeholder
const TRUST_LOGOS = [
  { name: 'Notion', src: 'https://logo.clearbit.com/notion.so', alt: 'Notion' },
  { name: 'uitblingend', src: null, alt: 'uitblingend' }, // Text-based, no official logo
  { name: 'Google', src: 'https://logo.clearbit.com/google.com', alt: 'Google' },
  { name: 'Base 44', src: 'https://base44.com/logo_v2.svg', alt: 'Base 44' },
  { name: 'Revolut', src: 'https://logo.clearbit.com/revolut.com', alt: 'Revolut' },
];

function LogoItem({ item }) {
  const [imgError, setImgError] = React.useState(false);
  if (item.src && !imgError) {
    return (
      <div className="relative flex items-center justify-center h-10 min-w-[80px]">
        <img
          src={item.src}
          alt={item.alt}
          className="h-8 w-auto object-contain opacity-80 grayscale hover:opacity-100 hover:grayscale-0 transition-all"
          onError={() => setImgError(true)}
        />
      </div>
    );
  }
  return (
    <span
      className="text-sm font-semibold px-4 whitespace-nowrap"
      style={{ color: '#4a5568' }}
    >
      {item.name}
    </span>
  );
}

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section
      id="hero"
      className="relative overflow-x-hidden bg-white"
      style={{ zIndex: 2 }}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 lg:pt-28 lg:pb-28" style={{ maxWidth: '960px', width: '100%' }}>
        {/* Bloque principal — #142133, ancho fijo menor */}
        <div
          className="relative flex flex-col lg:flex-row overflow-hidden w-full"
          style={{
            backgroundColor: '#142133',
            borderRadius: '24px',
            minHeight: '360px',
            width: '100%',
          }}
        >
          {/* Contenido izquierdo */}
          <div className="flex-1 pt-5 pb-6 pl-5 pr-8 lg:pt-6 lg:pb-8 lg:pl-6 lg:pr-12 xl:pt-8 xl:pb-10 xl:pl-8 xl:pr-16 flex flex-col justify-center">
            {/* Rating — imagen estrellas + calificación */}
            <div className="mb-2">
              <img
                src="/rating-stars.png"
                alt={t.hero.rating}
                className="h-8 w-auto object-contain object-left"
                style={{ mixBlendMode: 'lighten' }}
              />
            </div>

            {/* Headline — primera línea grande, segunda línea 2x menor, salto después del "-" */}
            <h1 className="font-light leading-tight text-white mb-6" style={{ fontFamily: '"Crimson Text", serif', fontWeight: 300, letterSpacing: '-0.03em' }}>
              <span style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}>
                {t.hero.titleBefore}
                {t.hero.titleBold && <strong>{t.hero.titleBold}</strong>}
              </span>
              <br />
              <span style={{ fontSize: 'clamp(1rem, 3vw, 1.75rem)' }}>
                {t.hero.titleAfter}
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-white/90 mb-10 max-w-xl">
              {t.hero.subtitleBefore}
              {t.hero.subtitleBold && <strong>{t.hero.subtitleBold}</strong>}
              <br />
              {t.hero.subtitleAfter}
            </p>

            {/* CTAs — pill blanco + Mira lo que hacemos juntos */}
            <div className="flex flex-col gap-1">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                <a
                  href={GOOGLE_CALENDAR_BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex w-fit shrink-0 items-stretch rounded-[9999px] overflow-hidden transition-all hover:opacity-95"
                  style={{
                    backgroundColor: 'white',
                    color: '#262626',
                    height: '40px',
                  }}
                >
                  <span className="flex items-center pl-5 pr-4 text-xs font-medium shrink-0">{t.hero.cta}</span>
                  <span
                    className="flex items-center justify-center rounded-full shrink-0 m-0.5"
                    style={{ backgroundColor: '#142133', width: '32px', height: '32px' }}
                  >
                    <ArrowRight className="w-3 h-3 text-white" />
                  </span>
                </a>
                <a
                  href="#portfolio"
                  className="group inline-flex items-center py-2 sm:py-0 text-white font-medium transition-colors hover:opacity-90 whitespace-nowrap"
                >
                  {t.hero.secondary}
                </a>
              </div>
            </div>
          </div>

          {/* Placeholder derecha — gris #e0e0e0, borde azul oscuro */}
          <div
            className="hidden lg:block w-full lg:w-[32%] min-h-[280px] shrink-0 m-4 mr-6"
            style={{
              backgroundColor: '#e0e0e0',
              border: '1px solid #142133',
              borderRadius: '16px',
            }}
          />
        </div>

        {/* Trust bar + Logos carrusel */}
        <div className="mt-14 text-center">
          <p className="text-sm font-medium mb-8" style={{ color: '#4a5568' }}>
            {t.hero.trusted}
          </p>

          {/* Carrusel infinito de logos */}
          <div className="w-full overflow-hidden py-4">
            <div className="logos-track flex items-center gap-12 lg:gap-16">
              {[...TRUST_LOGOS, ...TRUST_LOGOS].map((item, i) => (
                <div key={i} className="flex items-center justify-center shrink-0" style={{ minWidth: '100px' }}>
                  <LogoItem item={item} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes logo-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .logos-track {
          animation: logo-scroll 25s linear infinite;
        }
        .logos-track:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}

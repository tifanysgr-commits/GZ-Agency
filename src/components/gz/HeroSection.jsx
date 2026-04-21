import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from './LanguageContext';
import { ArrowRight } from 'lucide-react';

// Logos para el carrusel
const TRUST_LOGOS = [
  { name: 'Base 44', src: '/9tjNavYDwf1uvAmwMoCO5MMqLw.png', alt: 'Base 44', imgClassName: 'h-8 scale-[3.4] -translate-y-1' },
  { name: 'Notion', src: '/PKZp5ymnuOb3P7svJeb3d6PQV8.png', alt: 'Notion', imgClassName: 'h-12' },
  { name: 'Revolut', src: '/Revolut-logo-jpg-copia.png', alt: 'Revolut', imgClassName: 'h-8 scale-[2.2] -translate-y-1' },
  { name: 'Google', src: '/w5ONtbohOour7QXxFtroCRd58U.png', alt: 'Google', imgClassName: 'h-7 -translate-y-0.5' },
];

const HERO_FIRST_SLIDE_BG = encodeURI('/videos/Captura de pantalla 2026-03-02 a las 11.59.25.png');
const HERO_FIRST_SLIDE_VIDEO = '/videos/Carrusel.mov';

function LogoItem({ item }) {
  const [imgError, setImgError] = React.useState(false);
  if (item.src && !imgError) {
    return (
      <div className="relative flex items-center justify-center h-16 min-w-[180px]">
        <img
          src={item.src}
          alt={item.alt}
          className={`block w-auto object-contain origin-center ${item.imgClassName || 'h-10'}`}
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

const HERO_VARIANT_A = { bg: '#142133', panelBg: '#e0e0e0', panelBorder: '#142133', ctaBg: 'white', ctaColor: '#262626', circleBg: '#142133', circleIcon: 'white', panelRadius: '16px', panelCurve: false };
const HERO_VARIANT_B = { bg: '#102025', panelBg: '#F5F7F8', panelBorder: '#102025', ctaBg: '#102025', ctaColor: 'white', circleBg: 'white', circleIcon: '#102025', panelRadius: '16px', panelCurve: true };

export default function HeroSection() {
  const { t } = useLanguage();
  const [activeHeroSlide, setActiveHeroSlide] = React.useState(0);
  const [activeVariant, setActiveVariant] = React.useState(0);

  React.useEffect(() => {
    const slideInterval = window.setInterval(() => {
      setActiveHeroSlide((prev) => (prev + 1) % 2);
    }, 5000);
    return () => window.clearInterval(slideInterval);
  }, []);

  React.useEffect(() => {
    const variantInterval = window.setInterval(() => {
      setActiveVariant((prev) => (prev + 1) % 2);
    }, 3500);
    return () => window.clearInterval(variantInterval);
  }, []);

  const v = activeVariant === 0 ? HERO_VARIANT_A : HERO_VARIANT_B;
  const isAlt = activeVariant === 1;

  return (
    <section
      id="hero"
      className="relative overflow-x-hidden bg-white"
      style={{ zIndex: 2 }}
    >
      <div className="gz-mobile-shell mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 lg:pt-28 lg:pb-28" style={{ maxWidth: '960px', width: '100%' }}>
        {/* Bloque principal — alterna entre #142133 y #102025 */}
        <div
          className="relative flex flex-col lg:flex-row overflow-hidden w-full"
          style={{
            backgroundColor: v.bg,
            borderRadius: '24px',
            minHeight: '360px',
            width: '100%',
            transition: 'background-color 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          {/* Contenido izquierdo */}
          <div className="flex-1 pt-6 pb-6 pl-5 pr-6 sm:pr-8 lg:pt-6 lg:pb-8 lg:pl-6 lg:pr-12 xl:pt-8 xl:pb-10 xl:pl-8 xl:pr-16 flex flex-col justify-center">
            {/* Rating — imagen estrellas + calificación */}
            <div className="mb-2">
              <img
                src="/rating-stars.png"
                loading="eager"
                fetchPriority="high"
                alt={t.hero.rating}
                className="h-8 w-auto object-contain object-left"
                style={{ mixBlendMode: 'lighten' }}
              />
            </div>

            {/* Headline — crossfade elegante, grid para que el contenedor se ajuste al texto */}
            <div className="grid mb-6" style={{ gridTemplateColumns: '1fr', gridTemplateRows: 'min-content' }}>
              <h1
                className="font-light leading-tight text-white col-start-1 row-start-1 min-w-0"
                style={{
                  fontFamily: '"Crimson Text", serif',
                  fontWeight: 300,
                  letterSpacing: '-0.03em',
                  opacity: isAlt ? 0 : 1,
                  pointerEvents: isAlt ? 'none' : 'auto',
                  transition: 'opacity 0.9s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                <span style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}>
                  {t.hero.titleBefore}
                  {t.hero.titleBold && <strong>{t.hero.titleBold}</strong>}
                </span>
                <br />
                <span style={{ fontSize: 'clamp(1rem, 3vw, 1.75rem)' }}>{t.hero.titleAfter}</span>
              </h1>
              <h1
                className="font-light leading-tight text-white col-start-1 row-start-1 min-w-0"
                style={{
                  fontFamily: '"Crimson Text", serif',
                  fontWeight: 300,
                  letterSpacing: '-0.03em',
                  opacity: isAlt ? 1 : 0,
                  pointerEvents: isAlt ? 'auto' : 'none',
                  transition: 'opacity 0.9s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                <span style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}>{t.hero.altTitle}</span>
              </h1>
            </div>

            {/* Subheadline — crossfade elegante, grid para ajuste natural */}
            <div className="grid mb-8 sm:mb-10 max-w-xl" style={{ gridTemplateColumns: '1fr', gridTemplateRows: 'min-content' }}>
              <p
                className="text-[0.98rem] sm:text-lg text-white/90 col-start-1 row-start-1 min-w-0"
                style={{
                  opacity: isAlt ? 0 : 1,
                  pointerEvents: isAlt ? 'none' : 'auto',
                  transition: 'opacity 0.9s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                {t.hero.subtitleBefore}
                {t.hero.subtitleBold && <strong>{t.hero.subtitleBold}</strong>}
                <br />
                {t.hero.subtitleAfter}
              </p>
              <p
                className="text-[0.98rem] sm:text-lg text-white/90 col-start-1 row-start-1 min-w-0"
                style={{
                  opacity: isAlt ? 1 : 0,
                  pointerEvents: isAlt ? 'auto' : 'none',
                  transition: 'opacity 0.9s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                {t.hero.altSubtitle}
              </p>
            </div>

            {/* CTAs — botón siempre con estética primera (blanco + círculo azul), solo cambia el texto */}
            <div className="flex flex-col gap-1">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                <Link
                  to="/book"
                  className="group inline-flex w-fit min-h-[44px] shrink-0 items-center rounded-[9999px] overflow-hidden transition-all hover:opacity-95"
                  style={{
                    backgroundColor: 'white',
                    color: '#262626',
                    height: '44px',
                  }}
                >
                  <span className="flex items-center pl-5 pr-4 text-xs font-medium shrink-0">
                    {isAlt ? t.hero.altCta : t.hero.cta}
                  </span>
                  <span
                    className="flex items-center justify-center rounded-full shrink-0 m-1"
                    style={{ backgroundColor: '#142133', width: '36px', height: '36px' }}
                  >
                    <ArrowRight className="w-3 h-3 text-white" />
                  </span>
                </Link>
                <a
                  href={isAlt ? '#femmeforce' : '#portfolio'}
                  className="group inline-flex items-center py-2 sm:py-0 text-white font-medium transition-colors hover:opacity-90 whitespace-nowrap"
                >
                  {t.hero.secondary}
                </a>
              </div>
            </div>
          </div>

          {/* Slider derecha — 2 diapositivas, estética según variante */}
          <div
            className="hidden lg:block w-full lg:w-[32%] min-h-[280px] shrink-0 m-4 mr-6 relative overflow-hidden"
            style={{
              backgroundColor: v.panelBg,
              border: `1px solid ${v.panelBorder}`,
              borderRadius: v.panelCurve ? '24px 0 0 24px' : '16px',
              transition: 'background-color 1.2s cubic-bezier(0.4, 0, 0.2, 1), border-color 1.2s cubic-bezier(0.4, 0, 0.2, 1), border-radius 1s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <div
              className="flex h-full w-[200%] transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${activeHeroSlide * 50}%)` }}
            >
              <div className="w-1/2 h-full">
                <div
                  className="h-full w-full"
                  style={{
                    backgroundImage: `url("${HERO_FIRST_SLIDE_BG}")`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                  role="img"
                  aria-label={t.hero.slider.title}
                />
              </div>

              <div className="w-1/2 h-full">
                <video
                  src={HERO_FIRST_SLIDE_VIDEO}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover"
                  aria-label="Video carrusel de GZ Agency"
                />
              </div>
            </div>

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2">
              {[0, 1].map((dot) => (
                <button
                  key={dot}
                  type="button"
                  aria-label={`Ir a diapositiva ${dot + 1}`}
                  onClick={() => setActiveHeroSlide(dot)}
                  className="h-2 rounded-full"
                  style={{
                    width: activeHeroSlide === dot ? 24 : 8,
                    backgroundColor: activeHeroSlide === dot ? v.panelBorder : `${v.panelBorder}66`,
                    transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1), background-color 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                />
              ))}
            </div>
          </div>
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
                <div key={i} className="flex items-center justify-center shrink-0" style={{ minWidth: '180px' }}>
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

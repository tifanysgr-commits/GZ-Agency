import React from 'react';
import { useLanguage } from './LanguageContext';
import { ArrowRight } from 'lucide-react';

// Logos para el carrusel
const TRUST_LOGOS = [
  { name: 'Base 44', src: '/9tjNavYDwf1uvAmwMoCO5MMqLw.png', alt: 'Base 44', imgClassName: 'h-8 scale-[3.4] -translate-y-1' },
  { name: 'Notion', src: '/PKZp5ymnuOb3P7svJeb3d6PQV8.png', alt: 'Notion', imgClassName: 'h-10' },
  { name: 'Revolut', src: '/Revolut-logo-jpg-copia.png', alt: 'Revolut', imgClassName: 'h-8 scale-[2.2] -translate-y-5' },
  { name: 'Google', src: '/w5ONtbohOour7QXxFtroCRd58U.png', alt: 'Google', imgClassName: 'h-7 -translate-y-0.5' },
];

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

export default function HeroSection() {
  const { t } = useLanguage();
  const [activeHeroSlide, setActiveHeroSlide] = React.useState(0);

  React.useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveHeroSlide((prev) => (prev + 1) % 2);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <section
      id="hero"
      className="relative overflow-x-hidden bg-white"
      style={{ zIndex: 2 }}
    >
      <div className="gz-mobile-shell mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 lg:pt-28 lg:pb-28" style={{ maxWidth: '960px', width: '100%' }}>
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
          <div className="flex-1 pt-6 pb-6 pl-5 pr-6 sm:pr-8 lg:pt-6 lg:pb-8 lg:pl-6 lg:pr-12 xl:pt-8 xl:pb-10 xl:pl-8 xl:pr-16 flex flex-col justify-center">
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
            <p className="text-[0.98rem] sm:text-lg text-white/90 mb-8 sm:mb-10 max-w-xl">
              {t.hero.subtitleBefore}
              {t.hero.subtitleBold && <strong>{t.hero.subtitleBold}</strong>}
              <br />
              {t.hero.subtitleAfter}
            </p>

            {/* CTAs — pill blanco + Mira lo que hacemos juntos */}
            <div className="flex flex-col gap-1">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                <a
                  href="/book"
                  className="group inline-flex w-fit min-h-[44px] shrink-0 items-stretch rounded-[9999px] overflow-hidden transition-all hover:opacity-95"
                  style={{
                    backgroundColor: 'white',
                    color: '#262626',
                    height: '44px',
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

          {/* Slider derecha — 2 diapositivas */}
          <div
            className="hidden lg:block w-full lg:w-[32%] min-h-[280px] shrink-0 m-4 mr-6 relative overflow-hidden"
            style={{
              backgroundColor: '#e0e0e0',
              border: '1px solid #142133',
              borderRadius: '16px',
            }}
          >
            <div
              className="flex h-full w-[200%] transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${activeHeroSlide * 50}%)` }}
            >
              <div className="w-1/2 h-full p-4 bg-[#dde3ea]">
                <div className="h-full w-full rounded-xl border border-[#8ea9c8] bg-white/70 p-4 flex flex-col justify-between">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.12em] text-[#142133]/70 mb-2">{t.hero.slider.preview}</p>
                    <h3 className="text-[#142133] text-lg leading-tight font-semibold">
                      {t.hero.slider.title}
                    </h3>
                    <p className="text-xs text-[#142133]/80 mt-2">
                      {t.hero.slider.desc}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="rounded-lg bg-[#142133] text-white text-xs p-2 text-center">{t.hero.slider.tags[0]}</div>
                    <div className="rounded-lg bg-[#142133] text-white text-xs p-2 text-center">{t.hero.slider.tags[1]}</div>
                    <div className="rounded-lg bg-[#142133] text-white text-xs p-2 text-center">{t.hero.slider.tags[2]}</div>
                    <div className="rounded-lg bg-[#142133] text-white text-xs p-2 text-center">{t.hero.slider.tags[3]}</div>
                  </div>
                </div>
              </div>

              <div className="w-1/2 h-full p-2 bg-[#e7ebf0]">
                <img
                  src="/hero-slide-2-comparativa.png"
                  alt="Comparativa entre agencias tradicionales y GZ Agency"
                  className="w-full h-full object-cover rounded-xl border border-[#8ea9c8]"
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
                  className={`h-2 rounded-full transition-all ${activeHeroSlide === dot ? 'w-6 bg-[#142133]' : 'w-2 bg-[#142133]/40'}`}
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

import React, { useRef, useEffect, useState } from 'react';
import { useLanguage, portfolioPackages } from './LanguageContext';
import { Check, ArrowRight, MessageCircle, Volume2, VolumeX, Clock } from 'lucide-react';

function PackageCard({ pkg, index, lang, t }) {
  const cardRef = useRef(null);
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);
  const [isActive, setIsActive] = useState(false);

  const isEven = index % 2 === 0;
  const title = lang === 'es' ? pkg.titleEs : pkg.titleEn;
  const category = lang === 'es' ? pkg.categoryEs : pkg.categoryEn;
  const desc = lang === 'es' ? pkg.descEs : pkg.descEn;
  const features = lang === 'es' ? pkg.featuresEs : pkg.featuresEn;
  const priceLabel = lang === 'es' ? pkg.priceLabel : pkg.priceLabelEn;

  // Mobile scroll-trigger
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (!isMobile) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const active = entry.intersectionRatio > 0.55;
        setIsActive(active);
        setMuted(!active);
        if (videoRef.current) {
          videoRef.current.muted = !active;
          if (active) videoRef.current.play().catch(() => {});
        }
      },
      { threshold: [0.3, 0.55, 0.8] }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseEnter = () => {
    if (window.innerWidth < 768) return;
    setIsActive(true);
    setMuted(false);
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth < 768) return;
    setIsActive(false);
    setMuted(true);
    if (videoRef.current) videoRef.current.muted = true;
  };

  return (
    <div
      ref={cardRef}
      className="w-full"
      style={{
        borderRadius: '28px',
        border: '1px solid rgba(12,44,71,0.18)',
        overflow: 'hidden',
        backgroundColor: 'rgba(255,255,255,0.55)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        boxShadow: '0 8px 40px rgba(12,44,71,0.07), 0 2px 12px rgba(12,44,71,0.04)',
        transition: 'box-shadow 0.4s ease, transform 0.4s ease',
      }}
    >
      <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>

        {/* ── VIDEO SIDE (55%) ── */}
        <div
          className="relative lg:w-[55%] w-full"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{ minHeight: '300px', cursor: 'pointer' }}
        >
          {/* Category label — top left, BOSEE-style */}
          <div
            className="absolute top-5 left-5 z-10 px-3 py-1.5 rounded-lg text-xs font-bold tracking-widest uppercase"
            style={{
              backgroundColor: 'rgba(12,44,71,0.7)',
              backdropFilter: 'blur(8px)',
              color: '#97D3CD',
              letterSpacing: '0.12em',
            }}
          >
            {category}
          </div>

          {/* Mute badge */}
          <div className="absolute top-5 right-5 z-10 hidden md:flex">
            <div
              className="px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5"
              style={{
                backgroundColor: 'rgba(12,44,71,0.5)',
                backdropFilter: 'blur(8px)',
                color: '#EFEAE6',
                border: '1px solid rgba(239,234,230,0.15)',
                transition: 'all 0.3s ease',
              }}
            >
              {muted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
              {muted ? t.portfolio.hoverHint : 'Live'}
            </div>
          </div>

          {/* Duration */}
          <div
            className="absolute bottom-5 right-5 z-10 flex items-center gap-1.5 text-xs font-medium"
            style={{ color: 'rgba(239,234,230,0.7)' }}
          >
            <Clock className="w-3 h-3" />
            {pkg.duration}
          </div>

          {/* Video / Cover */}
          <div
            className="w-full h-full"
            style={{
              minHeight: '280px',
              position: 'relative',
              borderRadius: isEven ? '28px 0 0 28px' : '0 28px 28px 0',
              overflow: 'hidden',
            }}
          >
            {/* Glow border effect */}
            <div
              className="absolute inset-0 z-[1] pointer-events-none"
              style={{
                borderRadius: 'inherit',
                boxShadow: isActive
                  ? `inset 0 0 0 1.5px rgba(151,211,205,0.5), 0 0 40px rgba(151,211,205,0.15)`
                  : 'inset 0 0 0 1px rgba(12,44,71,0.1)',
                transition: 'box-shadow 0.4s ease',
              }}
            />

            {pkg.videoURL ? (
              <video
                ref={videoRef}
                src={pkg.videoURL}
                loop
                muted
                playsInline
                autoPlay
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  transition: 'transform 0.4s ease, filter 0.4s ease',
                  transform: isActive ? 'scale(1.04)' : 'scale(1)',
                  filter: isActive ? 'brightness(0.82)' : 'brightness(0.65)',
                }}
              />
            ) : (
              /* Replace this img with your <video> or <iframe> */
              <img
                src={pkg.coverImage}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  transition: 'transform 0.4s ease, filter 0.4s ease',
                  transform: isActive ? 'scale(1.04)' : 'scale(1)',
                  filter: isActive ? 'brightness(0.82)' : 'brightness(0.65)',
                }}
              />
            )}

            {/* Dark gradient */}
            <div
              className="absolute inset-0 z-[1]"
              style={{
                background: isEven
                  ? 'linear-gradient(to right, rgba(12,44,71,0.1) 0%, rgba(12,44,71,0.6) 100%)'
                  : 'linear-gradient(to left, rgba(12,44,71,0.1) 0%, rgba(12,44,71,0.6) 100%)',
              }}
            />
          </div>
        </div>

        {/* ── INFO SIDE (45%) ── */}
        <div
          className="lg:w-[45%] w-full flex flex-col justify-between p-8 sm:p-10"
          style={{ backgroundColor: '#FAFAF9' }}
        >
          {/* Top */}
          <div>
            <h3
              className="text-2xl sm:text-3xl font-black tracking-tight mb-3 leading-tight"
              style={{ color: '#0C2C47' }}
            >
              {title}
            </h3>
            <p className="text-sm leading-relaxed mb-7" style={{ color: 'rgba(12,44,71,0.58)' }}>
              {desc}
            </p>

            {/* Features */}
            <ul className="space-y-2.5 mb-8">
              {features.map((f, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div
                    className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: 'rgba(45,86,82,0.12)' }}
                  >
                    <Check className="w-3 h-3" style={{ color: '#2D5652' }} />
                  </div>
                  <span className="text-sm font-medium" style={{ color: '#0C2C47' }}>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Bottom: Price + CTAs */}
          <div>
            {/* Price block */}
            <div
              className="flex items-center justify-between mb-6 p-4 rounded-2xl"
              style={{ backgroundColor: 'rgba(45,86,82,0.06)', border: '1px solid rgba(45,86,82,0.12)' }}
            >
              <div>
                <p className="text-xs font-bold tracking-widest uppercase mb-0.5" style={{ color: '#2D5652' }}>
                  {priceLabel}
                </p>
                <p className="text-3xl font-black tracking-tight" style={{ color: '#0C2C47' }}>
                  {pkg.price}
                </p>
              </div>
              <div
                className="px-3 py-1.5 rounded-full text-xs font-bold"
                style={{ backgroundColor: '#2D5652', color: '#E2A54D' }}
              >
                / video
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3">
              <a
                href={`mailto:hello@gz.agency?subject=${encodeURIComponent(title)}`}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 px-5 rounded-full font-semibold text-sm transition-all active:scale-[0.97] hover:shadow-lg"
                style={{
                  backgroundColor: '#2D5652',
                  color: '#E2A54D',
                  transition: 'all 0.3s ease',
                }}
              >
                {t.portfolio.contractBtn}
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#pricing"
                className="flex items-center justify-center gap-2 py-3.5 px-5 rounded-full font-semibold text-sm border transition-all active:scale-[0.97]"
                style={{
                  borderColor: 'rgba(12,44,71,0.2)',
                  color: '#0C2C47',
                  backgroundColor: 'transparent',
                  transition: 'all 0.3s ease',
                }}
              >
                <MessageCircle className="w-4 h-4" />
                {t.portfolio.learnBtn}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PortfolioSection() {
  const { t, lang } = useLanguage();

  return (
    <section
      id="portfolio"
      className="py-24 sm:py-32 relative"
      style={{
        backgroundColor: '#EFEAE6',
        zIndex: 1,
        // Receives the shadow from Hero above
        position: 'relative',
      }}
    >
      {/* Decorative scattered dots */}
      <div className="absolute top-20 right-8 pointer-events-none opacity-[0.05] hidden lg:block">
        <svg width="100" height="200" viewBox="0 0 100 200" fill="none">
          {[10,30,50,70,90].map(x => [10,40,70,100,130,160,190].map(y => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="3" fill="#0C2C47" />
          )))}
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#2D5652' }}>
            {t.portfolio.eyebrow}
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight" style={{ color: '#0C2C47' }}>
            {t.portfolio.title}
          </h2>
          <p className="mt-4 text-lg max-w-xl mx-auto" style={{ color: 'rgba(12,44,71,0.55)' }}>
            {t.portfolio.subtitle}
          </p>
        </div>

        {/* Vertical package cards with generous breathing room */}
        <div className="flex flex-col gap-10 sm:gap-14 lg:gap-16">
          {portfolioPackages.map((pkg, i) => (
            <PackageCard key={i} pkg={pkg} index={i} lang={lang} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
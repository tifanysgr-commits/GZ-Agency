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
    <div ref={cardRef} className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
      {/* VIDEO SIDE */}
      <div
        className="relative lg:w-[55%] w-full"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ minHeight: '340px', cursor: 'pointer' }}
      >
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
        <div className="absolute top-5 right-5 z-10 hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold" style={{ backgroundColor: 'rgba(12,44,71,0.5)', backdropFilter: 'blur(8px)', color: '#EFEAE6', border: '1px solid rgba(239,234,230,0.15)' }}>
          {muted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
          {muted ? t.portfolio.hoverHint : 'Live'}
        </div>
        <div
          className="absolute bottom-5 right-5 z-10 flex items-center gap-1.5 text-xs font-medium"
          style={{ color: 'rgba(239,234,230,0.7)' }}
        >
          <Clock className="w-3 h-3" />
          {pkg.duration}
        </div>
        <div
          className="w-full h-full flex items-center justify-center"
          style={{ minHeight: '340px', position: 'relative', overflow: 'hidden', backgroundColor: 'rgba(12,44,71,0.04)' }}
        >
          {pkg.videoURL ? (
            <video
              ref={videoRef}
              src={pkg.videoURL}
              loop
              muted
              playsInline
              autoPlay
              className="w-full h-full object-contain"
              style={{
                transition: 'transform 0.4s ease, filter 0.4s ease',
                transform: isActive ? 'scale(1.02)' : 'scale(1)',
                filter: isActive ? 'brightness(1)' : 'brightness(0.9)',
              }}
            />
          ) : (
            <img
              src={pkg.coverImage}
              alt={title}
              className="w-full h-full object-contain"
              style={{
                transition: 'transform 0.4s ease, filter 0.4s ease',
                transform: isActive ? 'scale(1.02)' : 'scale(1)',
                filter: isActive ? 'brightness(1)' : 'brightness(0.9)',
              }}
            />
          )}
        </div>
      </div>

      {/* INFO SIDE — textos, precio y botones */}
      <div
        className="lg:w-[45%] w-full flex flex-col justify-between p-8 sm:p-10"
      >
        <div>
          <h3 className="text-2xl sm:text-3xl font-black tracking-tight mb-3 leading-tight" style={{ color: '#0C2C47' }}>
            {title}
          </h3>
          <p className="text-sm leading-relaxed mb-7" style={{ color: 'rgba(12,44,71,0.58)' }}>
            {desc}
          </p>
          <ul className="space-y-2.5 mb-8">
            {features.map((f, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(45,86,82,0.12)' }}>
                  <Check className="w-3 h-3" style={{ color: '#2D5652' }} />
                </div>
                <span className="text-sm font-medium" style={{ color: '#0C2C47' }}>{f}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div
            className="flex items-center justify-between mb-6 p-4 rounded-2xl"
            style={{ backgroundColor: 'rgba(45,86,82,0.06)', border: '1px solid rgba(45,86,82,0.12)' }}
          >
            <div>
              <p className="text-xs font-bold tracking-widest uppercase mb-0.5" style={{ color: '#2D5652' }}>{priceLabel}</p>
              <p className="text-3xl font-black tracking-tight" style={{ color: '#0C2C47' }}>{pkg.price}</p>
            </div>
            <div className="px-3 py-1.5 rounded-full text-xs font-bold" style={{ backgroundColor: '#2D5652', color: '#E2A54D' }}>
              / video
            </div>
          </div>
          <div className="flex gap-3">
            <a
              href={`mailto:hello@gz.agency?subject=${encodeURIComponent(title)}`}
              className="flex-1 flex items-center justify-center gap-2 py-3.5 px-5 rounded-full font-semibold text-sm transition-all active:scale-[0.97] hover:shadow-lg"
              style={{ backgroundColor: '#2D5652', color: '#E2A54D', transition: 'all 0.3s ease' }}
            >
              {t.portfolio.contractBtn}
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#pricing"
              className="flex items-center justify-center gap-2 py-3.5 px-5 rounded-full font-semibold text-sm border transition-all active:scale-[0.97]"
              style={{ borderColor: 'rgba(12,44,71,0.2)', color: '#0C2C47', backgroundColor: 'transparent', transition: 'all 0.3s ease' }}
            >
              <MessageCircle className="w-4 h-4" />
              {t.portfolio.learnBtn}
            </a>
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

      <div className="max-w-[1290px] mx-auto px-6 sm:px-10 lg:px-14">
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

        <div className="flex flex-col gap-12 sm:gap-16 lg:gap-20">
          {portfolioPackages.map((pkg, i) => (
            <PackageCard key={i} pkg={pkg} index={i} lang={lang} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
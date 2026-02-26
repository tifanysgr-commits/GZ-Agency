import React, { useRef, useEffect, useState } from 'react';
import { useLanguage, portfolioPackages } from './LanguageContext';
import { Check, ArrowRight, MessageCircle, Volume2, VolumeX, Clock } from 'lucide-react';

function PackageCard({ pkg, index, lang, t }) {
  const cardRef = useRef(null);
  const inlineVideoRef = useRef(null);
  const expandedVideoRef = useRef(null);
  const cooldownTimerRef = useRef(null);
  const [muted, setMuted] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCooldown, setIsCooldown] = useState(false);
  const [cooldownUntil, setCooldownUntil] = useState(0);

  const isEven = index % 2 === 0;
  const title = lang === 'es' ? pkg.titleEs : pkg.titleEn;
  const category = lang === 'es' ? pkg.categoryEs : pkg.categoryEn;
  const desc = lang === 'es' ? pkg.descEs : pkg.descEn;
  const features = lang === 'es' ? pkg.featuresEs : pkg.featuresEn;
  const priceLabel = lang === 'es' ? pkg.priceLabel : pkg.priceLabelEn;

  const startCooldown = () => {
    const until = Date.now() + 5000;
    setIsCooldown(true);
    setCooldownUntil(until);
    if (cooldownTimerRef.current) window.clearTimeout(cooldownTimerRef.current);
    cooldownTimerRef.current = window.setTimeout(() => {
      setIsCooldown(false);
      setCooldownUntil(0);
    }, 5000);
  };

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (!isMobile) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const active = entry.intersectionRatio > 0.55;
        setIsActive(active);
        setMuted(!active);
        if (inlineVideoRef.current) {
          inlineVideoRef.current.muted = !active;
          if (active) inlineVideoRef.current.play().catch(() => {});
        }
      },
      { threshold: [0.3, 0.55, 0.8] }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isExpanded || !expandedVideoRef.current) return undefined;

    const video = expandedVideoRef.current;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    video.currentTime = 0;
    video.muted = false;
    video.play().catch(() => {});

    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isExpanded]);

  useEffect(() => () => {
    if (cooldownTimerRef.current) window.clearTimeout(cooldownTimerRef.current);
  }, []);

  const handleMouseEnter = () => {
    if (window.innerWidth < 768) return;
    if (isExpanded) return;
    if (isCooldown || Date.now() < cooldownUntil) return;
    setIsActive(true);
    setMuted(false);
    setIsExpanded(true);
    if (inlineVideoRef.current) {
      inlineVideoRef.current.muted = true;
      inlineVideoRef.current.pause();
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth < 768) return;
    if (isExpanded) return;
    setIsActive(false);
    setMuted(true);
    if (inlineVideoRef.current) inlineVideoRef.current.muted = true;
  };

  const handleExpandedEnded = () => {
    setIsExpanded(false);
    setIsActive(false);
    setMuted(true);
    startCooldown();
    if (inlineVideoRef.current) {
      inlineVideoRef.current.currentTime = 0;
      inlineVideoRef.current.muted = true;
      inlineVideoRef.current.play().catch(() => {});
    }
  };

  return (
    <div ref={cardRef} className={`mx-auto w-full max-w-[980px] flex flex-col items-stretch gap-3 ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
      {/* VIDEO SIDE */}
      <div
        className="relative lg:w-[50%] w-full"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ minHeight: '230px', cursor: 'pointer' }}
      >
        <div
          className="absolute top-3 left-3 z-10 px-2 py-0.5 rounded-md text-[9px] font-bold tracking-widest uppercase"
          style={{
            backgroundColor: 'rgba(12,44,71,0.72)',
            backdropFilter: 'blur(8px)',
            color: '#d9e6f3',
            letterSpacing: '0.12em',
          }}
        >
          {category}
        </div>
        <div className="absolute top-3 right-3 z-10 hidden md:flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold" style={{ backgroundColor: 'rgba(12,44,71,0.52)', backdropFilter: 'blur(8px)', color: '#EFEAE6', border: '1px solid rgba(239,234,230,0.15)' }}>
          {muted ? <VolumeX className="w-2.5 h-2.5" /> : <Volume2 className="w-2.5 h-2.5" />}
          {muted ? t.portfolio.hoverHint : 'Live'}
        </div>
        <div
          className="absolute bottom-3 right-3 z-10 flex items-center gap-1 text-[10px] font-medium"
          style={{ color: 'rgba(239,234,230,0.7)' }}
        >
          <Clock className="w-2.5 h-2.5" />
          {pkg.duration}
        </div>
        <div
          className="w-full h-full flex items-center justify-center rounded-[2px]"
          style={{ minHeight: '230px', position: 'relative', overflow: 'hidden', backgroundColor: '#05080d' }}
        >
          {pkg.videoURL ? (
            <video
              ref={inlineVideoRef}
              src={pkg.videoURL}
              loop
              muted
              playsInline
              autoPlay
              className="w-full h-full object-cover"
              style={{
                transition: 'transform 0.4s ease, filter 0.4s ease',
                transform: isActive ? 'scale(1.02)' : 'scale(1)',
                filter: isActive ? 'brightness(1)' : 'brightness(0.88)',
              }}
            />
          ) : (
            <img
              src={pkg.coverImage}
              alt={title}
              className="w-full h-full object-cover"
              style={{
                transition: 'transform 0.4s ease, filter 0.4s ease',
                transform: isActive ? 'scale(1.02)' : 'scale(1)',
                filter: isActive ? 'brightness(1)' : 'brightness(0.88)',
              }}
            />
          )}
        </div>
      </div>

      {isExpanded && pkg.videoURL ? (
        <div className="fixed inset-0 z-[80] bg-black/45 flex items-center justify-center px-4" role="dialog" aria-label={`${title} expanded playback`}>
          <div className="w-full max-w-5xl">
            <video
              ref={expandedVideoRef}
              src={pkg.videoURL}
              playsInline
              className="w-full max-h-[85vh] object-contain rounded-lg shadow-[0_20px_80px_rgba(0,0,0,0.45)]"
              onEnded={handleExpandedEnded}
              onError={handleExpandedEnded}
            />
          </div>
        </div>
      ) : null}

      {/* INFO SIDE — textos, precio y botones */}
      <div
        className="lg:w-[50%] w-full flex flex-col justify-between px-0 sm:px-1 lg:px-1 py-0"
      >
        <div>
          <h3 className="text-[1.45rem] sm:text-[1.8rem] font-extrabold tracking-tight mb-1.5 leading-[0.98]" style={{ color: '#142840' }}>
            {title}
          </h3>
          <p className="text-[10px] leading-relaxed mb-2.5" style={{ color: 'rgba(20,40,64,0.62)' }}>
            {desc}
          </p>
          <ul className="space-y-1 mb-3">
            {features.map((f, i) => (
              <li key={i} className="flex items-start gap-2">
                <div className="mt-0.5 w-3 h-3 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(20,40,64,0.08)' }}>
                  <Check className="w-2 h-2" style={{ color: '#2b3f57' }} />
                </div>
                <span className="text-[11px] font-semibold" style={{ color: '#1e3148' }}>{f}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div
            className="flex w-full max-w-[270px] items-center justify-between mb-2.5 py-2 px-3 rounded-2xl"
            style={{ backgroundColor: '#e8e8e6', border: '1px solid rgba(20,40,64,0.08)' }}
          >
            <div>
              <p className="text-[9px] font-bold tracking-[0.12em] uppercase mb-0.5" style={{ color: '#566579' }}>{priceLabel}</p>
              <p className="text-[1.55rem] font-extrabold tracking-tight leading-none" style={{ color: '#1a3049' }}>{pkg.price}</p>
            </div>
            <div className="px-1.5 py-0.5 rounded-full text-[9px] font-bold" style={{ backgroundColor: '#2d4e54', color: '#f0d188' }}>
              / video
            </div>
          </div>
          <div className="flex gap-1.5">
            <a
              href={`mailto:hello@gz.agency?subject=${encodeURIComponent(title)}`}
              className="inline-flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-full font-semibold text-[1.1rem] transition-all active:scale-[0.97]"
              style={{ backgroundColor: '#0f2e44', color: '#f4f4f2', transition: 'all 0.3s ease' }}
            >
              {t.portfolio.contractBtn}
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#f2f0ec] text-[#0f2e44]">
                <ArrowRight className="w-3 h-3" />
              </span>
            </a>
            <a
              href="/saber-mas"
              className="inline-flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-full font-semibold text-[0.82rem] border transition-all active:scale-[0.97]"
              style={{ borderColor: 'rgba(20,40,64,0.14)', color: '#1a3049', backgroundColor: '#f1efec', transition: 'all 0.3s ease' }}
            >
              <MessageCircle className="w-3 h-3" />
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
      className="py-20 sm:py-24 relative"
      style={{
        backgroundColor: '#ffffff',
        zIndex: 1,
        position: 'relative',
      }}
    >
      <div className="max-w-[1080px] mx-auto px-5 sm:px-7 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 text-[#213743] mb-4">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#12323f]" />
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.08em]">{t.portfolio.eyebrow}</span>
          </div>
          <h2
            className="text-[#111827] leading-tight"
            style={{
              fontFamily: '"Crimson Text", serif',
              fontWeight: 400,
              fontSize: 'clamp(1.3rem, 2.5vw, 2.4rem)',
            }}
          >
            {t.portfolio.title}
          </h2>
          <p className="mt-3 text-base max-w-2xl mx-auto" style={{ color: 'rgba(20,40,64,0.58)' }}>
            {t.portfolio.subtitle}
          </p>
        </div>

        <div className="flex flex-col gap-20 sm:gap-24 lg:gap-28">
          {portfolioPackages.map((pkg, i) => (
            <PackageCard key={i} pkg={pkg} index={i} lang={lang} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
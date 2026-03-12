import React, { useRef, useEffect, useState } from 'react';
import { useLanguage, portfolioPackages } from './LanguageContext';
import { Check, ArrowRight, MessageCircle, Volume2, VolumeX, Clock } from 'lucide-react';

function PackageCard({ pkg, index, lang, t }) {
  const cardRef = useRef(null);
  const inlineVideoRef = useRef(null);
  const expandedVideoRef = useRef(null);
  const expandedViewportRef = useRef(null);
  const expandedCloseTimerRef = useRef(null);
  const outsidePointerTravelRef = useRef(0);
  const prevPointerRef = useRef(null);
  const expandedOpenedAtRef = useRef(0);
  const mobileAutoOpenLockedRef = useRef(false);
  const [muted, setMuted] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isExpandedMounted, setIsExpandedMounted] = useState(false);
  const [isExpandedVisible, setIsExpandedVisible] = useState(false);

  const isEven = index % 2 === 0;
  const isMobileViewport = () => window.innerWidth < 768;
  const title = lang === 'es' ? pkg.titleEs : pkg.titleEn;
  const category = lang === 'es' ? pkg.categoryEs : pkg.categoryEn;
  const desc = lang === 'es' ? pkg.descEs : pkg.descEn;
  const features = lang === 'es' ? pkg.featuresEs : pkg.featuresEn;
  const priceLabel = lang === 'es' ? pkg.priceLabel : pkg.priceLabelEn;

  const closeExpanded = ({ resetInlinePlayback = false, lockMobileAutoOpen = false } = {}) => {
    const expandedVideo = expandedVideoRef.current;
    if (expandedVideo) {
      expandedVideo.pause();
      expandedVideo.muted = true;
      expandedVideo.currentTime = 0;
    }

    // Cierre logico inmediato para que el siguiente hover responda al instante.
    setIsExpanded(false);
    setIsExpandedVisible(false);
    if (expandedCloseTimerRef.current) window.clearTimeout(expandedCloseTimerRef.current);
    expandedCloseTimerRef.current = window.setTimeout(() => {
      setIsExpandedMounted(false);
    }, 280);

    setIsActive(false);
    setMuted(true);
    if (inlineVideoRef.current) {
      inlineVideoRef.current.muted = true;
      if (resetInlinePlayback) {
        inlineVideoRef.current.currentTime = 0;
      }
      inlineVideoRef.current.pause();
    }

    if (lockMobileAutoOpen && isMobileViewport()) {
      mobileAutoOpenLockedRef.current = true;
    }
  };

  const openExpanded = () => {
    if (!pkg.videoURL || isExpanded) return;
    if (expandedCloseTimerRef.current) window.clearTimeout(expandedCloseTimerRef.current);
    expandedOpenedAtRef.current = Date.now();
    outsidePointerTravelRef.current = 0;
    prevPointerRef.current = null;
    setIsActive(true);
    setMuted(false);
    setIsExpandedMounted(true);
    setIsExpanded(true);
    if (inlineVideoRef.current) {
      inlineVideoRef.current.muted = true;
      inlineVideoRef.current.pause();
    }
  };

  useEffect(() => {
    if (!isExpanded || !expandedVideoRef.current) return undefined;

    const video = expandedVideoRef.current;
    video.currentTime = 0;
    // On mobile, autoplay with sound may be blocked; start muted for instant playback.
    video.muted = isMobileViewport();
    video.play().catch(() => {});
    setIsExpandedVisible(true);

    return undefined;
  }, [isExpanded]);

  useEffect(() => {
    if (!isExpandedVisible) return undefined;
    if (isMobileViewport()) return undefined;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isExpandedVisible]);

  useEffect(() => {
    if (!isMobileViewport()) return undefined;
    if (!cardRef.current || !pkg.videoURL) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const ratio = entry.intersectionRatio;
        const inFocusZone = ratio >= 0.48;

        if (!inFocusZone) {
          // Se desbloquea cuando la card abandona la zona de foco.
          mobileAutoOpenLockedRef.current = false;
          if (!isExpanded) {
            setIsActive(false);
            setMuted(true);
          }
          return;
        }

        if (mobileAutoOpenLockedRef.current) return;
        if (!isExpanded) openExpanded();
      },
      { threshold: [0, 0.25, 0.4, 0.48, 0.65, 0.8] }
    );

    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [isExpanded, pkg.videoURL]);

  useEffect(() => {
    if (!isExpanded) return undefined;

    const OUTSIDE_TRAVEL_THRESHOLD_PX = 170;
    const OPEN_GUARD_MS = 320;

    const onMouseMove = (event) => {
      if (!expandedViewportRef.current || !expandedVideoRef.current) return;
      const rect = expandedViewportRef.current.getBoundingClientRect();
      const { clientX, clientY } = event;
      const isOutside = clientX < rect.left || clientX > rect.right || clientY < rect.top || clientY > rect.bottom;

      if (prevPointerRef.current) {
        outsidePointerTravelRef.current += Math.hypot(clientX - prevPointerRef.current.x, clientY - prevPointerRef.current.y);
      }
      prevPointerRef.current = { x: clientX, y: clientY };

      if (!isOutside) {
        outsidePointerTravelRef.current = 0;
        return;
      }

      // Evita cierres instantaneos al primer frame de apertura.
      if (Date.now() - expandedOpenedAtRef.current < OPEN_GUARD_MS) return;

      const intentionalExit = outsidePointerTravelRef.current >= OUTSIDE_TRAVEL_THRESHOLD_PX;
      if (intentionalExit) {
        closeExpanded({ resetInlinePlayback: true });
      }
    };

    const onWheel = () => {
      const expandedVideo = expandedVideoRef.current;
      if (!expandedVideo || expandedVideo.paused || expandedVideo.ended) return;
      // Ignora inercia de scroll justo al abrir para evitar cierres no intencionales.
      if (Date.now() - expandedOpenedAtRef.current < OPEN_GUARD_MS) return;
      closeExpanded({ resetInlinePlayback: true, lockMobileAutoOpen: true });
    };
    const onTouchMove = () => {
      const expandedVideo = expandedVideoRef.current;
      if (!expandedVideo || expandedVideo.paused || expandedVideo.ended) return;
      if (Date.now() - expandedOpenedAtRef.current < OPEN_GUARD_MS) return;
      closeExpanded({ resetInlinePlayback: true, lockMobileAutoOpen: true });
    };
    const onScroll = () => {
      const expandedVideo = expandedVideoRef.current;
      if (!expandedVideo || expandedVideo.paused || expandedVideo.ended) return;
      if (Date.now() - expandedOpenedAtRef.current < OPEN_GUARD_MS) return;
      closeExpanded({ resetInlinePlayback: true, lockMobileAutoOpen: true });
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('scroll', onScroll);
      outsidePointerTravelRef.current = 0;
      prevPointerRef.current = null;
    };
  }, [isExpanded]);

  useEffect(() => () => {
    if (expandedCloseTimerRef.current) window.clearTimeout(expandedCloseTimerRef.current);
  }, []);

  const handleMouseEnter = () => {
    if (isMobileViewport()) return;
    openExpanded();
  };

  const handleMouseLeave = () => {
    if (isMobileViewport()) return;
    if (isExpanded) return;
    setIsActive(false);
    setMuted(true);
    if (inlineVideoRef.current) inlineVideoRef.current.muted = true;
  };

  const handleExpandedEnded = () => {
    closeExpanded({ resetInlinePlayback: true });
  };

  const handleVideoTap = () => {
    if (!isMobileViewport()) return;
    openExpanded();
  };

  return (
    <div ref={cardRef} className={`mx-auto w-full max-w-[980px] flex flex-col items-stretch gap-4 sm:gap-3 ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
      {/* VIDEO SIDE */}
      <div
        className="relative lg:w-[50%] w-full"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleVideoTap}
        style={{ cursor: 'pointer' }}
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleVideoTap();
          }
        }}
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
          {muted ? t.portfolio.hoverHint : t.portfolio.live}
        </div>
        <div
          className="absolute bottom-3 right-3 z-10 flex items-center gap-1 text-[10px] font-medium"
          style={{ color: 'rgba(239,234,230,0.7)' }}
        >
          <Clock className="w-2.5 h-2.5" />
          {pkg.duration}
        </div>
        <div
          className="w-full aspect-[16/9] flex items-center justify-center rounded-[2px]"
          style={{ position: 'relative', overflow: 'hidden', backgroundColor: '#05080d' }}
        >
          {pkg.videoURL ? (
            <video
              ref={inlineVideoRef}
              src={pkg.videoURL}
              loop
              muted
              preload="auto"
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
              loading="lazy"
              decoding="async"
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

      {isExpandedMounted && pkg.videoURL ? (
        <div
          className={`fixed inset-0 z-[80] flex items-center justify-center px-4 transition-opacity duration-300 ${isExpandedVisible ? 'bg-black/45 opacity-100' : 'bg-black/0 opacity-0'}`}
          role="dialog"
          aria-label={`${title} ${t.portfolio.expandedPlayback}`}
        >
          <div
            ref={expandedViewportRef}
            className={`w-full max-w-5xl transition-transform duration-300 ${isExpandedVisible ? 'translate-y-0 scale-100' : 'translate-y-2 scale-[0.985]'}`}
          >
            <video
              ref={expandedVideoRef}
              src={pkg.videoURL}
              preload="auto"
              playsInline
              className="w-full aspect-[16/9] max-h-[85vh] object-contain rounded-lg shadow-[0_20px_80px_rgba(0,0,0,0.45)]"
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
          <h3 className="text-[1.35rem] sm:text-[1.8rem] font-extrabold tracking-tight mb-2 leading-[1.02]" style={{ color: '#142840' }}>
            {title}
          </h3>
          <p className="text-[0.84rem] sm:text-[0.9rem] leading-relaxed mb-3" style={{ color: 'rgba(20,40,64,0.62)' }}>
            {desc}
          </p>
          <ul className="space-y-1.5 mb-4">
            {features.map((f, i) => (
              <li key={i} className="flex items-start gap-2">
                <div className="mt-0.5 w-3 h-3 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(20,40,64,0.08)' }}>
                  <Check className="w-2 h-2" style={{ color: '#2b3f57' }} />
                </div>
                <span className="text-[0.82rem] sm:text-[0.86rem] font-semibold" style={{ color: '#1e3148' }}>{f}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div
            className="flex w-full max-w-[300px] items-center justify-between mb-3 py-2.5 px-3 rounded-2xl"
            style={{ backgroundColor: '#e8e8e6', border: '1px solid rgba(20,40,64,0.08)' }}
          >
            <div>
              <p className="text-[9px] font-bold tracking-[0.12em] uppercase mb-0.5" style={{ color: '#566579' }}>{priceLabel}</p>
              <p className="text-[1.55rem] font-extrabold tracking-tight leading-none" style={{ color: '#1a3049' }}>{pkg.price}</p>
            </div>
            <div className="px-1.5 py-0.5 rounded-full text-[9px] font-bold" style={{ backgroundColor: '#2d4e54', color: '#f0d188' }}>
              {t.portfolio.perVideo}
            </div>
          </div>
          <div className="flex gap-2">
            <a
              href={`mailto:gz.agencys@gmail.com?subject=${encodeURIComponent(title)}`}
              className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full font-semibold text-[1rem] sm:text-[1.1rem] transition-all active:scale-[0.97]"
              style={{ backgroundColor: '#0f2e44', color: '#f4f4f2', transition: 'all 0.3s ease' }}
            >
              {t.portfolio.contractBtn}
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#f2f0ec] text-[#0f2e44]">
                <ArrowRight className="w-3 h-3" />
              </span>
            </a>
            <a
              href="/saber-mas"
              className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full font-semibold text-[0.84rem] border transition-all active:scale-[0.97]"
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
      <div className="gz-mobile-shell max-w-[1080px] mx-auto px-5 sm:px-7 lg:px-8">
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
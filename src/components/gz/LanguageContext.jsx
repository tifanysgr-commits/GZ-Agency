import React, { createContext, useContext, useState, useEffect } from 'react';

// ─────────────────────────────────────────────
// TRANSLATIONS
// ─────────────────────────────────────────────
const translations = {
  es: {
    topbar: {
      phone: '+34 643 091 948',
      email: 'hello@gz.agency',
      hours: 'Lun - Vie: 00:00 - 24:00',
      portfolio: 'Portfolio',
      about: 'Sobre nosotros',
      contact: 'Contacto',
    },
    nav: {
      forWhom: 'Para Quién',
      pricing: 'Precios',
      videoTypes: 'Tipos de Video',
      cta: 'Hablemos',
    },
    hero: {
      eyebrow: 'Publicidad profesional para nuevas webs y apps. Calidad alta. Precio inteligente.',
      title: 'La agencia de motion que transforma tu software en una marca de autoridad antes de gastar tu primer dólar en Google Ads.',
      titleBefore: 'La ',
      titleBold: 'agencia de motion',
      titleAfter: ' que transforma tu software en una marca de autoridad antes de gastar tu primer dólar en Google Ads.',
      subtitle: 'En Gz Agency creamos la publicidad formal y estratégica que tu web o app innovadora necesita— porque profesional no significa absurdamente caro.',
      subtitleBefore: 'En Gz Agency creamos la publicidad formal y estratégica que tu web o app ',
      subtitleBold: 'innovadora',
      subtitleAfter: ' necesita— porque profesional no significa absurdamente caro.',
      cta: 'Empezar ahora',
      ctaCaption: 'Recibirá un email con los detalles y se le llamará inmediatamente a la hora acordada.',
      bookingHint: 'Elija una fecha para hoy o mañana.',
      secondary: 'Ver portfolio',
      trusted: 'Confiado por +50 startups y empresas SaaS',
    },
    portfolio: {
      eyebrow: 'NUESTRO TRABAJO',
      title: 'Portfolio de proyectos',
      subtitle: 'Cada video está diseñado para convertir espectadores en clientes.',
      contractBtn: 'Contratar',
      learnBtn: 'Saber más',
      fixedPrice: 'Precio Cerrado',
      hoverHint: 'Hover para activar',
    },
    services: {
      eyebrow: 'SERVICIOS Y PRECIOS',
      title: 'Planes transparentes, sin sorpresas',
      subtitle: 'Elige el plan que mejor se adapte a tu fase de crecimiento.',
      plans: [
        {
          name: 'Starter',
          price: '€497',
          period: '/video',
          description: 'Perfecto para startups que necesitan su primer video profesional.',
          features: ['1 video de hasta 60s', 'Guion incluido', '2 rondas de revisión', 'Entrega en 7 días', 'Formato optimizado para ads'],
          popular: false,
        },
        {
          name: 'Growth',
          price: '€1.297',
          period: '/mes',
          description: 'Para equipos que necesitan contenido de video constante.',
          features: ['3 videos al mes', 'Estrategia de contenido', 'Revisiones ilimitadas', 'Entrega prioritaria', 'A/B testing de creativos', 'Soporte dedicado'],
          popular: true,
        },
        {
          name: 'Scale',
          price: '€2.497',
          period: '/mes',
          description: 'Para marcas que quieren dominar su vertical con video.',
          features: ['6 videos al mes', 'Director creativo asignado', 'Revisiones ilimitadas', 'Entrega en 48h', 'Análisis de rendimiento', 'Integración con tu equipo'],
          popular: false,
        },
      ],
      cta: 'Elegir plan',
    },
    videoTypes: {
      eyebrow: 'TIPOS DE VIDEO',
      title: '¿Qué tipo de video necesitas?',
      subtitle: 'Producimos diferentes formatos adaptados a cada etapa de tu funnel de ventas.',
      types: [
        { name: 'Anuncios para Ads', desc: 'Videos cortos y directos optimizados para Meta, Google y TikTok Ads.', icon: 'megaphone' },
        { name: 'Videos Explicativos', desc: 'Explica tu producto de forma clara y atractiva en menos de 90 segundos.', icon: 'play' },
        { name: 'Testimoniales', desc: 'Historias reales de clientes que generan confianza y credibilidad.', icon: 'users' },
        { name: 'Demos de Producto', desc: 'Muestra tu software en acción con screencasts profesionales.', icon: 'monitor' },
        { name: 'Social Content', desc: 'Contenido nativo para Instagram, LinkedIn y TikTok.', icon: 'share' },
        { name: 'Onboarding', desc: 'Videos para activar y retener a tus nuevos usuarios.', icon: 'rocket' },
      ],
    },
    footer: {
      copyright: '© 2026 Gz Agency. Todos los derechos reservados.',
      privacy: 'Política de privacidad',
      terms: 'Términos y condiciones',
      tagline: 'Video marketing que convierte.',
    },
  },
  en: {
    topbar: {
      phone: '+34 643 091 948',
      email: 'hello@gz.agency',
      hours: 'Mon - Sun: 00:00 - 24:00',
      portfolio: 'Portfolio',
      about: 'About us',
      contact: 'Contact',
    },
    nav: {
      forWhom: 'For Whom',
      pricing: 'Pricing',
      videoTypes: 'Video Types',
      cta: 'Get in touch',
    },
    hero: {
      eyebrow: 'Professional advertising for new apps and webs. High quality. Smart pricing.',
      title: 'The motion agency that transforms your software into an authority brand before you spend your first dollar on Google Ads.',
      titleBefore: 'The ',
      titleBold: 'motion agency',
      titleAfter: ' that transforms your software into an authority brand before you spend your first dollar on Google Ads.',
      subtitle: 'At Gz Agency, we craft the formal, strategic advertising your innovative app or site needs -because professional shouldn\'t mean overpriced.',
      subtitleBefore: 'At Gz Agency, we craft the formal, strategic advertising your ',
      subtitleBold: 'innovative',
      subtitleAfter: ' app or site needs— because professional shouldn\'t mean overpriced.',
      cta: 'Book a meeting',
      ctaCaption: 'You will receive a confirmation email, and will be called immediately at the scheduled time.',
      bookingHint: 'Choose a date for today or tomorrow.',
      secondary: 'View portfolio',
      trusted: 'Trusted by 50+ startups and SaaS companies',
    },
    portfolio: {
      eyebrow: 'OUR WORK',
      title: 'Project portfolio',
      subtitle: 'Every video is designed to convert viewers into Users.',
      contractBtn: 'Hire us',
      learnBtn: 'Learn more',
      fixedPrice: 'Fixed Price',
      hoverHint: 'Hover to activate',
    },
    services: {
      eyebrow: 'SERVICES & PRICING',
      title: 'Transparent plans, no surprises',
      subtitle: 'Choose the plan that best fits your growth stage.',
      plans: [
        {
          name: 'Starter',
          price: '€497',
          period: '/video',
          description: 'Perfect for startups that need their first professional video.',
          features: ['1 video up to 60s', 'Script included', '2 revision rounds', '7-day delivery', 'Ad-optimized format'],
          popular: false,
        },
        {
          name: 'Growth',
          price: '€1,297',
          period: '/mo',
          description: 'For teams that need constant video content.',
          features: ['3 videos per month', 'Content strategy', 'Unlimited revisions', 'Priority delivery', 'Creative A/B testing', 'Dedicated support'],
          popular: true,
        },
        {
          name: 'Scale',
          price: '€2,497',
          period: '/mo',
          description: 'For brands that want to dominate their vertical with video.',
          features: ['6 videos per month', 'Assigned creative director', 'Unlimited revisions', '48h delivery', 'Performance analytics', 'Team integration'],
          popular: false,
        },
      ],
      cta: 'Choose plan',
    },
    videoTypes: {
      eyebrow: 'VIDEO TYPES',
      title: 'What type of video do you need?',
      subtitle: 'We produce different formats tailored to each stage of your sales funnel.',
      types: [
        { name: 'Ad Videos', desc: 'Short, direct videos optimized for Meta, Google, and TikTok Ads.', icon: 'megaphone' },
        { name: 'Explainer Videos', desc: 'Explain your product clearly and engagingly in under 90 seconds.', icon: 'play' },
        { name: 'Testimonials', desc: 'Real customer stories that build trust and credibility.', icon: 'users' },
        { name: 'Product Demos', desc: 'Showcase your software in action with professional screencasts.', icon: 'monitor' },
        { name: 'Social Content', desc: 'Native content for Instagram, LinkedIn, and TikTok.', icon: 'share' },
        { name: 'Onboarding', desc: 'Videos to activate and retain your new users.', icon: 'rocket' },
      ],
    },
    footer: {
      copyright: '© 2026 Gz Agency. All rights reserved.',
      privacy: 'Privacy policy',
      terms: 'Terms & conditions',
      tagline: 'Video marketing that converts.',
    },
  },
};

const LanguageContext = createContext({
  lang: 'es',
  switchLang: () => {},
  t: translations.es,
  detected: false,
});

// ─────────────────────────────────────────────
// PORTFOLIO PACKAGES DATA
// Edit this array to update portfolio content.
// Each item: { videoURL, coverImage, titleEs, titleEn, categoryEs, categoryEn,
//              descEs, descEn, featuresEs[], featuresEn[], price, duration }
// ─────────────────────────────────────────────
export const portfolioPackages = [
  {
    videoURL: '/videos/ScreenRecording_02-23-2026%2020-35-44_1.mov',
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=700&fit=crop',
    titleEs: 'SaaS Launch Promo',
    titleEn: 'SaaS Launch Promo',
    categoryEs: 'Lanzamiento de Producto',
    categoryEn: 'Product Launch',
    descEs: 'Un anuncio de alto impacto diseñado para presentar tu software al mercado y generar tracción inmediata desde el primer día.',
    descEn: 'A high-impact ad designed to introduce your software to the market and generate immediate traction from day one.',
    featuresEs: ['Script original incluido', 'Locución profesional', 'Post-producción 4K', 'Entrega en 7 días', 'Formatos para Meta & Google'],
    featuresEn: ['Original script included', 'Professional voiceover', '4K post-production', '7-day delivery', 'Formats for Meta & Google'],
    price: '€497',
    priceLabel: 'Precio Cerrado',
    priceLabelEn: 'Fixed Price',
    duration: '0:45',
  },
  {
    videoURL: '/videos/ScreenRecording_02-23-2026%2020-38-24_1.mov',
    coverImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&h=700&fit=crop',
    titleEs: 'App Promo — Mobile',
    titleEn: 'App Promo — Mobile',
    categoryEs: 'Promoción de App',
    categoryEn: 'App Promotion',
    descEs: 'Video optimizado para mobile-first que muestra las funciones clave de tu app de forma visual, rápida y persuasiva.',
    descEn: "Mobile-first optimized video showcasing your app's key features in a visual, fast, and persuasive way.",
    featuresEs: ['Formato vertical 9:16', 'Animaciones UI nativas', 'Música con licencia', 'Subtítulos incluidos', 'Entrega en 5 días'],
    featuresEn: ['Vertical 9:16 format', 'Native UI animations', 'Licensed music', 'Subtitles included', '5-day delivery'],
    price: '€397',
    priceLabel: 'Precio Cerrado',
    priceLabelEn: 'Fixed Price',
    duration: '0:30',
  },
  {
    videoURL: '/videos/ScreenRecording_02-23-2026%2020-40-02_1.mov',
    coverImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f2?w=1200&h=700&fit=crop',
    titleEs: 'Fintech Trust Ad',
    titleEn: 'Fintech Trust Ad',
    categoryEs: 'Servicios Financieros',
    categoryEn: 'Financial Services',
    descEs: 'Campaña de video que refuerza la confianza y credibilidad de tu producto fintech, superando las barreras de conversión.',
    descEn: 'Video campaign that reinforces the trust and credibility of your fintech product, overcoming conversion barriers.',
    featuresEs: ['Storytelling emocional', 'Actor/actriz profesional', 'Color grading premium', 'Entrega en 10 días', 'Revisiones ilimitadas'],
    featuresEn: ['Emotional storytelling', 'Professional actor/actress', 'Premium color grading', '10-day delivery', 'Unlimited revisions'],
    price: '€697',
    priceLabel: 'Precio Cerrado',
    priceLabelEn: 'Fixed Price',
    duration: '1:00',
  },
  {
    videoURL: '/videos/ScreenRecording_02-23-2026%2020-40-56_1.mov',
    coverImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=700&fit=crop',
    titleEs: 'E-Commerce Hero',
    titleEn: 'E-Commerce Hero',
    categoryEs: 'Tienda Online',
    categoryEn: 'Online Store',
    descEs: 'Anuncio de producto que convierte browsers en compradores. Diseñado para reducir el CPA y maximizar el ROAS.',
    descEn: 'Product ad that converts browsers into buyers. Designed to reduce CPA and maximize ROAS.',
    featuresEs: ['Demo de producto', 'Testimonial integrado', 'CTA dinámico', 'A/B testing de creativos', 'Entrega en 7 días'],
    featuresEn: ['Product demo', 'Integrated testimonial', 'Dynamic CTA', 'Creative A/B testing', '7-day delivery'],
    price: '€497',
    priceLabel: 'Precio Cerrado',
    priceLabelEn: 'Fixed Price',
    duration: '0:30',
  },
];

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('es');
  const [detected, setDetected] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('gz_lang');
    if (saved) {
      setLang(saved);
      setDetected(true);
      return;
    }
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        const country = data?.country_code?.toLowerCase();
        const spanishCountries = ['es', 'mx', 'ar', 'co', 'cl', 'pe', 'ec', 'gt', 'cu', 'bo', 'do', 'hn', 'py', 'sv', 'ni', 'cr', 'pa', 'uy', 've'];
        setLang(spanishCountries.includes(country) ? 'es' : 'en');
        setDetected(true);
      })
      .catch(() => { setLang('es'); setDetected(true); });
  }, []);

  const switchLang = (newLang) => {
    setLang(newLang);
    localStorage.setItem('gz_lang', newLang);
  };

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, switchLang, t, detected }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
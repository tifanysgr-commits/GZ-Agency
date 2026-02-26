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
      servicios: 'Servicios',
      reseñas: 'Reseñas',
      portfolio: 'Portfolio',
      metodo: 'Método',
      contacto: 'Contacto',
      cta: 'Programar una conversación',
    },
    hero: {
      eyebrow: 'Publicidad profesional para nuevas webs y apps. Calidad alta. Precio inteligente.',
      title: 'La agencia de motion que transforma tu software en una marca de autoridad antes de gastar tu primer dólar en Google Ads.',
      titleBefore: 'Transforme su software en una marca de autoridad- ',
      titleBold: '',
      titleAfter: 'porque profesional no significa absurdamente caro.',
      subtitle: 'En Gz Agency creamos la publicidad formal y estratégica que tu web o app innovadora necesita— porque profesional no significa absurdamente caro.',
      subtitleBefore: 'Creamos la publicidad que tu web o app necesitan- ',
      subtitleBold: '',
      subtitleAfter: 'antes de gastar su primer dólar en Google Ads.',
      cta: 'Programar una conversación',
      ctaCaption: 'Recibirá un email con los detalles y se le llamará inmediatamente a la hora acordada.',
      bookingHint: 'Elija una fecha para hoy o mañana.',
      secondary: 'Mira lo que hacemos',
      trusted: 'Con la confianza de empresas de rápido crecimiento y en expansión',
      rating: 'Calificación 4.9/5',
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
      servicios: 'Services',
      reseñas: 'Reviews',
      portfolio: 'Portfolio',
      metodo: 'Method',
      contacto: 'Contact',
      cta: 'Schedule a conversation',
    },
    hero: {
      eyebrow: 'Professional advertising for new apps and webs. High quality. Smart pricing.',
      title: 'The motion agency that transforms your software into an authority brand before you spend your first dollar on Google Ads.',
      titleBefore: 'Transform your software into an authority brand- ',
      titleBold: '',
      titleAfter: 'because professional doesn\'t mean absurdly expensive.',
      subtitle: 'At Gz Agency, we craft the formal, strategic advertising your innovative app or site needs -because professional shouldn\'t mean overpriced.',
      subtitleBefore: 'We create the advertising your website or app needs- ',
      subtitleBold: '',
      subtitleAfter: 'before you spend your first dollar on Google Ads.',
      cta: 'Schedule a conversation',
      ctaCaption: 'You will receive a confirmation email, and will be called immediately at the scheduled time.',
      bookingHint: 'Choose a date for today or tomorrow.',
      secondary: 'See what we do',
      trusted: 'Trusted by fast-growing and expanding companies',
      rating: 'Rating 4.9/5',
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
    titleEs: 'Fintech Trust Ad',
    titleEn: 'Fintech Trust Ad',
    categoryEs: 'Servicios Financieros',
    categoryEn: 'Financial Services',
    descEs: 'El video se enfoca en mostrar la interfaz limpia de una app financiera, diferentes niveles de tarjetas y gestión de presupuestos. Es perfecto para transmitir seguridad y profesionalismo en el sector bancario digital.',
    descEn: 'The video focuses on showcasing a clean financial app interface, different card tiers, and budget management. It is perfect for conveying security and professionalism in the digital banking sector.',
    featuresEs: ['Post-producción 4K', 'Minimalismo y transiciones de alta velocidad', 'Sin locución, con diseño sonoro rítmico (SFX)', 'Animación de interfaces, planes y tarjetas', 'Ideal para transmitir autoridad bancaria'],
    featuresEn: ['4K post-production', 'Minimalism and high-speed transitions', 'No voice-over, rhythmic sound design (SFX)', 'Interface, plan, and card animations', 'Ideal for conveying banking authority'],
    price: '€162',
    priceLabel: 'Precio Cerrado',
    priceLabelEn: 'Fixed Price',
    duration: '0:45',
  },
  {
    videoURL: '/videos/ScreenRecording_02-23-2026%2020-38-24_1.mov',
    coverImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&h=700&fit=crop',
    titleEs: 'AI Product Intro',
    titleEn: 'AI Product Intro',
    categoryEs: 'Tecnología e IA',
    categoryEn: 'Technology & AI',
    descEs: 'Es un video puramente de presentación de marca y tecnología. Muestra la potencia de una herramienta inteligente procesando información, ideal para startups que venden tecnología de vanguardia.',
    descEn: 'This is a pure brand and technology presentation video. It showcases the power of an intelligent tool processing information, ideal for startups selling cutting-edge technology.',
    featuresEs: ['Post-producción 4K', 'Animación abstracta de datos a interfaces', 'Partículas, transiciones suaves y tipografía cinética', 'Incluye logo, capacidades de análisis y cierre', 'Ideal para mostrar innovación en IA'],
    featuresEn: ['4K post-production', 'Abstract animation from data to interfaces', 'Particles, smooth transitions, and kinetic typography', 'Includes logo, analytics capabilities, and closing', 'Ideal for showcasing innovation in AI'],
    price: '€140',
    priceLabel: 'Precio Cerrado',
    priceLabelEn: 'Fixed Price',
    duration: '0:30',
  },
  {
    videoURL: '/videos/150.mov',
    coverImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f2?w=1200&h=700&fit=crop',
    titleEs: 'App Promo',
    titleEn: 'App Promo',
    categoryEs: 'Promoción de App',
    categoryEn: 'App Promotion',
    descEs: 'Se centra totalmente en la experiencia de usuario (UX): subir archivos, analizar datos y automatizar respuestas. Es ideal para mostrar cómo funciona una herramienta específica por dentro.',
    descEn: 'It is fully focused on user experience (UX): uploading files, analyzing data, and automating responses. It is ideal for showing how a specific tool works from the inside.',
    featuresEs: ['Post-producción 4K', 'Enfoque en fluidez y flujo de trabajo', 'Edición ultra-rápida con música sincronizada', 'Demostración de procesos internos y tablas de datos', 'Ideal para mostrar potencia técnica y facilidad de uso'],
    featuresEn: ['4K post-production', 'Focus on fluidity and workflow', 'Ultra-fast editing with synchronized music', 'Demonstration of internal processes and data tables', 'Ideal for showcasing technical power and ease of use'],
    price: '€150',
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
    descEs: 'Es visualmente irresistible, rápido y está diseñado para provocar una acción inmediata (comprar comida). Este estilo "Hero" es el que se coloca en la parte superior de una web para captar la atención total del comprador.',
    descEn: 'It is visually irresistible, fast, and designed to trigger immediate action (buying food). This "Hero" style is placed at the top of a website to capture the buyer\'s full attention.',
    featuresEs: ['Post-producción 4K', 'Storytelling visual de alto impacto optimizado para móvil', 'Colores vibrantes y transiciones creativas', 'Animación de menús, botones de compra y CTA claros', 'Ideal para tiendas online que buscan aumentar conversiones'],
    featuresEn: ['4K post-production', 'High-impact visual storytelling optimized for mobile', 'Vibrant colors and creative transitions', 'Animation of menus, purchase buttons, and clear CTAs', 'Ideal for online stores looking to increase conversions'],
    price: '€200',
    priceLabel: 'Precio Cerrado',
    priceLabelEn: 'Fixed Price',
    duration: '0:30',
  },
  {
    videoURL: '/videos/300.mov',
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=700&fit=crop',
    titleEs: 'SaaS Launch Promo',
    titleEn: 'SaaS Launch Promo',
    categoryEs: 'Lanzamiento de Software',
    categoryEn: 'Software Launch',
    descEs: 'Utiliza una narrativa de "problema-solución" (el caos de otros gráficos vs. la simplicidad de Apple). Es el formato clásico para lanzar un software al mercado y explicar sus funciones principales de forma rápida.',
    descEn: 'It uses a "problem-solution" narrative (the chaos of other graphics vs. Apple\'s simplicity). It is the classic format for launching software to market and explaining its key features quickly.',
    featuresEs: ['Post-producción 4K', 'Narrativa de "Orden vs. Caos" con tipografía limpia', 'Locución profesional, capturas reales y ritmo dinámico', 'Incluye guion, funciones clave y comparativas', 'Ideal para lanzamientos de software que explican su valor en 30 segundos'],
    featuresEn: ['4K post-production', '"Order vs. Chaos" narrative with clean typography', 'Professional voice-over, real captures, and dynamic rhythm', 'Includes script, key features, and comparisons', 'Ideal for software launches that explain value in 30 seconds'],
    price: '€300',
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
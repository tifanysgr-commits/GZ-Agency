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
      slider: {
        preview: 'Vista previa',
        title: 'Estrategia creativa',
        desc: 'Flujo de contenido, anuncios y automatización para lanzar rápido.',
        tags: ['Anuncios', 'Landing', 'Tracking', 'Iteración'],
      },
    },
    comparison: {
      eyebrow: '¿Por qué elegirnos?',
      titleLine1: 'Publicidad profesional. Calidad alta.',
      titleLine2: 'Precio inteligente',
      traditionalTitle: 'Agencias tradicionales',
      gzTitle: 'GZ Agency',
      traditionalPoints: [
        {
          title: 'Cero margen para la innovación',
          body: 'Manuales antiguos y estructuras rígidas que impiden reaccionar rápido a las tendencias actuales.',
        },
        {
          title: 'Barrera de entrada económica',
          body: 'Sin un presupuesto masivo, simplemente no lanzas. No hay espacio para proyectos emergentes.',
        },
        {
          title: 'Falta de apuesta por el talento',
          body: 'Solo buscan lo seguro; si eres una marca nueva o atrevida, no apuestan.',
        },
        {
          title: 'Procesos lentos y manuales',
          body: 'Burocracia y tiempos de espera que matan la frescura del contenido moderno.',
        },
      ],
      gzPoints: [
        {
          title: 'Innovación constante y curiosa',
          body: 'Somos autodidactas y experimentadores: probamos lo último en algoritmos y formatos antes que nadie.',
        },
        {
          title: 'Democratizamos el lanzamiento',
          body: 'Gracias a nuestra automatización inteligente, reducimos costes operativos para ofrecer calidad premium accesible.',
        },
        {
          title: 'Apostamos por el potencial',
          body: 'Apostamos por ideas con futuro: si elegimos tu marca, sabemos cómo venderla.',
        },
        {
          title: 'Marketing de ventas real',
          body: 'Resultados medibles: menos teoría de agencia y más ventas que funcionan.',
        },
      ],
    },
    portfolio: {
      eyebrow: 'NUESTRO TRABAJO',
      title: 'Portfolio de proyectos',
      subtitle: 'Cada video está diseñado para convertir espectadores en clientes.',
      contractBtn: 'Contratar',
      learnBtn: 'Saber más',
      fixedPrice: 'Precio Cerrado',
      hoverHint: 'Hover para activar',
      tapHint: 'Toca para abrir',
      live: 'En vivo',
      perVideo: '/ video',
      expandedPlayback: 'reproducción ampliada',
    },
    pricing: {
      eyebrow: 'Contáctenos',
      title: 'Estaremos encantados\nde ofrecerle\nasesoramiento\npersonalizado.',
      name: 'Nombre completo*',
      email: 'Dirección de correo electrónico*',
      phone: 'Número de teléfono*',
      company: 'Nombre de empresa*',
      help: '¿Cómo podemos ayudarle?*',
      message: 'Su mensaje o pregunta*',
      cta: 'Enviar consulta',
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
    aboutPage: {
      back: 'Volver',
      heroTitle: 'De Usuarios a Creadores :',
      quote: 'Lo hago porque es divertido, y disfruto haciéndolo.',
      quoteRole: 'CEO y Fundadora de Gz Agency',
      storyIntro: 'El motivo es muy simple: lo que nació por curiosidad y pasión hoy es una metodología probada:',
      storyBullets: [
        'Es el resultado de experimentar con lo que nosotros mismos consumiríamos: cortes rápidos, estética limpia y un mensaje directo.',
        'No vendemos humo; vendemos métricas y contenido que atrapa.',
      ],
      storyBridge: 'Marketing de Ventas: Resultados, no teorías. Dominamos la post-producción dinámica porque cada frame cuenta. Sabemos qué convierte tras miles de pruebas. Nuestros tres pilares:',
      pillars: [
        'Sin rellenos: Vamos directo a la conversión con un lenguaje visual fresco que evita las distracciones innecesarias.',
        'Eficiencia radical: Automatizamos procesos de edición para entregarte calidad premium en tiempo récord.',
        'Cercanía: Sin costes inflados; una propuesta de valor de alta gama, pero totalmente asequible.',
      ],
      whyTitleTop: 'Por qué las marcas',
      whyTitleBottom: 'confían en Gz Agency',
      whyBody: {
        bold1: 'Tu decisión es estratégica,',
        text1: 'no solo visual. No buscas “videos bonitos” que mueran en el scroll; buscas un socio que hable el idioma de tu negocio.',
        bold2: 'En Gz Agency,',
        text2: 'la post-producción de alta gama es una herramienta psicológica: cada frame está diseñado para capturar la atención en 3 segundos y escoltar al usuario hacia la acción. Nos jugamos tu reputación y tus métricas en cada entrega, porque un contenido mediocre es un riesgo para tu marca. Nuestra metodología no termina al exportar, sino cuando movemos la aguja de tus resultados.',
        bold3: 'No somos proveedores de contenido; somos los guardianes de tu impacto visual.',
      },
      cards: [
        {
          title: 'Implicación Creativa:',
          body: 'No seguimos órdenes, nos adueñamos de tu visión. Pensamos fuera de la caja para plantearte soluciones visuales que ni siquiera habías imaginado.',
        },
        {
          title: 'Proyectos de Alta Complejidad:',
          body: 'Hacer que una marca de consumo sea atractiva es fácil. Nosotros sacamos pecho transformando sectores “áridos” (SaaS, Fintech, logística) en referentes visuales de alta gama. Nos motivan los sectores desafiantes.',
        },
        {
          title: 'Especialización Visual:',
          body: 'Hablamos tu mismo idioma: CTR, retención, MQLs y SQLs. El camino hacia la conversión es largo, pero nosotros lo hacemos más corto a través de la eficiencia radical.',
        },
      ],
      bottomTitle: 'Un equipo que ha estado en tu piel',
      bottomBody: 'Somos Usuarios convertidos en Creadores. Antes de ser agencia, estuvimos donde estás tú hoy. Entendemos los retos, la presión por los resultados y la necesidad de diferenciarte. Sabemos qué funciona porque lo hemos probado miles de veces.',
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
      slider: {
        preview: 'Preview',
        title: 'Creative strategy',
        desc: 'Content flow, ads, and automation to launch faster.',
        tags: ['Ads', 'Landing', 'Tracking', 'Iteration'],
      },
    },
    comparison: {
      eyebrow: 'Why choose us?',
      titleLine1: 'Professional advertising. High quality.',
      titleLine2: 'Smart pricing',
      traditionalTitle: 'Traditional agencies',
      gzTitle: 'GZ Agency',
      traditionalPoints: [
        {
          title: 'Zero room for innovation',
          body: 'Outdated playbooks and rigid structures that prevent fast reactions to market trends.',
        },
        {
          title: 'High economic entry barrier',
          body: 'Without a massive budget, you simply do not launch. Emerging projects get left out.',
        },
        {
          title: 'No bet on talent',
          body: 'They only choose the safest path; if your brand is new or bold, they will not back it.',
        },
        {
          title: 'Slow, manual processes',
          body: 'Bureaucracy and delays that kill the freshness of modern content.',
        },
      ],
      gzPoints: [
        {
          title: 'Constant, curious innovation',
          body: 'We are builders and experimenters: testing the latest algorithms and formats before anyone else.',
        },
        {
          title: 'Launches made accessible',
          body: 'With smart automation, we reduce operating costs to deliver premium quality at a realistic price.',
        },
        {
          title: 'We bet on potential',
          body: 'We back high-potential ideas: if we choose your brand, we know how to sell it.',
        },
        {
          title: 'Real sales marketing',
          body: 'Measurable outcomes: less agency theory, more revenue that works.',
        },
      ],
    },
    portfolio: {
      eyebrow: 'OUR WORK',
      title: 'Project portfolio',
      subtitle: 'Every video is designed to convert viewers into Users.',
      contractBtn: 'Hire us',
      learnBtn: 'Learn more',
      fixedPrice: 'Fixed Price',
      hoverHint: 'Hover to activate',
      tapHint: 'Tap to open',
      live: 'Live',
      perVideo: '/ video',
      expandedPlayback: 'expanded playback',
    },
    pricing: {
      eyebrow: 'Contact us',
      title: 'We would be delighted\nto offer you\npersonalized\nadvice.',
      name: 'Full name*',
      email: 'Email address*',
      phone: 'Phone number*',
      company: 'Company name*',
      help: 'How can we help?*',
      message: 'Your message or question*',
      cta: 'Send inquiry',
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
    aboutPage: {
      back: 'Back',
      heroTitle: 'From Users to Creators:',
      quote: 'I do this because it is fun, and I love doing it.',
      quoteRole: 'CEO and Founder of Gz Agency',
      storyIntro: 'The reason is simple: what started as curiosity and passion is now a proven methodology:',
      storyBullets: [
        'It comes from testing what we would actually consume ourselves: fast cuts, clean aesthetics, and direct messaging.',
        'We do not sell smoke; we sell metrics and content that captures attention.',
      ],
      storyBridge: 'Sales Marketing: results, not theory. We master dynamic post-production because every frame matters. We know what converts after thousands of tests. Our three pillars:',
      pillars: [
        'No filler: we go straight to conversion with fresh visual language that removes unnecessary distractions.',
        'Radical efficiency: we automate editing workflows to deliver premium quality at record speed.',
        'Closeness: no inflated costs; a high-end value proposition that remains accessible.',
      ],
      whyTitleTop: 'Why brands',
      whyTitleBottom: 'trust Gz Agency',
      whyBody: {
        bold1: 'Your decision is strategic,',
        text1: 'not only visual. You are not looking for “pretty videos” that die in the scroll; you need a partner who speaks your business language.',
        bold2: 'At Gz Agency,',
        text2: 'high-end post-production is a psychological tool: every frame is designed to capture attention in three seconds and guide the user toward action. We put your reputation and metrics on the line in every delivery, because mediocre content is a risk for your brand. Our methodology does not end when we export, but when we move your business needle.',
        bold3: 'We are not content providers; we are guardians of your visual impact.',
      },
      cards: [
        {
          title: 'Creative Involvement:',
          body: 'We do not just execute; we take ownership of your vision. We think beyond the obvious to propose visual solutions you had not imagined yet.',
        },
        {
          title: 'High-Complexity Projects:',
          body: 'Making a consumer brand attractive is easy. We thrive by transforming “dry” sectors (SaaS, Fintech, logistics) into high-end visual references.',
        },
        {
          title: 'Visual Specialization:',
          body: 'We speak your language: CTR, retention, MQLs, and SQLs. The road to conversion is long, and we shorten it through radical efficiency.',
        },
      ],
      bottomTitle: 'A team that has been in your shoes',
      bottomBody: 'We are Users turned Creators. Before becoming an agency, we were where you are today. We understand the challenges, the pressure for results, and the need to stand out. We know what works because we have tested it thousands of times.',
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
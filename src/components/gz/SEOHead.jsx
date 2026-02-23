import { useEffect } from 'react';
import { useLanguage } from './LanguageContext';

// ─────────────────────────────────────────────
// Replace GA_MEASUREMENT_ID with your actual Google Analytics ID
// e.g. 'G-XXXXXXXXXX'
// ─────────────────────────────────────────────
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';

const seoData = {
  es: {
    title: 'Gz Agency — Anuncios en Video para SaaS y Marcas Digitales',
    description: 'Creamos campañas de video de calidad profesional a precios asequibles para startups SaaS y negocios digitales. Anuncios orientados a resultados que convierten.',
    keywords: 'agencia de video marketing, anuncios de video SaaS, video marketing digital, publicidad en video, anuncios para redes sociales, producción de video profesional',
    ogTitle: 'Gz Agency — Video Marketing que Convierte',
    ogDescription: 'Anuncios en video de alta calidad para SaaS y marcas innovadoras. Precios asequibles, resultados reales.',
  },
  en: {
    title: 'Gz Agency — Video Ads for SaaS & Digital Brands',
    description: 'We create professional-quality video campaigns at affordable prices for SaaS startups and digital businesses. Results-driven ads that convert.',
    keywords: 'video marketing agency, SaaS video ads, digital video marketing, video advertising, social media ads, professional video production',
    ogTitle: 'Gz Agency — Video Marketing that Converts',
    ogDescription: 'High-quality video ads for SaaS and innovative brands. Affordable pricing, real results.',
  },
};

function setMeta(name, content, property = false) {
  const attr = property ? 'property' : 'name';
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export default function SEOHead() {
  const { lang } = useLanguage();
  const seo = seoData[lang] || seoData.es;
  const canonicalUrl = 'https://gz.agency';
  const ogImage = 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/699ad01ace6c66924ebbe714/d1ed0ee5c_logoGZ.png';

  useEffect(() => {
    // Title
    document.title = seo.title;

    // Basic meta
    setMeta('description', seo.description);
    setMeta('keywords', seo.keywords);
    setMeta('robots', 'index, follow');
    setMeta('author', 'Gz Agency');
    setMeta('language', lang === 'es' ? 'Spanish' : 'English');

    // Viewport (safety)
    setMeta('viewport', 'width=device-width, initial-scale=1.0');

    // Open Graph
    setMeta('og:type', 'website', true);
    setMeta('og:url', canonicalUrl, true);
    setMeta('og:title', seo.ogTitle, true);
    setMeta('og:description', seo.ogDescription, true);
    setMeta('og:image', ogImage, true);
    setMeta('og:site_name', 'Gz Agency', true);
    setMeta('og:locale', lang === 'es' ? 'es_ES' : 'en_US', true);

    // Twitter Card
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', seo.ogTitle);
    setMeta('twitter:description', seo.ogDescription);
    setMeta('twitter:image', ogImage);

    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

    // Structured Data (JSON-LD)
    let jsonLd = document.querySelector('#gz-jsonld');
    if (!jsonLd) {
      jsonLd = document.createElement('script');
      jsonLd.id = 'gz-jsonld';
      jsonLd.type = 'application/ld+json';
      document.head.appendChild(jsonLd);
    }
    jsonLd.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: 'Gz Agency',
      url: canonicalUrl,
      logo: ogImage,
      email: 'hello@gz.agency',
      description: seo.description,
      serviceType: 'Video Marketing Agency',
      areaServed: 'Worldwide',
      sameAs: [],
    });
  }, [lang]);

  useEffect(() => {
    // Google Analytics — inject once
    if (GA_MEASUREMENT_ID === 'G-XXXXXXXXXX') return; // Skip if not configured
    if (document.querySelector('#gz-gtag')) return;

    const script1 = document.createElement('script');
    script1.id = 'gz-gtag';
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.textContent = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_MEASUREMENT_ID}', {
        page_title: document.title,
        page_location: window.location.href,
      });
    `;
    document.head.appendChild(script2);

    // Expose gtag globally for event tracking
    window.gzTrack = (eventName, params = {}) => {
      if (window.gtag) window.gtag('event', eventName, params);
    };
  }, []);

  return null; // No DOM output — only head manipulation
}
import React from 'react';
import { useLanguage } from './LanguageContext';
import { Check, ArrowRight, Star } from 'lucide-react';

export default function PricingSection() {
  const { t } = useLanguage();

  return (
    <section id="pricing" className="py-24 sm:py-32 relative overflow-hidden" style={{ backgroundColor: '#EFEAE6' }}>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#2D5652' }}>
            {t.services.eyebrow}
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight" style={{ color: '#0C2C47' }}>
            {t.services.title}
          </h2>
          <p className="mt-4 text-lg max-w-xl mx-auto" style={{ color: 'rgba(12,44,71,0.55)' }}>
            {t.services.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {t.services.plans.map((plan, i) => (
            <div
              key={i}
              className="relative rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1"
              style={
                plan.popular
                  ? {
                      backgroundColor: '#0C2C47',
                      boxShadow: '0 24px 60px rgba(12,44,71,0.25)',
                    }
                  : {
                      backgroundColor: 'rgba(255,255,255,0.6)',
                      backdropFilter: 'blur(12px)',
                      border: '1px solid rgba(12,44,71,0.12)',
                      boxShadow: '0 4px 20px rgba(12,44,71,0.06)',
                    }
              }
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold rounded-full"
                    style={{ backgroundColor: '#E2A54D', color: '#0C2C47' }}
                  >
                    <Star className="w-3 h-3 fill-current" />
                    Popular
                  </div>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-bold" style={{ color: plan.popular ? '#97D3CD' : '#0C2C47' }}>
                  {plan.name}
                </h3>
                <p className="mt-1 text-sm" style={{ color: plan.popular ? 'rgba(151,211,205,0.6)' : 'rgba(12,44,71,0.5)' }}>
                  {plan.description}
                </p>
              </div>

              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-black tracking-tight" style={{ color: plan.popular ? '#E2A54D' : '#0C2C47' }}>
                  {plan.price}
                </span>
                <span className="text-sm" style={{ color: plan.popular ? 'rgba(151,211,205,0.6)' : 'rgba(12,44,71,0.5)' }}>
                  {plan.period}
                </span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <div
                      className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: plan.popular ? 'rgba(226,165,77,0.2)' : 'rgba(45,86,82,0.1)' }}
                    >
                      <Check className="w-3 h-3" style={{ color: plan.popular ? '#E2A54D' : '#2D5652' }} />
                    </div>
                    <span className="text-sm" style={{ color: plan.popular ? 'rgba(239,234,230,0.8)' : 'rgba(12,44,71,0.7)' }}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href={`mailto:hello@gz.agency?subject=${encodeURIComponent(plan.name + ' Plan')}`}
                className="group w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full font-semibold text-sm transition-all active:scale-[0.98] hover:shadow-lg"
                style={
                  plan.popular
                    ? { backgroundColor: '#E2A54D', color: '#0C2C47' }
                    : { backgroundColor: '#2D5652', color: '#E2A54D' }
                }
              >
                {t.services.cta}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
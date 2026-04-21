import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from './LanguageContext';
import { CheckCircle2, Star } from 'lucide-react';

export default function PricingSection() {
  const { t } = useLanguage();
  const DARK_PANEL = '#07152a';
  const FORM_BG = '#efefef';
  const PROPOSAL_EMAIL = 'Gz.agencys@gmail.com';

  const handleProposalSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const fields = {
      [t.pricing.labels.name]: formData.get('name')?.toString().trim() || '-',
      [t.pricing.labels.company]: formData.get('company')?.toString().trim() || '-',
      [t.pricing.labels.email]: formData.get('email')?.toString().trim() || '-',
      [t.pricing.labels.contact]: formData.get('contact')?.toString().trim() || '-',
      [t.pricing.labels.brief]: formData.get('brief')?.toString().trim() || '-',
      [t.pricing.labels.need]: formData.get('need')?.toString().trim() || '-',
      [t.pricing.labels.budget]: formData.get('budget')?.toString().trim() || '-',
      [t.pricing.labels.source]: formData.get('source')?.toString().trim() || '-',
    };

    const subject = `${t.pricing.submitCta} - ${fields[t.pricing.labels.company]}`;
    const body = Object.entries(fields)
      .map(([label, value]) => `${label}: ${value}`)
      .join('\n');

    window.location.href = `mailto:${PROPOSAL_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="pricing" className="py-20 sm:py-24" style={{ backgroundColor: '#07152a' }}>
      <div className="gz-mobile-shell mx-auto max-w-[1080px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-8 lg:gap-10 items-start">
          <div className="rounded-[18px] p-5 sm:p-7 lg:p-8" style={{ backgroundColor: DARK_PANEL }}>
            <h2 className="text-[2rem] sm:text-[2.45rem] leading-[1.06] font-semibold mb-6 text-white">
              {t.pricing.leftTitle}
            </h2>

            <ul className="space-y-3 mb-7">
              {t.pricing.points.map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-white/90 text-[1rem] sm:text-[1.08rem] leading-[1.55]">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-white/85" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <Link
              to="/book"
              className="inline-flex items-center justify-center min-h-[46px] px-7 rounded-xl text-sm font-semibold text-[#10192b] shadow-[0_0_28px_rgba(246,191,53,0.45)]"
              style={{ backgroundColor: '#f0c44f' }}
            >
              {t.pricing.strategyCta}
            </Link>

            <div className="mt-8">
              <div className="flex items-center gap-1 text-[#f0c44f] mb-4">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-white/90 text-[0.98rem] sm:text-[1.02rem] leading-[1.6] max-w-[500px]">
                {t.pricing.testimonial}
              </p>
              <div className="mt-4">
                <p className="text-white font-semibold">{t.pricing.testimonialName}</p>
                <p className="text-white/55 text-sm">{t.pricing.testimonialRole}</p>
              </div>
            </div>
          </div>

          <div className="rounded-[12px] border border-[#d7d7d7] p-5 sm:p-7" style={{ backgroundColor: FORM_BG }}>
            <h3 className="text-[#2b2b2b] text-[1.65rem] sm:text-[2rem] font-semibold mb-5">
              {t.pricing.formTitle}
            </h3>

            <form className="space-y-3" onSubmit={handleProposalSubmit}>
              <label className="block text-[#252525] text-sm font-medium">
                {t.pricing.labels.name}
                <input name="name" type="text" placeholder={t.pricing.placeholders.name} className="mt-1 w-full h-11 rounded-md px-3 text-sm text-[#2b2b2b] placeholder:text-[#6c6c6c] border border-[#d9d9d9] bg-[#f4f4f4] outline-none" required />
              </label>

              <label className="block text-[#252525] text-sm font-medium">
                {t.pricing.labels.company}
                <input name="company" type="text" placeholder={t.pricing.placeholders.company} className="mt-1 w-full h-11 rounded-md px-3 text-sm text-[#2b2b2b] placeholder:text-[#6c6c6c] border border-[#d9d9d9] bg-[#f4f4f4] outline-none" required />
              </label>

              <label className="block text-[#252525] text-sm font-medium">
                {t.pricing.labels.email}
                <input name="email" type="email" placeholder={t.pricing.placeholders.email} className="mt-1 w-full h-11 rounded-md px-3 text-sm text-[#2b2b2b] placeholder:text-[#6c6c6c] border border-[#d9d9d9] bg-[#f4f4f4] outline-none" required />
              </label>

              <label className="block text-[#252525] text-sm font-medium">
                {t.pricing.labels.contact}
                <input name="contact" type="tel" placeholder={t.pricing.placeholders.contact} className="mt-1 w-full h-11 rounded-md px-3 text-sm text-[#2b2b2b] placeholder:text-[#6c6c6c] border border-[#d9d9d9] bg-[#f4f4f4] outline-none" required />
              </label>

              <label className="block text-[#252525] text-sm font-medium">
                {t.pricing.labels.brief}
                <textarea name="brief" placeholder={t.pricing.placeholders.brief} className="mt-1 w-full min-h-[92px] rounded-md px-3 py-2.5 text-sm text-[#2b2b2b] placeholder:text-[#6c6c6c] border border-[#d9d9d9] bg-[#f4f4f4] outline-none resize-none" required />
              </label>

              <label className="block text-[#252525] text-sm font-medium">
                {t.pricing.labels.need}
                <select name="need" className="mt-1 w-full h-11 rounded-md px-3 text-sm text-[#2b2b2b] border border-[#d9d9d9] bg-[#f4f4f4] outline-none" required>
                  {t.pricing.options.need.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </label>

              <label className="block text-[#252525] text-sm font-medium">
                {t.pricing.labels.budget}
                <select name="budget" className="mt-1 w-full h-11 rounded-md px-3 text-sm text-[#2b2b2b] border border-[#d9d9d9] bg-[#f4f4f4] outline-none" required>
                  {t.pricing.options.budget.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </label>

              <label className="block text-[#252525] text-sm font-medium">
                {t.pricing.labels.source}
                <select name="source" className="mt-1 w-full h-11 rounded-md px-3 text-sm text-[#2b2b2b] border border-[#d9d9d9] bg-[#f4f4f4] outline-none" required>
                  {t.pricing.options.source.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </label>

              <button
                type="submit"
                className="mt-2 inline-flex w-full items-center justify-center min-h-[44px] rounded-[8px] px-4 text-sm font-semibold text-[#1f1f1f]"
                style={{ backgroundColor: '#f0c44f' }}
              >
                {t.pricing.submitCta}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
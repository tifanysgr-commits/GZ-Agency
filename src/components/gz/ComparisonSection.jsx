import React from 'react';
import { useLanguage } from './LanguageContext';

function PointItem({ title, body, positive }) {
  return (
    <li className="mb-5 last:mb-0">
      <div className="flex items-start gap-3">
        {positive ? (
          <img
            src="/check-icon-teal.png"
            alt=""
            aria-hidden="true"
            className="mt-1 h-6 w-6 shrink-0 object-contain"
          />
        ) : (
          <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center text-xs font-semibold text-[#4b5563]">
            ✓
          </span>
        )}
        <div>
          <p className="text-[34px] leading-tight text-[#1f2937]" style={{ fontSize: 'clamp(1.15rem, 1.5vw, 2rem)' }}>
            {title}
          </p>
          <p className="mt-1 text-[15px] leading-snug text-[#6b7280]">{body}</p>
        </div>
      </div>
    </li>
  );
}

export default function ComparisonSection() {
  const { t } = useLanguage();

  return (
    <section className="-mt-2 lg:-mt-4 pt-4 pb-16 lg:pt-6 lg:pb-24" style={{ backgroundColor: '#efeeec' }}>
      <div className="gz-mobile-shell mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: '1040px' }}>
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-2 text-[#213743]">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#12323f]" />
            <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.08em]">{t.comparison.eyebrow}</p>
          </div>
        </div>
        <h2
          className="text-center text-[#111827] leading-tight mb-8 sm:mb-10"
          style={{
            fontFamily: '"Crimson Text", serif',
            fontWeight: 400,
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
          }}
        >
          {t.comparison.titleLine1}
          <br />
          {t.comparison.titleLine2}
        </h2>

        <div
          className="rounded-[28px] p-2 md:p-3"
          style={{
            background: 'linear-gradient(130deg, #fbfdff 0%, #e3eaf2 46%, #aac0d7 100%)',
            boxShadow: '0 18px 50px rgba(122, 145, 171, 0.28)',
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="p-5 sm:p-6 md:p-8">
              <h3 className="text-[#1f2937] font-semibold mb-5 sm:mb-6 text-[1.6rem] sm:text-3xl">{t.comparison.traditionalTitle}</h3>
              <ul>
                {t.comparison.traditionalPoints.map((item) => (
                  <PointItem key={item.title} title={item.title} body={item.body} positive={false} />
                ))}
              </ul>
            </div>

            <div className="rounded-[22px] bg-white p-5 sm:p-6 md:p-8 border border-[#c8d4e3]">
              <h3 className="text-[#1f2937] font-semibold mb-5 sm:mb-6 text-[1.6rem] sm:text-3xl">{t.comparison.gzTitle}</h3>
              <ul>
                {t.comparison.gzPoints.map((item) => (
                  <PointItem key={item.title} title={item.title} body={item.body} positive />
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bloque AEO */}
        <div className="mt-10 sm:mt-12 max-w-[720px] mx-auto">
          <p className="text-[1rem] sm:text-[1.1rem] leading-relaxed text-[#374151] text-center" style={{ fontFamily: '"Figtree", sans-serif' }}>
            {t.comparison.aeo}
          </p>
        </div>
      </div>
    </section>
  );
}

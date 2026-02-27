import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../components/gz/LanguageContext';

export default function SaberMas() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-[#0F2135] py-10 sm:py-14 text-white" style={{ fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif' }}>
      <div className="mx-auto w-full max-w-[1240px] px-4 sm:px-6">
        <div className="mb-6 sm:mb-8">
          <Link
            to="/"
            className="inline-flex items-center rounded-full border border-white/25 px-4 py-1.5 text-sm font-medium text-white/90 hover:bg-white/10 transition-colors"
          >
            {t.aboutPage.back}
          </Link>
        </div>

        <div className="space-y-14 sm:space-y-20">
          <section className="rounded-2xl bg-[#0F2135] p-6 sm:p-8 lg:p-10">
            <h1 className="text-[2.65rem] sm:text-[4rem] font-semibold leading-[1.04] tracking-tight mb-10 sm:mb-12 lg:mb-16">
              {t.aboutPage.heroTitle}
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-[0.76fr_1.6fr] gap-8 lg:gap-12 items-start">
              <aside>
                <div className="inline-flex h-[66px] w-[84px] items-center justify-center bg-[#9AF0D7] mb-5" aria-hidden="true">
                  <svg
                    viewBox="0 0 160 130"
                    className="h-[52px] w-[68px]"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M34 16C21 16 11 26 11 39V89C11 101 19 109 31 109H53C61 109 67 103 67 95V71C67 63 61 57 53 57H39V41C39 36 42 33 47 33H55V16H34Z"
                      fill="#10163A"
                    />
                    <path
                      d="M102 16C89 16 79 26 79 39V89C79 101 87 109 99 109H121C129 109 135 103 135 95V71C135 63 129 57 121 57H107V41C107 36 110 33 115 33H123V16H102Z"
                      fill="#10163A"
                    />
                  </svg>
                </div>
                <p className="max-w-[320px] text-[2rem] sm:text-[2.95rem] leading-[1.3] font-semibold text-white/95 mb-10">
                  {t.aboutPage.quote}
                </p>
                <p className="text-[1.45rem] font-semibold text-white/90">Tiffany G.</p>
                <p className="text-[1.32rem] italic text-white/70 mt-1">{t.aboutPage.quoteRole}</p>
              </aside>

              <article className="text-white/88 text-[1.16rem] sm:text-[1.52rem] leading-[1.9] tracking-[0.005em]">
                <p className="font-semibold mb-4 text-white/95">
                  {t.aboutPage.storyIntro}
                </p>
                <ul className="list-disc pl-6 space-y-2.5 mb-8 text-white/80">
                  {t.aboutPage.storyBullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                <p className="mb-8 text-white/80">
                  {t.aboutPage.storyBridge}
                </p>

                <ol className="list-decimal pl-6 space-y-2.5 text-white/80">
                  {t.aboutPage.pillars.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ol>
              </article>
            </div>
          </section>

          <section className="rounded-2xl bg-[#0F2135] p-4 sm:p-6">
            <div className="rounded-[28px] border border-[#d7dde6] bg-[#f6f8fb] p-6 sm:p-8 lg:p-10 text-[#20252d] shadow-[0_24px_70px_rgba(6,17,36,0.35)]">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                <div>
                  <h2 className="text-[2rem] sm:text-[2.9rem] font-medium leading-[1.12] tracking-[-0.01em] mb-6 text-[#1e232b]" style={{ fontFamily: '"Crimson Text", serif' }}>
                    {t.aboutPage.whyTitleTop}<br />{t.aboutPage.whyTitleBottom}
                  </h2>
                  <p className="text-[1rem] sm:text-[1.08rem] leading-[1.95] text-[#303640]">
                    <strong>{t.aboutPage.whyBody.bold1}</strong> {t.aboutPage.whyBody.text1}
                    <br /><br />
                    <strong>{t.aboutPage.whyBody.bold2}</strong> {t.aboutPage.whyBody.text2}
                    <br /><br />
                    <strong>{t.aboutPage.whyBody.bold3}</strong>
                  </p>
                </div>

                <div className="space-y-7">
                  <div>
                    <h3 className="text-[1.45rem] sm:text-[1.75rem] font-semibold mb-2 text-[#20252d]">{t.aboutPage.cards[0].title}</h3>
                    <p className="text-[0.98rem] sm:text-[1.02rem] leading-[1.9] text-[#303640]">{t.aboutPage.cards[0].body}</p>
                  </div>
                  <div>
                    <h3 className="text-[1.45rem] sm:text-[1.75rem] font-semibold mb-2 text-[#20252d]">{t.aboutPage.cards[1].title}</h3>
                    <p className="text-[0.98rem] sm:text-[1.02rem] leading-[1.9] text-[#303640]">{t.aboutPage.cards[1].body}</p>
                  </div>
                  <div>
                    <h3 className="text-[1.45rem] sm:text-[1.75rem] font-semibold mb-2 text-[#20252d]">{t.aboutPage.cards[2].title}</h3>
                    <p className="text-[0.98rem] sm:text-[1.02rem] leading-[1.9] text-[#303640]">{t.aboutPage.cards[2].body}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 sm:mt-10 text-center">
              <h3 className="text-[2rem] sm:text-[2.6rem] font-semibold text-white mb-3">{t.aboutPage.bottomTitle}</h3>
              <p className="text-[1.15rem] sm:text-[1.5rem] text-white/90 leading-[1.6] max-w-5xl mx-auto">
                {t.aboutPage.bottomBody}
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

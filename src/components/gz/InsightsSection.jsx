import React from 'react';
import { useLanguage } from './LanguageContext';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';

export default function InsightsSection() {
  const { t } = useLanguage();

  return (
    <section id="insights" className="py-20 sm:py-24 bg-white">
      <div className="gz-mobile-shell max-w-[720px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-[#213743] mb-4">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#12323f]" />
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.08em]">{t.faqConsulting.eyebrow}</span>
          </div>
          <h2
            className="text-[#111827] leading-tight"
            style={{
              fontFamily: '"Crimson Text", serif',
              fontWeight: 400,
              fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
            }}
          >
            {t.faqConsulting.title}
          </h2>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {t.faqConsulting.items.map((item, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-b border-[#e5e7eb]">
              <AccordionTrigger className="text-[#1f2937] font-semibold text-[1rem] sm:text-[1.05rem] py-5 hover:no-underline hover:text-[#0f172a]">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-[#4b5563] leading-relaxed text-[0.95rem]">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

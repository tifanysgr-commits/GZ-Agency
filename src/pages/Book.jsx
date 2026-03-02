import React from 'react';
import { Link } from 'react-router-dom';
import { Clock3, Video, Globe } from 'lucide-react';
import { useLanguage } from '../components/gz/LanguageContext';

const GOOGLE_CALENDAR_BOOKING_URL = 'https://calendar.app.google/DeeZzudAuKoAVaRk8';
const GOOGLE_CALENDAR_SCRIPT_URL = 'https://calendar.google.com/calendar/scheduling-button-script.js';

export default function Book() {
  const { t } = useLanguage();
  const labels = t.booking;
  const bookingButtonHostRef = React.useRef(null);

  React.useEffect(() => {
    let isMounted = true;

    const renderOfficialButton = () => {
      if (!isMounted || !bookingButtonHostRef.current || !window.calendar?.schedulingButton?.load) return;
      bookingButtonHostRef.current.innerHTML = '';
      window.calendar.schedulingButton.load({
        url: GOOGLE_CALENDAR_BOOKING_URL,
        color: '#2D5652',
        label: labels.popupCta,
        target: bookingButtonHostRef.current,
      });
    };

    const existingScript = document.querySelector(`script[src="${GOOGLE_CALENDAR_SCRIPT_URL}"]`);
    if (existingScript) {
      if (window.calendar?.schedulingButton?.load) {
        renderOfficialButton();
      } else {
        existingScript.addEventListener('load', renderOfficialButton, { once: true });
      }
    } else {
      const script = document.createElement('script');
      script.src = GOOGLE_CALENDAR_SCRIPT_URL;
      script.async = true;
      script.addEventListener('load', renderOfficialButton, { once: true });
      document.body.appendChild(script);
    }

    return () => {
      isMounted = false;
    };
  }, [labels.popupCta]);

  return (
    <main className="min-h-screen bg-[#07152a] text-white px-4 py-6 sm:py-8">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-4 sm:mb-5">
          <Link
            to="/"
            className="inline-flex items-center rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white/90 hover:bg-white/10 transition-colors"
          >
            {labels.back}
          </Link>
        </div>

        <section className="rounded-[22px] border border-white/10 bg-[#0b1730] overflow-hidden shadow-[0_22px_80px_rgba(0,0,0,0.45)]">
          <div className="grid grid-cols-1 lg:grid-cols-[330px_1fr]">
            <aside className="border-b lg:border-b-0 lg:border-r border-white/10 p-6 sm:p-7 lg:p-8">
              <h1 className="text-[1.95rem] sm:text-[2.2rem] font-semibold mb-6">{labels.title}</h1>

              <div className="flex items-center gap-2.5 text-white/80 mb-3">
                <Clock3 className="w-4 h-4" />
                <span>{labels.duration}</span>
              </div>
              <div className="flex items-center gap-2.5 text-white/80 mb-3">
                <Video className="w-4 h-4" />
                <span>{labels.platform}</span>
              </div>
              <div className="flex items-center gap-2.5 text-white/80 mb-5">
                <Globe className="w-4 h-4" />
                <span>{labels.timezone}</span>
              </div>

              <p className="text-white/78 leading-[1.55] text-[0.96rem]">
                {labels.description}
              </p>

              <a
                href={GOOGLE_CALENDAR_BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex min-h-[44px] items-center justify-center rounded-md border border-white/20 bg-white/5 px-4 text-sm font-medium text-white hover:bg-white/10 transition-colors"
              >
                {labels.openExternal}
              </a>
            </aside>

            <div className="min-h-[560px] lg:min-h-[640px] bg-[#0b1730] p-6 sm:p-8 lg:p-10 flex items-center justify-center">
              <div className="w-full max-w-[560px] rounded-[16px] border border-[#193862] bg-[#0a1d3a] p-7 sm:p-9 text-center shadow-[0_20px_60px_rgba(2,8,22,0.58)]">
                <h2 className="text-[1.7rem] sm:text-[2rem] font-semibold mb-3 text-white">
                  {labels.popupTitle}
                </h2>
                <p className="text-white/80 leading-[1.55] text-[0.98rem] sm:text-[1rem] mb-8">
                  {labels.popupDescription}
                </p>
                <div ref={bookingButtonHostRef} className="gz-official-booking-btn inline-flex" />
              </div>
            </div>
          </div>
        </section>
      </div>
      <style>{`
        .gz-official-booking-btn button,
        .gz-official-booking-btn a {
          min-height: 46px !important;
          padding: 0 2rem !important;
          border-radius: 9999px !important;
          border: none !important;
          background: #2D5652 !important;
          color: #E2A54D !important;
          font-weight: 600 !important;
          font-size: 0.875rem !important;
          box-shadow: none !important;
          transition: filter .2s ease, transform .15s ease !important;
        }
        .gz-official-booking-btn button:hover,
        .gz-official-booking-btn a:hover {
          filter: brightness(1.08) !important;
        }
        .gz-official-booking-btn button:active,
        .gz-official-booking-btn a:active {
          transform: scale(0.98) !important;
        }
      `}</style>
    </main>
  );
}

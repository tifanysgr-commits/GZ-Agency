import React from 'react';
import { useLanguage } from './LanguageContext.jsx';
import { Megaphone, PlayCircle, Users, Monitor, Share2, Rocket } from 'lucide-react';

const iconMap = {
  megaphone: Megaphone,
  play: PlayCircle,
  users: Users,
  monitor: Monitor,
  share: Share2,
  rocket: Rocket,
};

export default function VideoTypesSection() {
  const { t } = useLanguage();

  return (
    <section
      id="video-types"
      className="py-24 sm:py-32"
      style={{ backgroundColor: '#0C2C47' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#97D3CD' }}>
            {t.videoTypes.eyebrow}
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight" style={{ color: '#EFEAE6' }}>
            {t.videoTypes.title}
          </h2>
          <p className="mt-4 text-lg max-w-xl mx-auto" style={{ color: 'rgba(239,234,230,0.55)' }}>
            {t.videoTypes.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {t.videoTypes.types.map((type, i) => {
            const Icon = iconMap[type.icon] || PlayCircle;
            return (
              <div
                key={i}
                className="group p-7 rounded-2xl transition-all duration-300 cursor-default hover:-translate-y-0.5"
                style={{
                  backgroundColor: 'rgba(151,211,205,0.07)',
                  border: '1px solid rgba(151,211,205,0.15)',
                  backdropFilter: 'blur(8px)',
                  boxShadow: '0 0 0 transparent',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(151,211,205,0.13)'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(151,211,205,0.07)'}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: 'rgba(226,165,77,0.15)' }}
                >
                  <Icon className="w-5 h-5" style={{ color: '#E2A54D' }} />
                </div>
                <h3 className="text-base font-bold mb-2" style={{ color: '#EFEAE6' }}>{type.name}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(239,234,230,0.5)' }}>{type.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
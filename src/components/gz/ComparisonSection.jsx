import React from 'react';

const TRADITIONAL_POINTS = [
  {
    title: 'Cero margen para la innovacion',
    body: 'Manuales antiguos y estructuras rigidas que impiden reaccionar rapido a las tendencias actuales.',
  },
  {
    title: 'Barrera de entrada economica',
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
];

const GZ_POINTS = [
  {
    title: 'Innovacion constante y curiosa',
    body: 'Somos autodesarrolladores y didactas: experimentamos con lo ultimo en algoritmos y formatos antes que nadie.',
  },
  {
    title: 'Democratizamos el lanzamiento',
    body: 'Gracias a nuestra automatizacion inteligente, reducimos costos operativos para que a tu bolsillo llegue una carta de presentacion asequible.',
  },
  {
    title: 'Apostamos por el potencial',
    body: 'Apostamos por ideas: si usamos tu marca, sabemos como venderla.',
  },
  {
    title: 'Marketing de ventas real',
    body: 'Resultados reales: menos teoria de agencia y mas ventas que funcionan.',
  },
];

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
  return (
    <section className="-mt-2 lg:-mt-4 pt-4 pb-16 lg:pt-6 lg:pb-24" style={{ backgroundColor: '#efeeec' }}>
      <div className="gz-mobile-shell mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: '1040px' }}>
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-2 text-[#213743]">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#12323f]" />
            <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.08em]">¿Por qué elegirnos?</p>
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
          Publicidad profesional. Calidad alta.
          <br />
          Precio inteligente
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
              <h3 className="text-[#1f2937] font-semibold mb-5 sm:mb-6 text-[1.6rem] sm:text-3xl">Agencias tradicionales</h3>
              <ul>
                {TRADITIONAL_POINTS.map((item) => (
                  <PointItem key={item.title} title={item.title} body={item.body} positive={false} />
                ))}
              </ul>
            </div>

            <div className="rounded-[22px] bg-white p-5 sm:p-6 md:p-8 border border-[#c8d4e3]">
              <h3 className="text-[#1f2937] font-semibold mb-5 sm:mb-6 text-[1.6rem] sm:text-3xl">GZ Agency</h3>
              <ul>
                {GZ_POINTS.map((item) => (
                  <PointItem key={item.title} title={item.title} body={item.body} positive />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

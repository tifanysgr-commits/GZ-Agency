import React from 'react';
import { Link } from 'react-router-dom';

export default function SaberMas() {
  return (
    <main className="min-h-screen bg-[#0F2135] py-10 sm:py-14 text-white" style={{ fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif' }}>
      <div className="mx-auto w-full max-w-[1100px] px-4 sm:px-6">
        <div className="mb-6 sm:mb-8">
          <Link
            to="/"
            className="inline-flex items-center rounded-full border border-white/25 px-4 py-1.5 text-sm font-medium text-white/90 hover:bg-white/10 transition-colors"
          >
            Volver
          </Link>
        </div>

        <div className="space-y-6 sm:space-y-8">
          <section className="rounded-2xl bg-[#0F2135] p-8 sm:p-10">
            <h1 className="text-[2.8rem] sm:text-[4.2rem] font-semibold leading-[1.03] tracking-tight mb-8">De Usuarios a Creadores :</h1>
            <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.45fr] gap-8 lg:gap-12">
              <aside>
                <div className="inline-flex h-[70px] w-[70px] items-center justify-center bg-[#8fe7cf] text-[#0F2135] text-[5rem] font-black leading-none mb-5">
                  “
                </div>
                <p className="text-[2.25rem] sm:text-[3rem] leading-[1.28] font-semibold text-white/95 mb-8">
                  Lo hago porque es divertido, y disfruto haciendolo.
                </p>
                <p className="text-[1.55rem] font-semibold text-white/90">Tiffany G.</p>
                <p className="text-[1.45rem] italic text-white/70 mt-1">CEO y Fundadora de Gz Agency</p>
              </aside>

              <article className="text-white/90 text-[1.45rem] sm:text-[1.85rem] leading-[1.8]">
                <p className="font-semibold mb-3">
                  El motivo es muy simple: lo que nació por curiosidad y pasión hoy es una metodología probada:
                </p>
                <ul className="list-disc pl-5 space-y-2 mb-6 text-white/85">
                  <li>Es el resultado de experimentar con lo que nosotros mismos consumiríamos: cortes rápidos, estética limpia y un mensaje directo.</li>
                  <li>No vendemos humo; vendemos métricas y contenido que atrapa.</li>
                </ul>

                <p className="mb-5">
                  Marketing de Ventas: Resultados, no teorías. Dominamos la post-producción dinámica porque cada frame cuenta.
                  Sabemos qué convierte tras miles de pruebas. Nuestros tres pilares:
                </p>

                <ol className="list-decimal pl-5 space-y-2">
                  <li>Sin rellenos: Vamos directo a la conversión con un lenguaje visual fresco que evita las distracciones innecesarias.</li>
                  <li>Eficiencia radical: Automatizamos procesos de edición para entregarte calidad premium en tiempo récord.</li>
                  <li>Cercanía: Sin costos inflados; una propuesta de valor de alta gama, pero totalmente asequible.</li>
                </ol>
              </article>
            </div>
          </section>

          <section className="rounded-2xl bg-[#0F2135] p-8 sm:p-10">
            <div className="rounded-[24px] bg-[#0F2135] p-6 sm:p-8 text-white">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
                <div>
                  <h2 className="text-[2.65rem] sm:text-[4.1rem] font-medium leading-[1.05] mb-5" style={{ fontFamily: '"Crimson Text", serif' }}>
                    Por qué las marcas<br />confían en Gz Agency
                  </h2>
                  <p className="text-[1.2rem] sm:text-[1.45rem] leading-[1.85]">
                    <strong>Tu decisión es estratégica,</strong> no solo visual. No buscas “videos bonitos” que mueran en el scroll; buscas un socio que hable el idioma de tu negocio.
                    <br /><br />
                    <strong>En Gz Agency,</strong> la post-producción de alta gama es una herramienta psicológica: cada frame está diseñado para capturar la atención en 3 segundos y escoltar al usuario hacia la acción.
                    Nos jugamos tu reputación y tus métricas en cada entrega, porque un contenido mediocre es un riesgo para tu marca.
                    Nuestra metodología no termina al exportar, sino cuando movemos la aguja de tus resultados.
                    <br /><br />
                    <strong>No somos proveedores de contenido; somos los guardianes de tu impacto visual.</strong>
                  </p>
                </div>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-[1.85rem] sm:text-[2.25rem] font-semibold mb-2">Implicación Creativa:</h3>
                    <p className="text-[1.1rem] sm:text-[1.3rem] leading-[1.8]">No seguimos órdenes, nos adueñamos de tu visión. Pensamos fuera de la caja para plantearte soluciones visuales que ni siquiera habías imaginado.</p>
                  </div>
                  <div>
                    <h3 className="text-[1.85rem] sm:text-[2.25rem] font-semibold mb-2">Proyectos de Alta Complejidad:</h3>
                    <p className="text-[1.1rem] sm:text-[1.3rem] leading-[1.8]">Hacer que una marca de consumo sea atractiva es fácil. Nosotros sacamos pecho transformando sectores “áridos” (SaaS, Fintech, logística) en referentes visuales de alta gama. Nos motivan los sectores desafiantes.</p>
                  </div>
                  <div>
                    <h3 className="text-[1.85rem] sm:text-[2.25rem] font-semibold mb-2">Especialización Visual:</h3>
                    <p className="text-[1.1rem] sm:text-[1.3rem] leading-[1.8]">Hablamos tu mismo idioma: CTR, retención, MQLs y SQLs. El camino hacia la conversión es largo, pero nosotros lo hacemos más corto a través de la eficiencia radical.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <h3 className="text-[2rem] sm:text-[3rem] font-semibold text-white mb-2">Un equipo que ha estado en tu piel</h3>
              <p className="text-[1.6rem] sm:text-[2.25rem] text-white/90 leading-[1.55] max-w-5xl mx-auto">
                Somos Usuarios convertidos en Creadores. Antes de ser agencia, estuvimos donde estás tú hoy.
                Entendemos los retos, la presión por los resultados y la necesidad de diferenciarte.
                Sabemos qué funciona porque lo hemos probado miles de veces.
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

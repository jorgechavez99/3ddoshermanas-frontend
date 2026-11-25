/**
 * Plantilla comun de las tres paginas de escaparate.
 * Incluye datos estructurados FAQPage para que Google pueda mostrar las
 * preguntas frecuentes directamente en los resultados.
 */
import { getEscaparate } from '@/data/escaparates'
import { colores } from './colores'
import { BotonWhatsapp } from './BotonWhatsapp'
import { Ilustracion3D } from './Ilustracion3D'
import { LlamadaFinal } from './Secciones'
import { JsonLd } from './JsonLd'

export const PreguntasFrecuentes = ({ faqs }) => (
  <div className="divide-y divide-tinta/10 border-y border-tinta/10">
    {faqs.map((faq) => (
      <details key={faq.pregunta} className="py-4">
        <summary className="flex items-start justify-between gap-4 font-titulo text-lg font-bold">
          {faq.pregunta}
          <span className="marcador text-2xl leading-none" aria-hidden="true">+</span>
        </summary>
        <p className="mt-2 max-w-2xl text-tinta-suave">{faq.respuesta}</p>
      </details>
    ))}
  </div>
)

export const PaginaEscaparate = ({ slug }) => {
  const e = getEscaparate(slug)
  const c = colores[e.color]
  const mensaje = `Hola, vengo de la web y me interesa: ${e.titulo.toLowerCase()}. ¿Me dais presupuesto?`

  const schemaFaq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: e.faqs.map((f) => ({
      '@type': 'Question',
      name: f.pregunta,
      acceptedAnswer: { '@type': 'Answer', text: f.respuesta },
    })),
  }

  return (
    <>
      <JsonLd datos={schemaFaq} />
      <section className="bg-papel">
        <div className={`lineas-capa h-3 ${c.texto}`} aria-hidden="true" />
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-5 py-12 md:grid-cols-[1.3fr_1fr] md:py-16">
          <div>
            <h1 className="text-4xl font-extrabold sm:text-5xl lg:text-6xl">{e.titulo}</h1>
            <p className="mt-5 max-w-xl text-lg text-tinta-suave">{e.intro}</p>
            <div className="mt-8">
              <BotonWhatsapp mensaje={mensaje} />
            </div>
          </div>
          <Ilustracion3D color={c.hex} className="mx-auto w-full max-w-xs" />
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-2">
        <div>
          <h2 className="text-3xl font-extrabold">Ideas que hacemos</h2>
          <ul className="mt-6 space-y-3">
            {e.ideas.map((idea) => (
              <li key={idea} className="flex gap-3">
                <span className={`mt-2 h-2 w-5 shrink-0 rounded-full ${c.fondo}`} aria-hidden="true" />
                {idea}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-3xl font-extrabold">Preguntas frecuentes</h2>
          <div className="mt-6">
            <PreguntasFrecuentes faqs={e.faqs} />
          </div>
        </div>
      </section>

      <LlamadaFinal mensaje={mensaje} />
    </>
  )
}

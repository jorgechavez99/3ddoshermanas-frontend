/**
 * Pagina "Diseña tu chibi": configurador con precio en vivo y pedido por WhatsApp.
 */
import { ConfiguradorChibi } from '@/components/ConfiguradorChibi'
import { Ilustracion3D } from '@/components'
import { metadatosPagina } from '@/lib/seo'

export const metadata = metadatosPagina({
  titulo: 'Diseña tu chibi personalizado desde tu foto',
  descripcion:
    'Crea tu figura chibi personalizada impresa en 3D en Dos Hermanas y Sevilla: elige tamaño y acabado, mira el precio al momento y envíanos tu foto por WhatsApp.',
  ruta: '/disena-tu-chibi',
})

const PASOS = [
  { titulo: 'Configura tu figura', texto: 'Tamaño, cuántos sois y el acabado. Ves el precio al momento.' },
  { titulo: 'Envíanos tu foto por WhatsApp', texto: 'El pedido llega ya escrito; tú solo adjuntas la foto.' },
  { titulo: 'Te mandamos el boceto', texto: 'Creamos tu chibi y te lo enseñamos para que lo apruebes antes de imprimir.' },
  { titulo: 'La imprimimos y te la entregamos', texto: 'En caja de regalo, en Dos Hermanas, Sevilla y alrededores.' },
]

export default function DisenaTuChibi() {
  return (
    <>
      <section className="bg-morado-suave">
        <div className="lineas-capa h-3 text-morado-pastel" aria-hidden="true" />
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-5 py-12 md:grid-cols-[1.3fr_1fr]">
          <div>
            <h1 className="text-4xl font-extrabold sm:text-5xl lg:text-6xl">Diseña tu chibi</h1>
            <p className="mt-5 max-w-xl text-lg text-tinta-suave">
              Tu versión en figura coleccionable, a partir de una foto tuya. Elige cómo la quieres, mira el precio y
              envíanos el pedido por WhatsApp.
            </p>
          </div>
          <Ilustracion3D color="#7a4dff" className="mx-auto w-full max-w-[14rem]" />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12">
        <ConfiguradorChibi />
      </section>

      <section aria-labelledby="titulo-proceso" className="mx-auto max-w-6xl px-5 pb-16">
        <h2 id="titulo-proceso" className="text-3xl font-extrabold">Cómo funciona</h2>
        <ol className="mt-8 grid gap-8 md:grid-cols-4">
          {PASOS.map((p, i) => (
            <li key={p.titulo}>
              <span className="font-titulo text-5xl leading-none font-extrabold text-morado" aria-hidden="true">{i + 1}</span>
              <h3 className="mt-2 text-xl font-bold">{p.titulo}</h3>
              <p className="mt-1 text-tinta-suave">{p.texto}</p>
            </li>
          ))}
        </ol>
      </section>
    </>
  )
}

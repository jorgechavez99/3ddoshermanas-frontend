/**
 * Secciones de la pagina de inicio.
 * Cada una pinta datos de src/data; ninguna tiene textos de negocio fijos
 * salvo los titulares de seccion.
 */
import Link from 'next/link'
import { negocio } from '@/data/negocio'
import { escaparates } from '@/data/escaparates'
import { colores } from './colores'
import { BotonWhatsapp } from './BotonWhatsapp'
import { Ilustracion3D } from './Ilustracion3D'

export const Hero = () => (
  <section className="bg-papel">
    <div className="mx-auto grid max-w-6xl items-center gap-8 px-5 pt-10 pb-14 md:grid-cols-[1.25fr_1fr] md:pt-16 md:pb-20">
      <div>
        <div className="relative">
          <h1 className="titular-impreso text-[2.6rem] font-extrabold sm:text-6xl lg:text-7xl">
            Lo que imagines, lo imprimimos en 3D en Dos Hermanas
          </h1>
          {/* Linea de la boquilla que sube mientras se "imprime" el titular */}
          <span aria-hidden="true" className="boquilla pointer-events-none absolute inset-x-0 top-0 h-full border-t-4 border-naranja" />
        </div>
        <p className="mt-6 max-w-xl text-lg text-tinta-suave">
          Regalos personalizados, figuras de anime y piezas a medida. Nos cuentas tu idea, te damos
          presupuesto y la imprimimos para ti en Dos Hermanas y Sevilla.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <BotonWhatsapp mensaje="Hola, tengo una idea para imprimir en 3D y quiero un presupuesto." />
          <a href="#precios" className="font-bold underline underline-offset-4 hover:text-tinta-suave">
            Ver precios
          </a>
        </div>
      </div>
      <Ilustracion3D className="mx-auto w-full max-w-sm" />
    </div>
  </section>
)

export const Escaparates = () => (
  <section aria-labelledby="titulo-escaparates" className="mx-auto max-w-6xl px-5 py-16">
    <h2 id="titulo-escaparates" className="text-3xl font-extrabold sm:text-4xl">
      Qué imprimimos
    </h2>
    <div className="mt-8 grid gap-5 md:grid-cols-3">
      {escaparates.map((e) => {
        const c = colores[e.color]
        return (
          <Link
            key={e.slug}
            href={`/${e.slug}`}
            className="group flex flex-col overflow-hidden rounded-2xl bg-papel ring-1 ring-tinta/10 hover:ring-tinta/30"
          >
            <div className={`lineas-capa h-24 ${c.texto}`} aria-hidden="true" />
            <div className="flex flex-1 flex-col p-6">
              <h3 className="text-2xl font-extrabold">{e.titulo}</h3>
              <p className="mt-2 flex-1 text-tinta-suave">{e.resumen}</p>
              <span className={`mt-5 font-bold ${c.texto} group-hover:underline`}>
                Ver {e.etiqueta.toLowerCase()}
              </span>
            </div>
          </Link>
        )
      })}
    </div>
  </section>
)

export const ListaServicios = () => (
  <section id="precios" aria-labelledby="titulo-precios" className="bg-papel">
    <div className="mx-auto max-w-6xl px-5 py-16">
      <h2 id="titulo-precios" className="text-3xl font-extrabold sm:text-4xl">
        Precios orientativos
      </h2>
      <p className="mt-3 max-w-xl text-tinta-suave">
        Cada encargo es distinto: te damos el precio cerrado por WhatsApp antes de empezar.
      </p>
      <dl className="mt-8 divide-y divide-tinta/10 border-y border-tinta/10">
        {negocio.servicios.map((s) => (
          <div key={s.nombre} className="grid gap-1 py-5 sm:grid-cols-[1fr_auto] sm:gap-8">
            <dt>
              <span className="font-titulo text-xl font-bold">{s.nombre}</span>
              <span className="mt-1 block text-tinta-suave">{s.detalle}</span>
            </dt>
            <dd className="font-titulo text-2xl font-extrabold sm:text-right">{s.precio}</dd>
          </div>
        ))}
      </dl>
    </div>
  </section>
)

const PASOS = [
  { titulo: 'Nos cuentas tu idea', texto: 'Por WhatsApp, con una foto, un boceto o unas medidas.' },
  { titulo: 'Te damos presupuesto', texto: 'Precio cerrado y fecha de entrega. Si hay diseño, te lo enseñamos antes.' },
  { titulo: 'Imprimimos y entregamos', texto: 'En mano en Dos Hermanas, Sevilla y alrededores.' },
]

export const ComoFunciona = () => (
  <section aria-labelledby="titulo-pasos" className="mx-auto max-w-6xl px-5 py-16">
    <h2 id="titulo-pasos" className="text-3xl font-extrabold sm:text-4xl">
      Cómo funciona
    </h2>
    <ol className="mt-8 grid gap-8 md:grid-cols-3">
      {PASOS.map((paso, i) => (
        <li key={paso.titulo} className="flex gap-4">
          <span className="font-titulo text-5xl leading-none font-extrabold text-naranja" aria-hidden="true">
            {i + 1}
          </span>
          <div>
            <h3 className="text-xl font-bold">{paso.titulo}</h3>
            <p className="mt-1 text-tinta-suave">{paso.texto}</p>
          </div>
        </li>
      ))}
    </ol>
  </section>
)

export const Zonas = () => (
  <section aria-labelledby="titulo-zonas" className="mx-auto max-w-6xl px-5 pb-16">
    <h2 id="titulo-zonas" className="text-2xl font-extrabold">
      Dónde entregamos
    </h2>
    <ul className="mt-4 flex flex-wrap gap-2">
      {negocio.zonas.map((zona) => (
        <li key={zona} className="rounded-full bg-papel px-4 py-1.5 font-bold ring-1 ring-tinta/10">
          {zona}
        </li>
      ))}
    </ul>
  </section>
)

export const LlamadaFinal = ({ mensaje }) => (
  <section className="bg-tinta text-white">
    <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-5 py-14 md:flex-row md:items-center md:justify-between">
      <div>
        <h2 className="text-3xl font-extrabold sm:text-4xl">¿Tienes una idea?</h2>
        <p className="mt-2 text-white/80">Escríbenos y te contestamos con presupuesto. {negocio.horario}.</p>
      </div>
      <BotonWhatsapp mensaje={mensaje} />
    </div>
  </section>
)

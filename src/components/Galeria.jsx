/**
 * Galeria de productos de un escaparate (datos de la API de productos).
 * Si no hay productos no pinta nada: la pagina sigue completa sin ella.
 * Cada producto lleva su boton "Lo quiero" que abre WhatsApp con el nombre.
 */
import { enlaceWhatsapp } from '@/lib/seo'
import { colores } from './colores'
import { Ilustracion3D } from './Ilustracion3D'

const formatoPrecio = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0, maximumFractionDigits: 2 })

export const Galeria = ({ productos, color }) => {
  if (!productos.length) return null
  const c = colores[color]

  return (
    <section aria-labelledby="titulo-galeria" className="mx-auto max-w-6xl px-5 pt-16">
      <h2 id="titulo-galeria" className="text-3xl font-extrabold">
        Algunos trabajos
      </h2>
      <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {productos.map((p) => (
          <li key={p.id_producto} className="flex flex-col overflow-hidden rounded-2xl bg-papel ring-1 ring-tinta/10">
            <div className={`aspect-[4/3] ${c.suave}`}>
              {p.foto_url ? (
                <img src={p.foto_url} alt={p.nombre} width={800} height={600} loading="lazy" className="h-full w-full object-cover" />
              ) : (
                <Ilustracion3D color={c.hex} className="mx-auto h-full w-auto py-6" />
              )}
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h3 className="text-xl font-bold">{p.nombre}</h3>
              {p.descripcion && <p className="mt-1 flex-1 text-tinta-suave">{p.descripcion}</p>}
              <div className="mt-4 flex items-center justify-between gap-3">
                <span className="font-titulo text-lg font-extrabold">Desde {formatoPrecio.format(p.precio_desde)}</span>
                <a
                  href={enlaceWhatsapp(`Hola, me interesa "${p.nombre}". ¿Me dais presupuesto?`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-whatsapp px-4 py-2 font-bold text-white hover:bg-whatsapp-oscuro"
                >
                  Lo quiero
                </a>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

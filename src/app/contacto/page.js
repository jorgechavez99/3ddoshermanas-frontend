/**
 * Pagina de contacto: WhatsApp, telefono, email, horario y zonas.
 * Sin formulario a proposito: todo el contacto entra por WhatsApp.
 */
import { BotonWhatsapp } from '@/components'
import { negocio } from '@/data/negocio'
import { metadatosPagina } from '@/lib/seo'

export const metadata = metadatosPagina({
  titulo: 'Contacto y presupuesto de impresión 3D',
  descripcion:
    'Pide presupuesto de impresión 3D en Dos Hermanas y Sevilla por WhatsApp. Horario de lunes a sábado de 10:00 a 21:00.',
  ruta: '/contacto',
})

export default function Contacto() {
  return (
    <section className="bg-papel">
      <div className="lineas-capa h-3 text-naranja" aria-hidden="true" />
      <div className="mx-auto max-w-3xl px-5 py-14">
        <h1 className="text-4xl font-extrabold sm:text-5xl">Contacto</h1>
        <p className="mt-4 text-lg text-tinta-suave">
          La forma más rápida es WhatsApp: mándanos tu idea, una foto o unas medidas y te
          respondemos con el presupuesto.
        </p>
        <div className="mt-8">
          <BotonWhatsapp mensaje="Hola, quiero pedir un presupuesto de impresión 3D." />
        </div>

        <dl className="mt-12 grid gap-6 sm:grid-cols-2">
          <div>
            <dt className="font-titulo text-lg font-bold">Teléfono</dt>
            <dd>
              <a href={`tel:${negocio.telefono}`} className="underline underline-offset-4">
                {negocio.telefonoVisible}
              </a>
            </dd>
          </div>
          <div>
            <dt className="font-titulo text-lg font-bold">Email</dt>
            <dd>
              <a href={`mailto:${negocio.email}`} className="underline underline-offset-4">
                {negocio.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="font-titulo text-lg font-bold">Horario</dt>
            <dd>{negocio.horario}</dd>
          </div>
          <div>
            <dt className="font-titulo text-lg font-bold">Zonas de entrega</dt>
            <dd>{negocio.zonas.join(', ')}</dd>
          </div>
        </dl>
      </div>
    </section>
  )
}

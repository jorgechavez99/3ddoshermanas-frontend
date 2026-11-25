/**
 * Pagina de inicio. Ataca la busqueda principal: "impresion 3D Dos Hermanas".
 */
import { Hero, Escaparates, ListaServicios, ComoFunciona, Zonas, LlamadaFinal } from '@/components'
import { metadatosPagina } from '@/lib/seo'
import { negocio } from '@/data/negocio'

export const metadata = {
  ...metadatosPagina({
    titulo: 'Impresión 3D en Dos Hermanas y Sevilla',
    descripcion:
      'Impresión 3D en Dos Hermanas y Sevilla: regalos personalizados, figuras de anime, llaveros y piezas o repuestos a medida. Presupuesto gratis por WhatsApp.',
    ruta: '/',
  }),
  // En la home el titulo va con el nombre delante y sin plantilla.
  title: { absolute: `${negocio.nombre} | Impresión 3D en Dos Hermanas y Sevilla` },
}

export default function Inicio() {
  return (
    <>
      <Hero />
      <Escaparates />
      <ListaServicios />
      <ComoFunciona />
      <Zonas />
      <LlamadaFinal mensaje={`Hola, vengo de la web de ${negocio.nombre} y quiero pedir un presupuesto.`} />
    </>
  )
}

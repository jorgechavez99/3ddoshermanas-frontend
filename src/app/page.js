/**
 * Pagina de inicio. Ataca la busqueda principal: "impresion 3D Dos Hermanas".
 */
import { Hero, Escaparates, ListaServicios, ComoFunciona, Zonas, LlamadaFinal } from '@/components'
import { urlAbsoluta } from '@/lib/seo'

export const metadata = {
  alternates: { canonical: urlAbsoluta('/') },
}

export default function Inicio() {
  return (
    <>
      <Hero />
      <Escaparates />
      <ListaServicios />
      <ComoFunciona />
      <Zonas />
      <LlamadaFinal mensaje="Hola, vengo de la web de 3D Dos Hermanas y quiero pedir un presupuesto." />
    </>
  )
}

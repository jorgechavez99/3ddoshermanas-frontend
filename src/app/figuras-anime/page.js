/**
 * Pagina del escaparate "figuras-anime". El contenido esta en src/data/escaparates.js.
 */
import { PaginaEscaparate } from '@/components'
import { getEscaparate } from '@/data/escaparates'
import { metadatosPagina } from '@/lib/seo'

const SLUG = 'figuras-anime'
const escaparate = getEscaparate(SLUG)

export const metadata = metadatosPagina({
  titulo: escaparate.tituloSeo,
  descripcion: escaparate.descripcionSeo,
  ruta: `/${SLUG}`,
})

export default function Pagina() {
  return <PaginaEscaparate slug={SLUG} />
}

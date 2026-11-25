/**
 * sitemap.xml: lista de paginas que Google debe rastrear.
 * Se genera solo a partir de los escaparates, asi una pagina nueva entra
 * en el sitemap sin tocar este archivo.
 * Sin lastModified: una fecha que cambia en cada build sin cambios reales
 * hace que Google deje de fiarse de ella.
 */
import { escaparates } from '@/data/escaparates'
import { urlAbsoluta } from '@/lib/seo'

export default function sitemap() {
  return [
    { url: urlAbsoluta('/'), changeFrequency: 'weekly', priority: 1 },
    ...escaparates.map((e) => ({
      url: urlAbsoluta(`/${e.slug}`),
     
      changeFrequency: 'monthly',
      priority: 0.8,
    })),
    { url: urlAbsoluta('/contacto'), changeFrequency: 'yearly', priority: 0.5 },
  ]
}

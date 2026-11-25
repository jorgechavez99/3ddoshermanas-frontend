/**
 * sitemap.xml: lista de paginas que Google debe rastrear.
 * Se genera solo a partir de los escaparates, asi una pagina nueva entra
 * en el sitemap sin tocar este archivo.
 */
import { escaparates } from '@/data/escaparates'
import { urlAbsoluta } from '@/lib/seo'

export default function sitemap() {
  const ahora = new Date()
  return [
    { url: urlAbsoluta('/'), lastModified: ahora, changeFrequency: 'weekly', priority: 1 },
    ...escaparates.map((e) => ({
      url: urlAbsoluta(`/${e.slug}`),
      lastModified: ahora,
      changeFrequency: 'monthly',
      priority: 0.8,
    })),
    { url: urlAbsoluta('/contacto'), lastModified: ahora, changeFrequency: 'yearly', priority: 0.5 },
  ]
}

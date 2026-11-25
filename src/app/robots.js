/**
 * robots.txt: permite rastrear toda la web e indica donde esta el sitemap.
 */
import { urlAbsoluta, esVersionProvisional } from '@/lib/seo'

// Se genera una sola vez al compilar (necesario tambien para GitHub Pages).
export const dynamic = 'force-static'

export default function robots() {
  if (esVersionProvisional()) return { rules: { userAgent: '*', disallow: '/' } }
  return {
    rules: { userAgent: '*', allow: '/', disallow: '/admin/' },
    sitemap: urlAbsoluta('/sitemap.xml'),
  }
}

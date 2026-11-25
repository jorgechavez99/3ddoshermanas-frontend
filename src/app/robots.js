/**
 * robots.txt: permite rastrear toda la web e indica donde esta el sitemap.
 */
import { urlAbsoluta } from '@/lib/seo'

export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: urlAbsoluta('/sitemap.xml'),
  }
}

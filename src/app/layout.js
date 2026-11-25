/**
 * Layout comun a todas las paginas: fuentes, cabecera, pie, boton flotante
 * de WhatsApp y los datos estructurados del negocio para Google.
 */
import '@fontsource-variable/bricolage-grotesque'
import '@fontsource/atkinson-hyperlegible/400.css'
import '@fontsource/atkinson-hyperlegible/700.css'
import './globals.css'
import { Cabecera, Pie, WhatsappFlotante, JsonLd } from '@/components'
import { negocio } from '@/data/negocio'
import { schemaNegocio, urlSitio, esVersionProvisional } from '@/lib/seo'

export const metadata = {
  metadataBase: new URL(urlSitio()),
  title: {
    default: `${negocio.nombre} | Impresión 3D en Dos Hermanas y Sevilla`,
    template: `%s | ${negocio.nombre}`,
  },
  description:
    'Impresión 3D en Dos Hermanas y Sevilla: regalos personalizados, figuras de anime, llaveros y piezas o repuestos a medida. Presupuesto gratis por WhatsApp.',
  formatDetection: { telephone: false },
  // Versiones provisionales: visibles para enseñarlas, pero fuera de Google.
  ...(esVersionProvisional() && { robots: { index: false, follow: false } }),
}

export const viewport = {
  themeColor: '#ffffff',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="antialiased">
        <JsonLd datos={schemaNegocio()} />
        <a href="#contenido" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-papel focus:p-3">
          Saltar al contenido
        </a>
        <Cabecera />
        <main id="contenido">{children}</main>
        <Pie />
        <WhatsappFlotante />
      </body>
    </html>
  )
}

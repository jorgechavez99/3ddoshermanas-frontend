/**
 * Helpers de SEO.
 * Funciones puras que construyen URLs absolutas, enlaces de WhatsApp y los
 * datos estructurados (JSON-LD) que Google usa para entender el negocio.
 */
import { negocio } from '@/data/negocio'

const URL_POR_DEFECTO = 'https://3ddoshermanas.com'

/**
 * Devuelve la URL base del sitio sin barra final.
 * Se lee en cada llamada para que el valor de .env se respete en build.
 * @returns {string}
 */
export const urlSitio = () =>
  (process.env.NEXT_PUBLIC_SITE_URL || URL_POR_DEFECTO).replace(/\/+$/, '')

/**
 * Convierte una ruta interna en URL absoluta (canonical, sitemap, Open Graph).
 * @param {string} ruta ej. '/contacto' o 'contacto'
 * @returns {string} ej. 'https://3ddoshermanas.com/contacto'
 */
export const urlAbsoluta = (ruta = '/') => {
  const limpia = ruta.startsWith('/') ? ruta : `/${ruta}`
  return `${urlSitio()}${limpia}`
}

/**
 * Enlace a WhatsApp con un mensaje ya escrito.
 * El mensaje se codifica porque las tildes, espacios y signos de pregunta
 * rompen el enlace si se meten tal cual.
 * @param {string} [mensaje]
 * @returns {string}
 */
export const enlaceWhatsapp = (mensaje) =>
  mensaje ? `${negocio.whatsapp}?text=${encodeURIComponent(mensaje)}` : negocio.whatsapp

/**
 * Datos estructurados LocalBusiness para el <head> de todas las paginas.
 * Sin "address": somos empresa de servicios y la direccion es privada;
 * en su lugar se declaran las zonas con areaServed.
 * @returns {object}
 */
export const schemaNegocio = () => ({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${urlSitio()}/#negocio`,
  name: negocio.nombre,
  description:
    'Servicio de impresión 3D en Dos Hermanas y Sevilla: regalos personalizados, figuras de anime, llaveros y piezas o repuestos a medida.',
  url: urlAbsoluta('/'),
  telephone: negocio.telefono,
  email: negocio.email,
  priceRange: '€',
  areaServed: negocio.zonas.map((zona) => ({ '@type': 'City', name: zona })),
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: negocio.horarioSchema.dias,
      opens: negocio.horarioSchema.abre,
      closes: negocio.horarioSchema.cierra,
    },
  ],
  sameAs: Object.values(negocio.redes),
  makesOffer: negocio.servicios.map((servicio) => ({
    '@type': 'Offer',
    itemOffered: { '@type': 'Service', name: servicio.nombre },
  })),
})

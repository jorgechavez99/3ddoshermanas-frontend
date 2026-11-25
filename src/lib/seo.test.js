/**
 * Tests de los helpers de SEO.
 * Comprueban que las URLs, el enlace de WhatsApp y los datos estructurados
 * que leera Google salen siempre bien formados.
 */
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { urlAbsoluta, enlaceWhatsapp, schemaNegocio } from './seo'

describe('urlAbsoluta', () => {
  const original = process.env.NEXT_PUBLIC_SITE_URL

  afterEach(() => {
    process.env.NEXT_PUBLIC_SITE_URL = original
  })

  it('une la base y la ruta sin dobles barras aunque la base termine en /', () => {
    process.env.NEXT_PUBLIC_SITE_URL = 'https://3ddoshermanas.com/'
    expect(urlAbsoluta('/contacto')).toBe('https://3ddoshermanas.com/contacto')
  })

  it('usa el dominio por defecto si no hay variable de entorno', () => {
    delete process.env.NEXT_PUBLIC_SITE_URL
    expect(urlAbsoluta('/')).toBe('https://3ddoshermanas.com/')
  })

  it('acepta rutas sin barra inicial', () => {
    process.env.NEXT_PUBLIC_SITE_URL = 'https://3ddoshermanas.com'
    expect(urlAbsoluta('figuras-anime')).toBe('https://3ddoshermanas.com/figuras-anime')
  })
})

describe('enlaceWhatsapp', () => {
  it('codifica tildes, espacios y signos del mensaje', () => {
    expect(enlaceWhatsapp('Hola, ¿precio?')).toBe(
      'https://wa.me/34653177225?text=Hola%2C%20%C2%BFprecio%3F'
    )
  })

  it('sin mensaje devuelve el enlace directo', () => {
    expect(enlaceWhatsapp()).toBe('https://wa.me/34653177225')
  })
})

describe('schemaNegocio', () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_SITE_URL = 'https://3ddoshermanas.com'
  })

  it('describe un LocalBusiness de servicios sin direccion postal', () => {
    const schema = schemaNegocio()
    expect(schema['@context']).toBe('https://schema.org')
    expect(schema['@type']).toBe('LocalBusiness')
    expect(schema.name).toBe('3D Dos Hermanas')
    expect(schema.telephone).toBe('+34653177225')
    // Empresa de servicios: la direccion de casa nunca se publica.
    expect(schema).not.toHaveProperty('address')
  })

  it('incluye las 5 zonas de servicio y el horario de lunes a sabado', () => {
    const schema = schemaNegocio()
    expect(schema.areaServed).toHaveLength(5)
    expect(schema.areaServed.map((z) => z.name)).toContain('Dos Hermanas')
    expect(schema.openingHoursSpecification[0].dayOfWeek).toHaveLength(6)
    expect(schema.openingHoursSpecification[0].opens).toBe('10:00')
    expect(schema.openingHoursSpecification[0].closes).toBe('21:00')
  })
})

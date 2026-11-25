/**
 * Tests de las utilidades del configurador de chibis.
 */
import { describe, it, expect } from 'vitest'
import { mensajeChibi, urlPresupuestoChibi } from './chibi'

const opciones = { tamano: 'mediano', personasExtra: 1, baseNombre: true, textoBase: 'Nuria', acabado: 'pintado', urgente: false }

describe('mensajeChibi', () => {
  it('resume opciones y precio y pide la foto', () => {
    const m = mensajeChibi({ opciones, precio: 41.99, nombre: 'Ana' })
    expect(m).toContain('Ana')
    expect(m).toContain('Mediano (12 cm)')
    expect(m).toContain('1 persona o mascota extra')
    expect(m).toContain('Base con nombre: "Nuria"')
    expect(m).toContain('Pintada a mano')
    expect(m).toContain('41,99 €')
    expect(m).toMatch(/foto/i)
  })

  it('sin precio (API caida) pide presupuesto en vez de inventarlo', () => {
    const m = mensajeChibi({ opciones, precio: null, nombre: '' })
    expect(m).not.toContain('€')
    expect(m).toMatch(/presupuesto/i)
  })
})

describe('urlPresupuestoChibi', () => {
  it('construye la URL con los nombres de parametro de la API', () => {
    expect(urlPresupuestoChibi('', opciones)).toBe(
      '/api/v1/presupuestos/chibi?tamano=mediano&personas_extra=1&base_nombre=true&acabado=pintado&urgente=false'
    )
    expect(urlPresupuestoChibi('http://127.0.0.1:4010/', opciones)).toMatch(/^http:\/\/127\.0\.0\.1:4010\/api\/v1/)
  })
})

/**
 * Tests del cliente de la API de productos.
 * La regla clave: si la API falla, la web sigue funcionando sin galeria.
 */
import { describe, it, expect, vi, afterEach } from 'vitest'
import { getProductos } from './apiProductos'

const original = process.env.NEXT_PUBLIC_API_URL

afterEach(() => {
  process.env.NEXT_PUBLIC_API_URL = original
  vi.unstubAllGlobals()
})

describe('getProductos', () => {
  it('sin NEXT_PUBLIC_API_URL devuelve [] sin llamar a la API', async () => {
    delete process.env.NEXT_PUBLIC_API_URL
    const fetchFalso = vi.fn()
    vi.stubGlobal('fetch', fetchFalso)
    expect(await getProductos('figuras-anime')).toEqual([])
    expect(fetchFalso).not.toHaveBeenCalled()
  })

  it('pide el escaparate correcto y devuelve data', async () => {
    process.env.NEXT_PUBLIC_API_URL = 'https://api.3ddoshermanas.com/'
    const data = [{ id_producto: 1, nombre: 'Figura chibi' }]
    const fetchFalso = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ error: false, data }) })
    vi.stubGlobal('fetch', fetchFalso)
    expect(await getProductos('figuras-anime')).toEqual(data)
    expect(fetchFalso.mock.calls[0][0]).toBe('https://api.3ddoshermanas.com/api/v1/productos?escaparate=figuras-anime')
  })

  it('si la API responde con error HTTP devuelve []', async () => {
    process.env.NEXT_PUBLIC_API_URL = 'https://api.3ddoshermanas.com'
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 500, json: async () => ({}) }))
    expect(await getProductos('figuras-anime')).toEqual([])
  })

  it('si la API esta caida (fetch lanza) devuelve []', async () => {
    process.env.NEXT_PUBLIC_API_URL = 'https://api.3ddoshermanas.com'
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('ECONNREFUSED')))
    expect(await getProductos('figuras-anime')).toEqual([])
  })

  it('si la respuesta no trae un array devuelve []', async () => {
    process.env.NEXT_PUBLIC_API_URL = 'https://api.3ddoshermanas.com'
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => ({ error: true }) }))
    expect(await getProductos('figuras-anime')).toEqual([])
  })
})

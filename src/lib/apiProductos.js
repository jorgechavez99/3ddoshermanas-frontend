/**
 * Cliente de la API de productos (repo 3ddoshermanas-backend).
 *
 * Se llama desde el servidor de Next al generar las paginas, no desde el
 * navegador: asi Google recibe la galeria ya dentro del HTML.
 * Next guarda la respuesta y la refresca como mucho cada hora.
 *
 * IMPORTANTE: nunca lanza errores. Si la API no esta configurada, esta caida
 * o responde mal, devuelve [] y la pagina se muestra sin galeria.
 */

const REFRESCO_SEGUNDOS = 3600
const TIEMPO_MAXIMO_MS = 5000

/**
 * Productos visibles de un escaparate.
 * @param {string} escaparate slug del escaparate, ej. 'figuras-anime'
 * @returns {Promise<Array<{id_producto:number, nombre:string, slug:string, descripcion:string, precio_desde:number, foto_url:?string}>>}
 */
export const getProductos = async (escaparate) => {
  const base = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, '')
  if (!base) return []

  const url = `${base}/api/v1/productos?escaparate=${encodeURIComponent(escaparate)}`
  try {
    const res = await fetch(url, {
      next: { revalidate: REFRESCO_SEGUNDOS },
      // Una API lenta no puede bloquear la generacion de la web.
      signal: AbortSignal.timeout(TIEMPO_MAXIMO_MS),
    })
    if (!res.ok) {
      console.error(`[apiProductos] ${url} respondio ${res.status}`)
      return []
    }
    const { data } = await res.json()
    return Array.isArray(data) ? data : []
  } catch (error) {
    console.error(`[apiProductos] no se pudo cargar ${url}:`, error.message)
    return []
  }
}

/**
 * Comprobacion SEO de la web ya compilada.
 *
 * Uso: npm run build && npm run comprobar-seo
 * Arranca "next start" en un puerto libre, descarga cada pagina y revisa
 * lo minimo que Google necesita. Sale con codigo 1 si algo falla, para
 * poder usarlo antes de cada despliegue.
 */
import { spawn } from 'node:child_process'

const PUERTO = 3123
const BASE = `http://localhost:${PUERTO}`
const RUTAS = ['/', '/regalos-personalizados', '/figuras-anime', '/piezas-repuestos-3d', '/contacto']

const errores = []
const comprobar = (condicion, mensaje) => {
  if (!condicion) errores.push(mensaje)
}

const esperarServidor = async () => {
  for (let i = 0; i < 60; i++) {
    try {
      await fetch(BASE)
      return
    } catch {
      await new Promise((r) => setTimeout(r, 500))
    }
  }
  throw new Error('El servidor no arrancó en 30 segundos')
}

const servidor = spawn('npx', ['next', 'start', '-p', String(PUERTO)], { stdio: 'ignore' })

try {
  await esperarServidor()
  const titulos = new Set()

  for (const ruta of RUTAS) {
    const res = await fetch(BASE + ruta)
    const html = await res.text()
    const titulo = html.match(/<title>([^<]*)<\/title>/)?.[1]
    comprobar(res.status === 200, `${ruta}: estado ${res.status}`)
    comprobar(html.includes('<html lang="es"'), `${ruta}: falta lang="es"`)
    comprobar((html.match(/<h1[\s>]/g) || []).length === 1, `${ruta}: debe tener exactamente un <h1>`)
    comprobar(titulo && !titulos.has(titulo), `${ruta}: título vacío o repetido (${titulo})`)
    titulos.add(titulo)
    comprobar(/<link rel="canonical" href="https:\/\/[^"]+"/.test(html), `${ruta}: falta canonical absoluto`)
    comprobar(/<meta name="description" content="[^"]{50,}"/.test(html), `${ruta}: description ausente o corta`)
    comprobar(html.includes('https://wa.me/34653177225'), `${ruta}: falta enlace a WhatsApp`)
    comprobar(html.includes('"@type":"LocalBusiness"'), `${ruta}: faltan datos estructurados`)
    comprobar(!html.includes('"address"'), `${ruta}: se está publicando una dirección`)
  }

  const noExiste = await fetch(BASE + '/no-existe')
  const html404 = await noExiste.text()
  comprobar(noExiste.status === 404, `/no-existe: estado ${noExiste.status}, se esperaba 404`)
  comprobar(html404.includes('Esta página no existe'), '/no-existe: la página 404 no está en español')

  const sitemap = await (await fetch(BASE + '/sitemap.xml')).text()
  const urls = sitemap.match(/<loc>[^<]+<\/loc>/g) || []
  comprobar(urls.length === RUTAS.length, `sitemap: ${urls.length} URLs, se esperaban ${RUTAS.length}`)
  comprobar(!urls.some((u) => /https?:\/\/[^<]*\/\//.test(u)), 'sitemap: hay URLs con doble barra')

  const robots = await (await fetch(BASE + '/robots.txt')).text()
  comprobar(robots.includes('Sitemap:'), 'robots.txt: no indica el sitemap')
} finally {
  servidor.kill()
}

if (errores.length) {
  console.error(`Comprobación SEO: ${errores.length} problema(s)`)
  errores.forEach((e) => console.error(` - ${e}`))
  process.exit(1)
}
console.log(`Comprobación SEO correcta: ${RUTAS.length} páginas, 404, sitemap y robots.`)

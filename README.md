# 3D Dos Hermanas - Web

Web de 3D Dos Hermanas, servicio de impresión 3D por encargo en Dos Hermanas y Sevilla, pensada para aparecer en Google en búsquedas locales y llevar a cada visita a pedir presupuesto por WhatsApp.

## Qué hace

- Página de inicio con los tres escaparates, precios orientativos, cómo funciona y zonas de entrega.
- Una página por escaparate (regalos, anime, piezas) con sus palabras clave y preguntas frecuentes.
- Botón de WhatsApp en todas las páginas, con el mensaje ya escrito según la página.
- SEO técnico: HTML generado en servidor, títulos y descripciones por página, canonical, `sitemap.xml`, `robots.txt` y datos estructurados `LocalBusiness` y `FAQPage`.
- Página 404 en español.

## Tecnologías

Next.js 15 (App Router), React 19, Tailwind CSS 4, Vitest. Fuentes Bricolage Grotesque y Atkinson Hyperlegible (servidas desde el propio proyecto con Fontsource).

## Puesta en marcha

```bash
git clone https://github.com/jorgechavez99/3ddoshermanas-web.git
cd 3ddoshermanas-web
npm install
cp .env_template .env
npm run dev
```

Abrir http://localhost:3000.

| Script | Qué hace |
| --- | --- |
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Compila la web para producción |
| `npm start` | Sirve la web compilada (puerto 3000) |
| `npm test` | Tests de los helpers de SEO |
| `npm run comprobar-seo` | Tras `build`, revisa títulos, h1, canonical, WhatsApp, 404, sitemap y robots |

## Variables de entorno

| Variable | Para qué sirve | Ejemplo |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Dominio real; se usa en canonical, sitemap y datos estructurados. Se lee al compilar. | `https://3ddoshermanas.com` |

## Estructura de carpetas

```
src/
  app/            # páginas (una carpeta por ruta), layout, sitemap, robots, 404
  components/     # componentes React + index.js (barrel)
  data/           # negocio.js y escaparates.js: TODO el contenido editable
  lib/seo.js      # helpers de SEO (URLs, WhatsApp, JSON-LD) y sus tests
scripts/          # comprobarSeo.mjs
deploy/           # configuración de PM2 y Nginx para el VPS
docs/             # diseño y plan de trabajo
```

## Cómo cambiar contenidos

- Teléfono, horario, zonas, precios o redes: `src/data/negocio.js`. Si cambias algo aquí, cámbialo también en la ficha de Google: deben coincidir.
- Textos, ideas y preguntas de cada escaparate: `src/data/escaparates.js`.
- Un escaparate nuevo: añadirlo en `escaparates.js` y crear `src/app/<slug>/page.js` copiando uno existente. Entra solo en el menú, el pie y el sitemap; añadir su ruta a `RUTAS` en `scripts/comprobarSeo.mjs`.

## Despliegue

Ver [DEPLOY.md](DEPLOY.md): VPS de IONOS con Node, PM2, Nginx y certificado SSL de Let's Encrypt.

## Decisiones y pendientes

- Next.js en vez de Vite: Vite genera una SPA que Google ve vacía al principio; Next entrega el HTML completo.
- Sin formulario ni base de datos: todo el contacto entra por WhatsApp.
- Sin dirección postal en ninguna parte: es una empresa de servicios en zona, igual que en la ficha de Google.
- Pendiente: comprar el dominio, sustituir las ilustraciones por fotos reales (con `next/image`) y añadir una galería por escaparate.
- Futuro: catálogo o tienda online y sección de productos IoT.

## Autores

Jorge Chávez y Mary - 3D Dos Hermanas.

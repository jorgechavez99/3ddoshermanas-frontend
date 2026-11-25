# Web de 3D Dos Hermanas - Diseño

Aprobado por Jorge el 24/11/2026.

## Intención
Web propia para posicionar en Google búsquedas locales ("impresión 3D Dos Hermanas", "regalo personalizado Sevilla", "repuesto 3D a medida") y convertir cada visita en un mensaje de WhatsApp. Complementa la ficha de Google Business Profile ya creada.

## Objetivos
- HTML renderizado en servidor para que Google lea el contenido completo.
- Una página por escaparate, cada una con sus palabras clave.
- Botón de WhatsApp visible en todas las páginas.
- Mismo nombre, teléfono y zona que la ficha de Google (NAP consistente).

## No objetivos
Tienda online, pagos, blog, formulario de contacto, base de datos, panel de administración.

## Anti-objetivos
- Una SPA que Google vea vacía.
- Páginas lentas en móvil.
- Palabras clave forzadas que suenen a spam.

## Enfoques considerados
- **A) Next.js (App Router) + Tailwind** - elegido. React con HTML generado en servidor, metadatos, sitemap y robots nativos; corre con Node en el VPS.
- B) Vite + React con prerender - stack habitual, pero SEO montado a mano con plugins.
- C) Vite SPA + Express - descartado: peor SEO, y la web existe para posicionar.

## Páginas
| Ruta | Contenido |
| --- | --- |
| `/` | Hero, 3 escaparates, servicios con precio "desde", cómo funciona (3 pasos), zonas, WhatsApp |
| `/regalos-personalizados` | Escaparate regalos: texto, galería, preguntas frecuentes |
| `/figuras-anime` | Escaparate anime y coleccionables |
| `/piezas-repuestos-3d` | Escaparate piezas y repuestos |
| `/contacto` | WhatsApp, horario, zonas |

## Datos del negocio (fuente única: `src/data/negocio.js`)
- Nombre: 3D Dos Hermanas
- Teléfono: +34 653 17 72 25 · WhatsApp: https://wa.me/34653177225
- Email: 3ddoshermanas@gmail.com
- Horario: lunes a sábado, 10:00-21:00
- Zonas: Dos Hermanas, Sevilla, Montequinto, Alcalá de Guadaíra, Utrera
- Dominio provisional: https://3ddoshermanas.com
- Servicios: llavero personalizado desde 4 € (pack de 5: 15 €); figura personalizada estilo chibi desde 20 €; pieza o repuesto a medida desde 8 €; diseño 3D por encargo desde 15 €
- Redes: @3ddoshermanas (Instagram, TikTok, Facebook)

## SEO técnico
- `metadata` por página: title, description, canonical, Open Graph.
- `sitemap.xml` y `robots.txt` generados por Next.
- JSON-LD `LocalBusiness` con nombre, teléfono, horario, `areaServed`, sin dirección (empresa de servicios).
- `lang="es"`, imágenes con `alt`.

## Despliegue
VPS IONOS: Node + PM2 + Nginx como proxy inverso + Let's Encrypt. Guía en `DEPLOY.md`.

## Decisiones del constructor (Claude)
- Estética "maker" con colores vivos; imágenes provisionales en SVG hasta tener fotos reales.
- Contenido en archivos de datos JS, editables sin tocar componentes.
- Código, nombres y README en español siguiendo el estilo de Jorge, sin emojis en código.

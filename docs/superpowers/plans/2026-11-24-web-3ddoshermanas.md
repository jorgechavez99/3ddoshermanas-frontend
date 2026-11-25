# Web 3D Dos Hermanas Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Web Next.js orientada a SEO local que lleva a las visitas a WhatsApp.

**Architecture:** Next.js App Router con páginas estáticas generadas en build. Todo el contenido vive en `src/data/` y los componentes solo lo pintan. Helpers puros de SEO (`src/lib/seo.js`) probados con Vitest.

**Tech Stack:** Next.js 15 (App Router), React 19, Tailwind CSS 4, Vitest.

**Spec:** `docs/superpowers/specs/2026-11-24-web-3ddoshermanas-design.md`

## Global Constraints
- Idioma: español en textos, nombres de funciones y comentarios. Sin emojis en código, README ni commits.
- Datos del negocio solo en `src/data/negocio.js`; ningún componente escribe el teléfono ni la URL a mano.
- URL base desde `process.env.NEXT_PUBLIC_SITE_URL`, por defecto `https://3ddoshermanas.com`.
- WhatsApp: `https://wa.me/34653177225`. Horario Mo-Sa 10:00-21:00.
- Sin dirección postal en ninguna parte (empresa de servicios).
- Commits en español, en presente, describiendo el resultado.

## Review Focus
1. Mensaje de WhatsApp con tildes y espacios: el enlace debe ir codificado (`encodeURIComponent`).
2. Ruta inexistente: debe devolver página 404 en español con enlace a inicio, no la de Next en inglés.
3. URL base con barra final (`https://x.com/`): canonical y sitemap no deben quedar con `//`.
4. Móvil 360 px: el botón flotante de WhatsApp no tapa el menú ni el contenido final.
5. JSON-LD válido: sin campo `address`, con `areaServed` y horario.

---

### Task 1: Proyecto base y datos del negocio

**Files:**
- Create: proyecto con `create-next-app` (JS, App Router, Tailwind, src/, sin ESLint interactivo)
- Create: `src/data/negocio.js`, `src/data/escaparates.js`
- Create: `src/lib/seo.js`, `src/lib/seo.test.js`, `vitest.config.mjs`

**Interfaces:**
- Produces: `negocio` (objeto con `nombre, telefono, telefonoVisible, email, whatsapp, horario, horarioSchema, zonas, redes, servicios, urlSitio`), `escaparates` (array `{ slug, titulo, tituloSeo, descripcionSeo, intro, ideas[], faqs[{pregunta,respuesta}], color }`)
- Produces: `urlAbsoluta(ruta: string): string`, `enlaceWhatsapp(mensaje?: string): string`, `schemaNegocio(): object`

- [ ] Step 1: tests en `seo.test.js`: `urlAbsoluta('/contacto')` con base `https://3ddoshermanas.com/` da `https://3ddoshermanas.com/contacto`; `enlaceWhatsapp('Hola, ¿precio?')` contiene `wa.me/34653177225?text=Hola%2C%20%C2%BFprecio%3F`; `schemaNegocio()` tiene `@type` `LocalBusiness`, no tiene `address`, `areaServed` con 5 zonas, `telephone` `+34653177225`.
- [ ] Step 2: `npx vitest run` falla.
- [ ] Step 3: implementar datos y helpers.
- [ ] Step 4: `npx vitest run` pasa.
- [ ] Step 5: commit "Crea el proyecto Next.js con los datos del negocio y helpers de SEO".

### Task 2: Layout, componentes y páginas
**Files:** `src/app/layout.js`, `src/app/page.js`, `src/app/[escaparate]` no (rutas fijas): `src/app/regalos-personalizados/page.js`, `src/app/figuras-anime/page.js`, `src/app/piezas-repuestos-3d/page.js`, `src/app/contacto/page.js`, `src/app/not-found.js`, `src/components/*.jsx`.
- Componentes: `Cabecera`, `Pie`, `BotonWhatsapp` (flotante), `Hero`, `TarjetaEscaparate`, `ListaServicios`, `ComoFunciona`, `Zonas`, `PaginaEscaparate({ slug })`, `PreguntasFrecuentes`, `Ilustracion3D` (SVG provisional).
- Cada página exporta `metadata` con title, description, `alternates.canonical`.
- `layout.js`: `lang="es"`, JSON-LD de `schemaNegocio()`.
- [ ] Verificar: `npm run build` sin errores; las 5 rutas salen como estáticas.
- [ ] Commit "Añade las páginas de inicio, escaparates y contacto".

### Task 3: sitemap, robots y comprobación SEO
**Files:** `src/app/sitemap.js`, `src/app/robots.js`, `scripts/comprobarSeo.mjs`
- `scripts/comprobarSeo.mjs` arranca contra `next start`, descarga cada ruta y comprueba: un `<h1>`, `<title>` propio, canonical, enlace `wa.me`, `lang="es"`; `/no-existe` devuelve 404 en español; `/sitemap.xml` lista 5 URLs sin `//`.
- [ ] Verificar: script en verde.
- [ ] Commit "Genera sitemap y robots y añade comprobación SEO".

### Task 4: Revisión visual, README y despliegue
**Files:** `README.md`, `DEPLOY.md`, `ecosystem.config.js`, `nginx/3ddoshermanas.conf`, `.env_template`
- Capturas en 360 px y 1280 px; corregir solapes.
- README según el modelo de Jorge; DEPLOY con PM2, Nginx y Certbot.
- [ ] Commit "Documenta la puesta en marcha y el despliegue en el VPS".

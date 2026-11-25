/**
 * Configuracion de Next.js.
 *
 * Dos formas de publicar la web:
 * - VPS (normal): `next build` + `next start` con PM2. Sin variables extra.
 * - GitHub Pages (provisional): con PUBLICAR_EN=github-pages se exporta como
 *   archivos estaticos en /out. RUTA_BASE solo hace falta si se sirve en una
 *   subcarpeta (ej. /3ddoshermanas-frontend en jorgechavez99.github.io);
 *   con dominio o subdominio propio va vacia.
 */
const enGithubPages = process.env.PUBLICAR_EN === 'github-pages'

/** @type {import('next').NextConfig} */
const nextConfig = enGithubPages
  ? {
      output: 'export',
      basePath: process.env.RUTA_BASE || '',
      // GitHub Pages sirve carpetas: /contacto/ -> /contacto/index.html
      trailingSlash: true,
      images: { unoptimized: true },
    }
  : {}

export default nextConfig

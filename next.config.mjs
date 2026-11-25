/**
 * Configuracion de Next.js.
 *
 * Dos formas de publicar la web:
 * - VPS (normal): `next build` + `next start` con PM2. Sin variables extra.
 * - GitHub Pages (provisional): con PUBLICAR_EN=github-pages se exporta como
 *   archivos estaticos en /out y todas las rutas cuelgan de /3ddoshermanas-frontend.
 */
const enGithubPages = process.env.PUBLICAR_EN === 'github-pages'

/** @type {import('next').NextConfig} */
const nextConfig = enGithubPages
  ? {
      output: 'export',
      basePath: '/3ddoshermanas-frontend',
      // GitHub Pages sirve carpetas: /contacto/ -> /contacto/index.html
      trailingSlash: true,
      images: { unoptimized: true },
    }
  : {}

export default nextConfig

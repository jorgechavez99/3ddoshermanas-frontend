/**
 * Cabecera con el logotipo y la navegacion.
 * Sin menu desplegable: en movil los enlaces se desplazan en horizontal,
 * asi no hace falta JavaScript y Google ve todos los enlaces.
 */
import Link from 'next/link'
import { escaparates } from '@/data/escaparates'
import { negocio } from '@/data/negocio'

/**
 * Icono del logotipo (mismo dibujo que public/logo-icono.svg).
 * La barra usa currentColor para verse tanto en fondo claro como oscuro.
 */
export const IconoLogo = ({ className = 'h-10 w-12' }) => (
  <svg viewBox="0 0 120 100" aria-hidden="true" className={className}>
    <rect x="34" y="6" width="52" height="5" rx="2.5" fill="currentColor" />
    <path d="M52 2h16a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-2v4h-3l-3 6-3-6h-3v-4h-2a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" fill="#ff6a13" />
    <rect x="38" y="38" width="44" height="17" rx="8.5" fill="#ff6a13" />
    <rect x="25" y="59" width="70" height="17" rx="8.5" fill="#7a4dff" />
    <rect x="10" y="80" width="100" height="17" rx="8.5" fill="#0e9fae" />
  </svg>
)

// Texto del logo como en el diseño original: "3D" grande, "Dos Hermanas" debajo.
export const Logotipo = () => (
  <span className="flex items-center gap-3">
    <IconoLogo />
    <span className="font-titulo leading-[0.9] font-extrabold uppercase">
      <span aria-hidden="true" className="block text-2xl">3D <span className="text-base">Dos</span></span>
      <span aria-hidden="true" className="block text-base tracking-wide">Hermanas</span>
      <span className="sr-only">{negocio.nombre}</span>
    </span>
  </span>
)

export const Cabecera = () => (
  <header className="border-b border-tinta/10 bg-papel">
    <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-4 md:flex-row md:items-center md:justify-between">
      <Link href="/" aria-label={`${negocio.nombre}, ir al inicio`}>
        <Logotipo />
      </Link>
      <nav aria-label="Principal" className="-mx-5 overflow-x-auto px-5 md:mx-0 md:px-0">
        <ul className="flex gap-1 whitespace-nowrap text-[0.95rem] font-bold">
          {escaparates.map((e) => (
            <li key={e.slug}>
              <Link href={`/${e.slug}`} className="block rounded-full px-3.5 py-2 hover:bg-placa">
                {e.etiqueta}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/contacto" className="block rounded-full px-3.5 py-2 hover:bg-placa">
              Contacto
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
)

/**
 * Cabecera con el logotipo y la navegacion.
 * Sin menu desplegable: en movil los enlaces se desplazan en horizontal,
 * asi no hace falta JavaScript y Google ve todos los enlaces.
 */
import Link from 'next/link'
import { escaparates } from '@/data/escaparates'
import { negocio } from '@/data/negocio'

export const Logotipo = () => (
  <span className="flex items-center gap-2.5">
    {/* Marca: tres capas de filamento apiladas */}
    <svg viewBox="0 0 28 24" aria-hidden="true" className="h-7 w-8">
      <rect x="2" y="17" width="24" height="5" rx="2" fill="#0e9fae" />
      <rect x="5" y="10" width="18" height="5" rx="2" fill="#7a4dff" />
      <rect x="9" y="3" width="10" height="5" rx="2" fill="#ff6a13" />
    </svg>
    <span className="font-titulo text-xl font-extrabold tracking-tight">{negocio.nombre}</span>
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

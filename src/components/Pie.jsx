/**
 * Pie de pagina con los datos de contacto (mismos que la ficha de Google).
 * El padding inferior extra deja sitio al boton flotante de WhatsApp en movil.
 */
import Link from 'next/link'
import { negocio } from '@/data/negocio'
import { escaparates } from '@/data/escaparates'
import { Logotipo } from './Cabecera'

export const Pie = () => (
  <footer className="bg-tinta pb-24 text-white/85">
    <div className="lineas-capa h-3 text-white/15" aria-hidden="true" />
    <div className="mx-auto grid max-w-6xl gap-10 px-5 pt-12 md:grid-cols-3">
      <div>
        <div className="text-white">
          <Logotipo />
        </div>
        <p className="mt-3 max-w-xs">Impresión 3D por encargo en Dos Hermanas y Sevilla, con entrega en mano.</p>
      </div>
      <div>
        <h2 className="text-lg font-bold text-white">Qué hacemos</h2>
        <ul className="mt-3 space-y-1.5">
          {escaparates.map((e) => (
            <li key={e.slug}>
              <Link href={`/${e.slug}`} className="underline-offset-4 hover:underline">
                {e.titulo}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="text-lg font-bold text-white">Contacto</h2>
        <ul className="mt-3 space-y-1.5">
          <li>
            <a href={`tel:${negocio.telefono}`} className="underline-offset-4 hover:underline">
              {negocio.telefonoVisible}
            </a>
          </li>
          <li>
            <a href={`mailto:${negocio.email}`} className="underline-offset-4 hover:underline">
              {negocio.email}
            </a>
          </li>
          <li>{negocio.horario}</li>
          <li>Zonas: {negocio.zonas.join(', ')}</li>
        </ul>
        <ul className="mt-4 flex gap-4 font-bold text-white">
          <li><a href={negocio.redes.instagram} className="hover:underline">Instagram</a></li>
          <li><a href={negocio.redes.tiktok} className="hover:underline">TikTok</a></li>
          <li><a href={negocio.redes.facebook} className="hover:underline">Facebook</a></li>
        </ul>
      </div>
    </div>
    <p className="mx-auto mt-12 max-w-6xl px-5 text-sm text-white/55">
      © {new Date().getFullYear()} {negocio.nombre}
    </p>
  </footer>
)

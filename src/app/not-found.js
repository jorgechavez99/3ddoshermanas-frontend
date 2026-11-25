/**
 * Pagina 404 en español: explica que paso y ofrece por donde seguir.
 */
import Link from 'next/link'
import { BotonWhatsapp } from '@/components'

export const metadata = {
  title: 'Página no encontrada',
}

export default function NoEncontrada() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-20">
      <h1 className="text-4xl font-extrabold sm:text-5xl">Esta página no existe</h1>
      <p className="mt-4 text-lg text-tinta-suave">
        Puede que el enlace esté mal escrito o que la página se haya movido.
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <Link href="/" className="rounded-full bg-tinta px-6 py-3.5 font-bold text-white hover:bg-tinta-suave">
          Volver al inicio
        </Link>
        <BotonWhatsapp texto="Preguntar por WhatsApp" claro />
      </div>
    </section>
  )
}

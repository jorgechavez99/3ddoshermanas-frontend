/**
 * Calculadora de costes privada. Fuera de Google (noindex y robots.txt).
 */
import { CalculadoraAdmin } from '@/components/CalculadoraAdmin'

export const metadata = {
  title: 'Calculadora de costes',
  robots: { index: false, follow: false },
}

export default function Calculadora() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-12">
      <h1 className="text-4xl font-extrabold">Calculadora de costes</h1>
      <p className="mt-3 max-w-2xl text-tinta-suave">
        Para presupuestar cualquier encargo con los datos del slicer. Solo para 3D Dos Hermanas.
      </p>
      <div className="mt-10">
        <CalculadoraAdmin />
      </div>
    </section>
  )
}

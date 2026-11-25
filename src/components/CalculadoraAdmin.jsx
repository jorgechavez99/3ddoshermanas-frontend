'use client'
/**
 * Calculadora de costes privada (como la de 3dfils) para presupuestar
 * cualquier encargo. Pide la clave de administrador y habla con la API;
 * la clave solo se guarda en esta pestaña del navegador (sessionStorage).
 */
import { useEffect, useState } from 'react'
import { euros } from '@/lib/chibi'

const API = (process.env.NEXT_PUBLIC_API_PUBLICA_URL || '').replace(/\/+$/, '')

const CAMPOS_TRABAJO = [
  ['gramos', 'Filamento (g)', 'Del slicer, con soportes'],
  ['horas', 'Tiempo de impresión (h)', 'Ej. 2 h 54 min = 2.9'],
  ['minutosPreparacion', 'Modelado y preparación (min)', ''],
  ['minutosPostprocesado', 'Acabado y postprocesado (min)', 'Quitar soportes, lijar, pintar'],
  ['extras', 'Otros gastos (€)', 'Caja, tarjeta, relleno, imanes…'],
]

const CAMPOS_PARAMETROS = [
  ['precioBobina', 'Precio bobina (€)'], ['pesoBobina', 'Peso bobina (g)'], ['merma', 'Merma (0.1 = 10 %)'],
  ['consumoW', 'Consumo (W)'], ['precioKwh', 'Luz (€/kWh)'], ['precioImpresora', 'Impresora (€)'],
  ['mesesAmortizacion', 'Amortización (meses)'], ['horasUsoDia', 'Uso diario (h)'], ['mantenimientoMes', 'Mantenimiento (€/mes)'],
  ['precioHora', 'Tu hora (€)'], ['margen', 'Margen (0.4 = 40 %)'], ['iva', 'IVA (0.21 = 21 %)'], ['precioMinimo', 'Mínimo por pedido (€)'],
]

const ETIQUETAS_DESGLOSE = {
  material: 'Material', luz: 'Electricidad', amortizacion: 'Amortización impresora',
  mantenimiento: 'Mantenimiento', manoDeObra: 'Mano de obra', extras: 'Otros gastos',
}

const leerClave = () => {
  try { return sessionStorage.getItem('claveAdmin') || '' } catch { return '' }
}

const Campo = ({ etiqueta, ayuda, valor, onChange }) => (
  <label className="block">
    <span className="font-bold">{etiqueta}</span>
    {ayuda && <span className="block text-sm text-tinta-suave">{ayuda}</span>}
    <input
      type="number" step="any" min="0" value={valor} onChange={(e) => onChange(e.target.value)}
      className="mt-1 block w-full rounded-lg bg-papel px-3 py-2 ring-2 ring-tinta/15 focus:ring-naranja focus:outline-none"
    />
  </label>
)

export const CalculadoraAdmin = () => {
  const [clave, setClave] = useState('')
  const [parametros, setParametros] = useState(null)
  const [trabajo, setTrabajo] = useState({ gramos: '60.4', horas: '2.9', minutosPreparacion: '45', minutosPostprocesado: '20', extras: '1.2' })
  const [resultado, setResultado] = useState(null)
  const [aviso, setAviso] = useState('')

  useEffect(() => setClave(leerClave()), [])

  const pedir = async (ruta, opciones = {}) => {
    const res = await fetch(`${API}/api/v1/presupuestos/${ruta}`, {
      ...opciones,
      headers: { 'Content-Type': 'application/json', 'x-clave-admin': clave },
    })
    const json = await res.json()
    if (!res.ok) throw new Error(res.status === 401 ? 'Clave incorrecta' : json.msg?.join('. ') || `Error ${res.status}`)
    return json.data
  }

  const entrar = async (e) => {
    e.preventDefault()
    try {
      const data = await pedir('tarifas')
      setParametros(Object.fromEntries(CAMPOS_PARAMETROS.map(([k]) => [k, String(data.parametros[k])])))
      try { sessionStorage.setItem('claveAdmin', clave) } catch { /* sin almacenamiento: se pide cada vez */ }
      setAviso('')
    } catch (error) {
      setAviso(error.message)
    }
  }

  const calcular = async (e) => {
    e.preventDefault()
    try {
      const aNumeros = (obj) => Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, Number(v || 0)]))
      setResultado(await pedir('calcular', { method: 'POST', body: JSON.stringify({ trabajo: aNumeros(trabajo), parametros: aNumeros(parametros) }) }))
      setAviso('')
    } catch (error) {
      setAviso(error.message)
    }
  }

  if (!parametros) {
    return (
      <form onSubmit={entrar} className="max-w-sm space-y-4">
        <label className="block">
          <span className="font-bold">Clave de administrador</span>
          <input
            type="password" value={clave} onChange={(e) => setClave(e.target.value)} autoComplete="current-password"
            className="mt-1 block w-full rounded-lg bg-papel px-3 py-2 ring-2 ring-tinta/15 focus:ring-naranja focus:outline-none"
          />
        </label>
        <button className="rounded-full bg-tinta px-6 py-3 font-bold text-white hover:bg-tinta-suave">Entrar</button>
        {aviso && <p role="alert" className="font-bold text-red-700">{aviso}</p>}
      </form>
    )
  }

  return (
    <form onSubmit={calcular} className="grid gap-10 lg:grid-cols-[1fr_22rem]">
      <div className="space-y-10">
        <section>
          <h2 className="text-2xl font-extrabold">Este trabajo</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {CAMPOS_TRABAJO.map(([k, etiqueta, ayuda]) => (
              <Campo key={k} etiqueta={etiqueta} ayuda={ayuda} valor={trabajo[k]} onChange={(v) => setTrabajo((t) => ({ ...t, [k]: v }))} />
            ))}
          </div>
        </section>
        <details>
          <summary className="flex items-center gap-3 font-titulo text-2xl font-extrabold">
            Parámetros <span className="marcador text-2xl" aria-hidden="true">+</span>
          </summary>
          <p className="mt-2 text-sm text-tinta-suave">
            Cambiarlos aquí solo afecta a este cálculo. Para cambiarlos de verdad, edita configs/tarifas.js en la API.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {CAMPOS_PARAMETROS.map(([k, etiqueta]) => (
              <Campo key={k} etiqueta={etiqueta} valor={parametros[k]} onChange={(v) => setParametros((p) => ({ ...p, [k]: v }))} />
            ))}
          </div>
        </details>
      </div>

      <aside className="h-fit rounded-2xl bg-papel p-6 ring-1 ring-tinta/10 lg:sticky lg:top-6">
        <button className="w-full rounded-full bg-naranja px-6 py-3 font-bold text-tinta hover:bg-naranja-pastel">Calcular</button>
        {aviso && <p role="alert" className="mt-4 font-bold text-red-700">{aviso}</p>}
        {resultado && (
          <div className="mt-6" aria-live="polite">
            <p className="font-titulo text-4xl font-extrabold">{euros(resultado.precioFinal)}</p>
            <p className="text-sm text-tinta-suave">Precio final con IVA y redondeo</p>
            <dl className="mt-5 divide-y divide-tinta/10 border-y border-tinta/10 text-sm">
              {Object.entries(resultado.desglose).map(([k, v]) => (
                <div key={k} className="flex justify-between py-1.5"><dt>{ETIQUETAS_DESGLOSE[k]}</dt><dd>{euros(v)}</dd></div>
              ))}
              <div className="flex justify-between py-1.5 font-bold"><dt>Coste total</dt><dd>{euros(resultado.costeTotal)}</dd></div>
              <div className="flex justify-between py-1.5"><dt>Precio sin IVA (con margen)</dt><dd>{euros(resultado.precioSinIva)}</dd></div>
              <div className="flex justify-between py-1.5"><dt>IVA incluido</dt><dd>{euros(resultado.iva)}</dd></div>
              <div className="flex justify-between py-1.5 font-bold"><dt>Beneficio</dt><dd>{euros(resultado.precioSinIva - resultado.costeTotal)}</dd></div>
            </dl>
          </div>
        )}
      </aside>
    </form>
  )
}

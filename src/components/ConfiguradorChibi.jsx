'use client'
/**
 * Configurador "Diseña tu chibi".
 * El cliente elige opciones, ve el precio (calculado por la API, nunca aqui)
 * y envia el pedido por WhatsApp, donde adjunta su foto.
 * Si la API no responde, se puede pedir igual: el mensaje pide presupuesto.
 */
import { useEffect, useState } from 'react'
import { enlaceWhatsapp } from '@/lib/seo'
import {
  TAMANOS, ACABADOS, MAX_PERSONAS_EXTRA, OPCIONES_INICIALES,
  euros, urlPresupuestoChibi, mensajeChibi,
} from '@/lib/chibi'

const API = process.env.NEXT_PUBLIC_API_PUBLICA_URL || ''

const Paso = ({ numero, titulo, children }) => (
  <fieldset className="border-t border-tinta/10 py-6">
    <legend className="float-left mb-4 flex w-full items-center gap-3 font-titulo text-xl font-bold">
      <span className="grid h-8 w-8 place-items-center rounded-full bg-morado text-base text-white" aria-hidden="true">
        {numero}
      </span>
      {titulo}
    </legend>
    <div className="clear-both">{children}</div>
  </fieldset>
)

const Opcion = ({ nombre, valor, elegido, onChange, children }) => (
  <label
    className={`flex cursor-pointer flex-col rounded-xl px-4 py-3 ring-2 has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-naranja ${
      elegido ? 'bg-morado-suave ring-morado' : 'bg-papel ring-tinta/10 hover:ring-tinta/30'
    }`}
  >
    <input type="radio" name={nombre} value={valor} checked={elegido} onChange={onChange} className="sr-only" />
    {children}
  </label>
)

export const ConfiguradorChibi = () => {
  const [o, setO] = useState(OPCIONES_INICIALES)
  const [nombre, setNombre] = useState('')
  const [precio, setPrecio] = useState(null)
  const [estado, setEstado] = useState('cargando') // cargando | listo | error

  const cambiar = (campo, valor) => setO((prev) => ({ ...prev, [campo]: valor }))

  // Pide el precio a la API cada vez que cambian las opciones que lo afectan.
  useEffect(() => {
    const controlador = new AbortController()
    setEstado('cargando')
    const espera = setTimeout(async () => {
      try {
        const res = await fetch(urlPresupuestoChibi(API, o), { signal: controlador.signal })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const { data } = await res.json()
        setPrecio(data.precioFinal)
        setEstado('listo')
      } catch (error) {
        if (error.name === 'AbortError') return
        console.error('[ConfiguradorChibi] sin precio:', error.message)
        setPrecio(null)
        setEstado('error')
      }
    }, 250)
    return () => {
      clearTimeout(espera)
      controlador.abort()
    }
  }, [o.tamano, o.personasExtra, o.baseNombre, o.acabado, o.urgente])

  const mensaje = mensajeChibi({ opciones: o, precio: estado === 'listo' ? precio : null, nombre: nombre.trim() })

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_22rem]">
      <form onSubmit={(e) => e.preventDefault()} aria-label="Opciones de tu chibi">
        <Paso numero={1} titulo="Tamaño">
          <div className="grid gap-3 sm:grid-cols-3">
            {TAMANOS.map((t) => (
              <Opcion key={t.valor} nombre="tamano" valor={t.valor} elegido={o.tamano === t.valor} onChange={() => cambiar('tamano', t.valor)}>
                <span className="font-bold">{t.etiqueta}</span>
                <span className="text-sm text-tinta-suave">{t.detalle}</span>
              </Opcion>
            ))}
          </div>
        </Paso>

        <Paso numero={2} titulo="¿Cuántos en la figura?">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => cambiar('personasExtra', Math.max(0, o.personasExtra - 1))}
              disabled={o.personasExtra === 0}
              className="grid h-11 w-11 place-items-center rounded-full bg-papel text-2xl font-bold ring-2 ring-tinta/15 disabled:opacity-40"
              aria-label="Quitar una persona o mascota"
            >
              −
            </button>
            <p className="min-w-40 text-center" aria-live="polite">
              <span className="font-titulo text-2xl font-extrabold">{1 + o.personasExtra}</span>{' '}
              {o.personasExtra === 0 ? 'persona' : 'personas o mascotas'}
            </p>
            <button
              type="button"
              onClick={() => cambiar('personasExtra', Math.min(MAX_PERSONAS_EXTRA, o.personasExtra + 1))}
              disabled={o.personasExtra === MAX_PERSONAS_EXTRA}
              className="grid h-11 w-11 place-items-center rounded-full bg-papel text-2xl font-bold ring-2 ring-tinta/15 disabled:opacity-40"
              aria-label="Añadir una persona o mascota"
            >
              +
            </button>
          </div>
        </Paso>

        <Paso numero={3} titulo="Acabado">
          <div className="grid gap-3 sm:grid-cols-3">
            {ACABADOS.map((a) => (
              <Opcion key={a.valor} nombre="acabado" valor={a.valor} elegido={o.acabado === a.valor} onChange={() => cambiar('acabado', a.valor)}>
                <span className="font-bold">{a.etiqueta}</span>
              </Opcion>
            ))}
          </div>
        </Paso>

        <Paso numero={4} titulo="Detalles">
          <div className="space-y-4">
            <label className="flex items-start gap-3">
              <input type="checkbox" checked={o.baseNombre} onChange={(e) => cambiar('baseNombre', e.target.checked)} className="mt-1 h-5 w-5 accent-morado" />
              <span>Base con nombre o fecha en relieve</span>
            </label>
            {o.baseNombre && (
              <label className="block pl-8">
                <span className="text-sm text-tinta-suave">Texto de la base (máx. 20 caracteres)</span>
                <input
                  type="text"
                  maxLength={20}
                  value={o.textoBase}
                  onChange={(e) => cambiar('textoBase', e.target.value)}
                  className="mt-1 block w-full max-w-xs rounded-lg bg-papel px-3 py-2 ring-2 ring-tinta/15 focus:ring-morado focus:outline-none"
                  placeholder="Ej. Nuria 2026"
                />
              </label>
            )}
            <label className="flex items-start gap-3">
              <input type="checkbox" checked={o.urgente} onChange={(e) => cambiar('urgente', e.target.checked)} className="mt-1 h-5 w-5 accent-morado" />
              <span>Lo necesito urgente (en menos de 3 días)</span>
            </label>
            <label className="block">
              <span className="text-sm text-tinta-suave">Tu nombre (opcional)</span>
              <input
                type="text"
                maxLength={40}
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                autoComplete="given-name"
                className="mt-1 block w-full max-w-xs rounded-lg bg-papel px-3 py-2 ring-2 ring-tinta/15 focus:ring-morado focus:outline-none"
              />
            </label>
          </div>
        </Paso>
      </form>

      <aside className="h-fit rounded-2xl bg-papel p-6 ring-1 ring-tinta/10 lg:sticky lg:top-6" aria-labelledby="titulo-resumen">
        <h2 id="titulo-resumen" className="text-2xl font-extrabold">Tu chibi</h2>
        <div className="mt-4 min-h-16" aria-live="polite">
          {estado === 'listo' && (
            <>
              <p className="font-titulo text-4xl font-extrabold">{euros(precio)}</p>
              <p className="text-sm text-tinta-suave">IVA, caja y tarjeta incluidos. Precio orientativo: lo confirmamos al ver tu foto.</p>
            </>
          )}
          {estado === 'cargando' && <p className="text-tinta-suave">Calculando precio…</p>}
          {estado === 'error' && (
            <p className="text-tinta-suave">No hemos podido calcular el precio ahora. Envíanos tu pedido y te damos presupuesto por WhatsApp.</p>
          )}
        </div>
        <a
          href={enlaceWhatsapp(mensaje)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 flex w-full items-center justify-center rounded-full bg-whatsapp px-6 py-3.5 text-center font-bold text-white hover:bg-whatsapp-oscuro"
        >
          Enviar pedido por WhatsApp
        </a>
        <p className="mt-3 text-sm text-tinta-suave">
          En el chat, adjunta una foto de cuerpo entero con buena luz. Usamos tu foto solo para tu diseño y la borramos al terminar.
        </p>
      </aside>
    </div>
  )
}

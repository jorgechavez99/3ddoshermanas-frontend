/**
 * Utilidades del configurador "Diseña tu chibi".
 * Las opciones y etiquetas deben coincidir con configs/tarifas.js del backend;
 * los precios NO estan aqui: los calcula siempre la API.
 */

export const TAMANOS = [
  { valor: 'pequeno', etiqueta: 'Pequeño (8 cm)', detalle: 'Para escritorio o como detalle' },
  { valor: 'mediano', etiqueta: 'Mediano (12 cm)', detalle: 'El más pedido' },
  { valor: 'grande', etiqueta: 'Grande (18 cm)', detalle: 'Para lucir en una estantería' },
]

export const ACABADOS = [
  { valor: 'un-color', etiqueta: 'Un color' },
  { valor: 'multicolor', etiqueta: 'Varios colores (multicolor)' },
  { valor: 'pintado', etiqueta: 'Pintada a mano' },
]

export const MAX_PERSONAS_EXTRA = 3

export const OPCIONES_INICIALES = {
  tamano: 'mediano',
  personasExtra: 0,
  baseNombre: false,
  textoBase: '',
  acabado: 'un-color',
  urgente: false,
}

const formatoEuros = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' })
// Intl separa el simbolo con un espacio especial; se cambia por uno normal
// para que el texto se lea y se copie bien en WhatsApp.
export const euros = (n) => formatoEuros.format(n).replace(/\u00a0/g, ' ')

/**
 * URL del endpoint publico de presupuesto.
 * @param {string} base '' en produccion (misma web) o la URL de la API en desarrollo
 * @param {object} o opciones del configurador
 * @returns {string}
 */
export const urlPresupuestoChibi = (base, o) => {
  const params = new URLSearchParams({
    tamano: o.tamano,
    personas_extra: String(o.personasExtra),
    base_nombre: String(o.baseNombre),
    acabado: o.acabado,
    urgente: String(o.urgente),
  })
  return `${(base || '').replace(/\/+$/, '')}/api/v1/presupuestos/chibi?${params}`
}

/**
 * Mensaje de WhatsApp con el pedido. El cliente adjunta su foto en el chat:
 * la web no recibe ni guarda fotos.
 * @param {{opciones:object, precio:?number, nombre:string}} datos
 * @returns {string}
 */
export const mensajeChibi = ({ opciones: o, precio, nombre }) => {
  const tamano = TAMANOS.find((t) => t.valor === o.tamano)?.etiqueta ?? o.tamano
  const acabado = ACABADOS.find((a) => a.valor === o.acabado)?.etiqueta ?? o.acabado
  const lineas = [
    `Hola${nombre ? `, soy ${nombre}` : ''}. Quiero mi chibi personalizado:`,
    `- Tamaño: ${tamano}`,
    o.personasExtra > 0 ? `- ${o.personasExtra} persona${o.personasExtra > 1 ? 's' : ''} o mascota${o.personasExtra > 1 ? 's' : ''} extra` : null,
    o.baseNombre ? `- Base con nombre: "${o.textoBase || 'por decidir'}"` : null,
    `- Acabado: ${acabado}`,
    o.urgente ? '- Urgente (menos de 3 días)' : null,
    precio ? `Precio orientativo de la web: ${euros(precio)} (IVA incluido)` : 'Me dais presupuesto?',
    '',
    'Os adjunto la foto en este chat.',
  ]
  return lineas.filter((l) => l !== null).join('\n')
}

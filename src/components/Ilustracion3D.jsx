/**
 * Ilustracion provisional (SVG) de una pieza impresa sobre la placa.
 * Se dibuja con franjas horizontales para recordar las capas de impresion.
 * Sustituir por fotos reales cuando las haya.
 */

// Anchos de cada capa de abajo arriba: forman la silueta de una figura.
const SILUETA = [
  120, 124, 126, 126, 122, 112, 96, 84, 80, 82, 92, 104, 112, 116, 116, 114, 108, 98, 84, 66, 44,
]

export const Ilustracion3D = ({ color = '#ff6a13', className = '' }) => {
  const alto = 8
  const base = 250
  return (
    <svg viewBox="0 0 320 300" role="img" aria-label="Pieza impresa en 3D sobre la placa de la impresora" className={className}>
      {/* placa de impresion */}
      <rect x="20" y={base + 8} width="280" height="14" rx="3" fill="#1b2140" />
      <rect x="20" y={base + 8} width="280" height="3" fill="#4a5272" />
      {SILUETA.map((ancho, i) => (
        <rect
          key={i}
          x={160 - ancho / 2}
          y={base - i * alto}
          width={ancho}
          height={alto - 2}
          rx="3"
          fill={color}
          opacity={i % 2 === 0 ? 1 : 0.85}
        />
      ))}
      {/* boquilla trabajando en la ultima capa */}
      <g transform={`translate(160 ${base - SILUETA.length * alto - 34})`}>
        <rect x="-26" y="-26" width="52" height="24" rx="4" fill="#1b2140" />
        <path d="M-9 -2 L9 -2 L3 12 L-3 12 Z" fill="#c9a227" />
      </g>
    </svg>
  )
}

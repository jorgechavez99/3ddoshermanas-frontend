/**
 * Inserta datos estructurados (JSON-LD) para Google.
 * Se escapa "<" para que un texto con "</script>" no pueda romper la pagina.
 */
export const JsonLd = ({ datos }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(datos).replace(/</g, '\\u003c') }}
  />
)

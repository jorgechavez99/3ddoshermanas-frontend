/**
 * Botones de WhatsApp: el objetivo de toda la web es que el visitante escriba.
 * - BotonWhatsapp: boton grande dentro del contenido.
 * - WhatsappFlotante: boton fijo abajo a la derecha, visible en todas las paginas.
 */
import { enlaceWhatsapp } from '@/lib/seo'

const IconoWhatsapp = ({ className = 'h-5 w-5' }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
    <path d="M12 2a10 10 0 0 0-8.66 15l-1.3 4.76 4.88-1.28A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-2.9.76.78-2.83-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.14c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.55.12-.16.25-.63.8-.78.96-.14.16-.29.18-.53.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.23-1.46-1.37-1.7-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47a.9.9 0 0 0-.66.31c-.22.25-.86.84-.86 2.05s.88 2.38 1 2.54c.12.17 1.74 2.65 4.2 3.72.59.25 1.05.4 1.4.52.6.19 1.13.16 1.56.1.48-.07 1.46-.6 1.67-1.18.2-.58.2-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z" />
  </svg>
)

export const BotonWhatsapp = ({ mensaje, texto = 'Pedir presupuesto por WhatsApp', claro = false }) => (
  <a
    href={enlaceWhatsapp(mensaje)}
    target="_blank"
    rel="noopener noreferrer"
    className={
      claro
        ? 'inline-flex items-center gap-2 rounded-full bg-papel px-6 py-3.5 font-bold text-tinta shadow-sm hover:bg-placa'
        : 'inline-flex items-center gap-2 rounded-full bg-whatsapp px-6 py-3.5 font-bold text-white hover:bg-whatsapp-oscuro'
    }
  >
    <IconoWhatsapp />
    {texto}
  </a>
)

export const WhatsappFlotante = () => (
  <a
    href={enlaceWhatsapp('Hola, vengo de la web de 3D Dos Hermanas y quiero pedir un presupuesto.')}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Escribir por WhatsApp a 3D Dos Hermanas"
    className="fixed right-4 bottom-4 z-40 grid h-14 w-14 place-items-center rounded-full bg-whatsapp text-white shadow-lg hover:bg-whatsapp-oscuro sm:right-6 sm:bottom-6"
  >
    <IconoWhatsapp className="h-7 w-7" />
  </a>
)

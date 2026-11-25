/**
 * Contenido de los tres escaparates (una pagina cada uno).
 *
 * Cada escaparate ataca un grupo de palabras clave del plan SEO. Los textos
 * incluyen la zona ("en Dos Hermanas", "en Sevilla") de forma natural porque
 * es lo que hace que Google nos muestre en busquedas locales.
 * Para editar textos o preguntas no hace falta tocar ningun componente.
 */

export const escaparates = [
  {
    slug: 'regalos-personalizados',
    etiqueta: 'Regalos',
    titulo: 'Regalos personalizados impresos en 3D',
    tituloSeo: 'Regalos personalizados en Dos Hermanas y Sevilla',
    descripcionSeo:
      'Regalos personalizados impresos en 3D en Dos Hermanas: llaveros con nombre, figuras, detalles de boda y cumpleaños. Presupuesto gratis por WhatsApp.',
    resumen: 'Llaveros con nombre, detalles para bodas y cumpleaños, regalos únicos.',
    intro:
      'Un regalo que nadie más tiene. Diseñamos e imprimimos en 3D detalles personalizados en Dos Hermanas para cumpleaños, bodas, comuniones, empresas o simplemente para sorprender a alguien.',
    ideas: [
      'Llaveros con nombre o con el logo de tu empresa',
      'Detalles para invitados de bodas, bautizos y comuniones',
      'Placas y letreros con nombre para habitaciones',
      'Regalos de Navidad, San Valentín y Día de la Madre o del Padre',
      'Lámparas y decoración con un diseño a tu gusto',
    ],
    faqs: [
      {
        pregunta: '¿Cuánto tarda un regalo personalizado?',
        respuesta:
          'Un llavero suele estar listo en 1 o 2 días. Las piezas más grandes o los encargos de muchas unidades, entre 3 y 7 días. Te damos la fecha exacta con el presupuesto.',
      },
      {
        pregunta: '¿Hacéis pedidos de muchas unidades para eventos?',
        respuesta:
          'Sí. Para bodas, comuniones o empresas hacemos packs con precio por unidad más bajo. Escríbenos con la cantidad y la fecha del evento.',
      },
      {
        pregunta: '¿Cómo recibo el pedido?',
        respuesta:
          'Entregamos en mano en Dos Hermanas, Sevilla, Montequinto, Alcalá de Guadaíra y Utrera. Pregúntanos si estás en otra zona.',
      },
    ],
    color: 'naranja',
  },
  {
    slug: 'figuras-anime',
    etiqueta: 'Anime',
    titulo: 'Figuras de anime y coleccionables en 3D',
    tituloSeo: 'Figuras de anime y coleccionables 3D en Sevilla',
    descripcionSeo:
      'Figuras de anime, figuras personalizadas estilo chibi, soportes para Funko y decoración otaku impresa en 3D en Dos Hermanas y Sevilla.',
    resumen: 'Figuras estilo chibi, soportes para Funko y decoración para tu colección.',
    intro:
      'Para quien vive el anime. Imprimimos figuras personalizadas en estilo chibi, accesorios y soportes para lucir tu colección, y decoración para tu habitación o tu setup.',
    ideas: [
      'Figura personalizada estilo chibi a partir de tu foto (diséñala en "Diseña tu chibi")',
      'Soportes y expositores para Funko y figuras',
      'Llaveros y pines de tus personajes favoritos',
      'Decoración para tu setup gamer u otaku',
      'Piezas para cosplay',
    ],
    faqs: [
      {
        pregunta: '¿Podéis hacer una figura de mí o de mi pareja?',
        respuesta:
          'Sí, en estilo chibi o caricatura a partir de vuestras fotos. Te enseñamos el diseño antes de imprimirlo para que lo apruebes.',
      },
      {
        pregunta: '¿Las figuras vienen pintadas?',
        respuesta:
          'Las imprimimos en el color que elijas. Si quieres varios colores o pintura a mano, cuéntanoslo y te damos presupuesto.',
      },
      {
        pregunta: '¿Qué tamaño pueden tener?',
        respuesta:
          'Desde figuras pequeñas de 5 cm hasta piezas de unos 25 cm. Para tamaños mayores la imprimimos por partes.',
      },
    ],
    color: 'morado',
  },
  {
    slug: 'piezas-repuestos-3d',
    etiqueta: 'Piezas',
    titulo: 'Piezas y repuestos a medida en 3D',
    tituloSeo: 'Piezas y repuestos impresos en 3D a medida en Sevilla',
    descripcionSeo:
      'Repuestos y piezas a medida impresos en 3D en Dos Hermanas y Sevilla: clips, soportes, tapas, organizadores y piezas rotas que ya no se venden.',
    resumen: 'Ese clip o soporte roto que ya no venden, hecho a medida.',
    intro:
      '¿Se te ha roto una pieza de plástico que ya no se fabrica? La medimos, la diseñamos y la imprimimos en 3D. También hacemos soportes, organizadores y piezas funcionales a medida.',
    ideas: [
      'Repuestos de electrodomésticos, muebles y persianas',
      'Clips, tapas, ruedas y enganches',
      'Soportes para móvil, tablet, herramientas o cámaras',
      'Organizadores a medida para cajones y talleres',
      'Prototipos para tu proyecto o tu negocio',
    ],
    faqs: [
      {
        pregunta: '¿Qué necesitáis para hacer un repuesto?',
        respuesta:
          'Lo ideal es la pieza rota. Si no la tienes, unas fotos con una regla al lado o las medidas nos sirven para empezar.',
      },
      {
        pregunta: '¿Son resistentes las piezas?',
        respuesta:
          'Usamos el material adecuado para cada uso: PLA para piezas decorativas y materiales más resistentes al calor o a los golpes para piezas funcionales.',
      },
      {
        pregunta: '¿Cuánto cuesta?',
        respuesta:
          'Desde 8 € para piezas pequeñas. Si hay que diseñarla desde cero, el diseño va desde 15 €. Te damos el precio cerrado antes de empezar.',
      },
    ],
    color: 'verde',
  },
]

/**
 * Busca un escaparate por su slug.
 * @param {string} slug
 * @returns {object|undefined}
 */
export const getEscaparate = (slug) => escaparates.find((e) => e.slug === slug)

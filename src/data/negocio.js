/**
 * Datos del negocio: fuente unica de verdad.
 *
 * IMPORTANTE: el nombre, telefono y zonas deben ser identicos a los de la
 * ficha de Google Business Profile. Google compara estos datos entre la web
 * y la ficha (lo que se llama NAP: Name, Address, Phone) y si no coinciden
 * pierde confianza en el negocio. Si cambia algo aqui, cambiadlo tambien
 * en la ficha y en las redes.
 */

export const negocio = {
  nombre: '3D Dos Hermanas',
  eslogan: 'Lo que imagines, lo imprimimos en 3D',
  telefono: '+34653177225',
  telefonoVisible: '+34 653 17 72 25',
  email: '3ddoshermanas@gmail.com',
  whatsapp: 'https://wa.me/34653177225',
  // Texto que ve el cliente y version para los datos estructurados de Google.
  horario: 'Lunes a sábado, de 10:00 a 21:00',
  horarioSchema: {
    dias: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    abre: '10:00',
    cierra: '21:00',
  },
  // Empresa de servicios en zona: nunca se publica la direccion postal.
  zonas: ['Dos Hermanas', 'Sevilla', 'Montequinto', 'Alcalá de Guadaíra', 'Utrera'],
  redes: {
    instagram: 'https://www.instagram.com/3ddoshermanas',
    tiktok: 'https://www.tiktok.com/@3ddoshermanas',
    facebook: 'https://www.facebook.com/3ddoshermanas',
  },
  servicios: [
    {
      nombre: 'Llavero personalizado',
      precio: 'Desde 4 €',
      detalle: 'Con nombre, logo o diseño a tu gusto. Pack de 5 por 15 €.',
    },
    {
      nombre: 'Figura personalizada',
      precio: 'Desde 20 €',
      detalle: 'Estilo chibi o caricatura a partir de tu idea o tu foto.',
    },
    {
      nombre: 'Pieza o repuesto a medida',
      precio: 'Desde 8 €',
      detalle: 'Clips, soportes, tapas y piezas rotas que ya no se venden.',
    },
    {
      nombre: 'Diseño 3D por encargo',
      precio: 'Desde 15 €',
      detalle: 'Modelamos tu pieza desde un boceto, una foto o unas medidas.',
    },
  ],
}

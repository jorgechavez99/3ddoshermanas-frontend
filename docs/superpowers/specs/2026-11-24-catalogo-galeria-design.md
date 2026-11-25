# Catálogo (backend) y galería (frontend) - Diseño

Aprobado por Jorge el 24/11/2026.

## Intención
Que Jorge y Mary añadan productos sin tocar código y que cada producto aparezca en la galería de su escaparate, sumando contenido para Google y llevando a WhatsApp.

## Repos
- `3ddoshermanas-backend`: API Express + MySQL (MVC de Jorge).
- `3ddoshermanas-frontend`: la web Next.js actual.

## Backend
- CommonJS, `app.js`, `configs/configMysql.js` (pool mysql2), `routers/productosRouter.js`, `controllers/productosController.js`, `models/modelProductos.js` + `models/queriesProductos.js`, `models/queries.sql`, `middlewares/`.
- Tabla `productos`: `id_producto` INT PK, `nombre` VARCHAR(120), `slug` VARCHAR(140) UNIQUE, `escaparate` ENUM('regalos-personalizados','figuras-anime','piezas-repuestos-3d'), `descripcion` VARCHAR(500), `precio_desde` DECIMAL(6,2), `foto_url` VARCHAR(255) NULL, `visible` BOOLEAN DEFAULT TRUE, `creado_en` TIMESTAMP.
- Respuesta: `{ error: false, msg: [...], data }`; errores `{ error: true, msg: [...] }`. 200/201/400/401/404/500.
- Endpoints:
  - `GET /api/v1/productos?escaparate=` público, solo visibles, ordenados del más nuevo al más antiguo.
  - `POST /api/v1/productos` (admin), `PUT /api/v1/productos/:id` (admin), `PATCH /api/v1/productos/:id/ocultar` (admin).
- Admin: cabecera `x-clave-admin` igual a `CLAVE_ADMIN` de `.env`, comparación en tiempo constante.
- Validación con express-validator. CORS solo para el dominio de la web. Fotos: URL a carpeta servida por Nginx.

## Frontend
- `src/lib/apiProductos.js`: `getProductos(escaparate)` con `fetch(..., { next: { revalidate: 3600 } })`; ante cualquier error devuelve `[]`.
- Componente `Galeria` en cada escaparate: tarjeta con foto (o ilustración si no hay), nombre, precio y botón "Lo quiero" a WhatsApp con el nombre del producto.
- Sin `NEXT_PUBLIC_API_URL` configurada la galería no se muestra.

## Fuera de alcance
Panel visual de administración, pedidos, pagos, subida de fotos por API.

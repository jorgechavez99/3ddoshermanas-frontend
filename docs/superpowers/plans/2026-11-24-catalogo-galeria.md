# Catálogo y galería Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** API de productos y galería por escaparate que la consume sin perder SEO.

**Architecture:** Express MVC con mysql2 en un repo; Next.js lee la API en build con revalidación horaria.

**Tech Stack:** Node 22, Express 4, mysql2, express-validator, cors, dotenv; Vitest + supertest. Next.js 15.

**Spec:** `docs/superpowers/specs/2026-11-24-catalogo-galeria-design.md`

## Global Constraints
- Estilo Jorge: español, CommonJS en backend, `{ error, msg, data }`, `client?.release()` en `finally`, catch nunca vacío, sin emojis.
- Secretos solo en `.env`; `.env_template` con nombres vacíos.

## Review Focus
1. Sin `x-clave-admin` o clave incorrecta: 401 y nada se escribe.
2. `escaparate` desconocido en el GET: 400, no una lista vacía silenciosa.
3. Slug repetido al crear: 400 con mensaje claro, no 500.
4. API caída o lenta: la página del escaparate se genera igual, sin galería.
5. Producto oculto: no aparece nunca en el GET público.

---

### Task 1: Backend - base, BBDD y GET público
Files: `package.json`, `app.js`, `configs/configMysql.js`, `models/queries.sql`, `models/queriesProductos.js`, `models/modelProductos.js`, `controllers/productosController.js`, `routers/productosRouter.js`, `tests/productos.test.js`, `.env_template`.
- Tests (integración contra MariaDB local `tienda3d_test`): GET devuelve solo visibles; filtro por escaparate; escaparate inválido 400.
- Commit "Crea la API de productos con el listado público".

### Task 2: Backend - escritura protegida
Files: `middlewares/validarAdmin.js`, `middlewares/validaciones.js`, controller/model/router.
- Tests: POST sin clave 401; POST válido 201 y aparece en GET; POST con slug repetido 400; datos inválidos 400; PUT 200 / 404; ocultar quita del GET.
- Commit "Añade alta, edición y ocultación de productos protegidas con clave".

### Task 3: Backend - README, semilla y despliegue
Files: `README.md`, `scripts/semilla.js`, `deploy/ecosystem.config.js`, `DEPLOY.md`.
- Commit "Documenta la API y su despliegue".

### Task 4: Frontend - galería
Files: `src/lib/apiProductos.js`, `src/lib/apiProductos.test.js`, `src/components/Galeria.jsx`, `PaginaEscaparate.jsx`, `.env_template`.
- Tests: `getProductos` devuelve `[]` si fetch falla, si la respuesta no es ok o si no hay URL configurada; devuelve `data` si va bien.
- Verificar: build con API local encendida muestra productos; con la API apagada el build termina y `comprobar-seo` pasa.
- Commit "Muestra la galería de productos de cada escaparate".

# 🌿 Raíz & Hoja — demo de jardinería

Landing sobre jardinería y tipos de prácticas jardineras, hecha con **Vite** (vanilla JS + CSS, sin frameworks).

Su propósito real es didáctico: **el escritorio está bien hecho y el móvil está roto a propósito**, para poder comparar los dos lado a lado y señalar antipatrones concretos de diseño responsive.

## Arrancar

```bash
npm install
npm run dev
```

Abre http://localhost:5173

## Qué incluye

- Hero a pantalla completa con overlay en degradado
- 6 prácticas jardineras: huerto orgánico, permacultura, xerojardinería, jardín vertical, bosque comestible y poda ornamental
- Galería del ciclo del jardín (semillero → floración → cosecha → compost)
- Calendario de siembra por estación
- Consejos y formulario de newsletter (demo, no envía nada)
- 11 imágenes de stock de Unsplash
- Animaciones de entrada con `IntersectionObserver` y scroll suave

## ⚠️ El móvil está mal a propósito

Todos los antipatrones viven en un único bloque comentado y numerado al final de [`src/style.css`](src/style.css), bajo `@media (max-width: 480px)`, para poder señalarlos uno a uno.

Medido en un viewport de 375 px:

| Antipatrón | Efecto real |
|---|---|
| `user-scalable=no` en el viewport | El usuario no puede hacer zoom para escapar |
| Anchos fijos en `px` | 1531 px de desbordamiento horizontal (body de 1906 px en pantalla de 375 px) |
| La rejilla no colapsa | Las 6 tarjetas quedan en una sola fila de 1832 px |
| Tipografía sin escalar | `h1` a 58 px dentro de un contenedor de 320 px |
| Zonas táctiles minúsculas | Enlaces de navegación de 14 px de alto (el mínimo recomendado es 44 px) |
| Elementos `fixed` de 1280 px | Nav y footer tapan el contenido |
| Información solo en `:hover` | El texto de las tarjetas queda con `opacity: 0`, invisible en táctil |
| Breakpoint mal elegido (480 px) | Tablets y móviles grandes se quedan con el layout de escritorio comprimido |
| Tabla sin scroll contenido | `word-break: break-all` a 7 px, ilegible |

Para verlo: DevTools → modo dispositivo → 375 px, o redimensiona la ventana por debajo de 480 px.

## Créditos

Imágenes de stock vía [Unsplash](https://unsplash.com).

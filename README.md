# 🌿 Raíz & Hoja — estudio de paisajismo

Landing de un estudio de paisajismo, construida con **React + Vite 8**, **Tailwind CSS v4**, **motion** (Framer Motion) y **Lenis**.

El diseño se inspira en [alethia.earth](https://www.alethia.earth/): verde profundo con acento lima, tipografía Geist, etiquetas mono entre corchetes, titulares de display muy apretados y scroll suave con revelados progresivos.

## Arrancar

```bash
npm install
npm run dev
```

Abre http://localhost:5173

## Estructura

```
index.html               Entrada React + preconnect y preload de recursos críticos
src/
  App.jsx                Composición de la página
  index.css              Tokens de diseño (@theme), capas base y utilidades
  data/site.js           Todo el contenido, separado del layout
  hooks/
    usePreload.js        Precarga real de imágenes con progreso
    useLenis.js          Scroll suave
  components/
    Preloader.jsx        Pantalla de carga
    Nav.jsx              Navegación + menú móvil a pantalla completa
    Hero.jsx             Hero con parallax + cinta infinita
    Manifesto.jsx        Texto que se revela palabra a palabra al hacer scroll
    Practices.jsx        Seis prácticas jardineras
    Services.jsx         Servicios + proceso en cuatro pasos
    Projects.jsx         Carrusel de proyectos + diario
    Footer.jsx           CTA de contacto + pie con wordmark gigante
    ui.jsx               Primitivas compartidas
public/demo-mala/        La demo antigua de mal responsive (ver abajo)
```

## Pantalla de precarga

El contador **no es decorativo**. `usePreload` descarga las imágenes de la primera pantalla y cuenta cada una al terminar (o al fallar, para que una imagen caída no bloquee la página), espera además a `document.fonts.ready` para evitar el salto de tipografía, y solo entonces retira el telón. Cuando llega a 100, el contenido visible ya está en caché y entra sin parpadeos.

Complementos: `preconnect` y `preload` de fuente y hero en el HTML, `motion` en su propio chunk, y `lazy loading` en las 15 imágenes que no son el hero.

Hay dos salvaguardas: si la red se atasca, un temporizador de 6 s entra igualmente; y el desmontaje del telón va por temporizador propio, no por el callback de la librería.

## Diseño responsive

Verificado por medición a 375, 768 y 1440 px:

- 0 px de desbordamiento horizontal en los tres tamaños
- 0 zonas táctiles por debajo de 44×44 px
- 0 textos por debajo de 12 px
- Contraste mínimo 4.73:1 (AA)
- Nada depende de `:hover` — en móvil las prácticas son tarjetas con la imagen siempre visible
- `prefers-reduced-motion` desactiva Lenis y todas las animaciones
- Foco visible en todo elemento enfocable, menú móvil con `inert` y `aria-hidden` al cerrarse

## ⚠️ La demo de mal responsive

La versión anterior del proyecto tenía el móvil roto **a propósito** como material didáctico. Se conserva íntegra en:

**http://localhost:5173/demo-mala/index.html** (enlace también en el pie)

Los antipatrones están aislados y numerados en `public/demo-mala/style.css`, bajo `@media (max-width: 480px)`. Medidos a 375 px: 1531 px de desbordamiento, `h1` de 58 px en un contenedor de 320 px, zonas táctiles de 14 px, las 6 tarjetas en una fila de 1832 px, y el texto de las tarjetas solo visible en `:hover`.

Sirve de contraste directo con la portada.

## Notas de implementación

`AnimatePresence` de motion 13 ejecuta la animación de salida pero no retira el nodo del DOM. En el menú móvil eso dejaba un overlay invisible cubriendo la pantalla entera y capturando todos los toques. El proyecto no lo usa: el montaje y desmontaje se controlan con estado y temporizador.

## Créditos

Imágenes de stock vía [Unsplash](https://unsplash.com). Tipografía [Geist](https://vercel.com/font).

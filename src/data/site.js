// Contenido del sitio. Separado de los componentes para poder reescribir
// el copy sin tocar el layout.

const u = (id, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`;

// Hero propio (render de IA). Es la única imagen crítica: se precarga en
// index.html y en el loader. El original de 1024² pesaba 1,2 MB en PNG; en
// WebP baja a 92 kB, y la variante de 640 a 40 kB para móvil.
export const HERO_IMG = '/hero-1024.webp';
export const HERO_SRCSET = '/hero-640.webp 640w, /hero-1024.webp 1024w';
export const HERO_SIZES = '(max-width: 1024px) 92vw, 46vw';

export const NAV_LINKS = [
  { label: 'Prácticas', href: '#practicas' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Proceso', href: '#proceso' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Diario', href: '#diario' },
];

export const TICKER = [
  'Diseño de jardines',
  'Ecología aplicada',
  'Suelo vivo',
  'Especies nativas',
  'Mantenimiento estacional',
  'Riego eficiente',
];

export const MANIFESTO =
  'Un jardín no se decora: se cultiva. Diseñamos sistemas vivos que mejoran con el tiempo — suelo que respira, especies que pertenecen al lugar y un mantenimiento que cada año pide menos, no más.';

export const STATS = [
  { value: '120+', label: 'jardines entregados' },
  { value: '18', label: 'años de práctica' },
  { value: '-64%', label: 'consumo de agua medio' },
  { value: '0', label: 'pesticidas de síntesis' },
];

export const PRACTICES = [
  {
    n: '01',
    title: 'Huerto orgánico',
    desc: 'Compost propio, rotación de cultivos y control biológico. El suelo se construye antes que la cosecha.',
    meta: 'Comestible · Alta mano de obra',
    img: u('1523348837708-15d4a09cfac2', 900),
  },
  {
    n: '02',
    title: 'Permacultura',
    desc: 'Diseño por zonas y capas. Cada elemento cumple varias funciones y alimenta al siguiente.',
    meta: 'Diseño · Sistémico',
    img: u('1416879595882-3373a0480b5b', 900),
  },
  {
    n: '03',
    title: 'Xerojardinería',
    desc: 'Especies nativas, mulch profundo y sombra estratégica. Menos agua, más resistencia al verano.',
    meta: 'Clima seco · Bajo riego',
    img: u('1485955900006-10f4d324d411', 900),
  },
  {
    n: '04',
    title: 'Jardín vertical',
    desc: 'Sustrato ligero, goteo calibrado y plantas de raíz corta. La solución para patios y medianeras.',
    meta: 'Espacio reducido · Urbano',
    img: u('1459156212016-c812468e2115', 900),
  },
  {
    n: '05',
    title: 'Bosque comestible',
    desc: 'Siete estratos, del dosel a la cubierta. Inversión inicial alta, cosecha durante décadas.',
    meta: 'Largo plazo · Productivo',
    img: u('1523712999610-f77fbcfc3843', 900),
  },
  {
    n: '06',
    title: 'Poda ornamental',
    desc: 'Guía de ramas, topiaria y bonsái. Herramienta limpia, corte en el nudo y paciencia.',
    meta: 'Detalle · Artesanal',
    img: u('1467043198406-dc953a3defa0', 900),
  },
];

export const SERVICES = [
  {
    tag: 'Diseño y obra',
    title: 'Del plano al jardín construido',
    desc: 'Levantamiento del terreno, análisis de suelo, plan de plantación y ejecución completa con nuestro equipo.',
    img: u('1416879595882-3373a0480b5b', 1400),
  },
  {
    tag: 'Mantenimiento',
    title: 'El jardín, año tras año',
    desc: 'Calendario estacional, poda, compostaje y ajuste de riego. Reducimos la intervención a medida que el sistema madura.',
    img: u('1440342359743-84fcb8c21f21', 1400),
  },
];

export const PROCESS = [
  {
    n: '01',
    title: 'Lectura del terreno',
    desc: 'Analizamos suelo, orientación, viento y agua disponible antes de dibujar una sola línea.',
  },
  {
    n: '02',
    title: 'Proyecto y plantación',
    desc: 'Planos, paleta vegetal y presupuesto cerrado. Elegimos especies por lugar, no por catálogo.',
  },
  {
    n: '03',
    title: 'Construcción',
    desc: 'Movimiento de tierras, drenaje, riego y plantado. Equipo propio y control de obra semanal.',
  },
  {
    n: '04',
    title: 'Acompañamiento',
    desc: 'Dos años de seguimiento estacional para que el sistema se sostenga solo.',
  },
];

export const PROJECTS = [
  {
    tag: 'Residencial',
    title: 'Casa de los Fresnos',
    place: 'Sierra de Guadarrama',
    year: '2025',
    img: u('1558904541-efa843a96f01', 1000),
  },
  {
    tag: 'Restauración',
    title: 'Ribera del Arroyo',
    place: 'Valle del Jerte',
    year: '2024',
    img: u('1500382017468-9049fed747ef', 1000),
  },
  {
    tag: 'Corporativo',
    title: 'Patio Norte',
    place: 'Madrid',
    year: '2024',
    img: u('1518977676601-b53f82aba655', 1000),
  },
  {
    tag: 'Productivo',
    title: 'Huerta de Mediodía',
    place: 'Vega de Granada',
    year: '2023',
    img: u('1471193945509-9ad0617afabf', 1000),
  },
  {
    tag: 'Xerojardín',
    title: 'Terrazas del Sur',
    place: 'Almería',
    year: '2023',
    img: u('1485955900006-10f4d324d411', 1000),
  },
];

export const JOURNAL = [
  {
    date: 'Jul 2026',
    kind: 'Nota técnica',
    title: 'Cómo medimos si un suelo está realmente vivo',
    excerpt: 'Respiración microbiana, densidad aparente y test de infiltración: tres pruebas de campo que cualquiera puede repetir.',
  },
  {
    date: 'May 2026',
    kind: 'Proyecto',
    title: 'Dos años después: qué falló en Ribera del Arroyo',
    excerpt: 'Publicamos también lo que no funcionó. El 18% de la plantación original no sobrevivió al segundo verano.',
  },
  {
    date: 'Mar 2026',
    kind: 'Ensayo',
    title: 'Contra el césped',
    excerpt: 'La superficie verde más cara, sedienta y muerta que existe, y qué poner en su lugar.',
  },
];

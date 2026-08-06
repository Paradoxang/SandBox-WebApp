/**
 * Optimiza las imágenes de origen para la web.
 *
 *   npm run media
 *
 * Lee los PNG/JPG de `assets-src/`, recorta al encuadre indicado y escribe en
 * `public/` dos variantes WebP por imagen (una para escritorio y otra para
 * móvil). Solo `public/` se sirve: los originales pesados nunca llegan al
 * navegador ni al build.
 *
 * Para añadir una imagen nueva, basta con una entrada más en TARGETS.
 */
import { readdir } from 'node:fs/promises';
import sharp from 'sharp';

// nombre del archivo en assets-src → cómo debe salir
const TARGETS = {
  // El hero llega ya apaisado (1024×572): se respeta su encuadre tal cual,
  // sin recortar, y no se generan anchos mayores porque solo serían un
  // reescalado del original.
  'hero-original': { out: 'hero', ratio: 1024 / 572, widths: [1024, 640] },
  'servicio-diseno': { out: 'servicio-diseno', ratio: 4 / 3, widths: [1200, 800] },
  'servicio-mantenimiento': { out: 'servicio-mantenimiento', ratio: 4 / 3, widths: [1200, 800] },
  'contacto-fondo': { out: 'contacto-fondo', ratio: 16 / 9, widths: [1600, 900] },
};

const files = await readdir('assets-src');
let hechos = 0;

for (const file of files) {
  const base = file.replace(/\.(png|jpe?g|webp)$/i, '');
  const target = TARGETS[base];

  if (!target) {
    console.log(`· ${file} — sin entrada en TARGETS, se omite`);
    continue;
  }

  for (const w of target.widths) {
    const h = Math.round(w / target.ratio);
    const dest = `public/${target.out}-${w}.webp`;
    const info = await sharp(`assets-src/${file}`)
      // `attention` recorta buscando la zona con más detalle, así el sujeto
      // no se pierde al pasar de una imagen cuadrada a un encuadre apaisado.
      .resize(w, h, { fit: 'cover', position: 'attention' })
      .webp({ quality: 78 })
      .toFile(dest);

    console.log(`✓ ${dest}  ${w}×${h}  ${(info.size / 1024).toFixed(0)} kB`);
    hechos++;
  }
}

console.log(hechos ? `\n${hechos} variantes generadas.` : '\nNada que hacer.');

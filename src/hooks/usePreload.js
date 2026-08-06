import { useEffect, useState } from 'react';

/**
 * Precarga real de imágenes con progreso.
 *
 * No es una barra falsa: cada imagen que termina (o falla) suma un paso, así
 * que el 100% significa que el contenido de la primera pantalla ya está en
 * caché y aparece sin saltos ni parpadeos.
 *
 * @param {(string|{src:string,srcset?:string,sizes?:string})[]} sources
 *        Recursos a descargar. Si se pasan `srcset` y `sizes`, el navegador
 *        elige el mismo candidato que renderizará después, de modo que la
 *        precarga sea un acierto de caché y no una descarga desperdiciada.
 * @param {number}   minMs    Tiempo mínimo en pantalla, para que el loader no
 *                            parpadee cuando todo viene de caché.
 */
export function usePreload(sources, minMs = 900) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  // Sin guard de "ya arrancó": en StrictMode el efecto se monta dos veces y un
  // ref persistente haría que la segunda pasada saliera antes de empezar,
  // dejando el loader colgado para siempre. La limpieza cancela la primera.
  useEffect(() => {
    const total = sources.length;
    let loaded = 0;
    let cancelled = false;
    const startedAt = performance.now();

    const step = () => {
      if (cancelled) return;
      loaded += 1;
      setProgress(Math.round((loaded / total) * 100));
      if (loaded === total) finish();
    };

    const finish = () => {
      // Espera también a las fuentes: evita el salto de tipografía (FOUT).
      const fonts = document.fonts ? document.fonts.ready : Promise.resolve();
      const elapsed = performance.now() - startedAt;
      const wait = Math.max(0, minMs - elapsed);
      fonts.then(() => {
        setTimeout(() => !cancelled && setDone(true), wait);
      });
    };

    if (total === 0) {
      setProgress(100);
      finish();
      return;
    }

    const imgs = sources.map((entry) => {
      const { src, srcset, sizes } = typeof entry === 'string' ? { src: entry } : entry;
      const img = new Image();
      // onerror también avanza: una imagen caída no puede bloquear la página.
      img.onload = step;
      img.onerror = step;
      // sizes antes que srcset, y src el último: así el selector de candidato
      // tiene todos los datos cuando arranca la descarga.
      if (sizes) img.sizes = sizes;
      if (srcset) img.srcset = srcset;
      img.src = src;
      return img;
    });

    // Red de seguridad: pase lo que pase, a los 6 s se entra.
    const bail = setTimeout(() => {
      if (!cancelled) {
        setProgress(100);
        setDone(true);
      }
    }, 6000);

    return () => {
      cancelled = true;
      clearTimeout(bail);
      imgs.forEach((img) => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, [sources, minMs]);

  return { progress, done };
}

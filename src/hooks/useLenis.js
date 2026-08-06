import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

/**
 * Scroll suave con Lenis (lo mismo que usa la referencia).
 *
 * Se desactiva por completo si el sistema pide menos movimiento, y queda
 * bloqueado mientras el preloader está en pantalla.
 */
export function useLenis(enabled = true) {
  const lenis = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const instance = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // En táctil se deja el scroll nativo: es más fluido y no secuestra el gesto.
      syncTouch: false,
    });
    lenis.current = instance;

    let frame;
    const raf = (time) => {
      instance.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      instance.destroy();
      lenis.current = null;
    };
  }, []);

  useEffect(() => {
    if (!lenis.current) return;
    if (enabled) lenis.current.start();
    else lenis.current.stop();
  }, [enabled]);

  return lenis;
}

/** Desplazamiento a un ancla que funciona con y sin Lenis. */
export function scrollToId(id, lenis) {
  const el = document.querySelector(id);
  if (!el) return;
  if (lenis?.current) lenis.current.scrollTo(el, { offset: -80 });
  else el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

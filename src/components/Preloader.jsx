import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';

/**
 * Pantalla de precarga.
 *
 * El contador refleja descargas reales (ver usePreload), no una animación
 * decorativa: cuando llega a 100 la primera pantalla ya está en caché y la
 * página entra sin parpadeos. Al salir, se aparta como un telón.
 *
 * No usa AnimatePresence a propósito: con motion 13 la salida no llegaba a
 * dispararse y el telón se quedaba clavado tapando la página. Aquí el
 * desmontaje lo decide onAnimationComplete, que es determinista.
 */
export default function Preloader({ progress, done }) {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(true);

  // Doble seguro para retirar el telón: el callback de motion y, por si no
  // llega, un temporizador. Un preloader atascado deja el sitio inservible.
  useEffect(() => {
    if (!done) return;
    const t = setTimeout(() => setMounted(false), reduced ? 250 : 1050);
    return () => clearTimeout(t);
  }, [done, reduced]);

  if (!mounted) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-ink px-6 py-8 sm:px-10 sm:py-12"
      initial={false}
      animate={done ? (reduced ? { opacity: 0 } : { y: '-100%' }) : { y: '0%', opacity: 1 }}
      transition={{ duration: reduced ? 0.2 : 1, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={() => done && setMounted(false)}
      role="status"
      aria-live="polite"
      aria-label={`Cargando ${progress} por ciento`}
    >
      <div className="flex items-start justify-between">
        <span className="label text-lime">[RAÍZ &amp; HOJA]</span>
        <span className="label text-bone/40">EST. 2008</span>
      </div>

      <div className="flex flex-col items-center justify-center gap-8">
        <span className="font-mono text-[clamp(4rem,18vw,11rem)] leading-none font-medium text-bone tabular-nums">
          {String(progress).padStart(3, '0')}
        </span>

        {/* Barra de progreso real */}
        <div className="h-px w-full max-w-md overflow-hidden bg-bone/15">
          <motion.div
            className="h-full bg-lime"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: progress / 100 }}
            style={{ transformOrigin: 'left' }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          />
        </div>
      </div>

      <div className="flex items-end justify-between gap-4">
        <span className="label max-w-[16rem] text-bone/40">
          Precargando imágenes y tipografía
        </span>
        <span className="label text-bone/40">{progress < 100 ? 'CARGANDO' : 'LISTO'}</span>
      </div>
    </motion.div>
  );
}

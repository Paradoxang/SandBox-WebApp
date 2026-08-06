import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { NAV_LINKS } from '../data/site';
import { scrollToId } from '../hooks/useLenis';

export default function Nav({ lenis }) {
  const [open, setOpen] = useState(false);
  // Montaje separado de la apertura: con motion 13, AnimatePresence ejecuta la
  // salida pero no retira el nodo, y el overlay se quedaba invisible tapando
  // toda la pantalla. Aquí desmontamos nosotros al terminar la animación.
  const [mounted, setMounted] = useState(false);
  const [solid, setSolid] = useState(false);

  // El desmontaje va por temporizador, no por onAnimationComplete: motion 13
  // no dispara ese callback al animar clip-path, y el overlay se quedaba
  // enganchado. El retardo iguala la duración de la transición.
  useEffect(() => {
    if (open) {
      setMounted(true);
      return;
    }
    const t = setTimeout(() => setMounted(false), 550);
    return () => clearTimeout(t);
  }, [open]);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Menú abierto: se bloquea el fondo y Escape cierra.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const go = (href) => (e) => {
    e.preventDefault();
    setOpen(false);
    // Espera al cierre del overlay antes de desplazar
    setTimeout(() => scrollToId(href, lenis), open ? 320 : 0);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          solid && !open ? 'bg-ink/80 backdrop-blur-xl' : 'bg-transparent'
        }`}
      >
        <div className="shell flex h-20 items-center justify-between gap-6">
          <a
            href="#inicio"
            onClick={go('#inicio')}
            className="label tap z-10 text-lime transition-opacity hover:opacity-70"
          >
            [RAÍZ &amp; HOJA]
          </a>

          <nav className="hidden items-center gap-9 lg:flex" aria-label="Principal">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={go(l.href)}
                className="label tap text-bone/70 transition-colors hover:text-lime"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="z-10 flex items-center gap-3">
            <a
              href="#contacto"
              onClick={go('#contacto')}
              className="label tap hidden rounded-full bg-lime px-5 text-ink transition-transform duration-300 hover:scale-105 sm:inline-flex"
            >
              Hablemos
            </a>

            {/* Zona táctil de 48px: cómoda de verdad en el pulgar */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
              className="grid size-12 cursor-pointer place-items-center rounded-full border border-bone/20 text-bone transition-colors hover:border-lime hover:text-lime lg:hidden"
            >
              <span className="relative block h-3 w-5">
                <motion.span
                  className="absolute left-0 block h-px w-full bg-current"
                  animate={open ? { top: 6, rotate: 45 } : { top: 0, rotate: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="absolute left-0 block h-px w-full bg-current"
                  animate={open ? { top: 6, rotate: -45 } : { top: 12, rotate: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Menú móvil a pantalla completa: enlaces enormes, imposible fallar el toque */}
      {mounted && (
        <motion.div
          className={`fixed inset-0 z-40 flex flex-col justify-center bg-forest px-6 lg:hidden ${
            open ? '' : 'pointer-events-none'
          }`}
          initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
          animate={
            open
              ? { opacity: 1, clipPath: 'inset(0 0 0% 0)' }
              : { opacity: 0, clipPath: 'inset(0 0 100% 0)' }
          }
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          // Cerrado y aún animando: fuera del alcance del lector de pantalla
          // y del tabulador, para que no queden enlaces fantasma.
          aria-hidden={!open}
          inert={!open || undefined}
        >
          <nav className="flex flex-col gap-1" aria-label="Menú móvil">
            {[...NAV_LINKS, { label: 'Hablemos →', href: '#contacto', cta: true }].map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={go(l.href)}
                initial={{ opacity: 0, y: 30 }}
                animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: open ? 0.15 + i * 0.06 : 0, duration: 0.5 }}
                className={`display py-4 text-[clamp(2rem,11vw,3.5rem)] transition-colors ${
                  l.cta ? 'text-lime' : 'border-b border-bone/10 text-bone active:text-lime'
                }`}
              >
                {l.label}
              </motion.a>
            ))}
          </nav>
        </motion.div>
      )}
    </>
  );
}

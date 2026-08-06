import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useReducedMotion,
} from 'motion/react';
import { HERO_IMG, HERO_SRCSET, HERO_SIZES, TICKER } from '../data/site';

export default function Hero({ ready }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  // La isla se va hacia arriba y se encoge al hacer scroll
  const islandY = useTransform(scrollYProgress, [0, 1], ['0%', reduced ? '0%' : '-28%']);
  const islandScale = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : 0.82]);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', reduced ? '0%' : '40%']);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  // Inclinación 3D siguiendo al puntero: da volumen al render sin recargar
  const tiltX = useSpring(useMotionValue(0), { stiffness: 120, damping: 20 });
  const tiltY = useSpring(useMotionValue(0), { stiffness: 120, damping: 20 });

  const onPointerMove = (e) => {
    if (reduced) return;
    const r = e.currentTarget.getBoundingClientRect();
    tiltY.set(((e.clientX - r.left) / r.width - 0.5) * 14);
    tiltX.set(-((e.clientY - r.top) / r.height - 0.5) * 14);
  };
  const resetTilt = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  const line = {
    hidden: { y: '110%' },
    show: (i) => ({
      y: '0%',
      transition: { duration: 1, delay: 0.15 + i * 0.09, ease: [0.16, 1, 0.3, 1] },
    }),
  };

  return (
    <section
      id="inicio"
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={resetTilt}
      className="relative min-h-[100svh] overflow-hidden bg-ink"
    >
      {/* Halo detrás de la isla: separa el sujeto del fondo plano */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-0 h-[80vmax] w-[80vmax] -translate-y-1/2 translate-x-1/4 rounded-full opacity-70 lg:translate-x-0"
        style={{
          background:
            'radial-gradient(circle, rgba(63,143,94,0.28) 0%, rgba(23,48,26,0.18) 38%, transparent 68%)',
        }}
      />

      <motion.div
        style={{ opacity: fade }}
        className="shell relative grid min-h-[100svh] grid-cols-1 items-center gap-4 pt-24 pb-14 lg:grid-cols-[1.05fr_1fr] lg:gap-10"
      >
        {/* ---------- Isla flotante ---------- */}
        <motion.div
          style={{ y: islandY, scale: islandScale }}
          className="order-1 justify-self-center lg:order-2 lg:justify-self-end"
        >
          <motion.div
            style={{ rotateX: tiltX, rotateY: tiltY, transformPerspective: 1200 }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={ready ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Flotación continua, muy lenta, para que nunca parezca estática */}
            <motion.img
              src={HERO_IMG}
              srcSet={HERO_SRCSET}
              sizes={HERO_SIZES}
              width={1024}
              height={1024}
              alt="Isla flotante de tierra con helechos y musgo, mostrando el corte del suelo y sus raíces"
              fetchPriority="high"
              decoding="sync"
              animate={reduced ? {} : { y: [0, -22, 0] }}
              transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
              className="w-[86vw] max-w-[34rem] drop-shadow-[0_45px_60px_rgba(0,0,0,0.55)] sm:w-[62vw] lg:w-[46vw]"
            />
          </motion.div>
        </motion.div>

        {/* ---------- Texto ---------- */}
        <motion.div style={{ y: textY }} className="order-2 max-w-2xl lg:order-1">
          <motion.p
            className="label mb-6 text-lime"
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            [ESTUDIO DE PAISAJISMO — DESDE 2008]
          </motion.p>

          <h1 className="display text-[clamp(2.5rem,7vw,6.5rem)] text-bone">
            {['Jardines que', 'mejoran con', 'el tiempo'].map((text, i) => (
              <span key={i} className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  className="block"
                  custom={i}
                  variants={line}
                  initial={reduced ? false : 'hidden'}
                  animate={ready ? 'show' : ''}
                >
                  {i === 2 ? (
                    <>
                      el <span className="text-lime">tiempo</span>
                    </>
                  ) : (
                    text
                  )}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.div
            className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between lg:flex-col lg:items-start xl:flex-row xl:items-end"
            initial={{ opacity: 0, y: 20 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <p className="max-w-md text-lg text-bone/70 text-balance">
              Diseñamos, construimos y mantenemos sistemas vivos. Ecología aplicada al metro
              cuadrado — no decoración vegetal.
            </p>

            <motion.a
              href="#practicas"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 22 }}
              className="label group inline-flex shrink-0 items-center gap-4 self-start rounded-full border border-bone/25 py-4 pr-4 pl-6 text-bone transition-colors hover:border-lime hover:text-lime"
            >
              Ver prácticas
              <motion.span
                animate={reduced ? {} : { y: [0, 4, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                className="grid size-8 place-items-center rounded-full bg-lime text-ink"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 5v14M6 13l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.span>
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/** Cinta infinita en mono, el respiro entre el hero y el manifiesto. */
export function Ticker() {
  const reduced = useReducedMotion();
  const items = [...TICKER, ...TICKER];

  return (
    <div className="overflow-hidden border-y border-bone/10 bg-forest py-5">
      <motion.div
        className="flex w-max gap-10 whitespace-nowrap"
        animate={reduced ? {} : { x: ['0%', '-50%'] }}
        transition={{ duration: 32, ease: 'linear', repeat: Infinity }}
      >
        {items.map((t, i) => (
          <span key={i} className="label flex items-center gap-10 text-bone/45">
            {t}
            <span className="text-lime">✳</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

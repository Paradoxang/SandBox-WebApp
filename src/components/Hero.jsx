import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { HERO_IMG, HERO_SRCSET, HERO_SIZES, TICKER } from '../data/site';

export default function Hero({ ready }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  // La imagen se queda atrás y se acerca ligeramente al hacer scroll
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', reduced ? '0%' : '16%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : 1.14]);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', reduced ? '0%' : '55%']);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const line = {
    hidden: { y: '110%' },
    show: (i) => ({
      y: '0%',
      transition: { duration: 1, delay: 0.15 + i * 0.09, ease: [0.16, 1, 0.3, 1] },
    }),
  };

  return (
    <section id="inicio" ref={ref} className="relative min-h-[100svh] overflow-hidden bg-ink">
      {/* ---------- Imagen a sangre completa ---------- */}
      <motion.div
        className="grade grade--soft absolute inset-0"
        style={{ y: bgY, scale: bgScale }}
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.img
          src={HERO_IMG}
          srcSet={HERO_SRCSET}
          sizes={HERO_SIZES}
          width={1024}
          height={1024}
          alt="Isla flotante de tierra con helechos y musgo, mostrando el corte del suelo y sus raíces"
          fetchPriority="high"
          decoding="sync"
          // Flotación continua, muy lenta, para que la isla nunca parezca fija
          animate={reduced ? {} : { y: [0, -18, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
          className="size-full scale-110 object-cover object-center"
        />

        {/* Velos: la isla queda visible en el centro y el texto legible encima */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-transparent to-ink/40" />
      </motion.div>

      {/* ---------- Texto encima ---------- */}
      <motion.div
        style={{ opacity: fade, y: textY }}
        className="shell relative flex min-h-[100svh] flex-col justify-end pt-28 pb-14 sm:pb-20"
      >
        <div className="max-w-4xl">
          <motion.p
            className="label mb-7 text-lime"
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            [ESTUDIO DE PAISAJISMO — DESDE 2008]
          </motion.p>

          <h1 className="display text-[clamp(2.75rem,9vw,8.5rem)] text-bone drop-shadow-[0_8px_30px_rgba(0,0,0,0.6)]">
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
            className="mt-10 flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between"
            initial={{ opacity: 0, y: 20 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <p className="max-w-md text-lg text-bone/75 text-balance">
              Diseñamos, construimos y mantenemos sistemas vivos. Ecología aplicada al metro
              cuadrado — no decoración vegetal.
            </p>

            <motion.a
              href="#practicas"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 22 }}
              className="label group inline-flex shrink-0 items-center gap-4 self-start rounded-full border border-bone/30 bg-ink/30 py-4 pr-4 pl-6 text-bone backdrop-blur-sm transition-colors hover:border-lime hover:text-lime"
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
        </div>
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

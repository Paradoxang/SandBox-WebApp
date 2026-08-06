import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { HERO_IMG, TICKER } from '../data/site';

export default function Hero({ ready }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  // Parallax suave: la imagen se queda atrás al hacer scroll.
  const y = useTransform(scrollYProgress, [0, 1], ['0%', reduced ? '0%' : '18%']);
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : 1.12]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Las líneas entran escalonadas justo cuando el preloader se retira.
  const line = {
    hidden: { y: '110%' },
    show: (i) => ({
      y: '0%',
      transition: { duration: 1, delay: 0.15 + i * 0.09, ease: [0.16, 1, 0.3, 1] },
    }),
  };

  return (
    <section id="inicio" ref={ref} className="relative min-h-[100svh] overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y, scale }}>
        <img
          src={HERO_IMG}
          alt="Jardín de umbría con helechos y luz filtrada entre los árboles"
          fetchPriority="high"
          decoding="sync"
          className="size-full object-cover"
        />
        {/* Doble velo: legibilidad garantizada sobre cualquier foto */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/75 to-ink/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/60" />
      </motion.div>

      <motion.div
        style={{ opacity: fade }}
        className="shell relative flex min-h-[100svh] flex-col justify-end pt-28 pb-12 sm:pb-16"
      >
        <div className="max-w-5xl">
          <motion.p
            className="label mb-8 text-lime"
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            [ESTUDIO DE PAISAJISMO — DESDE 2008]
          </motion.p>

          <h1 className="display text-[clamp(2.75rem,8.5vw,8rem)] text-bone">
            {['Jardines que', 'mejoran con', 'el tiempo'].map((text, i) => (
              <span key={i} className="block overflow-hidden">
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
            className="mt-10 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between"
            initial={{ opacity: 0, y: 20 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <p className="max-w-md text-lg text-bone/70 text-balance">
              Diseñamos, construimos y mantenemos sistemas vivos. Ecología aplicada al metro
              cuadrado — no decoración vegetal.
            </p>

            <a
              href="#practicas"
              className="label group inline-flex items-center gap-4 self-start rounded-full border border-bone/25 py-4 pr-4 pl-6 text-bone transition-colors hover:border-lime hover:text-lime"
            >
              Ver prácticas
              <span className="grid size-8 place-items-center rounded-full bg-lime text-ink transition-transform duration-300 group-hover:translate-y-0.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 5v14M6 13l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>
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

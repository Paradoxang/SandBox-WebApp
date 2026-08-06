import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { PRACTICES } from '../data/site';
import { Img, Label, Reveal, SectionHead } from './ui';

/**
 * Escritorio: lista tipográfica; al pasar el ratón, la imagen sigue al cursor.
 * Móvil: tarjetas apiladas con la imagen SIEMPRE visible — nada depende del
 * hover, que en táctil no existe.
 */
export default function Practices() {
  const [active, setActive] = useState(null);
  const wrap = useRef(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 220, damping: 28, mass: 0.6 });
  const y = useSpring(my, { stiffness: 220, damping: 28, mass: 0.6 });

  const onMove = (e) => {
    const rect = wrap.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set(e.clientX - rect.left + 32);
    my.set(e.clientY - rect.top - 130);
  };

  return (
    <section id="practicas" className="bg-ink py-[clamp(5rem,14vw,11rem)]">
      <div className="shell">
        <SectionHead label="TIPOS DE PRÁCTICA" title="Seis maneras de cultivar">
          Cada terreno pide una escuela distinta. Estas son las que trabajamos y en qué contexto
          tiene sentido cada una.
        </SectionHead>

        {/* ---------- Escritorio ---------- */}
        <div
          ref={wrap}
          onMouseMove={onMove}
          onMouseLeave={() => setActive(null)}
          className="relative mt-16 hidden border-t border-bone/10 lg:block"
        >
          {PRACTICES.map((p, i) => (
            <a
              key={p.n}
              href="#contacto"
              onMouseEnter={() => setActive(i)}
              className="group grid grid-cols-[auto_1fr_auto] items-center gap-10 border-b border-bone/10 py-8 transition-colors duration-500 hover:bg-forest/60"
            >
              <span
                className={`label w-10 transition-colors duration-300 ${
                  active === i ? 'text-lime' : 'text-bone/35'
                }`}
              >
                {p.n}
              </span>

              <div className="flex items-baseline gap-8">
                <h3
                  className={`display text-[clamp(1.8rem,3.4vw,3rem)] transition-all duration-500 ${
                    active === i ? 'translate-x-3 text-lime' : 'text-bone'
                  }`}
                >
                  {p.title}
                </h3>
                <p className="max-w-md text-sm text-bone/45 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  {p.desc}
                </p>
              </div>

              <Label tone="bone" className="justify-self-end">
                {p.meta}
              </Label>
            </a>
          ))}

          {/* Imagen flotante anclada al cursor.
              motion se encarga solo del seguimiento (x/y con muelle); el
              fundido va por CSS. Con motion 13 ni AnimatePresence ni el prop
              animate llegaban a aplicar la opacidad, y la imagen no aparecía. */}
          <motion.div
            style={{ x, y }}
            className="pointer-events-none absolute top-0 left-0 z-20 w-[22rem]"
            aria-hidden="true"
          >
            <div
              style={{
                opacity: active !== null ? 1 : 0,
                transition: 'opacity 300ms ease-out',
              }}
            >
              <Img src={PRACTICES[active ?? 0].img} alt="" ratio="4/5" className="rounded-sm" />
            </div>
          </motion.div>
        </div>

        {/* ---------- Móvil y tablet ---------- */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:hidden">
          {PRACTICES.map((p, i) => (
            <Reveal key={p.n} delay={i * 0.05}>
              <article className="h-full overflow-hidden rounded-sm bg-forest">
                <Img src={p.img} alt={p.title} ratio="16/10" />
                <div className="p-6">
                  <div className="flex items-center justify-between gap-4">
                    <Label>{p.n}</Label>
                    <Label tone="bone">{p.meta}</Label>
                  </div>
                  <h3 className="display mt-4 text-2xl text-bone">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-bone/55">{p.desc}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { PROJECTS, JOURNAL } from '../data/site';
import { ArrowButton, Label, ParallaxImg, Reveal, SectionHead } from './ui';

/**
 * Carrusel de proyectos.
 *
 * El desplazamiento sigue siendo scroll nativo con snap —funciona con dedo,
 * rueda, trackpad y teclado—, y encima se añaden flechas que avanzan una
 * tarjeta con `scrollTo({behavior:'smooth'})`. Las flechas se desactivan al
 * llegar a cada extremo en vez de desaparecer, para que no bailen.
 */
export default function Projects() {
  const pista = useRef(null);
  const [puede, setPuede] = useState({ atras: false, adelante: true });

  const revisar = useCallback(() => {
    const el = pista.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    // En reposo scrollLeft no es 0: el snap alinea la primera tarjeta con el
    // borde del contenedor, saltándose su padding. Sin tenerlo en cuenta, la
    // flecha de retroceso arrancaría activa sin tener a dónde ir.
    const origen = parseFloat(getComputedStyle(el).paddingLeft) || 0;
    setPuede({
      atras: el.scrollLeft > origen + 8,
      adelante: el.scrollLeft < max - 8,
    });
  }, []);

  useEffect(() => {
    const el = pista.current;
    if (!el) return;
    revisar();
    el.addEventListener('scroll', revisar, { passive: true });
    window.addEventListener('resize', revisar);
    return () => {
      el.removeEventListener('scroll', revisar);
      window.removeEventListener('resize', revisar);
    };
  }, [revisar]);

  const mover = (dir) => {
    const el = pista.current;
    if (!el) return;
    // Avanza el ancho de una tarjeta más su separación
    const tarjeta = el.firstElementChild;
    const paso = tarjeta ? tarjeta.getBoundingClientRect().width + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * paso, behavior: 'smooth' });
  };

  return (
    <section id="proyectos" className="bg-ink py-[clamp(5rem,14vw,11rem)]">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHead label="PROYECTOS" title="Obra construida">
            Cinco encargos recientes. Publicamos superficie, especies y consumo real de agua en cada
            ficha.
          </SectionHead>

          <div className="flex gap-3">
            <Flecha
              dir="atras"
              onClick={() => mover(-1)}
              disabled={!puede.atras}
              label="Proyecto anterior"
            />
            <Flecha
              dir="adelante"
              onClick={() => mover(1)}
              disabled={!puede.adelante}
              label="Proyecto siguiente"
            />
          </div>
        </div>
      </div>

      <div
        ref={pista}
        className="hide-scrollbar mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto px-[clamp(1.25rem,5vw,5rem)] pb-4"
      >
        {PROJECTS.map((p) => (
          <a
            key={p.title}
            href="#contacto"
            className="group w-[78vw] shrink-0 snap-start sm:w-[46vw] lg:w-[30vw] xl:w-[24rem]"
          >
            <ParallaxImg
              src={p.img}
              alt={`${p.title}, ${p.place}`}
              ratio="3/4"
              className="rounded-sm"
            />
            <div className="mt-5 flex items-start justify-between gap-4">
              <div>
                <Label>{p.tag.toUpperCase()}</Label>
                <h3 className="display mt-3 text-2xl text-bone">{p.title}</h3>
                <p className="label mt-2 text-bone/45">
                  {p.place} · {p.year}
                </p>
              </div>
              <ArrowButton label={`Ver ${p.title}`} className="mt-1" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

function Flecha({ dir, onClick, disabled, label }) {
  const atras = dir === 'atras';
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      whileHover={disabled ? undefined : { scale: 1.1 }}
      whileTap={disabled ? undefined : { scale: 0.92 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className={`grid size-12 cursor-pointer place-items-center rounded-full border transition-colors duration-300 ${
        disabled
          ? 'cursor-not-allowed border-bone/10 text-bone/20'
          : 'border-bone/30 text-bone hover:border-lime hover:bg-lime hover:text-ink'
      }`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path
          d={atras ? 'M19 12H5M11 18l-6-6 6-6' : 'M5 12h14M13 6l6 6-6 6'}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.button>
  );
}

/** Diario / notas del estudio. */
export function Journal() {
  return (
    <section id="diario" className="bg-forest py-[clamp(5rem,14vw,11rem)]">
      <div className="shell">
        <SectionHead label="DIARIO DEL ESTUDIO" title="Lo que aprendemos, publicado" />

        <div className="mt-14 border-t border-bone/10">
          {JOURNAL.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.07}>
              <a
                href="#contacto"
                className="group grid gap-4 border-b border-bone/10 py-8 transition-colors duration-500 hover:bg-ink/40 md:grid-cols-[9rem_1fr_auto] md:items-center md:gap-10"
              >
                <div className="flex gap-4 md:flex-col md:gap-2">
                  <Label>{a.date.toUpperCase()}</Label>
                  <Label tone="bone">{a.kind}</Label>
                </div>

                <div>
                  <h3 className="display text-[clamp(1.3rem,2.4vw,1.9rem)] text-bone transition-colors group-hover:text-lime">
                    {a.title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-bone/50">{a.excerpt}</p>
                </div>

                <ArrowButton label={`Leer: ${a.title}`} />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

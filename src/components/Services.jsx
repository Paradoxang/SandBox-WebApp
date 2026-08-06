import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { SERVICES, PROCESS, FLOATERS } from '../data/site';
import { Img, Label, Reveal, SectionHead } from './ui';

/**
 * Servicios.
 *
 * Al pasar el ratón, un panel lima sube desde abajo y llena la tarjeta; el
 * texto pasa a tinta para mantener el contraste. Se resuelve con variantes de
 * motion, así que un solo `whileHover` en el enlace coordina el panel, el
 * color del texto y la flecha.
 */
export default function Services() {
  return (
    <section id="servicios" className="bg-bone py-[clamp(5rem,14vw,11rem)]">
      <div className="shell">
        <SectionHead
          label="NUESTROS SERVICIOS"
          title="Validamos lo que el ecosistema ya hace"
          tone="ink"
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {SERVICES.map((s, i) => (
            <Reveal key={s.tag} delay={i * 0.1}>
              <TarjetaServicio servicio={s} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function TarjetaServicio({ servicio }) {
  const reduced = useReducedMotion();

  const panel = {
    rest: { scaleY: 0 },
    hover: { scaleY: 1, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
  };
  const texto = {
    rest: { color: 'rgb(245,244,242)' },
    hover: { color: 'rgb(10,19,12)', transition: { duration: 0.35 } },
  };
  const textoSuave = {
    rest: { color: 'rgba(245,244,242,0.65)' },
    hover: { color: 'rgba(10,19,12,0.75)', transition: { duration: 0.35 } },
  };
  const foto = {
    rest: { opacity: 0.8, scale: 1 },
    hover: { opacity: 0.25, scale: 1.05, transition: { duration: 0.6 } },
  };

  return (
    <motion.a
      href="#contacto"
      initial="rest"
      animate="rest"
      whileHover={reduced ? undefined : 'hover'}
      whileFocus={reduced ? undefined : 'hover'}
      className="relative block overflow-hidden rounded-sm bg-ink"
    >
      <motion.div variants={reduced ? undefined : foto}>
        <Img src={servicio.img} alt={servicio.title} ratio="4/3" />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />

      {/* El panel que llena la tarjeta */}
      <motion.div
        variants={reduced ? undefined : panel}
        style={{ originY: 1 }}
        className="absolute inset-0 bg-lime"
        aria-hidden="true"
      />

      <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <span className="label bg-ink px-2 py-1 text-lime">{servicio.tag.toUpperCase()}</span>
          <motion.span
            variants={
              reduced
                ? undefined
                : {
                    rest: { backgroundColor: 'rgb(198,241,157)', color: 'rgb(10,19,12)', rotate: 0 },
                    hover: {
                      backgroundColor: 'rgb(10,19,12)',
                      color: 'rgb(198,241,157)',
                      rotate: -45,
                      transition: { duration: 0.4 },
                    },
                  }
            }
            className="grid size-12 shrink-0 place-items-center rounded-full bg-lime text-ink"
            aria-hidden="true"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.span>
        </div>

        <div>
          <motion.h3
            variants={reduced ? undefined : texto}
            className="display max-w-md text-[clamp(1.6rem,3vw,2.4rem)]"
          >
            {servicio.title}
          </motion.h3>
          <motion.p
            variants={reduced ? undefined : textoSuave}
            className="mt-4 max-w-md text-sm leading-relaxed"
          >
            {servicio.desc}
          </motion.p>
        </div>
      </div>
    </motion.a>
  );
}

/**
 * Los cuatro pasos, centrados, con imágenes flotando alrededor.
 * Cada imagen se mueve a distinta velocidad según su `depth`, lo que separa
 * los planos y da profundidad sin usar 3D.
 */
export function Process() {
  const ref = useRef(null);

  return (
    <section
      id="proceso"
      ref={ref}
      className="relative overflow-hidden bg-bone pb-[clamp(5rem,14vw,11rem)]"
    >
      {/* Imágenes flotantes: decorativas, detrás del contenido */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {FLOATERS.map((f, i) => (
          <Flotante key={i} data={f} contenedor={ref} indice={i} />
        ))}
      </div>

      <div className="relative z-10">
        <div className="shell text-center">
          <Reveal>
            <Label tone="ink">CÓMO TRABAJAMOS</Label>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="display mx-auto mt-6 max-w-3xl text-[clamp(2.2rem,6vw,4.5rem)] text-ink">
              Cuatro pasos, sin sorpresas
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mx-auto mt-6 max-w-xl text-lg text-ink/65 text-balance">
              Del primer análisis de suelo al segundo año de acompañamiento.
            </p>
          </Reveal>
        </div>

        <div className="shell mt-16 grid max-w-4xl gap-4 sm:grid-cols-2">
          {PROCESS.map((p, i) => (
            <Reveal key={p.n} delay={i * 0.08} className="h-full">
              <div className="flex h-full flex-col gap-4 rounded-sm border border-ink/10 bg-bone/80 p-7 text-left backdrop-blur-sm transition-colors duration-500 hover:border-ink/25 hover:bg-pale">
                <span className="display text-4xl text-ink/20">{p.n}</span>
                <h3 className="display text-xl text-ink">{p.title}</h3>
                <p className="text-sm leading-relaxed text-ink/60">{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Flotante({ data, contenedor, indice }) {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: contenedor, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [`${data.depth}%`, `${-data.depth}%`]);

  // Las dos últimas se ocultan en móvil: con seis, la pantalla pequeña se satura
  const visibilidad = indice >= 4 ? 'hidden lg:block' : '';

  return (
    <motion.div
      style={{ ...data.pos, ...(reduced ? {} : { y }) }}
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-5% 0px' }}
      transition={{ duration: 0.9, delay: indice * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className={`absolute ${data.size} ${visibilidad}`}
    >
      <motion.div
        animate={reduced ? {} : { y: [0, indice % 2 ? 10 : -10, 0] }}
        transition={{ duration: 6 + indice, repeat: Infinity, ease: 'easeInOut' }}
        className="grade overflow-hidden rounded-lg bg-moss shadow-[0_20px_45px_-25px_rgba(10,19,12,0.6)]"
        style={{ aspectRatio: indice % 3 === 0 ? '3/4' : '1/1' }}
      >
        <img src={data.img} alt="" loading="lazy" decoding="async" className="size-full object-cover" />
      </motion.div>
    </motion.div>
  );
}

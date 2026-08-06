import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { PRACTICES } from '../data/site';
import { Label, SectionHead } from './ui';

/**
 * Prácticas en secuencia de scroll.
 *
 * Cada una entra desde un lado alternando izquierda y derecha, y el
 * desplazamiento va ligado al scroll: la imagen sigue acercándose al centro
 * mientras la fila cruza la pantalla, en vez de saltar a su sitio de golpe.
 */
export default function Practices() {
  return (
    <section id="practicas" className="overflow-x-clip bg-ink py-[clamp(5rem,14vw,11rem)]">
      <div className="shell">
        <SectionHead label="TIPOS DE PRÁCTICA" title="Seis maneras de cultivar">
          Cada terreno pide una escuela distinta. Estas son las que trabajamos y en qué contexto
          tiene sentido cada una.
        </SectionHead>
      </div>

      <div className="mt-[clamp(3rem,8vw,7rem)] flex flex-col gap-[clamp(4rem,10vw,9rem)]">
        {PRACTICES.map((p, i) => (
          <Fila key={p.n} practica={p} lado={i % 2 === 0 ? 'izquierda' : 'derecha'} />
        ))}
      </div>
    </section>
  );
}

function Fila({ practica, lado }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const desdeIzquierda = lado === 'izquierda';

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  });

  // De fuera de pantalla a su sitio, gobernado por el scroll
  const x = useTransform(scrollYProgress, [0, 1], [desdeIzquierda ? '-60%' : '60%', '0%']);
  const opacity = useTransform(scrollYProgress, [0, 0.55], [0, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [desdeIzquierda ? -6 : 6, 0]);

  const estilo = reduced ? undefined : { x, opacity, rotate };

  return (
    <div
      ref={ref}
      className={`shell flex flex-col items-center gap-8 lg:gap-16 ${
        desdeIzquierda ? 'lg:flex-row' : 'lg:flex-row-reverse'
      }`}
    >
      {/* Imagen */}
      <motion.div style={estilo} className="w-full lg:w-[52%]">
        <div className="grade overflow-hidden rounded-sm bg-moss" style={{ aspectRatio: '4/3' }}>
          <img
            src={practica.img}
            alt={practica.title}
            loading="lazy"
            decoding="async"
            className="size-full object-cover"
          />
        </div>
      </motion.div>

      {/* Texto: entra por el lado contrario */}
      <motion.div
        initial={reduced ? false : { opacity: 0, x: desdeIzquierda ? 40 : -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-18% 0px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full lg:w-[48%]"
      >
        <div className="flex items-center gap-5">
          <span className="display text-[clamp(2.5rem,5vw,4rem)] text-lime/25">{practica.n}</span>
          <Label tone="bone">{practica.meta}</Label>
        </div>

        <h3 className="display mt-4 text-[clamp(1.9rem,4vw,3.2rem)] text-bone">{practica.title}</h3>
        <p className="mt-5 max-w-md text-base leading-relaxed text-bone/60">{practica.desc}</p>
      </motion.div>
    </div>
  );
}

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { MANIFESTO } from '../data/site';
import { Label } from './ui';

/**
 * Manifiesto centrado.
 *
 * Ocupa dos pantallas de alto y el texto queda fijo en el centro mientras
 * pasas por él: primero entra enfocándose, se sostiene, y al salir se
 * desenfoca y se desvanece. El desenfoque va ligado al scroll, no al tiempo,
 * así que el ritmo lo marca la persona que lee.
 */
export default function Manifesto() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  const opacity = useTransform(scrollYProgress, [0, 0.18, 0.62, 0.95], [0, 1, 1, 0]);
  const blurPx = useTransform(scrollYProgress, [0, 0.18, 0.62, 0.95], [14, 0, 0, 18]);
  const filter = useTransform(blurPx, (v) => `blur(${v}px)`);
  const scale = useTransform(scrollYProgress, [0, 0.18, 0.62, 0.95], [0.94, 1, 1, 1.06]);

  const estatico = { opacity: 1, filter: 'none', scale: 1 };

  return (
    <section id="vision" ref={ref} className="relative h-[200svh] bg-forest">
      {/* Se queda pegado en el centro de la pantalla mientras dura la sección */}
      <div className="sticky top-0 flex h-[100svh] items-center justify-center px-6">
        <motion.div
          style={reduced ? estatico : { opacity, filter, scale }}
          className="mx-auto max-w-5xl text-center"
        >
          <Label>NUESTRA VISIÓN</Label>
          <p className="display mt-8 text-[clamp(1.6rem,4.6vw,3.6rem)] text-bone text-balance">
            {MANIFESTO}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

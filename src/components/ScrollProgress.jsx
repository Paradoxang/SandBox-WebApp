import { motion, useScroll, useSpring, useReducedMotion } from 'motion/react';

/**
 * Línea de progreso de lectura, fija en el borde superior.
 * El muelle suaviza el avance para que no vaya a tirones con la rueda.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const reduced = useReducedMotion();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-lime"
      style={{ scaleX: reduced ? scrollYProgress : scaleX }}
    />
  );
}

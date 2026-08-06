import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';

/** Etiqueta mono entre corchetes — el tic visual del sistema. */
export function Label({ children, tone = 'lime', className = '' }) {
  const tones = {
    lime: 'text-lime',
    ink: 'text-ink/60',
    bone: 'text-bone/50',
    chip: 'bg-lime text-ink px-2 py-1',
  };
  return (
    <span className={`label ${tones[tone]} ${className}`}>
      {tone === 'chip' ? children : <>[{children}]</>}
    </span>
  );
}

/** Aparición al entrar en pantalla. Una sola vez, sin rebotes. */
export function Reveal({ children, delay = 0, y = 24, className = '', as: Tag = 'div' }) {
  const reduced = useReducedMotion();
  const MotionTag = motion[Tag] ?? motion.div;
  return (
    <MotionTag
      className={className}
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12% 0px' }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Revelado por máscara: el texto sube desde detrás de un borde recortado,
 * como una cortina que se levanta. Es el gesto de entrada de los titulares.
 */
export function MaskReveal({ children, delay = 0, className = '' }) {
  const reduced = useReducedMotion();
  if (reduced) return <span className={className}>{children}</span>;

  return (
    <span className="block overflow-hidden pb-[0.12em]">
      <motion.span
        className={`block ${className}`}
        initial={{ y: '105%' }}
        whileInView={{ y: '0%' }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/**
 * Texto que se revela palabra por palabra según avanza el scroll.
 * Es el efecto del bloque central de la referencia.
 */
export function ScrollWords({ text, className = '' }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'end 0.45'],
  });
  const words = text.split(' ');

  if (reduced) {
    return (
      <p ref={ref} className={className}>
        {text}
      </p>
    );
  }

  return (
    <p ref={ref} className={`flex flex-wrap ${className}`}>
      {words.map((word, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {word}
        </Word>
      ))}
    </p>
  );
}

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <span className="relative mr-[0.28em]">
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  );
}

/** Botón circular con flecha. Zona táctil de 48px asegurada. */
export function ArrowButton({ label, dark = false, className = '' }) {
  return (
    <motion.span
      aria-hidden="true"
      whileHover={{ scale: 1.12, rotate: -45 }}
      whileTap={{ scale: 0.94 }}
      transition={{ type: 'spring', stiffness: 380, damping: 20 }}
      className={`grid size-12 shrink-0 place-items-center rounded-full ${
        dark ? 'bg-ink text-lime' : 'bg-lime text-ink'
      } ${className}`}
      title={label}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </motion.span>
  );
}

/**
 * Imagen con espacio reservado (sin salto de layout) y grado de color verde.
 * `grade={false}` la deja con su color original.
 */
export function Img({ src, alt, className = '', ratio = '4/3', priority = false, grade = true }) {
  return (
    <div
      className={`overflow-hidden bg-moss ${grade ? 'grade' : ''} ${className}`}
      style={{ aspectRatio: ratio }}
    >
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        className="size-full object-cover"
      />
    </div>
  );
}

/**
 * Imagen con parallax: se desplaza más despacio que la página, de modo que
 * el encuadre cambia ligeramente mientras pasa por pantalla.
 */
export function ParallaxImg({ src, alt, ratio = '3/4', amount = 12, className = '' }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${amount}%`, `${amount}%`]);

  return (
    <div
      ref={ref}
      className={`grade overflow-hidden bg-moss ${className}`}
      style={{ aspectRatio: ratio }}
    >
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        style={reduced ? undefined : { y }}
        // Se amplía para que el desplazamiento no descubra los bordes
        className="size-full scale-[1.28] object-cover"
      />
    </div>
  );
}

/** Cabecera de sección reutilizable, con el titular revelado por máscara. */
export function SectionHead({ label, title, children, tone = 'bone', className = '' }) {
  const dark = tone === 'ink';
  return (
    <div className={`max-w-3xl ${className}`}>
      <Reveal>
        <Label tone={dark ? 'ink' : 'lime'}>{label}</Label>
      </Reveal>
      <h2
        className={`display mt-5 text-[clamp(2.2rem,6vw,4.5rem)] ${
          dark ? 'text-ink' : 'text-bone'
        }`}
      >
        <MaskReveal delay={0.05}>{title}</MaskReveal>
      </h2>
      {children && (
        <Reveal delay={0.18}>
          <div className={`mt-6 text-lg ${dark ? 'text-ink/70' : 'text-bone/60'}`}>{children}</div>
        </Reveal>
      )}
    </div>
  );
}

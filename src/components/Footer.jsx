import { motion } from 'motion/react';
import { Label, Reveal } from './ui';
import { CONTACT_LINKS } from '../data/site';
import { scrollToId } from '../hooks/useLenis';

const ICONOS = {
  whatsapp: (
    <path d="M17.5 14.4c-.3-.2-1.7-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.7 1-.9 1.2-.2.2-.3.2-.6.1-.3-.2-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.5-.5c.1-.2.2-.3.3-.5v-.5c-.1-.2-.7-1.6-.9-2.2-.2-.5-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.2-.6-.4z" />
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="3.8" />
      <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" stroke="none" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.7 2.5 15.3 0 18M12 3c-2.5 2.7-2.5 15.3 0 18" />
    </>
  ),
};

/** CTA final sobre imagen, como el cierre de la referencia. */
export function Contact() {
  return (
    <section id="contacto" className="relative overflow-hidden bg-ink">
      <div className="grade absolute inset-0" aria-hidden="true">
        <img
          src="https://images.unsplash.com/photo-1444858291040-58f756a3bdd6?auto=format&fit=crop&w=1600&q=70"
          alt=""
          loading="lazy"
          className="size-full object-cover opacity-25"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/70 to-ink" />

      <div className="shell relative py-[clamp(5rem,15vw,12rem)] text-center">
        <Reveal>
          <Label>HABLEMOS</Label>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="display mx-auto mt-8 max-w-4xl text-[clamp(2.4rem,7vw,5.5rem)] text-bone">
            Cuéntanos qué terreno tienes
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mx-auto mt-6 max-w-lg text-lg text-bone/60 text-balance">
            Primera visita y lectura del terreno sin coste. Respondemos en menos de 48 horas.
          </p>
        </Reveal>

        {/* Tres vías directas. Se llenan de lima al pasar el ratón, igual
            que las tarjetas de servicios. */}
        <div className="mx-auto mt-14 grid max-w-4xl gap-4 sm:grid-cols-3">
          {CONTACT_LINKS.map((c, i) => (
            <Reveal key={c.kind} delay={0.18 + i * 0.08} className="h-full">
              <motion.a
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                initial="rest"
                animate="rest"
                whileHover="hover"
                whileFocus="hover"
                whileTap={{ scale: 0.98 }}
                className="relative flex h-full min-h-[9.5rem] flex-col items-center justify-center gap-3 overflow-hidden rounded-sm border border-bone/20 px-5 py-8"
              >
                <motion.span
                  aria-hidden="true"
                  variants={{ rest: { scaleY: 0 }, hover: { scaleY: 1 } }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  style={{ originY: 1 }}
                  className="absolute inset-0 bg-lime"
                />

                <motion.span
                  variants={{ rest: { color: 'rgb(198,241,157)' }, hover: { color: 'rgb(10,19,12)' } }}
                  transition={{ duration: 0.3 }}
                  className="relative"
                >
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    {ICONOS[c.icon]}
                  </svg>
                </motion.span>

                <motion.span
                  variants={{ rest: { color: 'rgb(245,244,242)' }, hover: { color: 'rgb(10,19,12)' } }}
                  transition={{ duration: 0.3 }}
                  className="display relative text-xl"
                >
                  {c.kind}
                </motion.span>

                <motion.span
                  variants={{
                    rest: { color: 'rgba(245,244,242,0.55)' },
                    hover: { color: 'rgba(10,19,12,0.7)' },
                  }}
                  transition={{ duration: 0.3 }}
                  className="label relative"
                >
                  {c.handle}
                </motion.span>
              </motion.a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.45}>
          <p className="label mt-10 text-bone/40">
            Primera visita y lectura del terreno sin coste
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export default function Footer({ lenis }) {
  const cols = [
    {
      head: 'Estudio',
      links: ['Quiénes somos', 'Equipo', 'Contacto'],
    },
    {
      head: 'Servicios',
      links: ['Diseño y obra', 'Mantenimiento', 'Consultoría de suelo'],
    },
    {
      head: 'Recursos',
      links: ['Diario', 'Proyectos', 'Guía estacional'],
    },
    {
      head: 'Legal',
      links: ['Privacidad', 'Términos de uso'],
    },
  ];

  return (
    <footer className="relative overflow-hidden bg-forest pt-[clamp(3rem,8vw,6rem)]">
      {/* Wordmark gigante recortando la imagen — la firma visual del cierre */}
      <div className="shell">
        <h2
          className="display w-full text-center leading-[0.8] font-medium text-lime"
          style={{ fontSize: 'clamp(4rem, 21vw, 20rem)' }}
        >
          raíz&amp;hoja
        </h2>
      </div>

      <div className="shell mt-16 grid gap-12 border-t border-bone/10 pt-12 lg:grid-cols-[1fr_2fr]">
        <div>
          <p className="text-xl text-bone/80">
            Madrid, España
            <br />
            Valle del Jerte, Cáceres
          </p>
          <a
            href="mailto:hola@raizyhoja.es"
            className="label tap mt-4 text-lime transition-opacity hover:opacity-70"
          >
            hola@raizyhoja.es
          </a>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {cols.map((c) => (
            <div key={c.head}>
              <Label tone="bone">{c.head.toUpperCase()}</Label>
              <ul className="mt-5 space-y-3">
                {c.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#contacto"
                      className="label tap text-bone/70 transition-colors hover:text-lime"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="shell mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-bone/10 py-8">
        <Label tone="bone">© 2026 RAÍZ &amp; HOJA</Label>

        {/* Ruta al index explícita: en dev, "/demo-mala/" lo captura el
            fallback SPA de Vite y acabarías viendo esta misma página. */}
        <a
          href="/demo-mala/index.html"
          className="label tap text-bone/40 underline decoration-bone/20 underline-offset-4 transition-colors hover:text-lime"
        >
          Ver la demo de mal responsive ↗
        </a>

        <button
          type="button"
          onClick={() => scrollToId('#inicio', lenis)}
          className="label tap cursor-pointer text-bone/60 transition-colors hover:text-lime"
        >
          Volver arriba ↑
        </button>
      </div>
    </footer>
  );
}

import { useState } from 'react';
import { motion } from 'motion/react';
import { Label, Reveal } from './ui';
import { scrollToId } from '../hooks/useLenis';

/** CTA final sobre imagen, como el cierre de la referencia. */
export function Contact() {
  const [sent, setSent] = useState(false);

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

        <Reveal delay={0.18}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.currentTarget.reset();
              setSent(true);
            }}
            className="mx-auto mt-12 flex max-w-xl flex-col gap-3 sm:flex-row"
          >
            <label htmlFor="email" className="sr-only">
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              name="email"
              required
              placeholder="tu@correo.com"
              className="min-h-14 flex-1 rounded-full border border-bone/25 bg-bone/5 px-6 text-bone placeholder:text-bone/35 focus:border-lime focus:outline-none"
            />
            <button
              type="submit"
              className="label min-h-14 cursor-pointer rounded-full bg-lime px-8 text-ink transition-transform duration-300 hover:scale-105 active:scale-100"
            >
              Solicitar visita
            </button>
          </form>
        </Reveal>

        {/* Confirmación junto al formulario, no perdida arriba del todo */}
        {sent && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            role="status"
            className="label mt-6 text-lime"
          >
            Recibido. Te escribimos en menos de 48 h.
          </motion.p>
        )}
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

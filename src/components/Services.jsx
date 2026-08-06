import { motion } from 'motion/react';
import { SERVICES, PROCESS } from '../data/site';
import { ArrowButton, Img, Label, Reveal, SectionHead } from './ui';

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
              <motion.a
                href="#contacto"
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                className="group relative block overflow-hidden rounded-sm bg-ink"
              >
                <Img
                  src={s.img}
                  alt={s.title}
                  ratio="4/3"
                  className="opacity-80 transition-all duration-700 group-hover:scale-[1.04] group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />

                <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <Label tone="chip">{s.tag.toUpperCase()}</Label>
                    <ArrowButton label={`Ver ${s.tag}`} />
                  </div>
                  <div>
                    <h3 className="display max-w-md text-[clamp(1.6rem,3vw,2.4rem)] text-bone">
                      {s.title}
                    </h3>
                    <p className="mt-4 max-w-md text-sm leading-relaxed text-bone/65">{s.desc}</p>
                  </div>
                </div>
              </motion.a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Los cuatro pasos del encargo. Numerados, como el 01–05 de la referencia. */
export function Process() {
  return (
    <section id="proceso" className="bg-bone pb-[clamp(5rem,14vw,11rem)]">
      <div className="shell">
        <SectionHead label="CÓMO TRABAJAMOS" title="Cuatro pasos, sin sorpresas" tone="ink" />

        <div className="mt-14 grid gap-px overflow-hidden rounded-sm bg-ink/10 md:grid-cols-2 xl:grid-cols-4">
          {PROCESS.map((p, i) => (
            <Reveal key={p.n} delay={i * 0.08} className="h-full">
              <div className="flex h-full flex-col gap-5 bg-bone p-7 transition-colors duration-500 hover:bg-pale">
                <span className="display text-5xl text-ink/20">{p.n}</span>
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

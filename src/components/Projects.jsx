import { PROJECTS, JOURNAL } from '../data/site';
import { ArrowButton, Label, ParallaxImg, Reveal, SectionHead } from './ui';

/**
 * Carrusel de proyectos.
 *
 * Usa scroll nativo con snap en lugar de arrastre por JS: funciona con dedo,
 * con rueda, con trackpad y —lo que casi nunca se cubre— con teclado, porque
 * cada tarjeta es enfocable y el navegador la trae a la vista sola.
 */
export default function Projects() {
  return (
    <section id="proyectos" className="bg-ink py-[clamp(5rem,14vw,11rem)]">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHead label="PROYECTOS" title="Obra construida">
            Cinco encargos recientes. Publicamos superficie, especies y consumo real de agua en cada
            ficha.
          </SectionHead>
          <Label tone="bone" className="hidden lg:block">
            ← Desliza →
          </Label>
        </div>
      </div>

      <div className="hide-scrollbar mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto px-[clamp(1.25rem,5vw,5rem)] pb-4">
        {PROJECTS.map((p, i) => (
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

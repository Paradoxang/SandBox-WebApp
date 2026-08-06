import { MANIFESTO, STATS } from '../data/site';
import { Label, Reveal, ScrollWords } from './ui';

export default function Manifesto() {
  return (
    <section className="bg-forest py-[clamp(5rem,14vw,11rem)]">
      <div className="shell">
        <Reveal>
          <Label>NUESTRA VISIÓN</Label>
        </Reveal>

        {/* El texto se ilumina palabra a palabra conforme bajas */}
        <ScrollWords
          text={MANIFESTO}
          className="display mt-10 max-w-5xl text-[clamp(1.6rem,4.4vw,3.4rem)] text-bone"
        />

        <div className="mt-[clamp(3.5rem,8vw,7rem)] grid grid-cols-2 gap-y-10 border-t border-bone/10 pt-12 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="pr-4">
              <p className="display text-[clamp(2.2rem,5vw,3.6rem)] text-lime">{s.value}</p>
              <p className="label mt-3 text-bone/50">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

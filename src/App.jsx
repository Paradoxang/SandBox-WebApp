import { useMemo } from 'react';
import { HERO_IMG, HERO_SRCSET, HERO_SIZES, PRACTICES, SERVICES, PROJECTS } from './data/site';
import { usePreload } from './hooks/usePreload';
import { useLenis } from './hooks/useLenis';

import Preloader from './components/Preloader';
import ScrollProgress from './components/ScrollProgress';
import Nav from './components/Nav';
import Hero, { Ticker } from './components/Hero';
import Manifesto from './components/Manifesto';
import Practices from './components/Practices';
import Services, { Process } from './components/Services';
import Projects, { Journal } from './components/Projects';
import Footer, { Contact } from './components/Footer';

export default function App() {
  // Solo lo que se ve pronto. Precargar el sitio entero retrasaría la entrada
  // en lugar de acelerarla.
  const critical = useMemo(
    () => [
      { src: HERO_IMG, srcset: HERO_SRCSET, sizes: HERO_SIZES },
      ...PRACTICES.slice(0, 2).map((p) => p.img),
      ...SERVICES.map((s) => s.img),
      PROJECTS[0].img,
    ],
    []
  );

  const { progress, done } = usePreload(critical);
  const lenis = useLenis(done); // el scroll queda bloqueado hasta que entra

  return (
    <>
      <Preloader progress={progress} done={done} />

      <a
        href="#practicas"
        className="label sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[110] focus:rounded-full focus:bg-lime focus:px-5 focus:py-3 focus:text-ink"
      >
        Saltar al contenido
      </a>

      {done && <ScrollProgress />}
      <Nav lenis={lenis} />

      <main>
        <Hero ready={done} />
        <Ticker />
        <Manifesto />
        <Practices />
        <Services />
        <Process />
        <Projects />
        <Journal />
        <Contact />
      </main>

      <Footer lenis={lenis} />
    </>
  );
}

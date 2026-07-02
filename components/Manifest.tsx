import { Container } from "./ui";
import { Reveal } from "./Reveal";

const facts = [
  { value: "od 500 zł", label: "cena strony" },
  { value: "do 24 h", label: "gotowy projekt" },
  { value: "0 zł", label: "za obejrzenie projektu" },
];

export function Manifest() {
  return (
    <section id="dlaczego" className="section scroll-mt-24">
      <Container>
        <div className="mx-auto max-w-[720px] text-center">
          <Reveal>
            <h2 className="type-h2 text-ink">Dlaczego za darmo?</h2>
          </Reveal>
          <Reveal delay={90}>
            <p className="type-lead mx-auto mt-9 max-w-[54ch] text-ink-2">
              Bo trudno zaufać komuś, kogo się nie zna. Więc nie prosimy o
              zaufanie z góry. Robimy stronę, dajemy ci ją obejrzeć i dopiero
              wtedy pytamy o zdanie.
            </p>
          </Reveal>
          <Reveal delay={160}>
            <p className="type-lead mx-auto mt-5 max-w-[54ch] text-ink-2">
              Płacisz tylko, jeśli chcesz zatrzymać efekt. Bez umowy na start,
              bez zaliczki, bez druku małą czcionką. Całe ryzyko jest po naszej
              stronie i tak ma być.
            </p>
          </Reveal>

          <Reveal delay={220}>
            <div className="mt-16 grid divide-y divide-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {facts.map((fact) => (
                <div key={fact.label} className="py-5 sm:px-6 sm:py-0">
                  <p className="font-mono text-xl font-medium tracking-tight text-ink sm:text-2xl">
                    {fact.value}
                  </p>
                  <p className="mt-1 text-sm text-ink-2">{fact.label}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={280}>
            <p className="mx-auto mt-14 max-w-[58ch] text-base leading-relaxed text-ink-2">
              Zentiq to dwóch programistów piszących kod od kilkunastu lat.
              Własne narzędzia i zautomatyzowane procesy pozwalają nam pracować
              szybko i tanio, bez chodzenia na skróty. Dlatego stać nas na taki
              układ: ty nie płacisz z góry, my nie tracimy tygodni.
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

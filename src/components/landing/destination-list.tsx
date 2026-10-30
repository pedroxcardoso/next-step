"use client";

import { motion } from "framer-motion";
import { DESTINOS } from "@/lib/data";
import { fmtBRL, photo, rangeK } from "@/lib/format";
import { asset } from "@/lib/utils";
import { SplitFlap } from "@/components/shared/split-flap";
import { KineticHeading } from "@/components/shared/kinetic-heading";

export function DestinationList({ open, onToggle }: { open: string | null; onToggle: (id: string, isOpen: boolean) => void }) {
  return (
    <section className="sec" id="destinos" aria-labelledby="h-dest">
      <div className="wrap">
        <div className="dest-intro">
          <KineticHeading id="h-dest" text="Dez destinos, lado a lado" />
          <p className="lede">Custo para começar, custo mensal e salário mínimo, já em reais. Toque num país para ver as cidades.</p>
        </div>
        <div className="dest">
          <div className="dest__cols" aria-hidden="true"><span /><span>País</span><span>Para começar</span><span>Custo mensal</span><span>Salário mínimo</span><span /></div>
          {DESTINOS.map((d, i) => (
            <motion.details
              key={d.id} id={`dest-${d.id}`} open={open === d.id}
              style={{ ["--c" as string]: d.cor }}
              onToggle={(e) => onToggle(d.id, (e.currentTarget as HTMLDetailsElement).open)}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: (i % 3) * 0.07 }}
            >
              <summary>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={asset(photo(d.cidades[0].id))} width={1200} height={800} alt="" loading="lazy" />
                <span className="dest__name"><span className="dest__swatch" aria-hidden="true" />{d.nome}<small>{d.cidades.map((c) => c.nome).join(", ")}</small></span>
                <span className="dest__val keep"><SplitFlap text={rangeK(d.inicial)} delay={i * 40} /><small>para começar</small></span>
                <span className="dest__val"><SplitFlap text={rangeK(d.mensal)} delay={i * 40 + 60} /><small>por mês</small></span>
                <span className="dest__val"><SplitFlap text={fmtBRL(d.salMin)} delay={i * 40 + 120} /><small>por mês</small></span>
                <span className="dest__chev" aria-hidden="true"><svg viewBox="0 0 24 24" width="18" height="18"><path fill="none" stroke="currentColor" strokeWidth="2.4" d="M12 5v14M5 12h14" /></svg></span>
              </summary>
              <div className="dest__body">
                {d.cidades.map((c) => (
                  <figure key={c.id}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={asset(photo(c.id))} width={1200} height={800} alt={`Vista de ${c.nome}`} loading="lazy" />
                    <figcaption><b>{c.nome}</b>{c.desc}</figcaption>
                  </figure>
                ))}
                <p className="dest__lang"><b>Idioma:</b> {d.idioma}</p>
              </div>
            </motion.details>
          ))}
        </div>
      </div>
    </section>
  );
}

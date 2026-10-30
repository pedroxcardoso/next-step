"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { DESTINOS } from "@/lib/data";
import { KineticHeading } from "@/components/shared/kinetic-heading";

const VOZES = DESTINOS.flatMap((d) => d.relatos.map((r) => ({ ...r, pais: d.nome, cor: d.cor })));

export function Voices() {
  const [[i, dir], set] = useState<[number, number]>([0, 1]);
  const go = (k: number) => set(([cur]) => [(cur + k + VOZES.length) % VOZES.length, k]);
  const v = VOZES[i];
  return (
    <section className="voices" id="relatos" aria-labelledby="h-voices">
      <div className="wrap voices__grid">
        <div>
          <KineticHeading id="h-voices" text="Quem já foi conta como é" />
          <p className="voices__note">Relatos públicos de brasileiros em reportagens e blogs, resumidos e sem nomes.</p>
        </div>
        <div>
          <div className="relative overflow-hidden" aria-live="polite">
            <AnimatePresence mode="wait" custom={dir} initial={false}>
              <motion.div
                key={i} custom={dir}
                initial={{ opacity: 0, x: dir * 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: dir * -60 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.25}
                onDragEnd={(_, info) => { if (info.offset.x < -70) go(1); else if (info.offset.x > 70) go(-1); }}
              >
                <blockquote>“{v.texto}”</blockquote>
                <div className="voices__meta">
                  <b>{v.perfil}</b>
                  <span className="vdot" style={{ ["--c" as string]: v.cor }}>{v.pais}</span>
                  <a href={v.url} target="_blank" rel="noopener">Fonte: {v.veiculo}</a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="voices__ctrl">
            <button className="icon-btn" type="button" aria-label="Relato anterior" onClick={() => go(-1)}><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" strokeWidth="2.4" d="M15 5l-7 7 7 7" /></svg></button>
            <button className="icon-btn" type="button" aria-label="Próximo relato" onClick={() => go(1)}><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" strokeWidth="2.4" d="M9 5l7 7-7 7" /></svg></button>
            <span className="voices__count">Relato {i + 1} de {VOZES.length}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

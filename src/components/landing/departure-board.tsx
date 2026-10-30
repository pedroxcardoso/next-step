"use client";

import { useEffect, useState } from "react";
import { BOARD } from "./board-data";
import { SplitFlap } from "@/components/shared/split-flap";
import { KineticHeading } from "@/components/shared/kinetic-heading";
import { useMotionPref } from "@/components/providers";

export function DepartureBoard() {
  const { reduced } = useMotionPref();
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    if (reduced) return;
    const iv = setInterval(() => { if (!document.hidden) setOffset((o) => (o + 1) % BOARD.length); }, 6500);
    return () => clearInterval(iv);
  }, [reduced]);
  const rows = Array.from({ length: 6 }, (_, r) => BOARD[(r + offset) % BOARD.length]);

  return (
    <section className="boardsec on-board" id="como" aria-labelledby="h-board">
      <div className="wrap">
        <div className="boardsec__head">
          <KineticHeading id="h-board" text="Partidas de hoje" />
          <ol className="steps3">
            <li><b>Check-in</b> Você responde 11 perguntas, uma por tela.</li>
            <li><b>Voo</b> Cruzamos seu perfil com 10 países.</li>
            <li><b>Desembarque</b> 3 destinos com custos, vistos e passo a passo.</li>
          </ol>
        </div>
        <div className="board" role="table" aria-label="Painel de partidas com destinos do Next Step">
          <div className="board__head" role="row">
            <span role="columnheader">Hora</span><span role="columnheader">Destino</span>
            <span role="columnheader" className="c-pais">País</span><span role="columnheader" className="c-custo">Para começar</span>
            <span role="columnheader" className="c-gate">Port.</span><span role="columnheader">Situação</span>
          </div>
          <div className="board__rows" role="rowgroup">
            {rows.map((d, r) => (
              <div className="board__row" role="row" key={r}>
                <span role="cell"><SplitFlap text={d.hora} delay={r * 90} onView={false} /></span>
                <span role="cell"><SplitFlap text={d.destino} delay={r * 90 + 40} onView={false} /></span>
                <span role="cell" className="c-pais"><SplitFlap text={d.pais} delay={r * 90 + 80} onView={false} /></span>
                <span role="cell" className="c-custo"><SplitFlap text={d.custo} delay={r * 90 + 120} onView={false} /></span>
                <span role="cell" className="c-gate"><SplitFlap text={d.gate} delay={r * 90 + 160} onView={false} /></span>
                <span role="cell" className={d.status[1]}><SplitFlap text={d.status[0].toUpperCase()} delay={r * 90 + 200} onView={false} /></span>
              </div>
            ))}
          </div>
          <p className="board__note">Saindo de Guarulhos. Custo para os 3 primeiros meses, em reais, pesquisado em outubro de 2026.</p>
        </div>
      </div>
    </section>
  );
}

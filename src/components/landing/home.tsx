"use client";

import { useEffect, useState } from "react";
import PerspectiveTunnelHero, { type TunnelItem } from "@/components/ui/perspective-tunnel-hero";
import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";
import { DESTINOS } from "@/lib/data";
import { photo } from "@/lib/format";
import { asset } from "@/lib/utils";
import { PlaneIcon } from "@/components/shared/plane";
import { SplitFlap } from "@/components/shared/split-flap";
import { CountUp } from "@/components/shared/count-up";
import { useMotionPref } from "@/components/providers";
import { Ticker } from "./ticker";
import { Orbit } from "./orbit";
import { DepartureBoard } from "./departure-board";
import { ParallaxCities } from "./parallax-cities";
import { SobraChart } from "./sobra-chart";
import { DestinationList } from "./destination-list";
import { Voices } from "./voices";
import { FinalCta } from "./chrome";

const TUNNEL: { item: TunnelItem; id: string }[] = [
  ...DESTINOS.map((d) => ({ id: d.id, item: { src: asset(photo(d.cidades[0].id)), title: d.cidades[0].nome, subtitle: d.nome, color: d.cor } })),
  ...DESTINOS.map((d) => ({ id: d.id, item: { src: asset(photo(d.cidades[1].id)), title: d.cidades[1].nome, subtitle: d.nome, color: d.cor } })),
];

export function Home({ onStart, openDest, setOpenDest, onOpen }: {
  onStart: () => void; openDest: string | null; setOpenDest: (id: string | null) => void; onOpen: (id: string) => void;
}) {
  const { reduced } = useMotionPref();
  const [k, setK] = useState(0);
  useEffect(() => {
    if (reduced) return;
    const iv = setInterval(() => { if (!document.hidden) setK((x) => (x + 1) % DESTINOS.length); }, 2200);
    return () => clearInterval(iv);
  }, [reduced]);

  return (
    <div>
      <PerspectiveTunnelHero items={TUNNEL.map((t) => t.item)} onItemClick={(i) => onOpen(TUNNEL[i].id)} labelledBy="h-hero">
        <div className="hpass">
          <div className="hpass__route"><span>GRU</span><PlaneIcon /><span className="hpass__to"><SplitFlap text={DESTINOS[k].iata} onView={false} /></span></div>
          <h1 id="h-hero">Para onde você vai?</h1>
          <p>11 perguntas rápidas e você vê os 3 países que combinam com você, com custos, salários e vistos.</p>
          <div className="hpass__actions">
            <button className="btn" type="button" onClick={onStart}>Fazer meu check-in <span className="arrow" aria-hidden="true">→</span></button>
            <a className="btn btn--ghost" href="#destinos" onClick={(e) => { e.preventDefault(); onOpen(""); }}>Ver destinos</a>
          </div>
        </div>
      </PerspectiveTunnelHero>

      <Ticker />

      <ScrollExpandMedia
        id="expand"
        mediaSrc={asset(photo("toquio"))}
        mediaAlt="Tóquio à noite, com a Torre de Tóquio iluminada"
        title="O mundo te espera"
        splitAt={2}
        scrollToExpand="Continue rolando"
      >
        <div className="grid grid-cols-4 gap-3 text-white max-md:grid-cols-2">
          {[[10, "países pesquisados"], [30, "cidades com fotos"], [30, "relatos de brasileiros"], [40, "rotas de visto"]].map(([n, t]) => (
            <div key={t as string} className="rounded-2xl bg-night/80 px-5 py-4 max-md:px-3.5 max-md:py-3">
              <CountUp values={[n as number]} format={(v) => String(v[0])} className="block text-[clamp(40px,5vw,80px)] font-extrabold leading-none tracking-[-0.03em] text-sign tabular-nums" />
              <span className="text-base font-semibold">{t}</span>
            </div>
          ))}
        </div>
      </ScrollExpandMedia>

      <Orbit onOpen={onOpen} />
      <DepartureBoard />
      <ParallaxCities />
      <SobraChart />
      <DestinationList open={openDest} onToggle={(id, isOpen) => setOpenDest(isOpen ? id : openDest === id ? null : openDest)} />
      <Voices />
      <FinalCta onStart={onStart} />
    </div>
  );
}

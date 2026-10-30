"use client";

import { ParallaxComponent, type ParallaxLayer } from "@/components/ui/parallax-scrolling";
import { DESTINOS } from "@/lib/data";
import { photo } from "@/lib/format";
import { asset } from "@/lib/utils";
import { KineticHeading } from "@/components/shared/kinetic-heading";

const LAYERS: ParallaxLayer[] = [
  { layer: "1", yPercent: 36 },
  { layer: "2", yPercent: -24 },
  { layer: "3", yPercent: 60 },
  { layer: "4", yPercent: -10 },
  { layer: "line-a", xPercent: -30 },
  { layer: "line-b", xPercent: 30 },
];

const pics = DESTINOS.flatMap((d) => [d.cidades[1], d.cidades[2]].map((c) => ({ c, d })));

export function ParallaxCities() {
  const col = (from: number, layer: string, extra = "") => (
    <div className={`para__col ${extra}`} data-parallax-layer={layer}>
      {pics.slice(from, from + 4).map(({ c, d }) => (
        <figure key={c.id} style={{ ["--c" as string]: d.cor }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset(photo(c.id))} width={1200} height={800} alt={`Vista de ${c.nome}`} loading="lazy" />
          <figcaption>{c.nome}<small>{d.nome}</small></figcaption>
        </figure>
      ))}
    </div>
  );
  return (
    <ParallaxComponent layers={LAYERS} className="para" id="para" labelledBy="h-para">
      <div className="para__words" aria-hidden="true">
        <p className="para__line" data-parallax-layer="line-a">Lisboa · Dublin · Toronto · Sydney · Berlim · Madri · Auckland · Miami · Tóquio · Amsterdã ·</p>
        <p className="para__line" data-parallax-layer="line-b">Porto · Cork · Vancouver · Melbourne · Munique · Barcelona · Wellington · Orlando · Nagoya · Roterdã ·</p>
      </div>
      <div className="wrap para__grid">
        {col(0, "1")}
        {col(4, "2")}
        <div className="para__mid" data-parallax-layer="4">
          <KineticHeading id="h-para" text="Trinta cidades. Uma é sua." />
          <p>Fotos reais de cada cidade que mais recebe brasileiros, com custo de aluguel e o que esperar do dia a dia.</p>
        </div>
        {col(8, "3", "para__col--3")}
      </div>
    </ParallaxComponent>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import type { Destino } from "@/lib/data";
import { GRU, createGlobe, loadCountries, type GlobeAny } from "@/lib/geo";
import { earthUrl, mapsUrl } from "@/lib/format";
import { useMotionPref } from "@/components/providers";

/** 3D globe of the selected country: route from São Paulo, city labels, fly-to per city. */
export function ResultGlobe({ d, city, onCity }: { d: Destino; city: number; onCity: (i: number) => void }) {
  const host = useRef<HTMLDivElement>(null);
  const g = useRef<GlobeAny>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const { reduced } = useMotionPref();

  useEffect(() => {
    const el = host.current; if (!el) return;
    let alive = true, ro: ResizeObserver | null = null, vis: IntersectionObserver | null = null;
    Promise.all([loadCountries(), createGlobe(el)]).then(([countries, globe]) => {
      if (!alive) { globe._destructor?.(); return; }
      globe.backgroundColor("rgba(0,0,0,0)").showAtmosphere(false)
        .hexPolygonsData(countries).hexPolygonResolution(3).hexPolygonMargin(0.42).hexPolygonUseDots(true)
        .arcStroke(0.55).arcDashLength(0.45).arcDashGap(0.12).arcDashInitialGap(1).arcDashAnimateTime(reduced ? 0 : 2600).arcAltitudeAutoScale(0.42)
        .labelLat("lat").labelLng("lng").labelText("nome").labelResolution(2).labelAltitude(0.004)
        .polygonCapColor(() => "rgba(255,255,255,0.08)").polygonSideColor(() => "rgba(0,0,0,0)").polygonAltitude(0.004)
        .onLabelClick((l: { i?: number }) => { if (l.i != null) onCity(l.i); });
      globe.globeMaterial().color?.set("#13284c");
      globe.controls().enableDamping = !reduced;
      g.current = globe;
      (globe as GlobeAny).__countries = countries;
      const size = () => globe.width(el.clientWidth).height(el.clientHeight);
      ro = new ResizeObserver(size); ro.observe(el); size();
      vis = new IntersectionObserver((v) => (v[0].isIntersecting ? globe.resumeAnimation() : globe.pauseAnimation()));
      vis.observe(el);
      setReady(true);
    }).catch(() => setFailed(true));
    return () => { alive = false; ro?.disconnect(); vis?.disconnect(); g.current?._destructor?.(); g.current = null; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const globe = g.current; if (!globe || !ready) return;
    const c = d.cidades[Math.max(0, city)];
    const scale = city < 0 ? 1 : 0.5;
    globe.hexPolygonColor((f: { id: string }) => (f.id === d.iso ? d.cor : f.id === "076" ? "#ffffff" : "rgba(255,255,255,0.26)"))
      .polygonsData(globe.__countries.filter((f: { id: string }) => f.id === d.iso)).polygonStrokeColor(() => d.cor)
      .arcColor(() => ["#ffffff", d.cor]).arcsData([{ startLat: GRU.lat, startLng: GRU.lng, endLat: c.lat, endLng: c.lng }])
      .labelColor((l: { big: boolean }) => (l.big ? d.cor : "#ffffff"))
      .labelSize((l: { big: boolean }) => scale * (l.big ? 1.25 : 0.9)).labelDotRadius((l: { big: boolean }) => scale * (l.big ? 0.45 : 0.32))
      .labelsData([{ lat: GRU.lat, lng: GRU.lng, nome: "São Paulo", big: false }, ...d.cidades.map((x, i) => ({ lat: x.lat, lng: x.lng, nome: x.nome, big: i === Math.max(0, city), i }))]);
    if (city < 0) {
      const dLng = ((c.lng - GRU.lng + 540) % 360) - 180;
      globe.pointOfView({ lat: (GRU.lat + c.lat) / 2, lng: GRU.lng + dLng / 2, altitude: Math.abs(dLng) > 120 ? 2.6 : 2.1 }, reduced ? 0 : 1600);
    } else globe.pointOfView({ lat: c.lat, lng: c.lng, altitude: 0.85 }, reduced ? 0 : 1500);
  }, [d, city, ready, reduced]);

  const c = d.cidades[Math.max(0, city)];
  return (
    <div className="stage__globe on-board" aria-label="Globo 3D">
      <div className="globe" data-lenis-prevent>
        {/* globe.gl owns this node's children; React never renders inside it */}
        <div ref={host} className="absolute inset-0" />
        {!ready && <p className="globe__fallback">{failed ? "O globo 3D não carregou. Use os atalhos abaixo." : "Carregando o globo…"}</p>}
      </div>
      <div className="globe__bar">
        <div className="globe__cities" role="group" aria-label="Voar até a cidade">
          {d.cidades.map((x, i) => <button key={x.id} className="chip" type="button" aria-pressed={i === city} onClick={() => onCity(i)}>{x.nome}</button>)}
          <button className="chip" type="button" aria-pressed={city === -1} onClick={() => onCity(-1)}>Rota inteira</button>
        </div>
        <div className="globe__links">
          <a href={mapsUrl(c.nome, d.nome)} target="_blank" rel="noopener">{c.nome} no Google Maps</a>
          <a href={earthUrl(c.lat, c.lng)} target="_blank" rel="noopener">{c.nome} em 3D no Google Earth</a>
        </div>
        <p className="globe__hint">Arraste para girar, use a roda ou o gesto de pinça para aproximar.</p>
      </div>
    </div>
  );
}

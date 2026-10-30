"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { DESTINOS } from "@/lib/data";
import { fmtBRL, inkFor, photo, rangeK } from "@/lib/format";
import { asset } from "@/lib/utils";
import { GRU, createGlobe, loadCountries, type GlobeAny } from "@/lib/geo";
import { SplitFlap } from "@/components/shared/split-flap";
import { KineticHeading } from "@/components/shared/kinetic-heading";
import { useMotionPref } from "@/components/providers";

const spot = (i: number) => ({ lat: DESTINOS[i].cidades[0].lat, lng: DESTINOS[i].cidades[0].lng });
const smooth = (t: number) => t * t * (3 - 2 * t);
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/** "Uma volta ao mundo": a globe that turns with the scroll and stops at each destination. */
export function Orbit({ onOpen }: { onOpen: (id: string) => void }) {
  const ref = useRef<HTMLElement>(null);
  const host = useRef<HTMLDivElement>(null);
  const globe = useRef<GlobeAny>(null);
  const { reduced } = useMotionPref();
  const [cur, setCur] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 68px", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 55, damping: 22, restDelta: 0.0002 });

  const view = (v: number) => {
    const N = DESTINOS.length, u = v * (N - 1), i = Math.min(N - 2, Math.floor(u));
    const f = smooth(clamp01((u - i - 0.15) / 0.85));
    const a = spot(i), b = spot(i + 1);
    let dl = b.lng - a.lng; if (dl > 180) dl -= 360; if (dl < -180) dl += 360;
    const next = f < 0.5 ? i : i + 1;
    setCur((c) => (c === next ? c : next));
    globe.current?.pointOfView({ lat: a.lat + (b.lat - a.lat) * f - 8, lng: a.lng + dl * f - 18, altitude: innerWidth < 860 ? 2.5 : 2.25 }, 0);
  };
  useMotionValueEvent(p, "change", (v) => { if (!reduced) view(v); });

  useEffect(() => {
    const el = host.current; if (!el) return;
    let ro: ResizeObserver | null = null, vis: IntersectionObserver | null = null, alive = true;
    const io = new IntersectionObserver(async (es) => {
      if (!es[0].isIntersecting || globe.current) return;
      io.disconnect();
      const [countries, g] = await Promise.all([loadCountries(), createGlobe(el)]);
      if (!alive) { g._destructor?.(); return; }
      g.backgroundColor("rgba(0,0,0,0)").showAtmosphere(false)
        .hexPolygonsData(countries).hexPolygonResolution(3).hexPolygonMargin(0.4).hexPolygonUseDots(true)
        .hexPolygonColor(() => "rgba(255,255,255,0.26)")
        .pointsData(DESTINOS.map((d, i) => ({ ...spot(i), c: d.cor }))).pointColor("c").pointAltitude(0.02).pointRadius(0.9)
        .arcColor((d: { c: string }) => ["#ffffff", d.c]).arcStroke(0.7).arcDashLength(0.5).arcDashGap(0.15)
        .arcDashAnimateTime(reduced ? 0 : 2000).arcAltitudeAutoScale(0.45);
      g.globeMaterial().color?.set("#13284c");
      g.controls().enabled = false;
      globe.current = g;
      const size = () => g.width(el.clientWidth).height(el.clientHeight);
      ro = new ResizeObserver(size); ro.observe(el); size();
      // Stop rendering WebGL frames while the planet is off screen (keeps scrolling smooth elsewhere).
      vis = new IntersectionObserver((v) => (v[0].isIntersecting ? g.resumeAnimation() : g.pauseAnimation()));
      vis.observe(el);
      view(p.get());
    }, { rootMargin: "900px 0px" });
    io.observe(el);
    return () => { alive = false; io.disconnect(); ro?.disconnect(); vis?.disconnect(); globe.current?._destructor?.(); globe.current = null; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const g = globe.current; if (!g) return;
    const d = DESTINOS[cur], s = spot(cur);
    g.hexPolygonColor((f: { id: string }) => (f.id === d.iso ? d.cor : f.id === "076" ? "#ffffff" : "rgba(255,255,255,0.26)"));
    g.arcsData([{ startLat: GRU.lat, startLng: GRU.lng, endLat: s.lat, endLng: s.lng, c: d.cor }]);
  }, [cur]);

  const d = DESTINOS[cur];
  return (
    <section ref={ref} className="orbit" id="orbit" aria-labelledby="h-orbit">
      <div className="orbit__stage">
        <div className="orbit__globe" ref={host} aria-hidden="true" />
        <div className="orbit__side">
          <KineticHeading id="h-orbit" text="Uma volta ao mundo" />
          <p className="orbit__lede">Role para girar o planeta. Cada parada mostra um destino saindo de São Paulo.</p>
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.article
              key={d.id}
              className="ocard"
              aria-live="polite"
              initial={{ opacity: 0, y: 24, rotate: -1.5, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.98 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={asset(photo(d.cidades[0].id))} width={1200} height={800} alt={`Vista de ${d.cidades[0].nome}`} />
              <div className="ocard__body">
                <div className="ocard__route">GRU <span aria-hidden="true">→</span>{" "}
                  <b style={{ ["--oc" as string]: d.cor, ["--oink" as string]: inkFor(d.cor) }}><SplitFlap text={d.iata} onView={false} /></b>
                </div>
                <h3>{d.nome}</h3>
                <dl className="ocard__facts">
                  <div><dt>Para começar</dt><dd>{rangeK(d.inicial)}</dd></div>
                  <div><dt>Salário médio</dt><dd>{fmtBRL(d.salMedio)}</dd></div>
                  <div><dt>Idioma</dt><dd>{d.idioma.split(".")[0]}</dd></div>
                </dl>
                <button className="btn btn--small" type="button" onClick={() => onOpen(d.id)}>Ver as cidades</button>
              </div>
            </motion.article>
          </AnimatePresence>
          <ol className="orbit__dots" aria-label="Destinos">
            {DESTINOS.map((x, i) => <li key={x.id} className={i === cur ? "on" : ""} title={x.nome}><span className="sr-only">{x.nome}</span></li>)}
          </ol>
        </div>
      </div>
    </section>
  );
}

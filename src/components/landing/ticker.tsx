"use client";

import { useAnimationFrame, useScroll, useVelocity, useSpring, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { DESTINOS } from "@/lib/data";
import { BOARD, addMinutes } from "./board-data";
import { SplitFlap } from "@/components/shared/split-flap";
import { PlaneIcon } from "@/components/shared/plane";
import { useMotionPref } from "@/components/providers";

/** Two marquee rows; their speed follows how fast the page is being scrolled. Times keep changing like a real board. */
export function Ticker() {
  const box = useRef<HTMLDivElement>(null);
  const a = useRef<HTMLDivElement>(null), b = useRef<HTMLDivElement>(null);
  const pos = useRef([0, 0]);
  const { reduced } = useMotionPref();
  const inView = useInView(box);
  const { scrollY } = useScroll();
  const vel = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const [times, setTimes] = useState(BOARD.map((r) => r.hora));

  useAnimationFrame((_, delta) => {
    if (reduced || !inView) return;
    const dt = Math.min(0.05, delta / 1000), v = vel.get();
    const speed = 60 + Math.min(1600, Math.abs(v) * 0.9);
    const dir = v < -20 ? -1 : 1;
    [a.current, b.current].forEach((el, i) => {
      if (!el) return;
      const half = el.scrollWidth / 2 || 1;
      const d = i === 0 ? -1 : 1;
      pos.current[i] = (((pos.current[i] + d * dir * speed * dt) % half) + half) % half;
      el.style.transform = `translate3d(${-pos.current[i]}px,0,0)`;
    });
  });

  useEffect(() => {
    if (reduced) return;
    const iv = setInterval(() => {
      if (!inView) return;
      setTimes((t) => { const k = (Math.random() * t.length) | 0; const n = [...t]; n[k] = addMinutes(n[k], 5); return n; });
    }, 900);
    return () => clearInterval(iv);
  }, [reduced, inView]);

  const rowA = BOARD.map((r, i) => (
    <span key={r.id + i} className="ticker__item">
      <SplitFlap text={times[i]} onView={false} />
      <em>{r.destino}</em>
      <PlaneIcon />
      <span>{r.pais}</span>
      <span className={r.status[1]}>{r.status[0].toUpperCase()}</span>
    </span>
  ));
  const rowB = DESTINOS.flatMap((d) => d.cidades.map((c) => (
    <span key={c.id} className="tpill" style={{ ["--c" as string]: d.cor }}>{c.nome}<small>{d.nome}</small></span>
  )));

  return (
    <div className="ticker" ref={box} aria-hidden="true">
      <div className="ticker__row"><div className="ticker__track" ref={a}>{rowA}{rowA}</div></div>
      <div className="ticker__row ticker__row--pills"><div className="ticker__track" ref={b}>{rowB}{rowB}</div></div>
    </div>
  );
}

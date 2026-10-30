"use client";

import { AnimatePresence, animate, motion, useMotionValue, useMotionValueEvent } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { byId } from "@/lib/data";
import { localPlan, type Plan } from "@/lib/scoring";
import type { Answers } from "@/lib/questions";
import { SplitFlap } from "@/components/shared/split-flap";
import { PlaneIcon } from "@/components/shared/plane";
import { useMotionPref } from "@/components/providers";

const MSGS = ["Entendendo sua situação…", "Conferindo seus idiomas…", "Comparando custo de vida em 10 países…", "Checando as regras de visto…", "Lendo relatos de brasileiros que já foram…", "Preparando suas malas…", "Despachando a bagagem…", "Em velocidade de cruzeiro…"];

export function Flight({ answers, onDone, onCancel }: { answers: Answers; onDone: (p: Plan) => void; onCancel: () => void }) {
  const { reduced } = useMotionPref();
  const path = useRef<SVGPathElement>(null), done = useRef<SVGPathElement>(null), plane = useRef<SVGGElement>(null);
  const prog = useMotionValue(0);
  const [msg, setMsg] = useState(0);
  const [to, setTo] = useState<{ code: string; name: string } | null>(null);
  const [landing, setLanding] = useState(false);

  useMotionValueEvent(prog, "change", (p) => {
    const el = path.current; if (!el) return;
    const L = el.getTotalLength(), a = el.getPointAtLength(p * L), b = el.getPointAtLength(Math.min(L, p * L + 1));
    plane.current?.setAttribute("transform", `translate(${a.x} ${a.y}) rotate(${(Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI})`);
    if (done.current) { done.current.style.strokeDasharray = `${L} ${L}`; done.current.style.strokeDashoffset = String(L * (1 - p)); }
  });

  useEffect(() => {
    const plan = localPlan(answers);
    const cruise = animate(prog, 0.85, { duration: reduced ? 0 : 5.2, ease: [0.3, 0.7, 0.4, 1] });
    const iv = setInterval(() => setMsg((m) => Math.min(m + 1, MSGS.length - 1)), 900);
    const t1 = setTimeout(() => {
      clearInterval(iv);
      const d = byId[plan.destinos[0].id];
      setTo({ code: d.iata, name: `${d.cidades[0].nome}, ${d.nome}` });
      setLanding(true);
      animate(prog, 1, { duration: reduced ? 0 : 1.6, ease: [0.16, 1, 0.3, 1] });
    }, reduced ? 300 : 5400);
    const t2 = setTimeout(() => onDone(plan), reduced ? 600 : 7300);
    prog.set(0.0001);
    return () => { cruise.stop(); clearInterval(iv); clearTimeout(t1); clearTimeout(t2); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="view flight" aria-labelledby="fl-title">
      <div className="wrap">
        <h2 className="sr-only" id="fl-title">Preparando seu resultado</h2>
        <div className="flight__codes">
          <div className="flight__code">GRU<small>São Paulo</small></div>
          <div className="flight__code flight__code--to"><SplitFlap text={to ? to.code : "???"} onView={false} /><small>{to ? to.name : "Destino em cálculo"}</small></div>
        </div>
        <svg className="route" viewBox="0 0 1000 220" aria-hidden="true">
          <path ref={path} d="M20 200 C 300 -40, 700 -40, 980 200" fill="none" stroke="#2a3f66" strokeWidth="3" strokeDasharray="2 12" strokeLinecap="round" />
          <path ref={done} d="M20 200 C 300 -40, 700 -40, 980 200" fill="none" stroke="#ffc800" strokeWidth="3" strokeLinecap="round" />
          <circle cx="20" cy="200" r="7" fill="#fff" />
          <circle cx="980" cy="200" r="7" fill="#ffc800" />
          <g ref={plane}><g transform="scale(1.7) translate(-12 -12)" color="#fff"><PlaneIcon width="24" height="24" /></g></g>
        </svg>
        <div className="flight__msg" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.p key={landing ? "land" : msg} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.35 }}>
              {landing ? "Iniciando a descida…" : MSGS[msg]}
            </motion.p>
          </AnimatePresence>
        </div>
        <p className="flight__sub">Estamos comparando seu perfil com custos, salários e regras de visto de 10 países.</p>
        <div className="flight__actions on-board"><button className="btn btn--ghost btn--small" type="button" onClick={onCancel}>Cancelar e voltar</button></div>
      </div>
    </section>
  );
}

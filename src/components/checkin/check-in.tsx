"use client";

import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { QUESTIONS, SHORT, answerText, type Answers, type Question } from "@/lib/questions";
import { PlaneIcon } from "@/components/shared/plane";
import { useMotionPref } from "@/components/providers";

type Burst = { id: number; x: number; y: number; dx: number; dy: number; r: number; c: string };
const BURST_COLORS = ["#ffc800", "#3d7bff", "#ffffff"];

const gentleVariants = {
  enter: (dir: number) => ({ x: dir * 40, opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const } },
  exit: (dir: number) => ({ x: dir * -40, opacity: 0, transition: { duration: 0.2 } }),
};
const cardVariants = {
  enter: (dir: number) => ({ x: `${dir * 60}vw`, rotate: dir * 6, opacity: 0 }),
  center: { x: 0, rotate: 0, opacity: 1, transition: { type: "spring" as const, stiffness: 120, damping: 18, mass: 0.9 } },
  exit: (dir: number) => ({ x: `${dir * -70}vw`, rotate: dir * -7, opacity: 0, transition: { duration: 0.32, ease: [0.5, 0, 0.75, 0] as const } }),
};

export function CheckIn({ answers, setAnswers, onExit, onDone }: {
  answers: Answers; setAnswers: (a: Answers) => void; onExit: () => void; onDone: (a: Answers) => void;
}) {
  const { reduced, gentle } = useMotionPref();
  const [[step, dir], setStep] = useState<[number, number]>([0, 1]);
  const [error, setError] = useState("");
  const [bursts, setBursts] = useState<Burst[]>([]);
  const titleRef = useRef<HTMLElement>(null);
  const autoRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const q = QUESTIONS[step];
  const last = step === QUESTIONS.length - 1;
  const A = answers as Record<string, unknown>;

  useEffect(() => { titleRef.current?.focus({ preventScroll: true }); }, [step]);

  const validate = useCallback((a: Answers, qq: Question) => {
    const v = (a as Record<string, unknown>)[qq.id];
    if ((qq.type === "one" || qq.type === "many") && (!v || (Array.isArray(v) && !v.length))) return "Escolha uma opção para continuar.";
    return "";
  }, []);

  const next = useCallback((a: Answers = answers) => {
    const err = validate(a, QUESTIONS[step]);
    if (err) { setError(err); return; }
    setError("");
    if (step < QUESTIONS.length - 1) setStep([step + 1, 1]);
    else onDone(a);
  }, [answers, step, validate, onDone]);

  const back = useCallback(() => { setError(""); if (step === 0) onExit(); else setStep([step - 1, -1]); }, [step, onExit]);

  const burst = (el: HTMLElement) => {
    if (gentle) return;
    const r = el.getBoundingClientRect();
    const items = Array.from({ length: 14 }, (_, i) => {
      const ang = Math.random() * Math.PI * 2, dist = 50 + Math.random() * 90;
      return { id: Date.now() + i, x: r.left + r.width * 0.12, y: r.top + r.height / 2, dx: Math.cos(ang) * dist, dy: Math.sin(ang) * dist, r: Math.random() * 360, c: BURST_COLORS[i % 3] };
    });
    setBursts((b) => [...b, ...items]);
    setTimeout(() => setBursts((b) => b.filter((x) => !items.includes(x))), 800);
  };

  const pick = (opt: string, el: HTMLElement) => {
    if (q.type === "one") {
      const a = { ...answers, [q.id]: opt };
      setAnswers(a); burst(el);
      if (autoRef.current) clearTimeout(autoRef.current);
      autoRef.current = setTimeout(() => next(a), 380);
      return;
    }
    let cur = (A[q.id] as string[] | undefined) || [];
    if (cur.includes(opt)) cur = cur.filter((x) => x !== opt);
    else {
      if (q.id === "cidadania") cur = opt === "Só a brasileira" ? [] : cur.filter((x) => x !== "Só a brasileira");
      if (cur.length >= (q.max || 99)) { setError(`Escolha no máximo ${q.max}.`); return; }
      cur = [...cur, opt]; burst(el);
    }
    setError("");
    setAnswers({ ...answers, [q.id]: cur });
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.altKey || e.ctrlKey || e.metaKey || (e.target as HTMLElement).tagName === "TEXTAREA") return;
      const n = parseInt(e.key, 10);
      if (n >= 1 && n <= 9 && q.opts && q.opts[n - 1]) {
        const el = document.getElementById(`q-${q.id}-${n - 1}`);
        if (el) pick(q.opts[n - 1], el.parentElement as HTMLElement);
      }
    };
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  });

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -100 && Math.abs(info.offset.y) < 80) next();
    else if (info.offset.x > 100 && Math.abs(info.offset.y) < 80) back();
  };

  const hintId = q.hint ? `hint-${q.id}` : undefined;
  const body = () => {
    if (q.type === "one" || q.type === "many") {
      const cur = A[q.id];
      return (
        <fieldset aria-describedby={hintId}>
          <legend id="ci-title" tabIndex={-1} ref={titleRef as React.RefObject<HTMLLegendElement>}>{q.title}</legend>
          {q.hint && <p className="ci__hint" id={hintId}>{q.hint}</p>}
          <div className="opts">
            {q.opts!.map((o, i) => {
              const on = Array.isArray(cur) ? cur.includes(o) : cur === o;
              return (
                <motion.label key={o} className="opt"
                  initial={reduced ? false : { opacity: 0, y: 18, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 + i * 0.055 }}>
                  <input type={q.type === "one" ? "radio" : "checkbox"} name={`q-${q.id}`} id={`q-${q.id}-${i}`} value={o} checked={on}
                    onChange={(e) => pick(o, (e.currentTarget.parentElement as HTMLElement))} />
                  <motion.span animate={on && !reduced ? { scale: [1, 1.025, 1] } : { scale: 1 }} transition={{ duration: 0.35 }}>
                    <kbd aria-hidden="true">{on ? "✓" : i + 1}</kbd>{o}
                  </motion.span>
                </motion.label>
              );
            })}
          </div>
        </fieldset>
      );
    }
    if (q.type === "langs") {
      const cur = answers.idiomas || {};
      return (
        <div>
          <h2 className="qtitle" id="ci-title" tabIndex={-1} ref={titleRef as React.RefObject<HTMLHeadingElement>}>{q.title}</h2>
          {q.hint && <p className="ci__hint">{q.hint}</p>}
          <div className="langs">
            {q.langs!.map(([k, n], li) => (
              <motion.div key={k} className="lang" initial={reduced ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 + li * 0.055 }}>
                <b id={`lg-${k}`}>{n}</b>
                <fieldset className="seg" aria-labelledby={`lg-${k}`}>
                  {q.levels!.map((l, i) => (
                    <label key={l}>
                      <input type="radio" name={`lg-${k}`} value={i} checked={(cur[k] || 0) === i} onChange={() => setAnswers({ ...answers, idiomas: { ...cur, [k]: i } })} />
                      <span>{l}</span>
                    </label>
                  ))}
                </fieldset>
              </motion.div>
            ))}
          </div>
        </div>
      );
    }
    return (
      <div>
        <h2 className="qtitle" id="ci-title" tabIndex={-1} ref={titleRef as React.RefObject<HTMLHeadingElement>}>{q.title}</h2>
        {q.hint && <p className="ci__hint" id={hintId}>{q.hint}</p>}
        <div className="ci__text">
          <label htmlFor="q-extra">{q.label}</label>
          <textarea id="q-extra" maxLength={600} aria-describedby={hintId} value={answers.extra || ""} onChange={(e) => setAnswers({ ...answers, extra: e.target.value })} />
          <small>Até 600 caracteres.</small>
        </div>
      </div>
    );
  };

  const pct = ((step + 1) / QUESTIONS.length) * 100;
  return (
    <section className="view checkin" aria-labelledby="ci-title">
      <div className="wrap">
        <div className="ci__bar">
          <span className="num">Pergunta {step + 1} de {QUESTIONS.length}</span>
          <div className="ci__track" aria-hidden="true">
            <motion.div className="ci__fill" style={{ transformOrigin: "0 50%" }} animate={{ scaleX: pct / 100 }} transition={{ type: "spring", stiffness: 120, damping: 20 }} />
            <motion.span className="ci__planeicon" animate={{ left: `${pct}%` }} transition={{ type: "spring", stiffness: 120, damping: 20 }}><PlaneIcon /></motion.span>
          </div>
        </div>
        <div className="ci__layout">
          <form className="ci__q" noValidate onSubmit={(e) => { e.preventDefault(); next(); }}>
            <div className="relative">
              <AnimatePresence mode="wait" custom={dir} initial={false}>
                <motion.div key={step} custom={dir} variants={gentle ? gentleVariants : cardVariants} initial="enter" animate="center" exit="exit"
                  drag={q.type === "text" ? false : "x"} dragSnapToOrigin dragElastic={0.6} onDragEnd={onDragEnd}
                  style={{ touchAction: "pan-y" }}>
                  {body()}
                </motion.div>
              </AnimatePresence>
            </div>
            {error && <p className="ci__err" role="alert">{error}</p>}
            <div className="ci__nav">
              <button className="btn btn--ghost" type="button" onClick={back}>{step === 0 ? "Voltar ao início" : "Voltar"}</button>
              <button className="btn" type="submit">{last ? "Emitir meu cartão" : "Continuar"} <span className="arrow" aria-hidden="true">→</span></button>
              <span className="tip">Atalho: teclas numéricas escolhem, Enter continua. No celular, arraste para o lado.</span>
            </div>
          </form>
          <aside className="ci__pass" aria-label="Seu cartão de embarque em preenchimento">
            <div className="pass">
              <div className="pass__main">
                <div className="pass__label">Seu cartão, em preenchimento</div>
                <div className="pass__route"><span className="pass__code">GRU</span><PlaneIcon className="pass__plane" /><span className="pass__code">???</span></div>
                <div className="pass__grid">
                  {QUESTIONS.filter((x) => SHORT[x.id]).map((x) => {
                    const t = answerText(x, answers);
                    return (
                      <div key={x.id}>
                        <span className="pass__label">{SHORT[x.id]}</span>
                        <motion.b key={t || "empty"} className={t ? "" : "empty"} initial={t && !reduced ? { opacity: 0, y: 8 } : false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>{t || "—"}</motion.b>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
      <div aria-hidden="true">
        {bursts.map((b) => (
          <motion.i key={b.id} className="fixed z-[70] size-2.5 rounded-[3px] pointer-events-none" style={{ left: b.x, top: b.y, background: b.c }}
            initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }} animate={{ x: b.dx, y: b.dy, rotate: b.r, opacity: 0 }} transition={{ duration: 0.7, ease: [0.2, 0.7, 0.3, 1] }} />
        ))}
      </div>
    </section>
  );
}

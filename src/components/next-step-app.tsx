"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Nav, Footer } from "@/components/landing/chrome";
import { Home } from "@/components/landing/home";
import { CheckIn } from "@/components/checkin/check-in";
import { Flight } from "@/components/checkin/flight";
import { Result } from "@/components/result/result";
import { useMotionPref } from "@/components/providers";
import type { Answers } from "@/lib/questions";
import type { Plan } from "@/lib/scoring";

type View = "home" | "checkin" | "voo" | "resultado";
const load = <T,>(k: string): T | null => { try { return JSON.parse(localStorage.getItem(k) || "null"); } catch { return null; } };
const save = (k: string, v: unknown) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };

export default function NextStepApp() {
  const [view, setView] = useState<View>("home");
  const [answers, setAnswersState] = useState<Answers>({});
  const [plan, setPlan] = useState<Plan | null>(null);
  const [openDest, setOpenDest] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState("");
  const toastT = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { scrollTo } = useMotionPref();

  useEffect(() => {
    const a = load<Answers>("ns:answers"); if (a) setAnswersState(a);
    const p = load<Plan>("ns:plan");
    if (location.hash === "#resultado" && p?.destinos) { setPlan(p); setView("resultado"); }
    else if (location.hash === "#checkin") setView("checkin");
  }, []);

  const go = useCallback((v: View) => {
    setView(v);
    const h = v === "home" ? "" : `#${v}`;
    if (location.hash !== h) history.replaceState(null, "", h || location.pathname + location.search);
    scrollTo(0, { immediate: true });
  }, [scrollTo]);

  const setAnswers = (a: Answers) => { setAnswersState(a); save("ns:answers", a); };
  const toast = (m: string) => { setToastMsg(m); if (toastT.current) clearTimeout(toastT.current); toastT.current = setTimeout(() => setToastMsg(""), 2600); };

  const toSection = (id: string, open?: string) => {
    const doit = () => { if (open) setOpenDest(open); const el = document.getElementById(open ? `dest-${open}` : id); if (el) scrollTo(el, { offset: open ? -innerHeight / 3 : -80 }); };
    if (view !== "home") { go("home"); setTimeout(doit, 80); } else doit();
  };

  return (
    <>
      <a className="skip" href="#main">Pular para o conteúdo</a>
      <Nav onHome={() => go("home")} onSection={(id) => toSection(id)} onStart={() => go("checkin")} />
      <main id="main">
        {view === "home" && <Home onStart={() => go("checkin")} openDest={openDest} setOpenDest={setOpenDest} onOpen={(id) => toSection("destinos", id || undefined)} />}
        {view === "checkin" && <CheckIn answers={answers} setAnswers={setAnswers} onExit={() => go("home")} onDone={(a) => { setAnswers(a); go("voo"); }} />}
        {view === "voo" && <Flight answers={answers} onCancel={() => go("checkin")} onDone={(p) => { setPlan(p); save("ns:plan", p); go("resultado"); }} />}
        {view === "resultado" && plan && <Result plan={plan} onRestart={() => go("checkin")} toast={toast} />}
      </main>
      <Footer />
      <div className={`toast${toastMsg ? " show" : ""}`} role="status" aria-live="polite">{toastMsg}</div>
    </>
  );
}

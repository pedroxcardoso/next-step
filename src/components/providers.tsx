"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { MotionConfig } from "framer-motion";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type MotionCtx = {
  /** Kept for components that branch on it; animations are always on. */
  reduced: boolean;
  /** The OS asks for less motion: keep every animation, but skip the vestibular-heavy extras
   *  (smooth-scroll inertia, mouse parallax, confetti, tilted swipes). Fully automatic, no UI. */
  gentle: boolean;
  scrollTo: (target: number | HTMLElement, opts?: { offset?: number; immediate?: boolean }) => void;
};

const Ctx = createContext<MotionCtx>({ reduced: false, gentle: false, scrollTo: () => {} });
export const useMotionPref = () => useContext(Ctx);

export function Providers({ children }: { children: ReactNode }) {
  const [gentle, setGentle] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const mq = matchMedia("(prefers-reduced-motion: reduce)");
    setGentle(mq.matches);
    const on = () => setGentle(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (gentle) return;
    const lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.95, smoothWheel: true });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => { gsap.ticker.remove(tick); lenis.destroy(); lenisRef.current = null; };
  }, [gentle]);

  const scrollTo = useCallback<MotionCtx["scrollTo"]>((target, opts = {}) => {
    const { offset = 0, immediate = false } = opts;
    const l = lenisRef.current;
    if (l) { l.scrollTo(target, { offset, immediate, force: immediate, duration: 1.2 }); return; }
    const top = typeof target === "number" ? target : target.getBoundingClientRect().top + scrollY;
    window.scrollTo({ top: top + offset, behavior: immediate ? "auto" : "smooth" });
  }, []);

  return (
    <Ctx.Provider value={{ reduced: false, gentle, scrollTo }}>
      <MotionConfig reducedMotion="never">{children}</MotionConfig>
    </Ctx.Provider>
  );
}

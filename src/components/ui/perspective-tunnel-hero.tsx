"use client";

/**
 * Adapted from the 21st.dev "perspective-tunnel-hero" component.
 * Changes: driven by page scroll (sticky stage) instead of hijacking the wheel, real city photos,
 * a centre slot for content (the boarding pass), palette tokens instead of indigo/gradients.
 */
import { animate, motion, useMotionValue, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useMotionPref } from "@/components/providers";
import { PlaneIcon } from "@/components/shared/plane";

export type TunnelItem = { src: string; title: string; subtitle?: string; color?: string };

type CardData = { item: TunnelItem; cos: number; sin: number; rx: number; ry: number; rz: number; index: number };
type Stage = { width: number; height: number; isMobile: boolean };

const SPRING = { stiffness: 60, damping: 25, mass: 0.5 };

function useCameraParallax(enabled: boolean) {
  const rawX = useMotionValue(0), rawY = useMotionValue(0);
  const x = useSpring(rawX, SPRING), y = useSpring(rawY, SPRING);
  useEffect(() => {
    if (!enabled || !matchMedia("(pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => { rawX.set((e.clientX / innerWidth - 0.5) * 2); rawY.set((e.clientY / innerHeight - 0.5) * 2); };
    addEventListener("pointermove", onMove, { passive: true });
    return () => removeEventListener("pointermove", onMove);
  }, [enabled, rawX, rawY]);
  return { x, y };
}

function TunnelCard({ card, progress, pointer, total, stage, onClick }: {
  card: CardData; progress: MotionValue<number>; pointer: { x: MotionValue<number>; y: MotionValue<number> }; total: number; stage: Stage; onClick?: () => void;
}) {
  const span = 0.55;
  const start = (card.index / total) * (1 - span);
  const local = useTransform(progress, [start, start + span], [0, 1]);
  const z = useTransform(local, [0, 1], [stage.isMobile ? -1200 : -1700, stage.isMobile ? 350 : 500]);
  const opacity = useTransform(local, [0, 0.18, 0.82, 0.98], [0, 1, 1, 0]);
  const visibility = useTransform(opacity, (o) => (o < 0.01 ? "hidden" : "visible"));
  const width = stage.isMobile ? Math.max(118, Math.min(168, stage.width * 0.36)) : Math.max(170, Math.min(250, stage.width * 0.16));
  const baseX = card.cos * stage.width * card.rx, baseY = card.sin * stage.height * card.ry;
  const pan = stage.isMobile ? 20 : 45;
  const transform = useTransform([z, pointer.x, pointer.y], ([cz, px, py]: number[]) =>
    `translate3d(calc(-50% + ${baseX - px * pan}px), calc(-50% + ${baseY - py * pan}px), ${cz}px) rotateZ(${card.rz}deg)`);

  return (
    <motion.div
      aria-hidden="true"
      onClick={onClick}
      style={{ width, transform, opacity, visibility, zIndex: card.index + 1 }}
      className="group pointer-events-auto absolute left-1/2 top-1/2 cursor-pointer select-none will-change-transform"
    >
      <div className="grid overflow-hidden rounded-[14px] bg-white text-night shadow-[0_24px_60px_rgba(3,10,25,.45)]">
        <div className="aspect-[4/5] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={card.item.src} alt="" draggable={false} decoding="async" className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" />
        </div>
        <span className="flex items-center gap-[7px] px-3 py-2 text-[15px] font-bold leading-tight">
          <i className="size-[9px] shrink-0 rounded-full" style={{ background: card.item.color || "var(--sign)" }} />
          {card.item.title}
          {card.item.subtitle && <small className="ml-auto text-[13px] font-medium opacity-80">{card.item.subtitle}</small>}
        </span>
      </div>
    </motion.div>
  );
}

export default function PerspectiveTunnelHero({ items, children, onItemClick, labelledBy }: {
  items: TunnelItem[]; children?: ReactNode; onItemClick?: (index: number) => void; labelledBy?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const { reduced, gentle } = useMotionPref();
  const [stage, setStage] = useState<Stage>({ width: 1440, height: 832, isMobile: false });

  useEffect(() => {
    const upd = () => setStage({ width: innerWidth, height: innerHeight - 68, isMobile: innerWidth < 768 });
    upd(); addEventListener("resize", upd);
    return () => removeEventListener("resize", upd);
  }, []);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 68px", "end end"] });
  const intro = useMotionValue(reduced ? 0.3 : 0);
  useEffect(() => { const c = animate(intro, 0.3, { duration: reduced ? 0 : 2.2, ease: [0.16, 1, 0.3, 1] }); return () => c.stop(); }, [intro, reduced]);
  const raw = useTransform([scrollYProgress, intro], ([s, i]: number[]) => (reduced ? 0.3 : i + s * 0.7));
  const progress = useSpring(raw, { stiffness: 80, damping: 30, restDelta: 0.0001 });
  const pointer = useCameraParallax(!gentle);

  const bg = useTransform(progress, [0.3, 0.65, 1], ["#0b1a33", "#14305d", "#0b1a33"]);
  const promptOpacity = useTransform(progress, [0.3, 0.38], [1, 0]);
  const tiltX = useTransform(pointer.y, (v) => `${-v * 4}deg`);
  const tiltY = useTransform(pointer.x, (v) => `${v * 5}deg`);

  const cards: CardData[] = items.map((item, i) => {
    const ga = (i * 137.5 * Math.PI) / 180;
    return { item, cos: Math.cos(ga), sin: Math.sin(ga), rx: 0.28 + (i % 3) * 0.08, ry: 0.26 + (i % 2) * 0.09, rz: (i % 2 === 0 ? 1 : -1) * (3 + (i % 5) * 2), index: i };
  });

  return (
    <section ref={ref} aria-labelledby={labelledBy} className="relative h-[270svh] max-md:h-[220svh] [html.rm_&]:h-auto">
      <motion.div
        style={{ backgroundColor: bg, perspective: stage.isMobile ? "900px" : "1200px" }}
        className="sticky top-[68px] grid h-[calc(100svh-68px)] min-h-[520px] place-items-center overflow-hidden [html.rm_&]:relative [html.rm_&]:top-0"
      >
        <div className="pointer-events-none absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
          {cards.map((c) => (
            <TunnelCard key={c.index} card={c} progress={progress} pointer={pointer} total={cards.length} stage={stage} onClick={() => onItemClick?.(c.index)} />
          ))}
        </div>
        <motion.div className="relative z-10 grid w-full place-items-center px-4" style={{ rotateX: tiltX, rotateY: tiltY, transformPerspective: 900 }}>
          {children}
        </motion.div>
        <motion.p
          aria-hidden="true"
          style={{ opacity: promptOpacity }}
          className="absolute bottom-[calc(18px+env(safe-area-inset-bottom,0px))] left-1/2 z-20 inline-flex -translate-x-1/2 items-center gap-2.5 whitespace-nowrap rounded-full bg-sign px-[18px] py-2.5 text-[15px] font-semibold text-night [html.rm_&]:hidden"
        >
          <motion.span animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}>
            <PlaneIcon className="size-[18px] -rotate-90" />
          </motion.span>
          Role para decolar
        </motion.p>
      </motion.div>
    </section>
  );
}

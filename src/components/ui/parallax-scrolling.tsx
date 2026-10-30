"use client";

/**
 * Adapted from the Osmo "parallax-scrolling" component (GSAP ScrollTrigger + Lenis).
 * Same mechanism: one scrubbed timeline moves each [data-parallax-layer] by its own yPercent.
 * Lenis is created once in <Providers/>; here we only build the timeline. Content comes in as layers.
 */
import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMotionPref } from "@/components/providers";

export type ParallaxLayer = { layer: string; yPercent?: number; xPercent?: number };

export function ParallaxComponent({ layers, children, className, id, labelledBy }: {
  layers: ParallaxLayer[]; children: ReactNode; className?: string; id?: string; labelledBy?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const { reduced } = useMotionPref();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = ref.current;
    if (!root || reduced) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: 0.6 } });
      layers.forEach((l, i) => {
        const targets = root.querySelectorAll(`[data-parallax-layer="${l.layer}"]`);
        tl.fromTo(targets,
          { yPercent: -(l.yPercent || 0) / 2, xPercent: -(l.xPercent || 0) / 2 },
          { yPercent: (l.yPercent || 0) / 2, xPercent: (l.xPercent || 0) / 2, ease: "none" },
          i === 0 ? undefined : "<");
      });
    }, root);
    return () => ctx.revert();
  }, [layers, reduced]);

  return (
    <section ref={ref} id={id} aria-labelledby={labelledBy} className={className}>
      {children}
    </section>
  );
}

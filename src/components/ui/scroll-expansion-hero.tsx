"use client";

/**
 * Adapted from the 21st.dev "scroll-expansion-hero" (ScrollExpandMedia).
 * Changes: scroll-linked through a sticky stage (no wheel/touch hijacking, no scroll lock),
 * clip-path instead of width/height (no layout work per frame), image only, children appear at the end.
 */
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useMotionPref } from "@/components/providers";

type Props = {
  mediaSrc: string;
  mediaAlt: string;
  title: string;          // first word(s) slide left, the rest slide right
  splitAt?: number;       // how many words go to the left line
  scrollToExpand?: string;
  children?: ReactNode;   // revealed when the media is fully expanded
  id?: string;
};

export default function ScrollExpandMedia({ mediaSrc, mediaAlt, title, splitAt = 1, scrollToExpand, children, id }: Props) {
  const ref = useRef<HTMLElement>(null);
  const { reduced } = useMotionPref();
  const [size, setSize] = useState({ w: 1440, h: 832, mobile: false });
  useEffect(() => {
    const u = () => setSize({ w: innerWidth, h: innerHeight - 68, mobile: innerWidth < 768 });
    u(); addEventListener("resize", u);
    return () => removeEventListener("resize", u);
  }, []);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 68px", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 70, damping: 24, restDelta: 0.0005 });
  const e = useTransform(p, [0, 0.75], [reduced ? 1 : 0, 1], { clamp: true });

  const w0 = size.mobile ? 220 : 300, h0 = size.mobile ? 300 : 400;
  const clip = useTransform(e, (k) => {
    const w = w0 + (size.w - w0) * k, h = h0 + (size.h - h0) * k;
    return `inset(${((size.h - h) / 2).toFixed(1)}px ${((size.w - w) / 2).toFixed(1)}px round ${(24 * (1 - k)).toFixed(1)}px)`;
  });
  const imgScale = useTransform(e, [0, 1], [1.25, 1]);
  const scrim = useTransform(e, [0, 1], [0.2, 0.45]);
  const tx = useTransform(e, [0, 1], [0, size.mobile ? 0 : 6]);
  const left = useTransform(tx, (v) => `${-v}vw`), right = useTransform(tx, (v) => `${v}vw`);
  const reveal = useTransform(p, [0.62, 0.87], [reduced ? 1 : 0, 1]);
  const revealY = useTransform(reveal, [0, 1], [40, 0]);
  const hint = useTransform(p, [0, 0.3], [1, 0]);

  const words = title.split(" ");
  const first = words.slice(0, splitAt).join(" "), rest = words.slice(splitAt).join(" ");

  return (
    <section ref={ref} id={id} aria-label={title} className="relative h-[240svh] max-md:h-[200svh] [html.rm_&]:h-auto">
      <div className="sticky top-[68px] grid h-[calc(100svh-68px)] min-h-[520px] place-items-center overflow-hidden bg-night [html.rm_&]:relative [html.rm_&]:top-0">
        <motion.div className="absolute inset-0 will-change-[clip-path]" style={{ clipPath: clip }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <motion.img src={mediaSrc} alt={mediaAlt} style={{ scale: imgScale }} className="h-full w-full object-cover" />
          <motion.div className="absolute inset-0 bg-night" style={{ opacity: scrim }} />
        </motion.div>

        <h2 className="pointer-events-none relative z-10 flex flex-col items-center text-center text-[clamp(48px,9vw,150px)] font-extrabold leading-[.9] tracking-[-0.04em] text-white [font-variation-settings:'wdth'_115]">
          <motion.span style={{ x: left }} className="block">{first}</motion.span>
          <motion.span style={{ x: right }} className="block text-sign">{rest}</motion.span>
        </h2>

        {children && (
          <motion.div style={{ opacity: reveal, y: revealY }} className="absolute inset-x-0 bottom-[clamp(24px,6vh,72px)] z-20 mx-auto w-full max-w-[1440px] px-[max(var(--gutter),env(safe-area-inset-left,0px))]">
            {children}
          </motion.div>
        )}
        {scrollToExpand && (
          <motion.p style={{ opacity: hint }} className="absolute bottom-[18px] left-1/2 -translate-x-1/2 rounded-full bg-night/80 px-4 py-2 text-[15px] font-semibold text-white [html.rm_&]:hidden">
            {scrollToExpand}
          </motion.p>
        )}
      </div>
    </section>
  );
}

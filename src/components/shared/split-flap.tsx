"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useMotionPref } from "@/components/providers";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789–";

/** Text that shuffles like an airport split-flap board whenever it changes, and once when it scrolls into view. */
export function SplitFlap({ text, className, delay = 0, onView = true }: { text: string; className?: string; delay?: number; onView?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const { reduced } = useMotionPref();
  const [shown, setShown] = useState(text);
  const played = useRef(false);

  useEffect(() => {
    if (reduced) { setShown(text); return; }
    if (onView && !inView) { setShown(text); return; }
    if (onView && played.current && shown === text) return;
    played.current = true;
    const target = text.split("");
    let frame = 0;
    let iv: ReturnType<typeof setInterval> | undefined;
    const to = setTimeout(() => {
      iv = setInterval(() => {
        frame++;
        setShown(target.map((ch, i) => (frame > 6 + i * 1.3 || ch === " " ? ch : CHARS[(Math.random() * CHARS.length) | 0])).join(""));
        if (frame > 8 + target.length * 1.3) { clearInterval(iv); setShown(text); }
      }, 42);
    }, delay);
    return () => { clearTimeout(to); if (iv) clearInterval(iv); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, inView, reduced]);

  return <span ref={ref} className={className} aria-label={text}><span aria-hidden="true">{shown}</span></span>;
}

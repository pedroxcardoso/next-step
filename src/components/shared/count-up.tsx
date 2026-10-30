"use client";

import { animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useMotionPref } from "@/components/providers";

/** Number(s) that count up from zero when they first appear. */
export function CountUp({ values, format, className }: { values: number[]; format: (v: number[]) => string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const { reduced } = useMotionPref();
  const [txt, setTxt] = useState(format(values));
  const key = values.join(",");
  useEffect(() => {
    if (!inView || reduced) { setTxt(format(values)); return; }
    const c = animate(0, 1, {
      duration: 1, ease: [0.16, 1, 0.3, 1],
      onUpdate: (k) => setTxt(format(values.map((v) => (v >= 1000 ? Math.round((v * k) / 100) * 100 : Math.round(v * k))))),
    });
    return () => c.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, key, reduced]);
  return <span ref={ref} className={className}>{txt}</span>;
}

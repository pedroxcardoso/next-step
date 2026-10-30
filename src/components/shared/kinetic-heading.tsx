"use client";

import { motion } from "framer-motion";

const word = {
  hidden: { y: "105%" },
  show: (i: number) => ({ y: "0%", transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const, delay: i * 0.08 } }),
};

/** Heading whose words rise into place when it scrolls into view (the heading itself is observed, not the clipped words). */
export function KineticHeading({ text, as = "h2", id, className }: { text: string; as?: "h1" | "h2" | "h3"; id?: string; className?: string }) {
  const Tag = as === "h1" ? motion.h1 : as === "h3" ? motion.h3 : motion.h2;
  const words = text.split(" ");
  return (
    <Tag id={id} className={className} aria-label={text} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
      {words.map((w, i) => (
        <span key={i} aria-hidden="true" className="inline-block overflow-hidden pb-[.06em] -mb-[.06em] align-bottom">
          <motion.span className="inline-block" variants={word} custom={i}>{w}</motion.span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );
}

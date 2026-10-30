"use client";

import { motion } from "framer-motion";
import { DESTINOS } from "@/lib/data";
import { fmtBRL } from "@/lib/format";
import { KineticHeading } from "@/components/shared/kinetic-heading";

const rows = DESTINOS.map((d) => ({ d, v: d.salMin - d.mensal[0] })).sort((x, y) => y.v - x.v);
const min = Math.min(0, ...rows.map((r) => r.v)), max = Math.max(...rows.map((r) => r.v));

/** Minimum wage minus the lowest monthly cost of living, per country. */
export function SobraChart() {
  const lo = min - (max - min) * 0.04, span = max * 1.4 - lo;
  const pos = (v: number) => ((v - lo) / span) * 100, z = pos(0);
  const label = "Saldo mensal com salário mínimo: " + rows.map((r) => `${r.d.nome} ${(r.v < 0 ? "menos " : "mais ") + fmtBRL(Math.abs(r.v))}`).join("; ");
  return (
    <section className="sec" id="sobra" aria-labelledby="h-sobra">
      <div className="wrap sobra">
        <div>
          <KineticHeading id="h-sobra" text="Quanto sobra com o salário mínimo?" />
          <p className="lede">Salário mínimo mensal menos o custo de vida mínimo de quem mora em quarto. Em Portugal, o mínimo não cobre o custo de Lisboa.</p>
          <p className="sobra__note">Valores brutos, antes de impostos, em reais. Estimativas de outubro de 2026.</p>
        </div>
        <div className="bars2" role="img" aria-label={label}>
          {rows.map((r, i) => {
            const neg = r.v < 0, l = neg ? pos(r.v) : z, w = Math.abs(pos(r.v) - z);
            return (
              <div className="b2" key={r.d.id} title={`${r.d.nome}: ${neg ? "−" : "+"}${fmtBRL(Math.abs(r.v))} por mês`}>
                <span className="b2__name"><i style={{ background: r.d.cor }} />{r.d.nome}</span>
                <div className="b2__track">
                  <motion.span
                    className={`b2__bar${neg ? " neg" : ""}`}
                    style={{ left: `${l}%`, width: `${w}%`, transformOrigin: neg ? "right center" : "left center" }}
                    initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: i * 0.07 }}
                  />
                  <span className="b2__zero" style={{ ["--z" as string]: `${z}%` }} />
                  <motion.span
                    className="b2__val" style={{ left: `calc(${neg ? z : z + w}% + 8px)` }}
                    initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.07 + 0.6 }}
                  >
                    {(neg ? "−" : "+") + fmtBRL(Math.abs(r.v))}
                  </motion.span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

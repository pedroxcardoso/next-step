"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { byId, CAMBIO, FOTOS_CREDITOS, type Destino } from "@/lib/data";
import { BUDGET, type Pick, type Plan } from "@/lib/scoring";
import { earthUrl, fmtBRL, host, mapsUrl, photo, rangeK } from "@/lib/format";
import { asset } from "@/lib/utils";
import { PlaneIcon } from "@/components/shared/plane";
import { CountUp } from "@/components/shared/count-up";
import { useMotionPref } from "@/components/providers";
import { ResultGlobe } from "./result-globe";

const credit = (id: string) => { const c = FOTOS_CREDITOS.find((x) => x.id === id); return c ? `Foto: ${c.artist}, ${c.license}` : ""; };
const EASE = [0.16, 1, 0.3, 1] as const;
const rise = { initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.15 }, transition: { duration: 0.9, ease: EASE } };

export function Result({ plan, onRestart, toast }: { plan: Plan; onRestart: () => void; toast: (m: string) => void }) {
  const [active, setActive] = useState(0);
  const [city, setCity] = useState(-1);
  const { scrollTo } = useMotionPref();
  const tabsRef = useRef<HTMLDivElement>(null);
  const x = plan.destinos[active], d = byId[x.id];

  const select = (i: number) => {
    setActive(i); setCity(-1);
    const el = tabsRef.current; if (el && el.getBoundingClientRect().top < 0) scrollTo(el, { offset: -90 });
  };

  const copy = async () => {
    const lines = ["Next Step — meu cartão de embarque", plan.resumo, ""];
    plan.destinos.forEach((p) => { const dd = byId[p.id]; lines.push(`${dd.nome} (${p.match}%): ${p.porQue}`, `Para começar: ${rangeK(dd.inicial)} · Por mês: ${rangeK(dd.mensal)} · Visto sugerido: ${p.vistoSugerido}`, ""); });
    try { await navigator.clipboard.writeText(lines.join("\n")); toast("Resumo copiado"); } catch { toast("Não foi possível copiar. Selecione o texto manualmente."); }
  };

  return (
    <section className="view" aria-labelledby="res-title">
      <div className="res-top">
        <div className="wrap">
          <div className="res-top__grid">
            <motion.h1 id="res-title" tabIndex={-1} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE }}>Seu cartão de embarque</motion.h1>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}>
              <p className="res-top__summary">{plan.resumo}</p>
              <p className="res-top__src">Recomendação calculada no seu navegador a partir das suas respostas.</p>
              <div className="res-top__actions">
                <button className="btn btn--small" type="button" onClick={onRestart}>Refazer check-in</button>
                <button className="btn btn--ghost btn--small" type="button" onClick={copy}>Copiar resumo</button>
              </div>
            </motion.div>
          </div>
          <div className="tabs" role="tablist" aria-label="Destinos sugeridos" ref={tabsRef}>
            {plan.destinos.map((p, i) => {
              const dd = byId[p.id];
              return (
                <motion.button key={p.id} className="tab" role="tab" id={`tab-${dd.id}`} aria-controls="res-detail" aria-selected={i === active} tabIndex={i === active ? 0 : -1}
                  style={{ ["--c" as string]: dd.cor }} onClick={() => select(i)}
                  onKeyDown={(e) => { const k = e.key; const j = k === "ArrowRight" ? (i + 1) % 3 : k === "ArrowLeft" ? (i + 2) % 3 : null; if (j !== null) { e.preventDefault(); select(j); (e.currentTarget.parentElement?.children[j] as HTMLElement)?.focus(); } }}
                  initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE, delay: 0.2 + i * 0.08 }} whileTap={{ scale: 0.98 }}>
                  <span className="tab__route">GRU <PlaneIcon /> {dd.iata}</span>
                  <span className="tab__name" style={{ display: "flex", alignItems: "center", gap: 8 }}><span className="tab__dot" aria-hidden="true" />{dd.nome}</span>
                  <span className="tab__match"><b>{p.match}%</b>de afinidade</span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
      <div className="wrap">
        <div className="stage">
          <ResultGlobe d={d} city={city} onCity={setCity} />
          <AnimatePresence mode="wait">
            <motion.div key={d.id} className="detail" id="res-detail" role="tabpanel" aria-labelledby={`tab-${d.id}`} style={{ ["--c" as string]: d.cor }}
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.5, ease: EASE }}>
              <Detail d={d} x={x} plan={plan} onCity={setCity} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function Detail({ d, x, plan, onCity }: { d: Destino; x: Pick; plan: Plan; onCity: (i: number) => void }) {
  const [bMin, bMax] = BUDGET[plan.answers.orcamento || ""] || [0, 40000];
  const pickV = d.vistos.find((v) => v.nome === x.vistoSugerido) || d.vistos[0];
  const others = d.vistos.filter((v) => v !== pickV);
  const [img, setImg] = useState(0);
  const track = useRef<HTMLDivElement>(null);
  const { scrollTo } = useMotionPref();
  const go = (i: number) => { const n = (i + d.cidades.length) % d.cidades.length; track.current?.scrollTo({ left: n * track.current.clientWidth, behavior: "smooth" }); setImg(n); onCity(n); };
  useEffect(() => {
    const el = track.current; if (!el) return;
    let t: ReturnType<typeof setTimeout>;
    const on = () => { clearTimeout(t); t = setTimeout(() => { const i = Math.round(el.scrollLeft / el.clientWidth); setImg((c) => { if (c !== i) onCity(i); return i; }); }, 120); };
    el.addEventListener("scroll", on, { passive: true });
    return () => el.removeEventListener("scroll", on);
  }, [onCity]);

  const top = bMax >= 200000 ? 200000 : bMax;
  const maxV = Math.max(150000, Math.ceil((Math.max(d.inicial[1], top) * 1.08) / 25000) * 25000);
  const pc = (v: number) => `${((100 * Math.min(v, maxV)) / maxV).toFixed(2)}%`;
  const ticks: number[] = []; for (let v = 0; v <= maxV; v += maxV > 160000 ? 50000 : 25000) ticks.push(v);
  const yourTxt = `${fmtBRL(bMin)} a ${bMax >= 200000 ? "mais" : fmtBRL(bMax)}`;

  return (
    <>
      <section className="chapter" aria-labelledby="d-title">
        <h2 id="d-title">{d.nome}</h2>
        <div className="facts"><span>Capital <b>{d.capital}</b></span><span>Moeda <b>{d.moeda}</b></span><span>Afinidade <b className="num">{x.match}%</b></span></div>
        <p className="why">{x.porQue}</p>
        <div className="quick">
          <div><span>Para começar</span><b><CountUp values={d.inicial} format={(v) => rangeK(v)} /></b></div>
          <div><span>Por mês</span><b><CountUp values={d.mensal} format={(v) => rangeK(v)} /></b></div>
          <div><span>Salário médio</span><b><CountUp values={[d.salMedio]} format={(v) => fmtBRL(v[0])} /></b></div>
          <div><span>Visto sugerido</span><b>{pickV.nome}</b></div>
        </div>
        {x.alerta && <div className="alert"><b>Atenção</b>{x.alerta}</div>}
      </section>

      <motion.section {...rise} aria-labelledby="d-photos">
        <h3 id="d-photos">As cidades</h3>
        <div className="carousel">
          <div className="car__track" ref={track} tabIndex={0} data-lenis-prevent-horizontal aria-label="Fotos das cidades, role para o lado"
            onKeyDown={(e) => { if (e.key === "ArrowRight") { e.preventDefault(); go(img + 1); } if (e.key === "ArrowLeft") { e.preventDefault(); go(img - 1); } }}>
            {d.cidades.map((c) => (
              <figure key={c.id}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={asset(photo(c.id))} width={1200} height={800} alt={`Vista de ${c.nome}, ${d.nome}`} loading="lazy" />
              </figure>
            ))}
          </div>
          <div className="car__cap"><b>{d.cidades[img].nome}</b><small>{credit(d.cidades[img].id)}</small></div>
          <div className="car__ctrl">
            <button className="icon-btn" type="button" aria-label="Foto anterior" onClick={() => go(img - 1)}><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" strokeWidth="2.4" d="M15 5l-7 7 7 7" /></svg></button>
            <button className="icon-btn" type="button" aria-label="Próxima foto" onClick={() => go(img + 1)}><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" strokeWidth="2.4" d="M9 5l7 7-7 7" /></svg></button>
            <span className="car__count">{img + 1} de {d.cidades.length}</span>
          </div>
        </div>
        <div className="cities" style={{ marginTop: 28 }}>
          {d.cidades.map((c, i) => (
            <div className="city" key={c.id}>
              <h4>{c.nome}</h4><p>{c.desc}</p>
              <div className="city__act">
                <button type="button" onClick={() => { onCity(i); if (innerWidth <= 980) { const g = document.querySelector(".stage__globe"); if (g) scrollTo(g as HTMLElement, { offset: -90 }); } }}>Ver no globo</button>
                <a href={mapsUrl(c.nome, d.nome)} target="_blank" rel="noopener">Google Maps</a>
                <a href={earthUrl(c.lat, c.lng)} target="_blank" rel="noopener">Google Earth 3D</a>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section {...rise} aria-labelledby="d-money">
        <h3 id="d-money">Orçamento</h3>
        <div className="money">
          <div><p className="money__lbl">Para começar (3 meses)</p><p className="money__big">{rangeK(d.inicial)}</p><p className="small">{d.textoInicial}</p></div>
          <div><p className="money__lbl">Para viver, por mês</p><p className="money__big">{rangeK(d.mensal)}</p><p className="small">{d.textoMensal}</p></div>
          <div className="chart">
            <div className="bars" role="img" aria-label={`Seu orçamento: ${yourTxt}. Custo para começar em ${d.nome}: ${fmtBRL(d.inicial[0])} a ${fmtBRL(d.inicial[1])}.`}>
              {[["Seu orçamento", yourTxt, bMin, top, "var(--bar-pos)"], ["Custo para começar", `${fmtBRL(d.inicial[0])} a ${fmtBRL(d.inicial[1])}`, d.inicial[0], d.inicial[1], "var(--sign)"]].map(([lbl, txt, a, b, col], k) => (
                <div className="bars__row" key={k}>
                  <span className="bars__lbl">{lbl as string} <b>{txt as string}</b></span>
                  <div className="bars__track">
                    <motion.i style={{ left: pc(a as number), width: `calc(${pc(b as number)} - ${pc(a as number)})`, background: col as string, transformOrigin: "left center" }}
                      initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, ease: EASE, delay: k * 0.15 }} />
                  </div>
                </div>
              ))}
              <div className="bars__axis" aria-hidden="true">{ticks.map((v) => <span key={v} style={{ left: pc(v) }}>{v === 0 ? "0" : `${v / 1000} mil`}</span>)}</div>
            </div>
          </div>
          <p className="budget-note">{x.orcamento}</p>
        </div>
      </motion.section>

      <motion.section {...rise} aria-labelledby="d-sal">
        <h3 id="d-sal">Salários</h3>
        <div className="money">
          <div><p className="money__lbl">Salário mínimo</p><p className="money__big">{fmtBRL(d.salMin)}</p><p className="small">{d.salario.minimo}</p></div>
          <div><p className="money__lbl">Salário médio</p><p className="money__big">{fmtBRL(d.salMedio)}</p><p className="small">{d.salario.medio}</p></div>
        </div>
        <div className="table-wrap">
          <table className="sal">
            <thead><tr><th scope="col">Vaga comum entre brasileiros</th><th scope="col">Quanto paga</th></tr></thead>
            <tbody>{d.salario.exemplos.map(([v, s]) => <tr key={v}><td>{v}</td><td>{s}</td></tr>)}</tbody>
          </table>
        </div>
      </motion.section>

      <motion.section {...rise} aria-labelledby="d-visa">
        <h3 id="d-visa">Vistos</h3>
        <div className="visas">
          <div className="visa visa--pick"><h4>{pickV.nome}<span className="tag">Sugerido para você</span></h4><p>{pickV.para}</p><p className="req">{pickV.req}</p>{x.porQueVisto && <p><b>Por quê:</b> {x.porQueVisto}</p>}</div>
        </div>
        <details className="more">
          <summary>Ver outras {others.length} rotas de visto</summary>
          <div className="visas">{others.map((v) => <div className="visa" key={v.nome}><h4>{v.nome}</h4><p>{v.para}</p><p className="req">{v.req}</p></div>)}</div>
        </details>
      </motion.section>

      <motion.section {...rise} aria-labelledby="d-ag">
        <h3 id="d-ag">Agências e órgãos oficiais</h3>
        <ul className="links">
          {d.agencias.map((a) => (
            <li key={a.url}><a href={a.url} target="_blank" rel="noopener"><span>{a.nome}<span className="host">{host(a.url)}</span></span>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" strokeWidth="2" d="M7 17L17 7M9 7h8v8" /></svg></a></li>
          ))}
        </ul>
      </motion.section>

      <motion.section {...rise} aria-labelledby="d-rel">
        <h3 id="d-rel">Relatos de brasileiros</h3>
        <div className="quotes">
          {d.relatos.map((r) => <figure key={r.texto}><blockquote>“{r.texto}”</blockquote><figcaption>{r.perfil} · <a href={r.url} target="_blank" rel="noopener">{r.veiculo}</a></figcaption></figure>)}
        </div>
      </motion.section>

      <motion.section {...rise} aria-labelledby="d-steps">
        <h3 id="d-steps">Seu passo a passo</h3>
        <ol className="steps">{x.passos.map((s) => <li key={s}>{s}</li>)}</ol>
        <details className="more"><summary>Dicas de quem já fez o processo</summary><ul className="tips">{d.dicas.map((s) => <li key={s}>{s}</li>)}</ul></details>
      </motion.section>

      <p className="src">Câmbio de referência: {CAMBIO}. Fontes: órgãos oficiais e reportagens listadas acima; confirme valores e regras antes de decidir.</p>
    </>
  );
}

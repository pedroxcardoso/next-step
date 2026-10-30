import { DESTINOS, byId, type Destino, type Visto } from "./data";
import { fmtBRL, rangeK } from "./format";
import type { Answers } from "./questions";

export const BUDGET: Record<string, [number, number]> = {
  "Até R$ 20 mil": [0, 20000], "R$ 20 a 40 mil": [20000, 40000], "R$ 40 a 70 mil": [40000, 70000],
  "R$ 70 a 120 mil": [70000, 120000], "Mais de R$ 120 mil": [120000, 200000],
};
export type Pick = { id: string; match: number; porQue: string; vistoSugerido: string; porQueVisto: string; orcamento: string; passos: string[]; alerta: string };
export type Plan = { resumo: string; destinos: Pick[]; answers: Answers; when: number };

const TAGS: Record<string, string> = { "Cidade grande e agitada": "cidade", "Praia e calor": "praia", "Natureza e montanhas": "natureza", "Cidade pequena e tranquila": "tranquilo", "Frio e neve não me assustam": "frio" };
const GOAL: Record<string, string[]> = { "Estudar": ["canada", "irlanda", "alemanha", "australia"], "Trabalhar": ["alemanha", "canada", "australia", "holanda", "irlanda"], "Morar de vez": ["canada", "portugal", "nova-zelandia", "espanha"], "Intercâmbio curto (até 1 ano)": ["irlanda", "australia", "nova-zelandia", "canada"], "Trabalhar remoto, como nômade digital": ["portugal", "espanha"] };
const AREA: Record<string, string[]> = { "Saúde": ["irlanda", "alemanha", "canada", "australia"], "Tecnologia": ["holanda", "alemanha", "canada", "irlanda", "portugal"], "Engenharia": ["alemanha", "holanda", "canada"], "Construção e ofícios": ["canada", "estados-unidos", "australia", "nova-zelandia"], "Hotelaria e serviços": ["australia", "irlanda", "portugal", "espanha", "nova-zelandia"], "Educação": ["japao", "espanha", "portugal"] };
const EU = ["portugal", "irlanda", "alemanha", "espanha", "holanda"];

export function scoreAll(a: Answers) {
  const L = a.idiomas || {};
  const lv = (k: string) => (k === "pt" ? 3 : L[k] || 0);
  const [, bMax] = BUDGET[a.orcamento || ""] || [0, 40000];
  const cid = a.cidadania || [], pri = a.prioridade || [], lug = a.lugar || [];
  const age = a.idade || "", area = a.area || "", obj = a.objetivo || "";
  const maxSal = Math.max(...DESTINOS.map((d) => d.salMedio)), minMes = Math.min(...DESTINOS.map((d) => d.mensal[0]));
  return DESTINOS.map((d) => {
    let s = 50; const why: string[] = [];
    if (bMax >= d.inicial[1]) { s += 14; why.push(`seu orçamento cobre o custo para começar (${rangeK(d.inicial)})`); }
    else if (bMax >= d.inicial[0]) { s += 6; why.push(`seu orçamento alcança o piso do custo para começar (${rangeK(d.inicial)})`); }
    else s -= Math.min(30, (d.inicial[0] - bMax) / 1500);
    let langLv = Math.max(...d.langs.map(lv));
    if (d.id === "alemanha" && area !== "Tecnologia" && area !== "Engenharia") langLv = lv("de");
    if (d.id === "espanha") langLv = Math.max(langLv, 1.5);
    s += langLv * 6;
    if (langLv >= 2 && d.id !== "portugal") why.push(`você já tem nível ${langLv >= 3 ? "avançado" : "intermediário"} no idioma usado lá`);
    if (d.id === "portugal") why.push("não há barreira de idioma");
    const hits = lug.map((l) => TAGS[l]).filter((t) => d.tags.includes(t));
    s += hits.length * 5;
    if (!lug.includes("Frio e neve não me assustam") && d.tags.includes("frio")) s -= 4;
    if (hits.length) why.push(`tem o tipo de lugar que você quer (${lug.filter((l) => d.tags.includes(TAGS[l])).join(", ").toLowerCase()})`);
    if (cid.includes("Portuguesa")) { if (d.id === "portugal") { s += 30; why.push("sua cidadania portuguesa dispensa visto"); } else if (EU.includes(d.id)) { s += 16; why.push("seu passaporte europeu dispensa visto de trabalho"); } }
    if (cid.includes("Italiana ou outra da União Europeia") && EU.includes(d.id)) { s += 18; why.push("seu passaporte europeu dispensa visto de trabalho"); }
    if (cid.includes("Espanhola")) { if (d.id === "espanha") { s += 30; why.push("sua cidadania espanhola dispensa visto"); } else if (EU.includes(d.id)) s += 14; }
    if (cid.includes("Sou descendente de japoneses") && d.id === "japao") { s += 36; why.push("sua ascendência japonesa abre o visto nikkei, sem restrição de trabalho"); }
    if (d.id === "japao" && !cid.includes("Sou descendente de japoneses") && lv("ja") < 2) s -= 18;
    if ((GOAL[obj] || []).includes(d.id)) { s += 8; why.push(`é um dos destinos mais usados para quem quer ${obj.toLowerCase().replace(" (até 1 ano)", "").replace(", como nômade digital", "")}`); }
    const young = age === "18 a 24" || age === "25 a 30";
    if (young && (d.id === "nova-zelandia" || d.id === "australia")) s += 5;
    if ((age === "36 a 45" || age === "46 ou mais") && ["canada", "australia", "nova-zelandia"].includes(d.id)) s -= 5;
    if ((AREA[area] || []).includes(d.id)) { s += 6; why.push(`há demanda na sua área (${area.toLowerCase()})`); }
    if (pri.includes("Ganhar mais")) s += (12 * d.salMedio) / maxSal;
    if (pri.includes("Segurança") && ["japao", "nova-zelandia", "holanda", "irlanda", "portugal"].includes(d.id)) s += 6;
    if (pri.includes("Visto mais fácil") && ["portugal", "espanha", "irlanda"].includes(d.id)) s += 6;
    if (pri.includes("Clima agradável") && d.tags.includes("quente")) s += 6;
    if (pri.includes("Custo de vida baixo")) s += (10 * minMes) / d.mensal[0];
    if (pri.includes("Comunidade brasileira por perto") && ["portugal", "estados-unidos", "japao", "irlanda"].includes(d.id)) s += 6;
    if (d.id === "estados-unidos" && !(lv("en") >= 3 && /Superior completo|Pós/.test(a.formacao || ""))) s -= 10;
    return { id: d.id, score: s, why };
  }).sort((x, y) => y.score - x.score);
}

export function pickVisa(d: Destino, a: Answers): Visto {
  const o = a.objetivo || "";
  const f = (re: RegExp) => d.vistos.find((v) => re.test(v.nome)) || d.vistos[0];
  if (/Estudar|Intercâmbio/.test(o)) return f(/estud|Student|Stamp 2|Ryugaku|F-1|Ausbildung/i);
  if (/nômade/.test(o)) return f(/nômade|teletrabajo|D8|Autônomo/i);
  if ((a.cidadania || []).includes("Sou descendente de japoneses") && d.id === "japao") return d.vistos[0];
  return d.vistos[1] || d.vistos[0];
}

export function localPlan(a: Answers): Plan {
  const sc = scoreAll(a);
  const top = sc[0].score, low = sc[sc.length - 1].score;
  const pct = (s: number) => Math.round(62 + (32 * (s - low)) / Math.max(1, top - low));
  const [, bMax] = BUDGET[a.orcamento || ""] || [0, 40000];
  return {
    when: Date.now(),
    answers: a,
    resumo: `Com ${a.orcamento ? a.orcamento.replace(/^Até/, "até").replace(/^Mais/, "mais") : "o seu orçamento"} para começar e o objetivo de ${String(a.objetivo || "ir para fora").toLowerCase()}, estes são os 3 países que mais combinam com o seu perfil na nossa base.`,
    destinos: sc.slice(0, 3).map((s) => {
      const d = byId[s.id];
      const visto = pickVisa(d, a);
      const gap = d.inicial[0] - bMax;
      return {
        id: d.id, match: pct(s.score),
        porQue: s.why.length ? "Combina com você porque " + s.why.slice(0, 3).join(", ") + "." : `É um destino com custo para começar de ${rangeK(d.inicial)} e salário mínimo de ${fmtBRL(d.salMin)}.`,
        vistoSugerido: visto.nome, porQueVisto: visto.para,
        orcamento: gap > 0
          ? `O custo para começar fica acima do que você tem hoje; faltam cerca de ${fmtBRL(gap)} para o piso. Dá para fechar a diferença juntando por mais alguns meses ou escolhendo a cidade mais barata.`
          : "Seu orçamento cobre o piso do custo para começar. Guarde a diferença como reserva para os primeiros meses sem emprego.",
        passos: d.dicas.slice(0, 4).concat(["Separe um mês para juntar e apostilar todos os documentos antes de dar entrada no visto."]),
        alerta: d.salMin < d.mensal[0] ? `Com salário mínimo, a conta não fecha em ${d.cidades[0].nome}: o custo de vida em quarto passa de ${fmtBRL(d.mensal[0])}.` : "",
      };
    }),
  };
}

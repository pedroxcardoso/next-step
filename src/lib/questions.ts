export type QType = "one" | "many" | "langs" | "text";
export type Question = {
  id: string; type: QType; title: string; hint?: string; opts?: string[]; max?: number; label?: string;
  langs?: [string, string][]; levels?: string[];
};
export type Answers = {
  objetivo?: string; lugar?: string[]; orcamento?: string; quando?: string; idiomas?: Record<string, number>;
  formacao?: string; area?: string; idade?: string; cidadania?: string[]; prioridade?: string[]; extra?: string;
};

export const QUESTIONS: Question[] = [
  { id: "objetivo", type: "one", title: "O que você quer fazer lá fora?", opts: ["Estudar", "Trabalhar", "Morar de vez", "Intercâmbio curto (até 1 ano)", "Trabalhar remoto, como nômade digital"] },
  { id: "lugar", type: "many", max: 3, title: "Que lugar combina com você?", hint: "Escolha até 3.", opts: ["Cidade grande e agitada", "Praia e calor", "Natureza e montanhas", "Cidade pequena e tranquila", "Frio e neve não me assustam"] },
  { id: "orcamento", type: "one", title: "Quanto você tem para começar?", hint: "Conte passagem, visto, caução e o dinheiro para se manter nos 3 primeiros meses.", opts: ["Até R$ 20 mil", "R$ 20 a 40 mil", "R$ 40 a 70 mil", "R$ 70 a 120 mil", "Mais de R$ 120 mil"] },
  { id: "quando", type: "one", title: "Quando você pretende ir?", opts: ["Nos próximos 6 meses", "Em 6 a 12 meses", "Em 1 a 2 anos", "Ainda sem data"] },
  { id: "idiomas", type: "langs", title: "Seu nível em outros idiomas", hint: "Seja honesto: isso muda bastante o resultado.", langs: [["en", "Inglês"], ["es", "Espanhol"], ["fr", "Francês"], ["de", "Alemão"], ["ja", "Japonês"], ["nl", "Holandês"]], levels: ["Nenhum", "Básico", "Intermediário", "Avançado"] },
  { id: "formacao", type: "one", title: "Qual é a sua formação?", opts: ["Ensino médio", "Curso técnico", "Superior incompleto", "Superior completo", "Pós, mestrado ou doutorado"] },
  { id: "area", type: "one", title: "Qual é a sua área?", hint: "Em que você trabalha hoje ou quer trabalhar lá fora.", opts: ["Tecnologia", "Saúde", "Engenharia", "Negócios e finanças", "Educação", "Hotelaria e serviços", "Construção e ofícios", "Criativa e comunicação", "Outra área"] },
  { id: "idade", type: "one", title: "Qual é a sua idade?", hint: "Alguns vistos, como o Working Holiday, têm limite de idade.", opts: ["18 a 24", "25 a 30", "31 a 35", "36 a 45", "46 ou mais"] },
  { id: "cidadania", type: "many", max: 4, title: "Tem outra cidadania?", hint: "Marque as que você tem ou tem direito de tirar.", opts: ["Só a brasileira", "Portuguesa", "Italiana ou outra da União Europeia", "Espanhola", "Sou descendente de japoneses"] },
  { id: "prioridade", type: "many", max: 2, title: "O que pesa mais na sua escolha?", hint: "Escolha até 2.", opts: ["Ganhar mais", "Segurança", "Visto mais fácil", "Clima agradável", "Custo de vida baixo", "Comunidade brasileira por perto"] },
  { id: "extra", type: "text", title: "Algo mais que devemos saber?", hint: "Opcional. Ex.: tenho um cachorro, quero fazer mestrado, já tenho oferta de emprego.", label: "Conte em poucas linhas" },
];

export const SHORT: Record<string, string> = { objetivo: "Objetivo", lugar: "Lugar", orcamento: "Orçamento", quando: "Quando", idiomas: "Idiomas", formacao: "Formação", area: "Área", idade: "Idade", cidadania: "Cidadania", prioridade: "Prioridade" };

export function answerText(q: Question, a: Answers): string {
  const v = (a as Record<string, unknown>)[q.id];
  if (q.type === "langs") {
    if (!v) return "";
    const L = v as Record<string, number>;
    const t = (q.langs || []).filter(([k]) => (L[k] || 0) > 0).map(([k, n]) => `${n} ${(q.levels || [])[L[k]].toLowerCase()}`);
    return t.length ? t.join(", ") : "Só português";
  }
  if (Array.isArray(v)) return v.join(", ");
  return (v as string) || "";
}

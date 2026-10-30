import { DESTINOS } from "@/lib/data";
import { rangeK } from "@/lib/format";

const STATUS: [string, string][] = [["Embarque", "s-board"], ["No horário", "s-ok"], ["Confirmado", "s-ok"], ["Última chamada", "s-board"], ["No horário", "s-ok"], ["Atrasado", ""]];

export const BOARD = DESTINOS.map((d, i) => {
  const h = 6 + Math.floor(i * 1.7), m = (i * 25 + 10) % 60;
  return {
    id: d.id,
    hora: String(h).padStart(2, "0") + ":" + String(m).padStart(2, "0"),
    destino: d.cidades[0].nome.toUpperCase(),
    pais: d.nome.toUpperCase(),
    custo: rangeK(d.inicial).toUpperCase(),
    gate: "ABCDE"[i % 5] + ((i * 3) % 9 + 1),
    status: STATUS[i % STATUS.length],
  };
});

export const addMinutes = (hhmm: string, add: number) => {
  const [h, m] = hhmm.split(":").map(Number);
  const t = (h * 60 + m + add) % (24 * 60);
  return String(Math.floor(t / 60)).padStart(2, "0") + ":" + String(t % 60).padStart(2, "0");
};

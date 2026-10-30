export const fmtBRL = (n: number) => "R$ " + Math.round(n).toLocaleString("pt-BR");
export const fmtK = (n: number) => (n >= 1000 ? (Math.round(n / 100) / 10).toLocaleString("pt-BR") + " mil" : String(n));
export const rangeK = ([a, b]: readonly [number, number] | number[]) => "R$ " + fmtK(a).replace(" mil", "") + "–" + fmtK(b);
export const host = (u: string) => { try { return new URL(u).hostname.replace(/^www\./, ""); } catch { return ""; } };

function lum(hex: string) {
  const v = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2];
}
export const inkFor = (hex: string) => (1.05 / (lum(hex) + 0.05) >= 4.5 ? "#ffffff" : "#0b1a33");

export const mapsUrl = (cidade: string, pais: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(cidade + ", " + pais)}`;
export const earthUrl = (lat: number, lng: number) => `https://earth.google.com/web/@${lat},${lng},300a,6000d,35y,0h,45t,0r`;
export const photo = (id: string) => `img/${id}.jpg`;

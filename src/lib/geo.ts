import { feature } from "topojson-client";
import type { Topology, GeometryCollection } from "topojson-specification";
import { asset } from "./utils";

export type CountryFeature = { id: string; geometry: { type: string; coordinates: number[][][] | number[][][][] }; properties: Record<string, unknown> };

let cache: Promise<CountryFeature[]> | null = null;

/** Country shapes for the globes (world-atlas 110m). Antarctica and degenerate rings are dropped. */
export function loadCountries(): Promise<CountryFeature[]> {
  if (!cache) {
    cache = fetch(asset("geo/countries-110m.json"))
      .then((r) => r.json())
      .then((topo: Topology) => {
        const fc = feature(topo, topo.objects.countries as GeometryCollection) as unknown as { features: CountryFeature[] };
        const okRing = (r: number[][]) => new Set(r.map((p) => p.join())).size >= 3;
        return fc.features
          .filter((f) => f.id !== "010" && f.geometry)
          .map((f) => {
            const g = f.geometry;
            if (g.type === "MultiPolygon") {
              const c = (g.coordinates as number[][][][]).filter((p) => okRing(p[0]));
              return c.length ? { ...f, geometry: { type: "MultiPolygon", coordinates: c } } : null;
            }
            return okRing((g.coordinates as number[][][])[0]) ? f : null;
          })
          .filter(Boolean) as CountryFeature[];
      });
  }
  return cache;
}

export const GRU = { lat: -23.4356, lng: -46.4731 };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type GlobeAny = any;

/** Creates a globe.gl instance in the browser only (the library touches window on import). */
export async function createGlobe(el: HTMLElement): Promise<GlobeAny> {
  const mod = await import("globe.gl");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const G = mod.default as any;
  return new G(el, { rendererConfig: { antialias: true, alpha: true } });
}

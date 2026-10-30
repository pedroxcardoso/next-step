"use client";

import { CAMBIO, DESTINOS, FOTOS_CREDITOS } from "@/lib/data";
import { PlaneIcon } from "@/components/shared/plane";
import { KineticHeading } from "@/components/shared/kinetic-heading";

export function Nav({ onHome, onSection, onStart }: { onHome: () => void; onSection: (id: string) => void; onStart: () => void }) {
  return (
    <header className="nav">
      <div className="wrap">
        <a className="mark" href="#" aria-label="Next Step, início" onClick={(e) => { e.preventDefault(); onHome(); }}>
          <PlaneIcon />Next Step
        </a>
        <nav aria-label="Seções">
          <ul>
            {[["como", "Como funciona"], ["destinos", "Destinos"], ["relatos", "Relatos"]].map(([id, t]) => (
              <li key={id}><a href={`#${id}`} onClick={(e) => { e.preventDefault(); onSection(id); }}>{t}</a></li>
            ))}
          </ul>
        </nav>
        <button className="btn btn--small" type="button" onClick={onStart}>Fazer check-in</button>
      </div>
    </header>
  );
}

export function FinalCta({ onStart }: { onStart: () => void }) {
  return (
    <section className="final" aria-labelledby="h-final">
      <div className="wrap final__grid">
        <KineticHeading id="h-final" text="Seu cartão sai em 3 minutos" />
        <div>
          <p>Fotos das cidades, globo 3D, orçamento comparado ao seu, salários, vistos, agências e relatos para cada destino.</p>
          <button className="btn btn--sign" type="button" onClick={onStart}>Começar o check-in <span className="arrow" aria-hidden="true">→</span></button>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const cityName: Record<string, string> = {};
  DESTINOS.forEach((d) => d.cidades.forEach((c) => (cityName[c.id] = c.nome)));
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot__grid">
          <div><h2>Sobre os números</h2><p>Custos, salários e regras de visto foram pesquisados em fontes públicas em outubro de 2026 e convertidos com câmbio de referência: {CAMBIO}. São estimativas para planejar, não aconselhamento jurídico ou migratório. Confirme sempre nos órgãos oficiais de cada país.</p></div>
          <div><h2>Sobre a recomendação</h2><p>O ranking é calculado no seu navegador a partir das suas respostas, com regras sobre orçamento, idioma, formação, idade, cidadania e prioridades. Suas respostas ficam só neste navegador.</p></div>
          <div><h2>Relatos</h2><p>Trechos resumidos de reportagens e blogs públicos, sem nomes. Cada relato leva à fonte original.</p></div>
        </div>
        <details>
          <summary>Créditos das fotos (Wikimedia Commons)</summary>
          <ul>
            {FOTOS_CREDITOS.map((c) => (
              <li key={c.id}><b>{cityName[c.id] || c.id}</b>: “{c.file.replace(/\.(jpe?g|png)$/i, "")}”, {c.artist}, <a href={c.licenseUrl || c.source} target="_blank" rel="noopener">{c.license}</a>, via <a href={c.source} target="_blank" rel="noopener">Wikimedia Commons</a>. Recortada e redimensionada.</li>
            ))}
          </ul>
        </details>
        <div className="foot__word" aria-hidden="true">Next Step</div>
      </div>
    </footer>
  );
}

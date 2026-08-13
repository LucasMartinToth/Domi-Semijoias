/*
  Home PLACEHOLDER — sessão de bootstrap.
  Objetivo: exercitar os tokens do design system (cores, tipografia, placeholders
  listrados, botões) extraídos do handoff. NÃO é a home final; ela vem depois,
  consumindo Medusa (produtos) e Sanity (conteúdo).
*/

const cores = [
  { nome: "brand", hex: "#96695e", uso: "títulos, preços, botões" },
  { nome: "cream", hex: "#ece9e5", uso: "fundo geral" },
  { nome: "ink", hex: "#2b201c", uso: "texto principal, blocos escuros" },
  { nome: "porcelain", hex: "#f6f2ee", uso: "claro sobre a marca" },
  { nome: "body", hex: "#5d4b44", uso: "parágrafos" },
  { nome: "muted", hex: "#6b574f", uso: "apoios curtos" },
  { nome: "subtle", hex: "#8b7a72", uso: "material do produto" },
  { nome: "nav", hex: "#4a3a34", uso: "menu, ícones" },
  { nome: "rose", hex: "#c9a99f", uso: "labels sobre escuro" },
];

const placeholders = [
  { classe: "stripe-product", rotulo: "produto · 4/5" },
  { classe: "stripe-hero", rotulo: "hero full-bleed" },
  { classe: "stripe-brand", rotulo: "banner de marca" },
  { classe: "stripe-dark", rotulo: "bloco escuro" },
];

export default function Home() {
  return (
    <>
      {/* Faixa de anúncio */}
      <div className="bg-brand text-porcelain text-center uppercase tracking-[0.16em] text-[9.5px] md:text-[11px] py-2 px-3">
        Frete grátis acima de R$ 299 · Site em construção
      </div>

      {/* Header */}
      <header className="sticky top-0 z-30 h-[58px] md:h-[76px] flex items-center justify-center border-b border-brand/20 bg-cream/95 backdrop-blur-md">
        <span className="domi-logo-mask block h-[28px] w-[92px] md:h-[36px] md:w-[118px]" />
      </header>

      {/* Hero placeholder */}
      <section className="relative min-h-[520px] md:min-h-[620px] flex items-end overflow-hidden">
        <div className="stripe-hero absolute inset-0" aria-hidden />
        <div
          className="absolute inset-0"
          aria-hidden
          style={{
            background:
              "linear-gradient(to top, #ece9e5 0%, rgba(236,233,229,0.82) 26%, rgba(236,233,229,0) 84%)",
          }}
        />
        <div className="relative w-full max-w-[1360px] mx-auto px-[22px] md:px-10 pb-[30px] md:pb-24 flex flex-col gap-4 md:max-w-[640px] md:mr-auto md:ml-[max(2.5rem,calc((100%-1360px)/2))]">
          <span className="uppercase tracking-[0.24em] text-[10px] text-brand">
            Semijoias · acabamento fino
          </span>
          <h1 className="font-serif text-brand leading-[1.05] text-[40px] md:text-[62px] md:-tracking-[0.01em]">
            Peças que ficam
          </h1>
          <p className="text-body font-light text-[14px] leading-[1.65] max-w-md">
            Design system em construção. Esta tela demonstra as fundações
            visuais da Domi — a home final chega nas próximas sessões.
          </p>
          <div className="grid md:flex gap-[10px] md:gap-[14px] max-w-md">
            <button className="bg-ink text-cream uppercase tracking-[0.18em] text-[11px] py-[17px] px-8 transition-colors hover:bg-brand">
              Explorar coleção
            </button>
            <button className="border border-ink/30 text-ink uppercase tracking-[0.18em] text-[11px] py-[15px] px-8 transition-colors hover:border-brand hover:text-brand">
              Sobre a Domi
            </button>
          </div>
        </div>
      </section>

      {/* --- Vitrine do design system --- */}
      <main className="max-w-[1360px] mx-auto w-full px-[22px] md:px-10 py-14 md:py-20 flex flex-col gap-16">
        <SectionHeader eyebrow="Bootstrap · sessão 1" titulo="Design system" />

        {/* Cores */}
        <div className="flex flex-col gap-5">
          <h3 className="uppercase tracking-[0.18em] text-[11px] text-muted">Cores</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {cores.map((c) => (
              <div key={c.nome} className="flex flex-col gap-2">
                <div
                  className="h-20 border border-ink/10"
                  style={{ backgroundColor: c.hex }}
                />
                <div className="text-[12.5px] text-ink">{c.nome}</div>
                <div className="font-mono text-[10.5px] text-subtle uppercase">{c.hex}</div>
                <div className="text-[11px] text-muted leading-[1.5]">{c.uso}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tipografia */}
        <div className="flex flex-col gap-5">
          <h3 className="uppercase tracking-[0.18em] text-[11px] text-muted">Tipografia</h3>
          <div className="flex flex-col gap-4 border-t border-brand/15 pt-6">
            <p className="font-serif text-brand text-[44px] md:text-[62px] leading-[1.04]">
              TAN Twinkle · display
            </p>
            <p className="font-serif text-ink text-[30px] leading-[1.1]">
              Serifada de títulos — fallback EB Garamond
            </p>
            <p className="text-body text-[15px] leading-[1.7] font-light max-w-2xl">
              Inter dá conta de todo o texto de interface e parágrafos. Pesos
              300, 400 e 500. Este parágrafo está em 15px / peso 300.
            </p>
            <p className="uppercase tracking-[0.2em] text-[11px] text-brand">
              Label · Inter · uppercase + tracking
            </p>
          </div>
        </div>

        {/* Placeholders listrados */}
        <div className="flex flex-col gap-5">
          <h3 className="uppercase tracking-[0.18em] text-[11px] text-muted">
            Placeholders de imagem
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {placeholders.map((p) => (
              <div key={p.classe} className="flex flex-col gap-2">
                <div className={`${p.classe} aspect-[4/5] border border-ink/10`} />
                <div className="font-mono text-[10.5px] text-subtle">{p.rotulo}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Botões */}
        <div className="flex flex-col gap-5">
          <h3 className="uppercase tracking-[0.18em] text-[11px] text-muted">Botões</h3>
          <div className="flex flex-wrap gap-3 items-center">
            <button className="bg-ink text-cream uppercase tracking-[0.18em] text-[11px] py-4 px-8 transition-colors hover:bg-brand">
              Primário
            </button>
            <button className="border border-ink/30 text-ink uppercase tracking-[0.18em] text-[11px] py-4 px-8 transition-colors hover:border-brand hover:text-brand">
              Secundário
            </button>
            <button className="bg-brand text-porcelain uppercase tracking-[0.18em] text-[11px] py-4 px-8">
              Marca
            </button>
            <span className="bg-cream text-brand uppercase tracking-[0.14em] text-[9px] py-1 px-2 border border-brand/25">
              Tag
            </span>
          </div>
        </div>
      </main>

      {/* Rodapé escuro */}
      <footer className="bg-ink text-cream mt-auto px-[22px] md:px-10 py-12 md:py-16">
        <div className="max-w-[1360px] mx-auto flex flex-col gap-6">
          <img
            src="/domi-logo.svg"
            alt="Domi"
            className="h-7 w-24"
            style={{ filter: "invert(1) brightness(0.94)" }}
          />
          <p className="text-[13px] leading-[1.6] text-cream/70 max-w-sm">
            Semijoias com acabamento fino. Loja em construção — voltamos em breve.
          </p>
          <p className="font-mono text-[10.5px] text-rose uppercase tracking-[0.14em]">
            Bootstrap · design system extraído do handoff
          </p>
        </div>
      </footer>
    </>
  );
}

function SectionHeader({ eyebrow, titulo }: { eyebrow: string; titulo: string }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="uppercase tracking-[0.2em] text-[10px] text-brand">{eyebrow}</span>
      <h2 className="font-serif text-ink text-[30px] md:text-[44px] leading-[1.05]">{titulo}</h2>
    </div>
  );
}

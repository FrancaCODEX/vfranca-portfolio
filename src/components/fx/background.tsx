/** Fundo do Hero: grade + "aurora" de luz vermelha. Puramente decorativo. */
export function HeroBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="bg-grid absolute inset-0" />
      <div className="absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 animate-aurora rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--accent)_28%,transparent),transparent)] blur-3xl" />
      <div className="absolute -right-40 top-40 h-[380px] w-[380px] animate-aurora rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,#ffffff_10%,transparent),transparent)] blur-3xl [animation-delay:-6s]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg" />
    </div>
  );
}

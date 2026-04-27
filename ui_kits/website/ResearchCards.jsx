function ResearchCards() {
  const refs = [
    { a: 'Jonathan Shay', y: '1994 · 2002', c: 'Fundação conceitual de Moral Injury a partir da experiência de veteranos norte-americanos.' },
    { a: 'Brett Litz', y: '2009', c: 'Estruturação clínica — atos que violam profundamente a bússola moral do sujeito.' },
    { a: 'Lauren Farnsworth', y: '2014', c: 'Moral Injury aplicado a contextos profissionais não-militares.' },
  ];
  return (
    <section id="pesquisa" className="section container">
      <span className="eyebrow-editorial">Pesquisa · Lesão Moral Ocupacional</span>
      <h2 className="mt-4 mb-6" style={{ maxWidth: '26ch' }}>Autores fundadores do campo, citados como em aula magna.</h2>
      <div className="grid grid-3">
        {refs.map(r => (
          <article key={r.a} className="ref-card">
            <div>
              <div className="ref-author">{r.a}</div>
              <span className="ref-year">{r.y}</span>
            </div>
            <p className="ref-concept">{r.c}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
window.ResearchCards = ResearchCards;

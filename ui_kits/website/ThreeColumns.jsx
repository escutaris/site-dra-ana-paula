function ThreeColumns() {
  const cols = [
    { n: '01', t: 'Medicina do trabalho', b: 'Trinta anos de prática clínica e corporativa em saúde ocupacional. CRM-BA 12797, RQE 7237.' },
    { n: '02', t: 'Autoria de referência', b: 'Quando o Trabalho Dói — ensaio lido por líderes, RHs, médicos e pesquisadores.' },
    { n: '03', t: 'Pesquisa em Lesão Moral', b: 'Mestranda com pesquisa inédita sobre Moral Injury aplicado ao trabalho no Brasil.' },
  ];
  return (
    <section className="section container">
      <span className="eyebrow-editorial">Três colunas de autoridade</span>
      <h2 className="mt-4 mb-6" style={{ maxWidth: '26ch' }}>Ciência, autoria e pesquisa — sustentadas entre si.</h2>
      <div className="grid grid-3">
        {cols.map(c => (
          <article key={c.n} className="card-clareza card-bar-left">
            <span className="eyebrow">Coluna · {c.n}</span>
            <h3 className="card-title">{c.t}</h3>
            <p className="card-body">{c.b}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
window.ThreeColumns = ThreeColumns;

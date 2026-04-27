function ServiceCards() {
  const services = [
    { n: '01', t: 'Palestra corporativa', b: 'Conselho executivo com linguagem de risco e resultado, para C-level e heads de gente.', cta: 'Solicitar proposta' },
    { n: '02', t: 'Roda de conversa', b: 'Encontro de médio porte sobre adoecimento no trabalho, Moral Injury e responsabilidade técnica.', cta: 'Agendar encontro' },
    { n: '03', t: 'Livro · Quando o Trabalho Dói', b: 'Ensaio editorial adotado por conselhos e C-level. Leitura obrigatória antes da conversa sobre Moral Injury e NR-1.', cta: 'Sobre o livro' },
    { n: '04', t: 'Círculo Técnico NR-1', b: 'Encontros executivos preparando a organização para o prazo de 26 de maio de 2026. Multa de R$ 6.708,08 por trabalhador exposto.', cta: 'Inscrever liderança' },
  ];
  return (
    <section id="servicos" className="section container">
      <span className="eyebrow-editorial">Serviços</span>
      <h2 className="mt-4 mb-6">Para organizações que tratam a ética como ativo de saúde.</h2>
      <div className="grid grid-2">
        {services.map(s => (
          <article key={s.n} className="card-clareza" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <span className="eyebrow">Serviço · {s.n}</span>
            <h3 className="card-title" style={{ marginTop: 0 }}>{s.t}</h3>
            <p className="card-body">{s.b}</p>
            <a href="#contato" className="btn-ghost" style={{ marginTop: 'auto' }}>{s.cta} <span className="arrow">→</span></a>
          </article>
        ))}
      </div>
    </section>
  );
}
window.ServiceCards = ServiceCards;

function Hero() {
  return (
    <header className="section section-loose container">
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 440px)', gap: '64px', alignItems: 'center' }}>
        <div>
          <span className="eyebrow-editorial">Ana Paula Teixeira · Saúde mental · Medicina do trabalho</span>
          <h1 className="display" style={{ marginTop: 32, maxWidth: '22ch' }}>
            Nomear o que adoece. Construir o que cura.
          </h1>
          <hr className="divider-editorial-lg divider-editorial" />
          <p className="lead" style={{ maxWidth: '44rem' }}>
            Médica do trabalho com trinta anos de prática clínica e corporativa, autora de <em>Quando o Trabalho Dói</em> e pesquisadora pioneira de Lesão Moral Ocupacional no contexto organizacional brasileiro.
          </p>
          <div className="flex gap-3 mt-6" style={{ flexWrap: 'wrap' }}>
            <a href="#contato" className="btn btn-primary">Marcar consultoria</a>
            <a href="#livro" className="btn btn-secondary">Conhecer o livro</a>
          </div>
          <div className="flex gap-4 mt-6" style={{ flexWrap: 'wrap', alignItems: 'center' }}>
            <span className="label">CRM-BA 12797</span>
            <span style={{ color: 'var(--border-strong)' }}>·</span>
            <span className="label">RQE 7237</span>
            <span style={{ color: 'var(--border-strong)' }}>·</span>
            <span className="label">Board Member ICOH</span>
          </div>
        </div>
        <div>
          <img src="../../assets/portrait-hero.png" alt="Dra. Ana Paula Teixeira" style={{ width: '100%', height: 'auto', borderRadius: 2, filter: 'saturate(0.95)' }} />
        </div>
      </div>
    </header>
  );
}
window.Hero = Hero;

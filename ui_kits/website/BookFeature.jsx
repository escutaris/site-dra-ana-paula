function BookFeature() {
  return (
    <section id="livro" className="modo-profundidade" style={{ background: 'var(--verde-noturno)' }}>
      <div className="section container" style={{ display: 'grid', gap: 64, gridTemplateColumns: 'minmax(0, 1fr)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(240px, 320px) 1fr', gap: 64, alignItems: 'center' }}>
          <img src="../../assets/book-cover-real.png" alt="Capa do livro Quando o Trabalho Dói" style={{ width: '100%', height: 'auto', borderRadius: 2, boxShadow: '0 10px 40px rgba(0,0,0,.35)' }} />
          <div>
            <span className="eyebrow-editorial" style={{ color: 'var(--off-white)' }}>Livro</span>
            <h2 style={{ marginTop: 24, color: 'var(--off-white)', fontStyle: 'italic', fontWeight: 600 }}>Quando o Trabalho Dói</h2>
            <hr className="divider-editorial" style={{ marginBlock: 24 }} />
            <p className="lead" style={{ color: 'var(--off-white-80)', maxWidth: '38rem' }}>
              Ensaio de referência sobre saúde mental no trabalho. Escrito por médica do trabalho com trinta anos de prática clínica e corporativa, para líderes que tratam adoecimento como risco mensurável.
            </p>
            <div className="pullquote" style={{ borderLeftColor: 'var(--terracota)', marginTop: 32 }}>
              <p className="pullquote-text" style={{ color: 'var(--off-white)' }}>
                Nem todo burnout é burnout. Às vezes é a ruptura da integridade moral que ninguém nomeou.
              </p>
              <span className="pullquote-attr" style={{ color: 'var(--off-white-80)' }}>Capítulo III · Lesão Moral Ocupacional</span>
            </div>
            <div className="flex gap-3 mt-6" style={{ flexWrap: 'wrap' }}>
              <a href="#" className="btn btn-primary">Comprar exemplar</a>
              <a href="#" className="btn btn-secondary">Ler trecho</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
window.BookFeature = BookFeature;

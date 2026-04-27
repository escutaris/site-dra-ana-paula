function Footer() {
  return (
    <footer className="footer" id="contato">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="logo-main" style={{ color: 'var(--off-white)', marginBottom: 20 }}>
              <span className="dra">dra.</span>ANA PAULA TEIXEIRA
            </div>
            <p className="footer-anchor">
              Porque empresas íntegras cuidam, com seriedade, do que impacta pessoas, cultura e trabalho.
            </p>
          </div>
          <div>
            <div className="footer-col-title">Navegar</div>
            <div className="stack-3">
              <div><a href="#sobre">Sobre</a></div>
              <div><a href="#servicos">Serviços</a></div>
              <div><a href="#livro">Livro</a></div>
              <div><a href="#pesquisa">Pesquisa</a></div>
              <div><a href="#materiais">Materiais</a></div>
              <div><a href="#midia">Na Mídia</a></div>
            </div>
          </div>
          <div>
            <div className="footer-col-title">Contato</div>
            <div className="stack-3">
              <div><a href="mailto:contato@anapaulateixeira.med.br">contato@anapaulateixeira.med.br</a></div>
              <div><a href="https://wa.me/5575983186200">WhatsApp</a></div>
              <div><a href="https://instagram.com/draanapaulateixeira">@draanapaulateixeira</a></div>
              <div><a href="https://linkedin.com/in/draanapaulateixeira">LinkedIn</a></div>
            </div>
          </div>
        </div>
        <div className="footer-meta">
          <span>CRM-BA 12797 · RQE 7237 · Board Member ICOH</span>
          <span>© 2026 Dra. Ana Paula Teixeira · anapaulateixeira.med.br · <a href="politica-privacidade.html" style={{color:'inherit',borderBottom:'1px solid rgba(245,239,229,.3)',textDecoration:'none'}}>Política de Privacidade</a></span>
        </div>
      </div>
    </footer>
  );
}
window.Footer = Footer;

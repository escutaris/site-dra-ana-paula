function Nav({ current = 'home' }) {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const items = [
    ['home', 'Início'],
    ['sobre', 'Sobre'],
    ['servicos', 'Serviços'],
    ['livro', 'Livro'],
    ['pesquisa', 'Pesquisa'],
    ['materiais', 'Materiais'],
    ['midia', 'Na Mídia'],
    ['contato', 'Contato'],
  ];
  return (
    <nav className={`nav ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
      <div className="nav-inner">
        <a href="#home" className="logo" aria-label="Dra. Ana Paula Teixeira — Início">
          <span className="logo-main"><span className="dra">dra.</span>ANA PAULA TEIXEIRA</span>
        </a>
        <ul className="nav-list">
          {items.map(([key, label]) => (
            <li key={key}>
              <a href={`#${key}`}
                 className="nav-link"
                 aria-current={current === key ? 'page' : undefined}
                 onClick={() => setOpen(false)}>
                {label}
              </a>
            </li>
          ))}
        </ul>
        <button className="nav-toggle"
                aria-label={open ? 'Fechar menu' : 'Abrir menu'}
                aria-expanded={open}
                onClick={() => setOpen(o => !o)}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="#1C3520" strokeWidth="1.5">
            {open ? (<><line x1="4" y1="4" x2="18" y2="18"/><line x1="18" y1="4" x2="4" y2="18"/></>)
                  : (<><line x1="3" y1="7" x2="19" y2="7"/><line x1="3" y1="15" x2="19" y2="15"/></>)}
          </svg>
        </button>
      </div>
    </nav>
  );
}
window.Nav = Nav;

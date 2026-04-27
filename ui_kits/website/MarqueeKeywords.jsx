function MarqueeKeywords({ inverse = false }) {
  const items = ['NR-1', 'Moral Injury', 'Medicina do trabalho', 'Integridade organizacional', 'Liderança ética', 'Empresas Íntegras'];
  const all = [...items, ...items];
  return (
    <div className={`marquee ${inverse ? 'is-inverse' : ''}`}>
      <div className="marquee-track" data-duplicated="1">
        {all.map((t, i) => <span key={i} className="marquee-item">{t}</span>)}
      </div>
    </div>
  );
}
window.MarqueeKeywords = MarqueeKeywords;

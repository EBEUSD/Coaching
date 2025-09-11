import s from "./PlayerTheoryGrid.module.css";

export default function PlayerTheoryGrid({ items = [] }) {
  return (
    <div className={s.card}>
      <div className={s.header}>
        <h3 className={s.title}>Teóricos</h3>
        <input className={s.search} placeholder="Buscar..." onChange={()=>{}} />
      </div>
      <div className={s.grid}>
        {items.map((t) => (
          <article className={s.item} key={t.slug}>
            <div className={s.kicker}>{t.category}</div>
            <h4 className={s.name}>{t.title}</h4>
            <div className={s.tags}>{t.tags?.join(" · ")}</div>
          </article>
        ))}
      </div>
    </div>
  );
}

import s from "./PlayerTaskList.module.css";

export default function PlayerTaskList({ tasks = [] }) {
  return (
    <div className={s.card}>
      <div className={s.header}>
        <h3 className={s.title}>Tareas</h3>
        <span className={s.counter}>{tasks.length}</span>
      </div>
      <ul className={s.list}>
        {tasks.map(t => (
          <li key={t.id} className={s.item}>
            <div className={s.left}>
              <span className={s.badge}>{t.type}</span>
              <div className={s.texts}>
                <div className={s.name}>{t.title}</div>
                <div className={s.desc}>{t.desc}</div>
              </div>
            </div>
            {t.deadline && <div className={s.deadline}>⏳ {t.deadline}</div>}
          </li>
        ))}
      </ul>
    </div>
  );
}

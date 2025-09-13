import { Link } from "react-router-dom";
import styles from "./Teorico.module.css";

export default function TeoricoLayout({ title, summary, tags = [], children }) {
  return (
    <section className={styles.page}>
      <div className={styles.wrap}>
        <header className={styles.header}>
           <div className={styles.btnSup}>
            <Link to="/biblioteca" className={styles.btn}>
              Volver
            </Link>
          </div>
          <h1 className={styles.title}>{title}</h1>
         

          {summary ? <p className={styles.subtitle}>{summary}</p> : null}
          {!!tags.length && (
            <div className={styles.tags}>
              {tags.map((t) => (
                <span key={t} className={styles.tag}>
                  {t}
                </span>
              ))}
            </div>
          )}
        </header>
        <div className={styles.body}>{children}</div>
        <div className={styles.footer}>
          <Link to="/biblioteca" className={styles.btn}>
            Volver
          </Link>
        </div>
      </div>
    </section>
  );
}

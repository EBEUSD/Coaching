import styles from "./SharedHeader.module.css";

export default function SharedHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.wrap}>
        <div className={styles.brand}>EBEUS · Coaching</div>
        <nav className={styles.nav}>
          <a href="/" className={styles.link}>Inicio</a>
          <a href="/biblioteca" className={styles.link}>Biblioteca</a>
          <a href="/vods" className={styles.link}>VODs</a>
          <a href="/tareas" className={styles.link}>Tareas</a>
          <a href="/login" className={styles.btn}>Ingresar</a>
        </nav>
      </div>
    </header>
  );
}

import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/Firebase";
import styles from "./TeoricoCard.module.css";

export default function TeoricoCard({
  id,
  title,
  description,
  tags = [],
  hidden = false,
  canManage = false, 
  currentUser,      
  onToggled,       
}) {
  const handleToggleHidden = async () => {
    try {
      await updateDoc(doc(db, "teoricos", id), {
        hidden: !hidden,
        hiddenAt: serverTimestamp(),
        hiddenBy: currentUser?.uid || null,
      });
      onToggled?.(id, !hidden);
    } catch (e) {
      console.error("Error al cambiar visibilidad:", e);
      alert("No se pudo actualizar la visibilidad.");
    }
  };

  return (
    <div className={`${styles.card} ${hidden ? styles.isHidden : ""}`}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>

        {canManage && (
          <button
            className={`${styles.toggleBtn} ${hidden ? styles.show : styles.hide}`}
            onClick={handleToggleHidden}
            title={hidden ? "Mostrar a jugadores" : "Ocultar a jugadores"}
          >
            {hidden ? "Mostrar" : "Ocultar"}
          </button>
        )}
      </div>

      <p className={styles.description}>{description}</p>

      <div className={styles.tags}>
        {tags.map((t) => (
          <span className={styles.tag} key={t}>{t}</span>
        ))}
      </div>

      <div className={styles.footer}>
        <button className={styles.primary}>Ver</button>
      </div>
    </div>
  );
}

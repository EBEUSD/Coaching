import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { FaBook, FaVideo, FaTasks } from "react-icons/fa";
import styles from "./Hero.module.css";
import mock from "../../../assets/hero-mock.webp";

export default function Hero() {
  const { user } = useAuth();

  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <span className={styles.kicker}>EBEUS · Coaching</span>
          <h1 className={styles.title}>
            Entrena con <span className={styles.gradient}>estructura</span> y claridad
          </h1>
          <p className={styles.subtitle}>
            Plataforma para organizar teóricos, VODs y tareas de forma privada.
          </p>

          {!user && (
            <div className={styles.ctaRow}>
              <Link to="/login" className={styles.btnPrimary}>Ingresar</Link>
              <Link to="/biblioteca" className={styles.btnGhost}>Ver biblioteca</Link>
            </div>
          )}

          <div className={styles.chips}>
            <span className={styles.chip}>Teóricos</span>
            <span className={styles.chip}>VOD review</span>
            <span className={styles.chip}>Tareas</span>
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.mockWrap}>
            <img src={mock} alt="Vista previa" className={styles.mockImg} />
          </div>
        </div>
      </div>

      <div className={styles.features}>
        <div className={styles.feature}>
          <div className={styles.iconBox}><FaBook className={styles.icon} /></div>
          <div>
            <h3 className={styles.featureTitle}>Teóricos</h3>
            <p className={styles.featureText}>Contenido claro y ordenado.</p>
          </div>
        </div>
        <div className={styles.feature}>
          <div className={styles.iconBox}><FaVideo className={styles.icon} /></div>
          <div>
            <h3 className={styles.featureTitle}>VOD Review</h3>
            <p className={styles.featureText}>Analiza partidas con feedback.</p>
          </div>
        </div>
        <div className={styles.feature}>
          <div className={styles.iconBox}><FaTasks className={styles.icon} /></div>
          <div>
            <h3 className={styles.featureTitle}>Tareas</h3>
            <p className={styles.featureText}>Objetivos y seguimiento privado.</p>
          </div>
        </div>
      </div>

      {!user && (
        <div className={styles.bottomCta}>
          <h2 className={styles.bottomTitle}>Empieza a entrenar hoy mismo</h2>
          <Link to="/login" className={styles.btnPrimaryLg}>Ingresar</Link>
        </div>
      )}
    </section>
  );
}

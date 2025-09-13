import TeoricoLayout from "../TeoricoLayout.jsx";
import styles from "../Teorico.module.css";

export default function Roles() {
  return (
    <TeoricoLayout
      title="Teórico de Roles"
      summary="Guía práctica de Duelista, Iniciador (Flasher/Spotter), Controlador y Centinela."
      tags={["roles", "duelista", "flasher", "spotter", "controlador", "centinela"]}
    >
      <section className={styles.block}>
        <h2 className={styles.h2}>Duelista</h2>
        <div className={styles.grid2}>
          <div>
            <h3 className={styles.h3}>Identidad</h3>
            <ul className={styles.ul}>
              <li>Abrir espacios y generar la primera presión.</li>
              <li>Impacto temprano por encima de kills.</li>
            </ul>
            <h3 className={styles.h3}>Responsabilidades</h3>
            <ul className={styles.ul}>
              <li>Entry con utilidad sincronizada.</li>
              <li>Presión constante y desgaste de setups.</li>
              <li>Dejar trade claro si muere.</li>
              <li>Timing de lurks agresivos.</li>
            </ul>
          </div>
          <div>
            <div className={`${styles.callout} ${styles.ok}`}>
              <strong>Correcto</strong>
              <p>Jett dasha, revela posiciones y fuerza utilidades. El equipo entra y planta.</p>
            </div>
            <div className={`${styles.callout} ${styles.warn}`}>
              <strong>Incorrecto</strong>
              <p>Raze entra sola, no hay trade. Se pierde el control del site.</p>
            </div>
          </div>
        </div>

        <h3 className={styles.h3}>Lo que NO debe hacer</h3>
        <ul className={styles.ul}>
          <li>Buscar kills por ego.</li>
          <li>Entrar sin esperar utilidad.</li>
          <li>Quedarse atrás para tradear.</li>
          <li>Romper el plan por impulsividad.</li>
        </ul>

        <h3 className={styles.h3}>Checklist pre-ronda</h3>
        <div className={styles.checklist}>
          <label><input type="checkbox" /> Utilidad lista para abrir</label>
          <label><input type="checkbox" /> Compañeros en posición de trade</label>
          <label><input type="checkbox" /> Ángulo prioritario definido</label>
          <label><input type="checkbox" /> Vía de escape pensada</label>
          <label><input type="checkbox" /> Entro para sumar, no para brillar</label>
        </div>
      </section>

      <section className={styles.block}>
        <h2 className={styles.h2}>Iniciador Flasher</h2>
        <div className={styles.grid2}>
          <div>
            <h3 className={styles.h3}>Responsabilidades</h3>
            <ul className={styles.ul}>
              <li>Habilitar entradas seguras.</li>
              <li>Liderar agresiones defensivas.</li>
              <li>Romper setups y generar info.</li>
              <li>Marcar el tempo de la ejecución.</li>
            </ul>
            <h3 className={styles.h3}>Mecánicas</h3>
            <ul className={styles.ul}>
              <li>Lineups close/deep/anti-Op.</li>
              <li>Timing de release inesperado.</li>
              <li>Encadenar primera y segunda flash.</li>
            </ul>
          </div>
          <div>
            <div className={styles.callout}>
              <strong>Frase clave</strong>
              <p>Mi luz es tu kill.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.block}>
        <h2 className={styles.h2}>Iniciador Spotter</h2>
        <ul className={styles.ul}>
          <li>Obtener info fiable y accionable.</li>
          <li>Condicionar rotaciones con presencia de utilidad.</li>
          <li>Desarmar trampas y habilitar reveals.</li>
        </ul>
      </section>

      <section className={styles.block}>
        <h2 className={styles.h2}>Controlador</h2>
        <div className={styles.grid2}>
          <div>
            <ul className={styles.ul}>
              <li>Decidir qué ángulos existen con humos.</li>
              <li>Manipular timings y aislar zonas.</li>
              <li>Guardar utilidad para momentos críticos.</li>
            </ul>
          </div>
          <div className={`${styles.callout} ${styles.info}`}>
            <strong>Tip</strong>
            <p>Smokes de split + flash coordinada reducen crossfires y simplifican el entry.</p>
          </div>
        </div>
      </section>

      <section className={styles.block}>
        <h2 className={styles.h2}>Centinela</h2>
        <ul className={styles.ul}>
          <li>Info pasiva y delay defensivo.</li>
          <li>Anti-lurks y seguridad de post-plant.</li>
          <li>Mantener red de control en rotaciones.</li>
        </ul>
        <div className={styles.checklist}>
          <label><input type="checkbox" /> Trampas cubren ángulos útiles</label>
          <label><input type="checkbox" /> Delay mínimo 5–10s planificado</label>
          <label><input type="checkbox" /> Plan de post-plant listo</label>
        </div>
      </section>
    </TeoricoLayout>
  );
}

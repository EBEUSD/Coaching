import TeoricoLayout from "../TeoricoLayout.jsx";
import styles from "../Teorico.module.css";

export default function Disciplina() {
  return (
    <TeoricoLayout
      title="La Disciplina Competitiva"
      summary="La disciplina no mata la creatividad: la estructura para que siempre sume al equipo."
      tags={["mentalidad","sistema","comunicación","profesionalismo"]}
    >
      <section className={styles.block}>
        <h2 className={styles.h2}>1. Introducción</h2>
        <div className={styles.grid2}>
          <ul className={styles.ul}>
            <li>La disciplina es el cimiento de cualquier equipo que compite en serio.</li>
            <li>La mecánica importa, pero sin disciplina el plan se desmorona.</li>
            <li>Es apegarse a los conceptos del sistema incluso cuando “yo haría otra cosa”.</li>
            <li>Un equipo sin disciplina es un grupo de cinco jugadores; con disciplina, es un sistema competitivo.</li>
          </ul>
          <div className={`${styles.callout} ${styles.info}`}>
            <strong>Idea fuerza</strong>
            <p>La disciplina convierte talento suelto en resultados repetibles.</p>
          </div>
        </div>
      </section>

      <section className={styles.block}>
        <h2 className={styles.h2}>2. Qué significa la disciplina</h2>
        <ul className={styles.ul}>
          <li>Poner el plan colectivo por encima de la intuición individual.</li>
          <li>Confiar en el protocolo aunque creas que “saco una kill extra”.</li>
          <li>No adelantarse por ego aunque tengas buena mano.</li>
          <li>Morir donde el equipo espera que mueras para asegurar el trade.</li>
          <li>La disciplina estructura la creatividad para que sume al equipo.</li>
        </ul>
      </section>

      <section className={styles.block}>
        <h2 className={styles.h2}>3. Por qué es fundamental</h2>
        <ul className={styles.ul}>
          <li>Coherencia táctica: sin disciplina, el plan se rompe y el rival domina el mapa.</li>
          <li>Confianza interna: compañeros confiables porque sabés dónde están y qué hacen.</li>
          <li>Automatización: los conceptos se vuelven reflejos, no decisiones improvisadas.</li>
          <li>Resiliencia: bajo presión, lo que sostiene es la disciplina, no la improvisación.</li>
          <li>Los rivales de mayor nivel se ganan con estructura, no con highlights.</li>
        </ul>
      </section>

      <section className={styles.block}>
        <h2 className={styles.h2}>4. La lucha entre lo individual y lo colectivo</h2>
        <div className={styles.grid2}>
          <div>
            <h3 className={styles.h3}>Lo individual</h3>
            <ul className={styles.ul}>
              <li>“Asomo, mato y gano el round”.</li>
            </ul>
            <h3 className={styles.h3}>Lo colectivo</h3>
            <ul className={styles.ul}>
              <li>“Espero, hago delay y mi equipo llega a tiempo”.</li>
            </ul>
          </div>
          <div className={`${styles.callout} ${styles.warn}`}>
            <strong>Principio competitivo</strong>
            <p>El highlight gana una ronda; la disciplina gana la serie.</p>
          </div>
        </div>
      </section>

      <section className={styles.block}>
        <h2 className={styles.h2}>5. Cómo se ve la disciplina en ataque</h2>
        <ul className={styles.ul}>
          <li>Respetar timings: no entrar antes de la utilidad ni después del entry.</li>
          <li>Cumplir tu rol: el lurker no aparece en site con los demás; el entry no queda último.</li>
          <li>Guardar utilidad clave para el post-plant.</li>
          <li>Rotar cuando lo marca el IGL aunque creas que “A está libre”.</li>
        </ul>
        <div className={styles.callout}>
          <strong>Definición</strong>
          <p>La disciplina ofensiva hace que el plan de ejecución sea más fuerte que el impulso individual.</p>
        </div>
      </section>

      <section className={styles.block}>
        <h2 className={styles.h2}>6. Cómo se ve la disciplina en defensa</h2>
        <ul className={styles.ul}>
          <li>No rotar por ruido: rotar por confirmación real.</li>
          <li>Jugar con delay en lugar de buscar la kill egoísta.</li>
          <li>Mantener setups aunque tengas ganas de pushear.</li>
          <li>Confiar en la comunicación y cobertura del compañero.</li>
        </ul>
        <div className={styles.callout}>
          <strong>Definición</strong>
          <p>La disciplina defensiva evita que el site se pierda por un error individual; se pelea como sistema.</p>
        </div>
      </section>

      <section className={styles.block}>
        <h2 className={styles.h2}>7. Disciplina en la comunicación</h2>
        <ul className={styles.ul}>
          <li>No hablar de más ni cortar la call del IGL.</li>
          <li>Durante la ronda: info concreta. Opiniones y feedback en freeze time.</li>
          <li>Una palabra fuera de lugar rompe más rondas que una bala fallada.</li>
        </ul>
      </section>

      <section className={styles.block}>
        <h2 className={styles.h2}>8. Disciplina y mentalidad profesional</h2>
        <div className={styles.grid2}>
          <ul className={styles.ul}>
            <li>La disciplina no es castigo: es un privilegio de jugar dentro de un sistema.</li>
            <li>El amateur busca su jugada; el profesional busca la jugada que hace ganar al equipo.</li>
          </ul>
          <div className={`${styles.callout} ${styles.info}`}>
            <strong>Identidad</strong>
            <p>Jugar disciplinado = pertenecer a algo más grande que uno mismo.</p>
          </div>
        </div>
      </section>

      <section className={styles.block}>
        <h2 className={styles.h2}>9. Indisciplina más común</h2>
        <ul className={styles.ul}>
          <li>Pushear solo “porque sentías que había uno”.</li>
          <li>Tirar dos flashes al mismo tiempo sin coordinar.</li>
          <li>Rotar por pasos sin confirmación real.</li>
          <li>Hablar encima del IGL en un clutch.</li>
          <li>Morir con utilidad porque “querías pegar con el rifle”.</li>
        </ul>
        <div className={`${styles.callout} ${styles.warn}`}>
          <strong>Consecuencia</strong>
          <p>No son errores aislados: son traiciones al sistema colectivo.</p>
        </div>
      </section>

      <section className={styles.block}>
        <h2 className={styles.h2}>10. Frases de identidad</h2>
        <ul className={styles.ul}>
          <li>“El highlight gana clips. La disciplina gana torneos.”</li>
          <li>“No juego para lo que quiero, juego para lo que necesitamos.”</li>
          <li>“La kill no me hace profesional. La disciplina sí.”</li>
          <li>“Si rompo el plan, rompo al equipo. Si sigo el plan, lo potencio.”</li>
        </ul>
      </section>
    </TeoricoLayout>
  );
}

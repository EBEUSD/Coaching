import s from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={s.wrap}>
      <div className={s.bg} aria-hidden />
      <div className={s.card}>
        <div className={s.kicker}>EBEUS · Coaching</div>
        <h1 className={s.title}>Entrena con estructura y claridad</h1>
        <p className={s.subtitle}>
          Plataforma personal para organizar teóricos, VODs y tareas de forma privada.
        </p>
        <div className={s.actions}>
          <a className={`${s.btn} ${s.primary}`} href="/login">Ingresar</a>
          <a className={`${s.btn} ${s.ghost}`} href="/biblioteca">Ver biblioteca</a>
        </div>
      </div>
    </section>
  );
}

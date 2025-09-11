import s from "./Biblioteca.module.css";

export default function Biblioteca() {
  const teoricos = [
    "Toma de decisiones",
    "Game Sense",
    "Mentalidad competitiva y control emocional",
    "Trabajo en equipo y comunicación",
    "Control de mapa y posicionamiento",
    "Gestión de economía y valorización",
    "Entendimiento profundo de los roles",
    "Uso inteligente de habilidades",
    "Conocimiento de los mapas",
    "Protocolos de retake/postplant",
  ];
  return (
    <section className={s.card}>
      <h2 className={s.title}>Biblioteca</h2>
      <ul className={s.list}>
        {teoricos.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    </section>
  );
}

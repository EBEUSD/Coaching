import s from "./Tareas.module.css";
import PlayerTaskList from "../../components/player/PlayerTaskList/PlayerTaskList.jsx";
import StaffTaskManager from "../../components/staff/StaffTaskManager/StaffTaskManager.jsx";

export default function Tareas() {
  const user = JSON.parse(localStorage.getItem("session_user") || "null");
  const isStaff =
    user && ["owner", "coach", "analyst", "content"].includes(user.role);
  const playerTasks = [
    {
      id: "t1",
      type: "ranked",
      title: "10 ranked semanales",
      desc: "Subí links de partidas clave",
      deadline: "Dom",
    },
    {
      id: "t2",
      type: "vod",
      title: "Ver VOD Ascent #1",
      desc: "Dejar 5 notas con timestamps",
    },
  ];
  const staffInitial = [
    {
      id: "t1",
      title: "Revisión VOD vs Team X",
      desc: "Marcar 5 momentos clave",
      type: "vod",
    },
    {
      id: "t2",
      title: "Quiz: control de mapa",
      desc: "10 preguntas",
      type: "quiz",
    },
  ];
  return (
    <section className={s.card}>
      <h2 className={s.title}>Tareas</h2>
      {isStaff ? (
        <StaffTaskManager initial={staffInitial} />
      ) : (
        <PlayerTaskList tasks={playerTasks} />
      )}
    </section>
  );
}

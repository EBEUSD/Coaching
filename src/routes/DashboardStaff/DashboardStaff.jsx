import vods from "../../data/vods.json";
import theories from "../../data/teoricos.json";
import tasks from "../../data/tareas.json";

export default function DashboardStaff() {
  return (
    <div className={g.grid3}>
      <div className={g.card}>
        <h3 style={{marginTop:0}}>Dataset actual</h3>
        <p>VODs: {vods.length}</p>
        <p>Teóricos: {theories.length}</p>
        <p>Tareas (player): {tasks.player.length}</p>
      </div>
    </div>
  );
}

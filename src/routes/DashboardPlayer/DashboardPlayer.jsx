import g from "./DashboardPlayer.module.css";
import PlayerTaskList from "../../components/player/PlayerTaskList/PlayerTaskList.jsx";
import PlayerVodList from "../../components/player/PlayerVodList/PlayerVodList.jsx";
import PlayerTheoryGrid from "../../components/player/PlayerTheoryGrid/PlayerTheoryGrid.jsx";
import tasks from "../../data/tareas.json";
import vods from "../../data/vods.json";
import theories from "../../data/teoricos.json";

export default function DashboardPlayer() {
  return (
    <div className={g.grid3}>
      <PlayerTaskList tasks={tasks.player} />
      <PlayerVodList vods={vods} />
      <PlayerTheoryGrid items={theories} />
    </div>
  );
}

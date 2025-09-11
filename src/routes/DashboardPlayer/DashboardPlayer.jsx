import g from "../../styles/App.module.css";
import s from "./DashboardPlayer.module.css";
import PlayerTaskList from "../../components/player/PlayerTaskList/PlayerTaskList.jsx";
import PlayerVodList from "../../components/player/PlayerVodList/PlayerVodList.jsx";
import PlayerTheoryGrid from "../../components/player/PlayerTheoryGrid/PlayerTheoryGrid.jsx";

export default function DashboardPlayer() {
  const tasks = [
    { id:"t1", type:"ranked", title:"10 ranked semanales", desc:"Subí links de partidas clave", deadline:"Dom" },
    { id:"t2", type:"vod", title:"Ver VOD Ascent #1", desc:"Dejar 5 notas con timestamps" }
  ];
  const vods = [{ id:"v1", title:"Scrim vs Team X (Ascent)", youtubeId:"dQw4w9WgXcQ", tags:["Ascent","scrim"] }];
  const teoricos = [
    { slug:"toma-de-decisiones", title:"Toma de decisiones", category:"Macro", tags:["intermedio"] },
    { slug:"game-sense", title:"Game Sense", category:"Macro", tags:["intermedio"] },
    { slug:"mentalidad", title:"Mentalidad competitiva", category:"Mentalidad", tags:["avanzado"] }
  ];

  return (
    <div className={`${g.grid3} ${s.wrap}`}>
      <PlayerTaskList tasks={tasks} />
      <PlayerVodList vods={vods} />
      <PlayerTheoryGrid items={teoricos} />
    </div>
  );
}

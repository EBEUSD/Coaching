import s from "./Vods.module.css";
import PlayerVodList from "../../components/player/PlayerVodList/PlayerVodList.jsx";
import VodManager from "../../components/staff/VodManager/VodManager.jsx";

export default function Vods() {
  const user = JSON.parse(localStorage.getItem("session_user") || "null");
  const isStaff =
    user && ["owner", "coach", "analyst", "content"].includes(user.role);
  const vods = [
    {
      id: "v1",
      title: "Scrim vs Team X (Ascent)",
      youtubeId: "dQw4w9WgXcQ",
      tags: ["Ascent", "scrim"],
    },
    {
      id: "v2",
      title: "Oficial vs Team Y (Haven)",
      youtubeId: "3fumBcKC6RE",
      tags: ["Haven", "oficial"],
    },
  ];
  return (
    <section className={s.card}>
      <h2 className={s.title}>VODs</h2>
      {isStaff ? <VodManager initial={vods} /> : <PlayerVodList vods={vods} />}
    </section>
  );
}

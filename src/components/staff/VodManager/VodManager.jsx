import s from "./VodManager.module.css";
import { useState } from "react";

export default function VodManager({ initial = [] }) {
  const [vods, setVods] = useState(initial);
  const [title, setTitle] = useState("");
  const [youtubeId, setYoutubeId] = useState("");

  function add() {
    if (!title || !youtubeId) return;
    setVods(prev => [...prev, { id: crypto.randomUUID(), title, youtubeId }]);
    setTitle(""); setYoutubeId("");
  }
  function remove(id) { setVods(prev => prev.filter(v => v.id !== id)); }

  return (
    <div className={s.card}>
      <h3 className={s.title}>VODs (Staff)</h3>
      <div className={s.form}>
        <input className={s.input} placeholder="Título" value={title} onChange={e=>setTitle(e.target.value)} />
        <input className={s.input} placeholder="YouTube ID (p.ej: dQw4w9WgXcQ)" value={youtubeId} onChange={e=>setYoutubeId(e.target.value)} />
        <button className={s.btn} onClick={add}>Agregar</button>
      </div>

      <div className={s.grid}>
        {vods.map(v => (
          <article key={v.id} className={s.vod}>
            <div className={s.thumb}>
              <iframe title={v.title} src={`https://www.youtube.com/embed/${v.youtubeId}`} allowFullScreen />
            </div>
            <div className={s.row}>
              <div className={s.vtitle}>{v.title}</div>
              <button className={s.del} onClick={()=>remove(v.id)}>Eliminar</button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

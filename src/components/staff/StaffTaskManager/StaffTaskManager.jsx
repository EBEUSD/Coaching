import s from "./StaffTaskManager.module.css";
import { useState } from "react";

export default function StaffTaskManager({ initial = [] }) {
  const [tasks, setTasks] = useState(initial);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [type, setType] = useState("ranked");

  function add() {
    if (!title) return;
    setTasks(prev => [...prev, { id: crypto.randomUUID(), title, desc, type }]);
    setTitle(""); setDesc("");
  }

  function remove(id) { setTasks(prev => prev.filter(t => t.id !== id)); }

  return (
    <div className={s.card}>
      <h3 className={s.title}>Tareas (Staff)</h3>

      <div className={s.form}>
        <input className={s.input} placeholder="Título" value={title} onChange={e=>setTitle(e.target.value)} />
        <input className={s.input} placeholder="Descripción" value={desc} onChange={e=>setDesc(e.target.value)} />
        <select className={s.input} value={type} onChange={e=>setType(e.target.value)}>
          <option value="ranked">ranked</option>
          <option value="vod">vod</option>
          <option value="quiz">quiz</option>
        </select>
        <button className={s.btn} onClick={add}>Agregar</button>
      </div>

      <ul className={s.list}>
        {tasks.map(t => (
          <li className={s.item} key={t.id}>
            <div className={s.left}>
              <span className={s.badge}>{t.type}</span>
              <div>
                <div className={s.name}>{t.title}</div>
                <div className={s.desc}>{t.desc}</div>
              </div>
            </div>
            <button className={s.del} onClick={()=>remove(t.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

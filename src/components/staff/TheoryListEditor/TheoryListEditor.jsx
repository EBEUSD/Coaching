import s from "./TheoryListEditor.module.css";
import { useState } from "react";

export default function TheoryListEditor({ initial = [] }) {
  const [items, setItems] = useState(initial);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Macro");
  const [tags, setTags] = useState("");

  function add() {
    if (!title) return;
    setItems(prev => [...prev, { slug: title.toLowerCase().replace(/\s+/g,'-'), title, category, tags: tags.split(',').map(t=>t.trim()).filter(Boolean) }]);
    setTitle(""); setTags("");
  }
  function remove(slug) { setItems(prev => prev.filter(i => i.slug !== slug)); }

  return (
    <div className={s.card}>
      <h3 className={s.title}>Teóricos (Staff)</h3>
      <div className={s.form}>
        <input className={s.input} placeholder="Título" value={title} onChange={e=>setTitle(e.target.value)} />
        <select className={s.input} value={category} onChange={e=>setCategory(e.target.value)}>
          <option>Macro</option><option>Micro</option><option>Mentalidad</option>
        </select>
        <input className={s.input} placeholder="Tags (coma)" value={tags} onChange={e=>setTags(e.target.value)} />
        <button className={s.btn} onClick={add}>Agregar</button>
      </div>
      <ul className={s.list}>
        {items.map(i => (
          <li className={s.item} key={i.slug}>
            <div>
              <div className={s.name}>{i.title}</div>
              <div className={s.meta}>{i.category} · {i.tags.join(" · ")}</div>
            </div>
            <button className={s.del} onClick={()=>remove(i.slug)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

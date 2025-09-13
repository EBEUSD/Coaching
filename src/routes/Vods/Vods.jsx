import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  createVod,
  deleteVod,
  toggleVodHidden,
  updateVod,
  watchVods,
} from "../../services/vodsServices";
import styles from "./Vods.module.css";

const MAPS = [
  "Ascent", "Bind", "Breeze", "Haven", "Icebox", "Lotus", "Pearl", "Split", "Sunset"
];

const TEAMS = ["Radiant Shadows", "Plátano Powers"];

function canManageUser(user) {
  if (!user) return false;
  const r = String(user.role || "").toLowerCase();
  return r === "owner" || r === "staff";
}

export default function Vods() {
  const { user } = useAuth();
  const canManage = canManageUser(user);

  const [q, setQ] = useState("");
  const [mapFilter, setMapFilter] = useState("Todos");
  const [teamFilter, setTeamFilter] = useState("Todos");
  const [vods, setVods] = useState([]);

  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    title: "",
    summary: "",
    url: "",
    map: "",
    team: "",
    tagsText: "",
    hidden: false,
  });

  useEffect(() => {
    const off = watchVods(setVods);
    return () => off();
  }, []);

  const filtered = useMemo(() => {
    const base = canManage ? vods : vods.filter((v) => !v.hidden);
    const byTeam = teamFilter === "Todos" ? base : base.filter((v) => v.team === teamFilter);
    const byMap = mapFilter === "Todos" ? byTeam : byTeam.filter((v) => v.map === mapFilter);
    const term = q.trim().toLowerCase();
    if (!term) return byMap;
    return byMap.filter((v) =>
      [v.title, v.summary, v.team, v.map, ...(v.tags || [])]
        .filter(Boolean)
        .some((x) => String(x).toLowerCase().includes(term))
    );
  }, [vods, canManage, teamFilter, mapFilter, q]);

  const resetForm = () => {
    setEditing(null);
    setForm({
      title: "",
      summary: "",
      url: "",
      map: "",
      team: "",
      tagsText: "",
      hidden: false,
    });
  };

  const loadEdit = (v) => {
    setEditing(v.id);
    setForm({
      title: v.title || "",
      summary: v.summary || "",
      url: v.url || "",
      map: v.map || "",
      team: v.team || "",
      tagsText: (v.tags || []).join(", "),
      hidden: !!v.hidden,
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    const tags = form.tagsText
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const payload = {
      title: form.title.trim(),
      summary: form.summary.trim(),
      url: form.url.trim(),
      map: form.map,
      team: form.team,
      tags,
      hidden: !!form.hidden,
    };

    if (editing) {
      await updateVod(editing, payload);
    } else {
      await createVod(payload, user?.id);
    }
    resetForm();
  };

  return (
    <section className={styles.page}>
      <div className={styles.head}>
        <h1 className={styles.title}>VODs</h1>

        <div className={styles.filters}>
          <input
            className={styles.search}
            placeholder="Buscar por título o tag…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <select
            className={styles.select}
            value={teamFilter}
            onChange={(e) => setTeamFilter(e.target.value)}
          >
            <option value="Todos">Equipo: Todos</option>
            {TEAMS.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          <select
            className={styles.select}
            value={mapFilter}
            onChange={(e) => setMapFilter(e.target.value)}
          >
            <option value="Todos">Mapa: Todos</option>
            {MAPS.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>
      </div>

      {canManage && (
        <form className={styles.adminCard} onSubmit={submit}>
          <div className={styles.row}>
            <input
              className={styles.input}
              placeholder="Título"
              value={form.title}
              onChange={(e) => setForm((s) => ({ ...s, title: e.target.value }))}
              required
            />
            <select
              className={styles.select}
              value={form.team}
              onChange={(e) => setForm((s) => ({ ...s, team: e.target.value }))}
              required
            >
              <option value="">Equipo…</option>
              {TEAMS.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
            <select
              className={styles.select}
              value={form.map}
              onChange={(e) => setForm((s) => ({ ...s, map: e.target.value }))}
              required
            >
              <option value="">Mapa…</option>
              {MAPS.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>

          <input
            className={styles.input}
            placeholder="URL de YouTube"
            value={form.url}
            onChange={(e) => setForm((s) => ({ ...s, url: e.target.value }))}
            required
          />

          <textarea
            className={styles.textarea}
            placeholder="Resumen/Notas"
            value={form.summary}
            onChange={(e) => setForm((s) => ({ ...s, summary: e.target.value }))}
          />

          <input
            className={styles.input}
            placeholder="Tags (separados por coma)"
            value={form.tagsText}
            onChange={(e) => setForm((s) => ({ ...s, tagsText: e.target.value }))}
          />

          <div className={styles.actions}>
            <label className={styles.checkRow}>
              <input
                type="checkbox"
                checked={form.hidden}
                onChange={(e) => setForm((s) => ({ ...s, hidden: e.target.checked }))}
              />
              <span>Oculta para players</span>
            </label>

            <div className={styles.actionButtons}>
              {editing && (
                <button
                  type="button"
                  className={styles.secondary}
                  onClick={resetForm}
                >
                  Cancelar
                </button>
              )}
              <button type="submit" className={styles.primary}>
                {editing ? "Guardar cambios" : "Agregar VOD"}
              </button>
            </div>
          </div>
        </form>
      )}

      {filtered.length === 0 ? (
        <div className={styles.empty}>No hay VODs para mostrar.</div>
      ) : (
        <ul className={styles.grid}>
          {filtered.map((v) => (
            <li
              key={v.id}
              className={`${styles.card} ${v.hidden && canManage ? styles.isHidden : ""}`}
            >
              <div className={styles.cardBody}>
                <div className={styles.topRow}>
                  <h3 className={styles.cardTitle}>{v.title}</h3>
                  {canManage && (
                    <div className={styles.rowGap}>
                      <button
                        className={styles.small}
                        onClick={() => loadEdit(v)}
                        type="button"
                      >
                        Editar
                      </button>
                      <button
                        className={styles.small}
                        onClick={() => toggleVodHidden(v.id, !v.hidden)}
                        type="button"
                      >
                        {v.hidden ? "Mostrar" : "Ocultar"}
                      </button>
                      <button
                        className={styles.smallDanger}
                        onClick={() => deleteVod(v.id)}
                        type="button"
                      >
                        Eliminar
                      </button>
                    </div>
                  )}
                </div>

                {v.summary ? <p className={styles.cardSummary}>{v.summary}</p> : null}

                <div className={styles.meta}>
                  <span className={styles.badge}>{v.team}</span>
                  <span className={styles.badge}>{v.map}</span>
                  {!!v.tags?.length &&
                    v.tags.map((t) => (
                      <span key={t} className={styles.tag}>{t}</span>
                    ))}
                </div>
              </div>

              <div className={styles.cardFooter}>
                <a href={v.url} target="_blank" rel="noreferrer" className={styles.btn}>
                  Abrir VOD
                </a>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

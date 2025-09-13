import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import styles from "./Tareas.module.css";

const WEEK_KEY = (d = new Date()) => {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNum = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((date - yearStart) / 86400000) + 1) / 7);
  return `${date.getUTCFullYear()}-W${String(weekNo).padStart(2, "0")}`;
};

const prevWeekKey = (key) => {
  const [y, w] = key.split("-W");
  const year = parseInt(y, 10);
  const week = parseInt(w, 10);
  if (week > 1) return `${year}-W${String(week - 1).padStart(2, "0")}`;
  const lastDayPrevYear = new Date(Date.UTC(year - 1, 11, 31));
  return WEEK_KEY(lastDayPrevYear);
};

const STORAGE_PREFIX = "weeklyTasks:v1";

const basePlan = [
  {
    id: "b1",
    title: "BLOQUE 1 – FIREPOWER Y MECÁNICA",
    items: [
      { id: "b1-sesiones-mira", type: "counter", label: "Entrenamiento de mira – 30 min (Kovaak o Galería) • 5 sesiones", target: 5 },
      { id: "b1-dm-sheriff", type: "counter", label: "Deathmatch sheriff-only • 2 partidas", target: 2 },
      { id: "b1-dm-rifle", type: "counter", label: "Deathmatch con rifle (spacing y preaim) • 2 partidas", target: 2 },
      { id: "b1-extra", type: "check", label: "Extra con calidad (opcional)" }
    ],
    helper: [
      "Día 1: Tracking (Strafetrack / Smoothbot o bots vivos)",
      "Día 2: Sheriff o Ghost solo headshots",
      "Día 3: Bots en difícil – 1 tap clean",
      "Día 4: Sheriff 1 tap a ritmo lento, con pausa mental entre kills",
      "Día 5: Aim libre o desafío personal"
    ]
  },
  {
    id: "b2",
    title: "BLOQUE 2 – ENTENDIMIENTO DE JUEGO",
    items: [
      { id: "b2-autoanalisis", type: "check+note", label: "Autoanálisis táctico: ver VOD propio y analizar 3 rondas ATK + 3 DEF" },
      { id: "b2-pov-pro", type: "check+note", label: "Estudio POV pro (1/semana): anotar 3 cosas y aplicar 1 en ranked/scrim" }
    ],
    helper: [
      "Buscar: pov lotus breach pro (o según agente)",
      "Anotar: ¿Qué hice? ¿Qué pensé? ¿Qué haría distinto?"
    ]
  },
  {
    id: "b3",
    title: "BLOQUE 3 – COMPETENCIA REAL",
    items: [
      { id: "b3-ranked", type: "counter", label: "Ranked en dúo con compañera • 5 partidas", target: 5 },
      { id: "b3-eval", type: "check+note", label: "Evaluación corta post-partido: aciertos/errores, comunicación, decisiones" }
    ],
    helper: []
  },
  {
    id: "b4",
    title: "BLOQUE 4 – APORTE AL EQUIPO (OBLIGATORIO)",
    items: [
      { id: "b4-jugada", type: "check+form", label: "Diseñar y presentar 1 jugada semanal" }
    ],
    helper: [
      "Tipos: setup defensivo, split de ataque, anti-push, utilidad creativa",
      "Debe incluir: ¿Dónde? ¿Quién hace qué? ¿Por qué funciona?"
    ]
  }
];

export default function Tareas() {
  const { user } = useAuth();
  const [week, setWeek] = useState(WEEK_KEY());
  const [state, setState] = useState({});

  const previous = prevWeekKey(week);

  const storageKey = useMemo(() => {
    const uid = user?.id || "anon";
    return `${STORAGE_PREFIX}:${uid}:${week}`;
  }, [user, week]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      setState(raw ? JSON.parse(raw) : {});
    } catch {
      setState({});
    }
  }, [storageKey]);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(state));
  }, [state, storageKey]);

  const setValue = (itemId, value) => {
    setState((prev) => ({ ...prev, [itemId]: value }));
  };

  const inc = (itemId, max) => {
    setState((prev) => {
      const curr = Number(prev[itemId] || 0);
      const next = Math.min(curr + 1, max);
      return { ...prev, [itemId]: next };
    });
  };

  const dec = (itemId) => {
    setState((prev) => {
      const curr = Number(prev[itemId] || 0);
      const next = Math.max(curr - 1, 0);
      return { ...prev, [itemId]: next };
    });
  };

  const resetWeek = () => {
    localStorage.removeItem(storageKey);
    setState({});
  };

  const progressByBlock = basePlan.map((block) => {
    const totals = block.items.reduce(
      (acc, it) => {
        if (it.type === "counter") {
          const v = Number(state[it.id] || 0);
          acc.done += Math.min(v, it.target);
          acc.total += it.target;
        } else {
          const checked = !!(state[it.id] && state[it.id].checked);
          acc.done += checked ? 1 : 0;
          acc.total += 1;
        }
        return acc;
      },
      { done: 0, total: 0 }
    );
    return { id: block.id, ...totals, pct: totals.total ? Math.round((totals.done / totals.total) * 100) : 0 };
  });

  const global = progressByBlock.reduce(
    (a, b) => ({ done: a.done + b.done, total: a.total + b.total }),
    { done: 0, total: 0 }
  );
  const globalPct = global.total ? Math.round((global.done / global.total) * 100) : 0;

  return (
    <section className={styles.page}>
      <div className={styles.toolbar}>
        <h1 className={styles.title}>Tareas semanales</h1>
        <div className={styles.controls}>
          <select className={styles.select} value={week} onChange={(e) => setWeek(e.target.value)}>
            <option value={week}>{`Semana actual (${week})`}</option>
            <option value={previous}>{`Semana anterior (${previous})`}</option>
          </select>
          <div className={styles.progressWrap}>
            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{ width: `${globalPct}%` }} />
            </div>
            <span className={styles.progressText}>{globalPct}%</span>
          </div>
          <button className={styles.resetBtn} onClick={resetWeek}>Reset semana</button>
        </div>
      </div>

      <ul className={styles.blocks}>
        {basePlan.map((block) => {
          const pb = progressByBlock.find((p) => p.id === block.id);
          return (
            <li key={block.id} className={styles.card}>
              <div className={styles.cardHead}>
                <h2 className={styles.blockTitle}>{block.title}</h2>
                <div className={styles.blockProgress}>
                  <div className={styles.progressBarSmall}>
                    <div className={styles.progressFill} style={{ width: `${pb.pct}%` }} />
                  </div>
                  <span className={styles.progressTextSmall}>{pb.pct}%</span>
                </div>
              </div>

              {!!block.helper.length && (
                <ul className={styles.helperList}>
                  {block.helper.map((h, i) => (
                    <li key={i} className={styles.helperItem}>{h}</li>
                  ))}
                </ul>
              )}

              <div className={styles.items}>
                {block.items.map((it) => {
                  const value = state[it.id];
                  if (it.type === "counter") {
                    const count = Number(value || 0);
                    return (
                      <div key={it.id} className={styles.itemRow}>
                        <div className={styles.itemLabel}>{it.label}</div>
                        <div className={styles.counter}>
                          <button className={styles.iconBtn} onClick={() => dec(it.id)}>-</button>
                          <div className={styles.countBadge}>{count} / {it.target}</div>
                          <button className={styles.iconBtn} onClick={() => inc(it.id, it.target)}>+</button>
                        </div>
                      </div>
                    );
                  }
                  if (it.type === "check+note") {
                    const checked = !!(value && value.checked);
                    const note = value?.note || "";
                    return (
                      <div key={it.id} className={styles.itemCol}>
                        <label className={styles.checkRow}>
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={(e) => setValue(it.id, { checked: e.target.checked, note })}
                          />
                          <span>{it.label}</span>
                        </label>
                        <textarea
                          className={styles.note}
                          placeholder="Notas / aprendizajes…"
                          value={note}
                          onChange={(e) => setValue(it.id, { checked, note: e.target.value })}
                        />
                      </div>
                    );
                  }
                  if (it.type === "check+form") {
                    const checked = !!(value && value.checked);
                    const form = value?.form || { donde: "", quienes: "", porque: "" };
                    return (
                      <div key={it.id} className={styles.itemCol}>
                        <label className={styles.checkRow}>
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={(e) => setValue(it.id, { checked: e.target.checked, form })}
                          />
                          <span>{it.label}</span>
                        </label>
                        <div className={styles.formGrid}>
                          <input
                            className={styles.input}
                            placeholder="¿Dónde se hace?"
                            value={form.donde}
                            onChange={(e) => setValue(it.id, { checked, form: { ...form, donde: e.target.value } })}
                          />
                          <input
                            className={styles.input}
                            placeholder="¿Quién hace qué?"
                            value={form.quienes}
                            onChange={(e) => setValue(it.id, { checked, form: { ...form, quienes: e.target.value } })}
                          />
                          <input
                            className={styles.input}
                            placeholder="¿Por qué funcionaría?"
                            value={form.porque}
                            onChange={(e) => setValue(it.id, { checked, form: { ...form, porque: e.target.value } })}
                          />
                        </div>
                      </div>
                    );
                  }
                  const checked = !!(value && value.checked);
                  return (
                    <label key={it.id} className={styles.itemRow}>
                      <span className={styles.itemLabel}>{it.label}</span>
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={(e) => setValue(it.id, { checked: e.target.checked })}
                      />
                    </label>
                  );
                })}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

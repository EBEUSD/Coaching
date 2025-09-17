import { useState } from "react";
import styles from "./MatchForm.module.css";
import { createMatch } from "../../services/matchesService";
import { useAuth } from "../../context/AuthContext";

const MAPS = ["Ascent","Bind","Breeze","Haven","Icebox","Lotus","Pearl","Split","Sunset"];
const TYPES = ["Scrim","Premier","Torneo","BO3","Amistoso"];

export default function MatchForm({ orgId, teamId, onSaved }) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    date: new Date().toISOString().slice(0,10),
    opponent: "",
    matchType: "Scrim",
    tournament: "",
    map: "Ascent",
    scoreFor: 13,
    scoreAgainst: 0,
    result: "Win",
    compUs: [],
    compOpp: [],
    stats: {
      atkRoundsWon: 0, defRoundsWon: 0, firstKillsFor: 0,
      effectiveTrades: 0, clutchRoundsWon: 0, throwRounds: 0,
      execClean: 0, execChaos: 0
    },
    tactics: {
      timeoutCalled: false, timeoutWorked: false,
      callQuality: "Media",
      macroFails: [],
      infoIssues: []
    },
    coach: {
      keyRoundsToReview: [],
      issuesDetected: [],
      nextTraining: [],
      rating: 7
    }
  });

  function setField(path, value) {
    setForm(prev => {
      const clone = structuredClone(prev);
      const parts = path.split(".");
      let node = clone;
      for (let i = 0; i < parts.length - 1; i++) node = node[parts[i]];
      node[parts.at(-1)] = value;
      return clone;
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...form,
        orgId, teamId,
        createdBy: user?.uid || null
      };
      await createMatch(payload);
      onSaved?.();
      // reset mínimo
      setForm(f => ({ ...f, opponent:"", tournament:"" }));
    } finally {
      setLoading(false);
    }
  }

  const roleInput = (label, val, onChange, type="number") => (
    <label className={styles.field}>
      <span>{label}</span>
      <input type={type} value={val} onChange={(e)=>onChange(e.target.value)} />
    </label>
  );

  const chipInput = (label, list, onChange, placeholder="Agregar y Enter") => {
    function add(e) {
      if (e.key === "Enter" && e.currentTarget.value.trim()) {
        onChange([...list, e.currentTarget.value.trim()]);
        e.currentTarget.value = "";
      }
    }
    function remove(idx) {
      const copy = [...list]; copy.splice(idx,1); onChange(copy);
    }
    return (
      <div className={styles.field}>
        <span>{label}</span>
        <div className={styles.chips}>
          {list.map((v,i)=>(
            <button type="button" key={i} className={styles.chip} onClick={()=>remove(i)}>{v} ✕</button>
          ))}
          <input placeholder={placeholder} onKeyDown={add}/>
        </div>
      </div>
    );
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Registrar partida</h2>

      <div className={styles.grid}>
        <label className={styles.field}>
          <span>Fecha</span>
          <input type="date" value={form.date} onChange={(e)=>setField("date", e.target.value)} />
        </label>

        <label className={styles.field}>
          <span>Rival</span>
          <input value={form.opponent} onChange={(e)=>setField("opponent", e.target.value)} placeholder="Team XYZ"/>
        </label>

        <label className={styles.field}>
          <span>Tipo de match</span>
          <select value={form.matchType} onChange={(e)=>setField("matchType", e.target.value)}>
            {TYPES.map(t=><option key={t}>{t}</option>)}
          </select>
        </label>

        <label className={styles.field}>
          <span>Torneo (opcional)</span>
          <input value={form.tournament} onChange={(e)=>setField("tournament", e.target.value)} placeholder="Swift Cup #12"/>
        </label>

        <label className={styles.field}>
          <span>Mapa</span>
          <select value={form.map} onChange={(e)=>setField("map", e.target.value)}>
            {MAPS.map(m=><option key={m}>{m}</option>)}
          </select>
        </label>

        <label className={styles.field}>
          <span>Score (nosotros)</span>
          <input type="number" min="0" value={form.scoreFor} onChange={(e)=>setField("scoreFor", Number(e.target.value))}/>
        </label>

        <label className={styles.field}>
          <span>Score (ellos)</span>
          <input type="number" min="0" value={form.scoreAgainst} onChange={(e)=>setField("scoreAgainst", Number(e.target.value))}/>
        </label>

        <label className={styles.field}>
          <span>Resultado</span>
          <select value={form.result} onChange={(e)=>setField("result", e.target.value)}>
            <option>Win</option><option>Loss</option><option>Tie</option>
          </select>
        </label>
      </div>

      <div className={styles.group}>
        {chipInput("Composición propia", form.compUs, (v)=>setField("compUs", v), "Agente y Enter")}
        {chipInput("Composición rival", form.compOpp, (v)=>setField("compOpp", v), "Agente y Enter")}
      </div>

      <h3>Estadísticas</h3>
      <div className={styles.grid}>
        {roleInput("Rondas ATK ganadas", form.stats.atkRoundsWon, (v)=>setField("stats.atkRoundsWon", Number(v)))}
        {roleInput("Rondas DEF ganadas", form.stats.defRoundsWon, (v)=>setField("stats.defRoundsWon", Number(v)))}
        {roleInput("First kills a favor", form.stats.firstKillsFor, (v)=>setField("stats.firstKillsFor", Number(v)))}
        {roleInput("Tradeos efectivos", form.stats.effectiveTrades, (v)=>setField("stats.effectiveTrades", Number(v)))}
        {roleInput("Rondas clutch ganadas", form.stats.clutchRoundsWon, (v)=>setField("stats.clutchRoundsWon", Number(v)))}
        {roleInput("Rondas throweadas", form.stats.throwRounds, (v)=>setField("stats.throwRounds", Number(v)))}
        {roleInput("Ejecuciones limpias", form.stats.execClean, (v)=>setField("stats.execClean", Number(v)))}
        {roleInput("Ejecuciones caóticas", form.stats.execChaos, (v)=>setField("stats.execChaos", Number(v)))}
      </div>

      <h3>Táctico / Mental</h3>
      <div className={styles.grid}>
        <label className={styles.switch}>
          <input type="checkbox" checked={form.tactics.timeoutCalled} onChange={(e)=>setField("tactics.timeoutCalled", e.target.checked)} />
          <span>Se pidió timeout</span>
        </label>
        <label className={styles.switch}>
          <input type="checkbox" checked={form.tactics.timeoutWorked} onChange={(e)=>setField("tactics.timeoutWorked", e.target.checked)} />
          <span>El timeout funcionó</span>
        </label>
        <label className={styles.field} style={{gridColumn:"span 2"}}>
          <span>Calidad de las calls</span>
          <select value={form.tactics.callQuality} onChange={(e)=>setField("tactics.callQuality", e.target.value)}>
            <option>Baja</option><option>Media</option><option>Alta</option>
          </select>
        </label>
      </div>

      <div className={styles.group}>
        {chipInput("Fallas de macro", form.tactics.macroFails, (v)=>setField("tactics.macroFails", v), "Ej: Rotaciones tardías")}
        {chipInput("Info perdida/no transmitida", form.tactics.infoIssues, (v)=>setField("tactics.infoIssues", v), "Ej: No cantamos ulti enemiga")}
      </div>

      <h3>Resumen del coach</h3>
      <div className={styles.group}>
        {chipInput("Rondas clave a revisar", form.coach.keyRoundsToReview, (v)=>setField("coach.keyRoundsToReview", v))}
        {chipInput("Problemas detectados", form.coach.issuesDetected, (v)=>setField("coach.issuesDetected", v))}
        {chipInput("Qué entrenar luego", form.coach.nextTraining, (v)=>setField("coach.nextTraining", v))}
        <label className={styles.field}>
          <span>Nota general (0-10)</span>
          <input type="number" min="0" max="10" value={form.coach.rating} onChange={(e)=>setField("coach.rating", Number(e.target.value))}/>
        </label>
      </div>

      <button className={styles.submit} disabled={loading}>
        {loading ? "Guardando..." : "Guardar partida"}
      </button>
    </form>
  );
}

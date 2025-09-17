import { useEffect, useMemo, useState } from "react";
import styles from "./MatchesTable.module.css";
import MatchFilters from "./MatchFilters";
import { listMatches } from "../../services/matchesService";
import { summarizeByMap, summarizeByWeek, commonErrors } from "../../utils/matchAggregations";

export default function MatchesTable({ orgId, teamId }) {
  const [filters, setFilters] = useState({});
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const data = await listMatches({ orgId, teamId, filters, limitTo: 400 });
      setRows(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(()=>{ load(); /* eslint-disable-next-line */ }, [JSON.stringify(filters)]);

  const meta = useMemo(()=>{
    const opponents = Array.from(new Set(rows.map(r=>r.opponent).filter(Boolean))).sort();
    const maps = Array.from(new Set(rows.map(r=>r.map).filter(Boolean))).sort();
    const types = Array.from(new Set(rows.map(r=>r.matchType).filter(Boolean))).sort();
    const tournaments = Array.from(new Set(rows.map(r=>r.tournament).filter(Boolean))).sort();
    return { opponents, maps, types, tournaments };
  }, [rows]);

  const byMap = useMemo(()=>summarizeByMap(rows), [rows]);
  const byWeek = useMemo(()=>summarizeByWeek(rows), [rows]);
  const errs = useMemo(()=>commonErrors(rows), [rows]);

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <h2>Partidas registradas</h2>
        <button onClick={load} className={styles.refresh} disabled={loading}>{loading ? "Cargando..." : "Actualizar"}</button>
      </div>

      <MatchFilters filters={filters} onChange={setFilters}
        opponents={meta.opponents} maps={meta.maps} types={meta.types} tournaments={meta.tournaments} />

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Fecha</th><th>Tipo</th><th>Mapa</th><th>Rival</th>
              <th>Score</th><th>Result</th><th>ATK/DEF</th><th>FK/Trades</th><th>Clutch/Throws</th><th>Timeout</th><th>Nota</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r=>(
              <tr key={r.id}>
                <td>{r.date}</td>
                <td>{r.matchType}{r.tournament?` · ${r.tournament}`:""}</td>
                <td>{r.map}</td>
                <td>{r.opponent}</td>
                <td>{r.scoreFor}-{r.scoreAgainst}</td>
                <td className={r.result==="Win"?styles.win:r.result==="Loss"?styles.loss:""}>{r.result}</td>
                <td>{r?.stats?.atkRoundsWon ?? 0}/{r?.stats?.defRoundsWon ?? 0}</td>
                <td>{r?.stats?.firstKillsFor ?? 0}/{r?.stats?.effectiveTrades ?? 0}</td>
                <td>{r?.stats?.clutchRoundsWon ?? 0}/{r?.stats?.throwRounds ?? 0}</td>
                <td>{r?.tactics?.timeoutCalled ? (r?.tactics?.timeoutWorked ? "✔︎" : "✖︎") : "-"}</td>
                <td>{r?.coach?.rating ?? "-"}</td>
              </tr>
            ))}
            {!rows.length && !loading && (
              <tr><td colSpan={11} className={styles.empty}>Sin datos</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <section className={styles.cards}>
        <div className={styles.card}>
          <h3>Winrate por mapa</h3>
          <ul>
            {Object.entries(byMap).map(([map,data])=>(
              <li key={map}>
                <strong>{map}</strong>: {Math.round(data.winrate*100)}% (W{data.wins}/L{data.losses}/T{data.ties}) · Nota prom: {data.avgCoach.toFixed(1)}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.card}>
          <h3>Resumen semanal</h3>
          <ul>
            {Object.entries(byWeek).sort(([a],[b])=>a.localeCompare(b)).map(([wk,b])=>(
              <li key={wk}>
                <strong>{wk}</strong>: {b.games} juegos · W{b.wins}/L{b.losses} · ATK {b.atkWon} / DEF {b.defWon} · FK {b.firstKills} · Trades {b.trades} · Clutch {b.clutches} · Throws {b.throws}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.card}>
          <h3>Errores más comunes</h3>
          <p><strong>Macro:</strong></p>
          <ul>{errs.topMacro.map(([k,v])=><li key={k}>{k} — {v}</li>)}</ul>
          <p><strong>Info:</strong></p>
          <ul>{errs.topInfo.map(([k,v])=><li key={k}>{k} — {v}</li>)}</ul>
        </div>
      </section>
    </div>
  );
}

import styles from "./MatchFilters.module.css";

export default function MatchFilters({
  filters,
  onChange,
  opponents = [],
  maps = [],
  types = [],
  tournaments = [],
}) {
  function set(k, v) {
    onChange({ ...filters, [k]: v || undefined });
  }
  return (
    <div className={styles.wrap}>
      <select
        value={filters.map || ""}
        onChange={(e) => set("map", e.target.value || undefined)}
      >
        <option value="">Todos los mapas</option>
        {maps.map((m) => (
          <option key={m}>{m}</option>
        ))}
      </select>
      <select
        value={filters.matchType || ""}
        onChange={(e) => set("matchType", e.target.value || undefined)}
      >
        <option value="">Todos los tipos</option>
        {types.map((t) => (
          <option key={t}>{t}</option>
        ))}
      </select>
      <input
        list="opponents"
        placeholder="Rival"
        value={filters.opponent || ""}
        onChange={(e) => set("opponent", e.target.value || undefined)}
      />
      <datalist id="opponents">
        {opponents.map((o) => (
          <option key={o} value={o} />
        ))}
      </datalist>
      <input
        list="tournaments"
        placeholder="Torneo"
        value={filters.tournament || ""}
        onChange={(e) => set("tournament", e.target.value || undefined)}
      />
      <datalist id="tournaments">
        {tournaments.map((o) => (
          <option key={o} value={o} />
        ))}
      </datalist>
    </div>
  );
}

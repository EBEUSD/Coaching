import { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import teoricosRaw from "../../data/teoricos.json";
import styles from "./Biblioteca.module.css";

const seedFallback = [
  {
    id: "teorico-roles",
    title: "Teórico de Roles",
    summary:
      "Guía práctica de roles en Valorant: Duelista, Iniciador (Flasher/Spotter), Controlador y Centinela.",
    tags: ["roles", "duelista", "flasher", "controlador", "centinela"],
    isPrivate: false,
    ownerIds: [],
    hidden: false
  }
];

const HIDDEN_KEY = "teoricos:hidden:v1";

function getCanManage(user) {
  if (!user) return false;
  const single = typeof user.role === "string" ? user.role.toLowerCase() : null;
  const many = Array.isArray(user.roles) ? user.roles.map(r => String(r).toLowerCase()) : [];
  const rolesSet = new Set([single, ...many].filter(Boolean));
  return rolesSet.has("owner") || rolesSet.has("staff");
}

export default function Biblioteca() {
  const { user } = useAuth();
  const canManage = getCanManage(user);

  const [q, setQ] = useState("");
  const [hiddenMap, setHiddenMap] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(HIDDEN_KEY) || "{}");
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem(HIDDEN_KEY, JSON.stringify(hiddenMap));
  }, [hiddenMap]);

  const data = useMemo(() => {
    const list = Array.isArray(teoricosRaw) ? teoricosRaw : teoricosRaw?.default || [];
    const base = list.length ? list : seedFallback;

    const withHidden = base.map(t => ({
      ...t,
      effectiveHidden: hiddenMap[t.id] ?? t.hidden ?? false
    }));

    const afterPrivate = withHidden.filter(t =>
      !t.isPrivate || (user && t.ownerIds?.includes?.(user.id))
    );

    const visibleForUser = canManage ? afterPrivate : afterPrivate.filter(t => !t.effectiveHidden);

    const term = q.trim().toLowerCase();
    const searched = term
      ? visibleForUser.filter(t =>
          [t.title, t.summary, ...(t.tags || [])]
            .filter(Boolean)
            .some(v => String(v).toLowerCase().includes(term))
        )
      : visibleForUser;

    return searched;
  }, [q, user, hiddenMap, canManage]);

  const toggleHidden = (id, currentEffectiveHidden) => {
    if (!canManage) return;
    setHiddenMap(prev => {
      const next = { ...prev, [id]: !currentEffectiveHidden };
      if (next[id] === false) delete next[id];
      return next;
    });
  };

  return (
    <section className={styles.page}>
      <div className={styles.head}>
        <h1 className={styles.title}>Biblioteca</h1>
        <input
          className={styles.search}
          placeholder="Buscar por título…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>

      {data.length === 0 ? (
        <div className={styles.empty}>
          No hay resultados{q ? ` para “${q}”` : ""}.
        </div>
      ) : (
        <ul className={styles.grid}>
          {data.map((t) => (
            <li
              key={t.id}
              className={`${styles.card} ${t.effectiveHidden && canManage ? styles.isHidden : ""}`}
            >
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{t.title}</h3>
                {t.summary ? <p className={styles.cardSummary}>{t.summary}</p> : null}
                {!!t.tags?.length && (
                  <div className={styles.tags}>
                    {t.tags.map((tg) => (
                      <span key={tg} className={styles.tag}>{tg}</span>
                    ))}
                  </div>
                )}
              </div>

              <div className={styles.cardFooter}>
                <Link to={`/biblioteca/${t.id}`} className={styles.btn}>Ver</Link>
                {canManage && (
                  <button
                    className={`${styles.toggleBtn} ${t.effectiveHidden ? styles.btnShow : styles.btnHide}`}
                    onClick={() => toggleHidden(t.id, t.effectiveHidden)}
                    title={t.effectiveHidden ? "Mostrar a jugadores" : "Ocultar a jugadores"}
                    type="button"
                  >
                    {t.effectiveHidden ? "Mostrar" : "Ocultar"}
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

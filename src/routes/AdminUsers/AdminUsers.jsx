import { useEffect, useState } from "react";
import { auth, db } from "../../firebase/Firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  query,
  orderBy,
  deleteDoc,
  doc
} from "firebase/firestore";
import styles from "./AdminUsers.module.css";

const TEAM_OPTIONS = [
  { value: "NONE", label: "Equipo (opcional)" },
  { value: "RS", label: "Radiant Shadows" },
  { value: "PP", label: "Plátano Powers" },
  { value: "BOTH", label: "Ambos equipos" },
];

export default function AdminUsers() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [role, setRole] = useState("player");
  const [teamSel, setTeamSel] = useState("NONE");
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const teamsFromSelect = (sel) => {
    if (sel === "RS") return ["RS"];
    if (sel === "PP") return ["PP"];
    if (sel === "BOTH") return ["RS", "PP"];
    return [];
  };

  const fetchUsers = async () => {
    const qs = await getDocs(query(collection(db, "users"), orderBy("createdAt", "desc")));
    const out = [];
    qs.forEach((d) => out.push({ id: d.id, ...d.data() }));
    setUsers(out);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!email || !pass) return;
    setLoading(true);
    try {
      const docBody = {
        email,
        displayName: displayName?.trim() || email.split("@")[0],
        role,
        teams: teamsFromSelect(teamSel),
        createdAt: serverTimestamp(),
        // opcional: “active” para suspender sin borrar
        active: true
      };
      await addDoc(collection(db, "users"), docBody);
      setEmail("");
      setPass("");
      setDisplayName("");
      setRole("player");
      setTeamSel("NONE");
      await fetchUsers();
      alert("Usuario creado (perfil)!");
    } catch (err) {
      console.error(err);
      alert("Error al crear el usuario");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProfile = async (id, emailShown) => {
    if (!window.confirm(`Eliminar perfil de ${emailShown}? Esta acción no puede deshacerse.`)) return;
    try {
      await deleteDoc(doc(db, "users", id));
      await fetchUsers();
    } catch (err) {
      console.error(err);
      alert("No se pudo eliminar el perfil.");
    }
  };

  const prettyTeams = (arr = []) => {
    if (!arr.length) return "—";
    const names = arr.map((t) => (t === "RS" ? "Radiant Shadows" : "Plátano Powers"));
    return names.join(" + ");
  };

  return (
    <section className={styles.page}>
      <h1 className={styles.title}>Usuarios</h1>

      <form className={styles.form} onSubmit={handleCreate}>
        <div className={styles.row}>
          <input
            className={styles.input}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
          />
          <input
            className={styles.input}
            placeholder="Contraseña"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            type="password"
            minLength={6}
            required
          />
        </div>

        <div className={styles.row}>
          <input
            className={styles.input}
            placeholder="Nombre visible (opcional)"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </div>

        <div className={styles.row}>
          <select
            className={styles.selectMini}
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="player">player</option>
            <option value="staff">staff</option>
            <option value="owner">owner</option>
          </select>

          <select
            className={styles.select}
            value={teamSel}
            onChange={(e) => setTeamSel(e.target.value)}
          >
            {TEAM_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>

          <button className={styles.btn} disabled={loading}>
            {loading ? "Creando…" : "Crear"}
          </button>
        </div>

        <p className={styles.hint}>
          Si necesitás crear/borrar también la cuenta de autenticación, hacelo con una Cloud Function usando Admin SDK.
        </p>
      </form>

      <div className={styles.list}>
        <h2 className={styles.subtitle}>Listado</h2>
        <ul className={styles.cards}>
          {users.map((u) => (
            <li key={u.id} className={styles.card}>
              <div className={styles.cardTop}>
                <span className={styles.name}>{u.displayName || "Sin nombre"}</span>
                <span className={`${styles.role} ${styles[`role_${u.role || "player"}`]}`}>
                  {u.role || "player"}
                </span>
              </div>
              <div className={styles.meta}>{u.email}</div>
              <div className={styles.meta}>Equipos: {prettyTeams(u.teams)}</div>

              <div className={styles.actions}>
                <button
                  className={styles.btnDanger}
                  onClick={() => handleDeleteProfile(u.id, u.email)}
                  title="Eliminar perfil (Firestore)"
                >
                  Eliminar perfil
                </button>
                {/* Opcional: Suspender sin borrar
                <button
                  className={styles.btnGhost}
                  onClick={() => toggleActive(u.id, !!u.active)}
                >
                  {u.active ? "Suspender" : "Reactivar"}
                </button> */}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../../src/context/AuthContext";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const nav = useNavigate();

  const handleLogout = () => {
    signOut();
    nav("/login");
  };

  // Helper para clases activas de NavLink
  const navClass = ({ isActive }) =>
    `${styles.link} ${isActive ? styles.active : ""}`;

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo}>
          EBEUS
        </Link>

        {/* Nota: en CSS Modules, necesitamos una clase .open por separado */}
        <nav className={`${styles.nav} ${open ? styles.open : ""}`}>
          <NavLink to="/biblioteca" className={navClass} end>
            Biblioteca
          </NavLink>

          <NavLink to="/vods" className={navClass} end>
            VODs
          </NavLink>

          <NavLink to="/tareas" className={navClass} end>
            Tareas
          </NavLink>

          {/* NUEVO: Partidas */}
          <NavLink to="/matches" className={navClass} end>
            Partidas
          </NavLink>

          {/* Arreglado: ruta correcta y estilo coherente */}
          {user?.role === "owner" && (
            <NavLink
              to="/admin/usuarios"
              className={({ isActive }) =>
                `${styles.link} ${styles.cta} ${isActive ? styles.ctaActive : ""}`
              }
              end
            >
              Crear usuario
            </NavLink>
          )}
        </nav>

        <div className={styles.userArea}>
          {user && (
            <span className={styles.userTag}>
              {user.displayName || user.name || user.email} · {user.role}
            </span>
          )}

          {user && (
            <button onClick={handleLogout} className={styles.logoutBtn}>
              Salir
            </button>
          )}

          <button
            className={styles.burger}
            onClick={() => setOpen((v) => !v)}
            aria-label="Abrir menú"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}

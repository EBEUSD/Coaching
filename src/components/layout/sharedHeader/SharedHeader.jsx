import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import styles from "./SharedHeader.module.css";

export default function SharedHeader() {
  const { user, signOut } = useAuth();
  const dashPath = user?.role === "staff" || user?.role === "owner" ? "/dashboard/staff" : "/dashboard/player";

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/" className={styles.brand}>EBEUS · Coaching</Link>

        <nav className={styles.nav}>
          <NavLink to="/" className={({ isActive }) => (isActive ? styles.active : undefined)}>Inicio</NavLink>
          <NavLink to="/biblioteca" className={({ isActive }) => (isActive ? styles.active : undefined)}>Biblioteca</NavLink>
          <NavLink to="/vods" className={({ isActive }) => (isActive ? styles.active : undefined)}>VODs</NavLink>
          <NavLink to="/tareas" className={({ isActive }) => (isActive ? styles.active : undefined)}>Tareas</NavLink>
        </nav>

        <div className={styles.actions}>
          {!user ? (
            <Link to="/login" className={styles.btnPrimary}>Ingresar</Link>
          ) : (
            <>
              <Link to={dashPath} className={styles.btnGhost}>Mi panel</Link>
              <button onClick={signOut} className={styles.btnPrimary}>Salir</button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

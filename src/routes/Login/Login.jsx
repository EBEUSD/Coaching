import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from "./Login.module.css";

export default function Login() {
  const { signIn } = useAuth();
  const nav = useNavigate();
  const loc = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const handle = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      await signIn(email.trim(), password);
      const next = loc.state?.from?.pathname || "/biblioteca";
      nav(next, { replace: true });
    } catch {
      setErr("Credenciales inválidas.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrap}>
      <h2 className={styles.title}>Ingresar</h2>
      <form className={styles.form} onSubmit={handle}>
        <label className={styles.label}>Email</label>
        <input
          className={styles.input}
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className={styles.label}>Contraseña</label>
        <input
          type="password"
          className={styles.input}
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {err && <div className={styles.error}>{err}</div>}
        <button className={styles.button} disabled={loading}>
          {loading ? "Ingresando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}

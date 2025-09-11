import { useState } from "react";
import s from "./Login.module.css";

export default function Login() {
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [err, setErr] = useState("");

  function submit(e) {
    e.preventDefault();
    setErr("");
    if (!u || !p) return setErr("Completá usuario y contraseña.");
    if (u === "player" && p === "1234") {
      localStorage.setItem("session_user", JSON.stringify({ id: "player", role: "player" }));
      window.location.href = "/dashboard/player";
      return;
    }
    if (u === "staff" && p === "1234") {
      localStorage.setItem("session_user", JSON.stringify({ id: "staff", role: "coach" }));
      window.location.href = "/dashboard/staff";
      return;
    }
    setErr("Credenciales inválidas.");
  }

  return (
    <section className={s.wrap}>
      <h2 className={s.title}>Ingresar</h2>
      <form className={s.form} onSubmit={submit}>
        <input className={s.input} placeholder="Usuario" value={u} onChange={e=>setU(e.target.value)} />
        <input className={s.input} type="password" placeholder="Contraseña" value={p} onChange={e=>setP(e.target.value)} />
        {err && <p className={s.error}>{err}</p>}
        <button className={s.btn} type="submit">Entrar</button>
      </form>
    </section>
  );
}

import { useEffect, useState } from "react";

/**
 * Guard mínima: revisa el role guardado en localStorage.
 * role = "any" -> deja pasar a cualquiera logueado
 * role = "staff" -> sólo staff (owner, coach, analyst, content)
 */
export default function ProtectedRoute({ role = "any", children }) {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("session_user") || "null");
    if (!user) {
      window.location.href = "/login";
      return;
    }
    if (role === "staff") {
      const ok = ["owner", "coach", "analyst", "content"].includes(user.role);
      if (!ok) {
        window.location.href = "/";
        return;
      }
    }
    setAllowed(true);
  }, [role]);

  if (!allowed) return null;
  return children;
}

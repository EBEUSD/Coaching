import { initializeApp, deleteApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { app, db } from "../firebase/Firebase";

export async function adminCreateUser({ email, password, displayName, role = "player", team = "" }) {
  const secondary = initializeApp(app.options, "secondary");
  const secAuth = getAuth(secondary);
  try {
    const cred = await createUserWithEmailAndPassword(secAuth, email, password);
    await setDoc(doc(db, "users", cred.user.uid), {
      displayName: displayName || email,
      email,
      role,
      team,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return { uid: cred.user.uid };
  } finally {
    try { await secAuth.signOut(); } catch {}
    try { await deleteApp(secondary); } catch {}
  }
}

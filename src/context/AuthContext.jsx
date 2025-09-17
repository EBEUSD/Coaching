import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase/Firebase";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as fbSignOut,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const AuthContext = createContext(null);

const STORAGE_KEY = "coach_user";

const formatUser = (fbUser, profile) => {
  const name =
    profile?.displayName ||
    fbUser?.displayName ||
    (fbUser?.email ? fbUser.email.split("@")[0] : "usuario");
  const role = profile?.role || "player";
  return {
    id: fbUser.uid,
    name,
    role,
    email: fbUser.email || "",
  };
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (fbUser) => {
      if (!fbUser) {
        setUser(null);
        localStorage.removeItem(STORAGE_KEY);
        setReady(true);
        return;
      }
      try {
        const snap = await getDoc(doc(db, "users", fbUser.uid));
        const profile = snap.exists() ? snap.data() : null;
        const u = formatUser(fbUser, profile);
        setUser(u);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
      } finally {
        setReady(true);
      }
    });
    return () => unsub();
  }, []);

  const signIn = async (email, password) => {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    const fbUser = cred.user;
    const snap = await getDoc(doc(db, "users", fbUser.uid));
    const profile = snap.exists() ? snap.data() : null;
    const u = formatUser(fbUser, profile);
    setUser(u);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    return u;
  };

  const signOut = async () => {
    await fbSignOut(auth);
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, ready, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

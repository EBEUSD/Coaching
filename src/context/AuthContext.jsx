// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { signInWithEmailAndPassword, signOut as fbSignOut, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/Firebase"; // <-- tu config

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Buscar datos en Firestore
        const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          const safeUser = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: userData.displayName || firebaseUser.email,
            role: userData.role || "player",
          };
          setUser(safeUser);
          localStorage.setItem("coach_user", JSON.stringify(safeUser));
        } else {
          console.warn("No existe documento en Firestore para este usuario");
        }
      } else {
        setUser(null);
        localStorage.removeItem("coach_user");
      }
      setReady(true);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email, password) => {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    const userDoc = await getDoc(doc(db, "users", cred.user.uid));
    if (!userDoc.exists()) throw new Error("No se encontraron datos de usuario en Firestore");

    const userData = userDoc.data();
    const safeUser = {
      uid: cred.user.uid,
      email: cred.user.email,
      displayName: userData.displayName || cred.user.email,
      role: userData.role || "player",
    };

    setUser(safeUser);
    localStorage.setItem("coach_user", JSON.stringify(safeUser));
    return safeUser;
  };

  const signOut = async () => {
    await fbSignOut(auth);
    setUser(null);
    localStorage.removeItem("coach_user");
  };

  return (
    <AuthContext.Provider value={{ user, ready, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

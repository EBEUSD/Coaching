import { doc, getDoc, onSnapshot, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/Firebase";

export async function ensureUserDoc(uid, data = {}) {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    await setDoc(ref, {
      displayName: data.displayName || "",
      email: data.email || "",
      photoURL: data.photoURL || "",
      role: data.role || "player",
      team: data.team || "",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } else {
    const curr = snap.data();
    const patch = {};
    if (data.displayName && data.displayName !== curr.displayName) patch.displayName = data.displayName;
    if (data.email && data.email !== curr.email) patch.email = data.email;
    if (data.photoURL && data.photoURL !== curr.photoURL) patch.photoURL = data.photoURL;
    if (Object.keys(patch).length) {
      patch.updatedAt = serverTimestamp();
      await setDoc(ref, patch, { merge: true });
    }
  }
  return ref.id;
}

export async function getUserDoc(uid) {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);
  return snap.exists() ? { id: uid, ...snap.data() } : null;
}

export function watchUserDoc(uid, cb) {
  const ref = doc(db, "users", uid);
  return onSnapshot(ref, (snap) => {
    cb(snap.exists() ? { id: uid, ...snap.data() } : null);
  });
}

export async function setUserRoleTeam(uid, { role, team }) {
  const ref = doc(db, "users", uid);
  const patch = { updatedAt: serverTimestamp() };
  if (role !== undefined) patch.role = role;
  if (team !== undefined) patch.team = team;
  await updateDoc(ref, patch);
}

export async function updateUserFields(uid, fields) {
  const ref = doc(db, "users", uid);
  await updateDoc(ref, { ...fields, updatedAt: serverTimestamp() });
}

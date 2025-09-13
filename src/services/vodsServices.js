import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/Firebase";

const VODS = "vods";

export function watchVods(cb) {
  const q = query(collection(db, VODS), orderBy("createdAt", "desc"));
  return onSnapshot(q, (snap) => {
    const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    cb(list);
  });
}

export async function createVod(data, uid) {
  const payload = {
    title: data.title || "",
    summary: data.summary || "",
    url: data.url || "",
    map: data.map || "",
    team: data.team || "",
    tags: Array.isArray(data.tags) ? data.tags : [],
    hidden: !!data.hidden,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    createdBy: uid || null,
  };
  const ref = await addDoc(collection(db, VODS), payload);
  return ref.id;
}

export async function updateVod(id, data) {
  const ref = doc(db, VODS, id);
  await setDoc(
    ref,
    {
      ...data,
      tags: Array.isArray(data.tags) ? data.tags : [],
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}

export async function toggleVodHidden(id, nextHidden) {
  const ref = doc(db, VODS, id);
  await updateDoc(ref, { hidden: !!nextHidden, updatedAt: serverTimestamp() });
}

export async function deleteVod(id) {
  await deleteDoc(doc(db, VODS, id));
}

export async function fetchAllVodsOnce() {
  const q = query(collection(db, VODS), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

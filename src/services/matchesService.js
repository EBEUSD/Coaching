import { collection, addDoc, query, where, orderBy, getDocs, Timestamp } from "firebase/firestore";
import { db } from "../firebase/Firebase";

// Helpers para claves temporales
function toISODate(d) {
  if (typeof d === "string") return d;
  const dt = new Date(d);
  return dt.toISOString().slice(0,10);
}
function isoWeekKey(isoDateStr) {
  const d = new Date(isoDateStr + "T00:00:00");
  const dayNum = (d.getUTCDay() + 6) % 7; // 0 lunes ... 6 domingo
  d.setUTCDate(d.getUTCDate() - dayNum + 3);
  const firstThursday = new Date(Date.UTC(d.getUTCFullYear(),0,4));
  const week = 1 + Math.round(((d - firstThursday)/86400000 - 3 + ((firstThursday.getUTCDay()+6)%7))/7);
  return `${d.getUTCFullYear()}-W${String(week).padStart(2,"0")}`;
}
function monthKey(isoDateStr) {
  return isoDateStr.slice(0,7);
}

export async function createMatch(data) {
  const iso = toISODate(data.date);
  const docToSave = {
    ...data,
    date: iso,
    weekKey: isoWeekKey(iso),
    monthKey: monthKey(iso),
    createdAt: Timestamp.now()
  };
  const ref = await addDoc(collection(db, "matches"), docToSave);
  return { id: ref.id, ...docToSave };
}

export async function listMatches({ orgId, teamId, filters = {}, limitTo = 200 }) {
  let q = query(collection(db, "matches"));
  const clauses = [];

  if (orgId) clauses.push(where("orgId", "==", orgId));
  if (teamId) clauses.push(where("teamId", "==", teamId));
  if (filters.map) clauses.push(where("map", "==", filters.map));
  if (filters.matchType) clauses.push(where("matchType", "==", filters.matchType));
  if (filters.opponent) clauses.push(where("opponent", "==", filters.opponent));
  if (filters.tournament) clauses.push(where("tournament", "==", filters.tournament));

  // Aplicar where en cadena
  // Nota: Firestore necesita índices compuestos según tu combinación.
  // Usamos orderBy date para vistas cronológicas.
  // eslint-disable-next-line no-undef
  const { where, orderBy: ob, limit } = await import("firebase/firestore");
  if (clauses.length) {
    q = query(collection(db,"matches"), ...clauses, ob("date","desc"), limit(limitTo));
  } else {
    q = query(collection(db,"matches"), ob("date","desc"), limit(limitTo));
  }

  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

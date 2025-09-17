import { useState } from "react";
import MatchForm from "../../components/matches/MatchForm";
import MatchesTable from "../../components/matches/MatchesTable";
import styles from "./MatchesPage.module.css";

export default function MatchesPage({ orgId, teamId }) {
  const [reloadKey, setReloadKey] = useState(0);
  return (
    <div className={styles.page}>
      <MatchForm orgId={orgId} teamId={teamId} onSaved={()=>setReloadKey(k=>k+1)} />
      <MatchesTable key={reloadKey} orgId={orgId} teamId={teamId} />
    </div>
  );
}

import { useMemo } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import teoricosRaw from "../../data/teoricos.json";
import { TEORICO_COMPONENTS } from "./teoricos";
import TeoricoLayout from "./TeoricoLayout.jsx";
import styles from "./Teorico.module.css";

export default function Teorico() {
  const { id } = useParams();

  const item = useMemo(() => {
    const list = Array.isArray(teoricosRaw) ? teoricosRaw : teoricosRaw?.default || [];
    return list.find((t) => t.id === id);
  }, [id]);

  if (!item) return null;

  const Comp = TEORICO_COMPONENTS[id];
  if (Comp) return <Comp />;

  return (
    <TeoricoLayout title={item.title} summary={item.summary} tags={item.tags}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} className={styles.md}>
        {item.content || ""}
      </ReactMarkdown>
    </TeoricoLayout>
  );
}

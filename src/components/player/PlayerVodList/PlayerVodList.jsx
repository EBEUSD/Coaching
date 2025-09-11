import s from "./PlayerVodList.module.css";

export default function PlayerVodList({ vods = [] }) {
  return (
    <div className={s.card}>
      <h3 className={s.title}>VODs</h3>
      <div className={s.grid}>
        {vods.map(v => (
          <article key={v.id} className={s.vod}>
            <div className={s.thumb}>
              <iframe
                title={v.title}
                src={`https://www.youtube.com/embed/${v.youtubeId}`}
                allowFullScreen
              />
            </div>
            <div className={s.meta}>
              <div className={s.vodTitle}>{v.title}</div>
              {v.tags?.length ? <div className={s.tags}>{v.tags.join(" · ")}</div> : null}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

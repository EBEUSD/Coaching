import g from "../../styles/App.module.css";
import s from "./DashboardStaff.module.css";
import StaffTaskManager from "../../components/staff/StaffTaskManager/StaffTaskManager.jsx";
import TheoryListEditor from "../../components/staff/TheoryListEditor/TheoryListEditor.jsx";
import VodManager from "../../components/staff/VodManager/VodManager.jsx";

export default function DashboardStaff() {
  return (
    <div className={`${g.grid3} ${s.wrap}`}>
      <StaffTaskManager
        initial={[
          {
            id: "t1",
            title: "Revisión VOD vs Team X",
            desc: "Marcar 5 momentos clave",
            type: "vod",
          },
        ]}
      />
      <TheoryListEditor
        initial={[
          {
            slug: "retake-base",
            title: "Retake – estructura base",
            category: "Macro",
            tags: ["retake", "equipo"],
          },
        ]}
      />
      <VodManager
        initial={[
          {
            id: "v1",
            title: "Scrim vs Team X (Ascent)",
            youtubeId: "dQw4w9WgXcQ",
          },
        ]}
      />
    </div>
  );
}

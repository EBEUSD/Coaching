import { BrowserRouter, Routes, Route } from "react-router-dom";
import app from "./styles/App.module.css";

import SharedHeader from "./components/layout/sharedHeader/SharedHeader.jsx";
import ProtectedRoute from "./components/auth/ProtectedRoute/ProtectedRoute.jsx";
import Hero from "./components/layout/Hero/Hero.jsx";

import Login from "./routes/Login/Login.jsx";
import DashboardPlayer from "./routes/DashboardPlayer/DashboardPlayer.jsx";
import DashboardStaff from "./routes/DashboardStaff/DashboardStaff.jsx";
import Biblioteca from "./routes/Biblioteca/Biblioteca.jsx";
import Vods from "./routes/Vods/Vods.jsx";
import Tareas from "./routes/Tareas/Tareas.jsx";

export default function App() {
  return (
    <div className={app.app}>
      <BrowserRouter>
        <SharedHeader />
        <main className={`${app.main} ${app.container}`}>
          <Routes>
            <Route path="/" element={<Hero />} />

            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard/player"
              element={
                <ProtectedRoute role="any">
                  <DashboardPlayer />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/staff"
              element={
                <ProtectedRoute role="staff">
                  <DashboardStaff />
                </ProtectedRoute>
              }
            />
            <Route
              path="/biblioteca"
              element={
                <ProtectedRoute role="any">
                  <Biblioteca />
                </ProtectedRoute>
              }
            />
            <Route
              path="/vods"
              element={
                <ProtectedRoute role="any">
                  <Vods />
                </ProtectedRoute>
              }
            />
            <Route
              path="/tareas"
              element={
                <ProtectedRoute role="any">
                  <Tareas />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

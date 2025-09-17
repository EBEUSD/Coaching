import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import app from "./styles/App.module.css";
import Navbar from "./components/navbar/Navbar.jsx";
import ProtectedRoute from "./components/auth/ProtectedRoute/ProtectedRoute.jsx";
import Hero from "./components/layout/Hero/Hero.jsx";

import Login from "./routes/Login/Login.jsx";
import DashboardPlayer from "./routes/DashboardPlayer/DashboardPlayer.jsx";
import DashboardStaff from "./routes/DashboardStaff/DashboardStaff.jsx";
import Biblioteca from "./routes/Biblioteca/Biblioteca.jsx";
import Teorico from "./routes/Biblioteca/Teorico.jsx";
import Vods from "./routes/Vods/Vods.jsx";
import Tareas from "./routes/Tareas/Tareas.jsx";
import AdminUsers from "./routes/AdminUsers/AdminUsers.jsx";

import MatchesPage from "./routes/Matches/MatchesPage.jsx"; 
import { AuthProvider } from "./context/AuthContext.jsx";

function MatchesPageByParam() {
  const { teamId } = useParams();
  return <MatchesPage teamId={teamId} />;
}

export default function App() {
  return (
    <div className={app.app}>
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
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
                path="/biblioteca/:id"
                element={
                  <ProtectedRoute role="any">
                    <Teorico />
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

              {/* NUEVAS RUTAS: Partidas / Matches */}
              <Route
                path="/matches"
                element={
                  <ProtectedRoute role="staff">
                    <MatchesPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/matches/:teamId"
                element={
                  <ProtectedRoute role="staff">
                    <MatchesPageByParam />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/usuarios"
                element={
                  <ProtectedRoute role="owner">
                    <AdminUsers />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

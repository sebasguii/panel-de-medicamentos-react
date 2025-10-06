import "./App.css";

import MedicamentosPanel from "./modules/medicamentos/MedicamentosPanel";
import PacientesPanel from "./modules/pacientes/PacientesPanel";
import PacienteMedicamentosPanel from "./modules/pacientes/panel/PacienteMedicamentosPanel";
import AsignacionMedicamentosPanel from "./modules/pacientes/AsignacionMedicamentosPanel";
import SignosVitalesMain from "./modules/signosVitales/SignosVitalesMain";
import HistoricoDiaPanel from "./modules/historico/HistoricoDiaPanel";
import AuthPage from "./components/AuthPage";

import { useState } from "react";
import { useAuth } from "./context/AuthContext";

function App() {
  const [panel, setPanel] = useState("medicamentos");
  const { isAuthenticated, logout, loading } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!isAuthenticated) {
    return <AuthPage />;
  }

  return (
    <div className="App">
      <nav className="navbar">
        <div className="navbar-brand">
          <img src="/salud.svg" alt="Logo" className="navbar-logo" />
          <h1>Salud a tu puerta</h1>
        </div>
        <div className="navbar-menu">
          <button
            className={panel === "pacientes" ? "nav-btn active" : "nav-btn"}
            onClick={() => setPanel("pacientes")}
          >
            👥 Pacientes
          </button>
          <button
            className={panel === "medicamentos" ? "nav-btn active" : "nav-btn"}
            onClick={() => setPanel("medicamentos")}
          >
            💊 Medicamentos
          </button>
          <button
            className={
              panel === "asignacion-medicamentos" ? "nav-btn active" : "nav-btn"
            }
            onClick={() => setPanel("asignacion-medicamentos")}
          >
            📋 Asignar
          </button>
          <button
            className={
              panel === "paciente-medicamentos" ? "nav-btn active" : "nav-btn"
            }
            onClick={() => setPanel("paciente-medicamentos")}
          >
            🏥 Administrar
          </button>
          <button
            className={
              panel === "signos-vitales" ? "nav-btn active" : "nav-btn"
            }
            onClick={() => setPanel("signos-vitales")}
          >
            ❤️ Signos Vitales
          </button>
          <button
            className={
              panel === "historico-dia" ? "nav-btn active" : "nav-btn"
            }
            onClick={() => setPanel("historico-dia")}
          >
            📊 Histórico
          </button>
        </div>
        <button className="nav-btn logout-btn" onClick={handleLogout}>
          🚪 Cerrar sesión
        </button>
      </nav>

      <div className="content">
        {panel === "pacientes" && <PacientesPanel />}
        {panel === "medicamentos" && <MedicamentosPanel />}
        {panel === "asignacion-medicamentos" && <AsignacionMedicamentosPanel />}
        {panel === "paciente-medicamentos" && <PacienteMedicamentosPanel />}
        {panel === "signos-vitales" && <SignosVitalesMain />}
        {panel === "historico-dia" && <HistoricoDiaPanel />}
      </div>
    </div>
  );
}

export default App;

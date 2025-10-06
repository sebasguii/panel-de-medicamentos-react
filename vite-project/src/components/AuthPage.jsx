import { useState } from "react";
import { login, register } from "../shared/authService";

const bgStyle = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #2c3e50 0%, #34495e 50%, #2c3e50 100%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: "Segoe UI, Roboto, sans-serif",
  position: "relative",
  overflow: "hidden",
};

const cardStyle = {
  background: "rgba(255,255,255,0.98)",
  borderRadius: 12,
  boxShadow: "0 10px 40px rgba(0, 0, 0, 0.4)",
  padding: 40,
  maxWidth: 420,
  width: "100%",
  backdropFilter: "blur(10px)",
  border: "3px solid #16a085",
  position: "relative",
  zIndex: 1,
};

const tabStyle = (isActive) => ({
  flex: 1,
  padding: 14,
  cursor: "pointer",
  borderBottom: isActive ? "3px solid #16a085" : "3px solid transparent",
  color: isActive ? "#16a085" : "#2c3e50",
  fontWeight: 700,
  background: "none",
  outline: "none",
  fontSize: 16,
  textTransform: "uppercase",
  letterSpacing: "0.5px",
  transition: "all 0.3s ease",
});

export default function AuthPage() {
  const [tab, setTab] = useState("login");
  // Login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Registro
  const [nombre, setNombre] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [rol, setRol] = useState("administrador");
  // Estado
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await login(email, password);
      window.location.reload();
    } catch {
      setError("Credenciales incorrectas");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await register({ nombre, email: regEmail, password: regPassword, rol });
      setSuccess(
        "Usuario registrado correctamente. Ahora puedes iniciar sesión."
      );
      setTab("login");
      setNombre("");
      setRegEmail("");
      setRegPassword("");
    } catch (err) {
      setError(err?.response?.data?.error || "Error al registrar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={bgStyle}>
      <div style={cardStyle}>
        <div style={{ display: "flex", marginBottom: 24 }}>
          <button
            style={tabStyle(tab === "login")}
            onClick={() => setTab("login")}
          >
            Iniciar sesión
          </button>
          <button
            style={tabStyle(tab === "register")}
            onClick={() => setTab("register")}
          >
            Registrarse
          </button>
        </div>
        {tab === "login" && (
          <form onSubmit={handleLogin}>
            <div style={{ textAlign: "center", marginBottom: 30 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 8 }}>
                <img src="/salud.svg" alt="Logo" style={{ width: 50, height: 50 }} />
                <h2 style={{ color: "#2c3e50", margin: 0, fontSize: 28, fontWeight: 700 }}>
                  Salud a tu puerta
                </h2>
              </div>
              <p style={{ color: "#7f8c8d", fontSize: 14 }}>Ingresa tus credenciales para continuar</p>
            </div>
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                marginBottom: 16,
                padding: "12px 14px",
                borderRadius: 4,
                border: "2px solid #bdc3c7",
                fontSize: 15,
                transition: "all 0.3s ease",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
              }}
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                marginBottom: 20,
                padding: "12px 14px",
                borderRadius: 4,
                border: "2px solid #bdc3c7",
                fontSize: 15,
                transition: "all 0.3s ease",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
              }}
            />
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: 14,
                background: "#16a085",
                color: "#fff",
                border: "2px solid #16a085",
                borderRadius: 4,
                fontWeight: 700,
                fontSize: 16,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                cursor: loading ? "not-allowed" : "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 3px 10px rgba(22, 160, 133, 0.3)",
              }}
            >
              {loading ? "Ingresando..." : "Ingresar"}
            </button>
            {error && (
              <div style={{ color: "#e74c3c", marginTop: 12, padding: 10, background: "rgba(231, 76, 60, 0.1)", borderRadius: 4, fontSize: 14, fontWeight: 600 }}>{error}</div>
            )}
          </form>
        )}
        {tab === "register" && (
          <form onSubmit={handleRegister}>
            <div style={{ textAlign: "center", marginBottom: 30 }}>
              <h2 style={{ color: "#2c3e50", marginBottom: 8, fontSize: 28, fontWeight: 700 }}>Crear cuenta</h2>
              <p style={{ color: "#7f8c8d", fontSize: 14 }}>Completa el formulario para registrarte</p>
            </div>
            <input
              type="text"
              placeholder="Nombre completo"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              style={{
                width: "100%",
                marginBottom: 14,
                padding: "12px 14px",
                borderRadius: 4,
                border: "2px solid #bdc3c7",
                fontSize: 15,
                transition: "all 0.3s ease",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
              }}
            />
            <input
              type="email"
              placeholder="Correo electrónico"
              value={regEmail}
              onChange={(e) => setRegEmail(e.target.value)}
              required
              style={{
                width: "100%",
                marginBottom: 14,
                padding: "12px 14px",
                borderRadius: 4,
                border: "2px solid #bdc3c7",
                fontSize: 15,
                transition: "all 0.3s ease",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
              }}
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={regPassword}
              onChange={(e) => setRegPassword(e.target.value)}
              required
              style={{
                width: "100%",
                marginBottom: 14,
                padding: "12px 14px",
                borderRadius: 4,
                border: "2px solid #bdc3c7",
                fontSize: 15,
                transition: "all 0.3s ease",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
              }}
            />
            <select
              value={rol}
              onChange={(e) => setRol(e.target.value)}
              style={{
                width: "100%",
                marginBottom: 20,
                padding: "12px 14px",
                borderRadius: 4,
                border: "2px solid #bdc3c7",
                fontSize: 15,
                transition: "all 0.3s ease",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                color: "#2c3e50",
              }}
            >
              <option value="administrador">Administrador</option>
              <option value="auxiliar">Auxiliar</option>
              <option value="cuidador">Cuidador</option>
            </select>
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: 14,
                background: "#16a085",
                color: "#fff",
                border: "2px solid #16a085",
                borderRadius: 4,
                fontWeight: 700,
                fontSize: 16,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                cursor: loading ? "not-allowed" : "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 3px 10px rgba(22, 160, 133, 0.3)",
              }}
            >
              {loading ? "Registrando..." : "Registrarse"}
            </button>
            {error && (
              <div style={{ color: "#e74c3c", marginTop: 12, padding: 10, background: "rgba(231, 76, 60, 0.1)", borderRadius: 4, fontSize: 14, fontWeight: 600 }}>{error}</div>
            )}
            {success && (
              <div style={{ color: "#16a085", marginTop: 12, padding: 10, background: "rgba(22, 160, 133, 0.1)", borderRadius: 4, fontSize: 14, fontWeight: 600 }}>{success}</div>
            )}
          </form>
        )}
      </div>
    </div>
  );
}

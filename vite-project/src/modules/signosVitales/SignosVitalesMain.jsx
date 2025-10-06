import { useState } from "react";
import {
  getSignosVitales,
  createSignosVitales,
  deleteSignosVitales,
} from "./SignosVitalesService";
import { usePacientes } from "../pacientes/hooks/usePacientes";
import { useAuth } from "../../context/AuthContext";

export default function SignosVitalesMain() {
  const { pacientes } = usePacientes();
  const { token } = useAuth();
  const [selected, setSelected] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    paSistolica: "",
    paDiastolica: "",
    fc: "",
    spo2: "",
    glucometria: "",
    peso: "",
  });
  const [historico, setHistorico] = useState([]);

  const handleSelect = async (id) => {
    setSelected(id);
    try {
      const signos = await getSignosVitales(id, token); // Necesitamos el token aquí
      setHistorico(signos);
    } catch (error) {
      console.error("Error al obtener los signos vitales:", error);
    }
  };

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createSignosVitales(
        {
          pacienteId: selected,
          fecha: new Date().toISOString(),
          paSistolica: form.paSistolica,
          paDiastolica: form.paDiastolica,
          fc: form.fc,
          spo2: form.spo2,
          glucometria: form.glucometria,
          peso: form.peso,
        },
        token
      );
      setForm({
        paSistolica: "",
        paDiastolica: "",
        fc: "",
        spo2: "",
        glucometria: "",
        peso: "",
      });
      setShowForm(false);
      await handleSelect(selected);
    } catch (error) {
      console.error("Error al crear el registro de signos vitales:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteSignosVitales(id, token);
      await handleSelect(selected);
    } catch (error) {
      console.error("Error al eliminar el registro de signos vitales:", error);
    }
  };

  return (
    <div
      className="signos-v-main"
      style={{
        maxWidth: 600,
        margin: "40px auto",
        background: "#f5f5f2",
        borderRadius: 18,
        padding: 32,
        boxShadow: "0 4px 32px #bfae8233",
      }}
    >
      <h2 style={{ color: "#6b4f2c" }}>Registro de Signos Vitales</h2>
      <div style={{ marginBottom: 24 }}>
        <label style={{ color: "#6b4f2c", fontWeight: 600 }}>
          Selecciona un paciente:{" "}
        </label>
        <select
          value={selected}
          onChange={(e) => handleSelect(e.target.value)}
          style={{
            background: "#e8e6e3",
            border: "1.5px solid #bfae82",
            color: "#6b4f2c",
            padding: "8px 16px",
            borderRadius: 8,
          }}
        >
          <option value="">-- Selecciona --</option>
          {pacientes.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nombre} {p.apellido} ({p.tipoDocumento}: {p.documento})
            </option>
          ))}
        </select>
        {selected && (
          <button
            style={{ marginLeft: 16, background: "#bfae82", color: "#fff" }}
            onClick={() => setShowForm(true)}
          >
            Registrar signos
          </button>
        )}
      </div>
      {showForm && (
        <div
          className="modal-backdrop"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "#bfae8299",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            className="modal"
            style={{
              background: "#fff",
              borderRadius: 18,
              padding: 32,
              minWidth: 340,
              boxShadow: "0 8px 40px #bfae8299",
              maxWidth: "95vw",
              color: "#6b4f2c",
            }}
          >
            <h3 style={{ marginTop: 0 }}>Registrar signos vitales</h3>
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                gap: 12,
                flexWrap: "wrap",
                background: "#f5f5f2",
                padding: 16,
                borderRadius: 12,
              }}
            >
              <input
                name="paSistolica"
                value={form.paSistolica}
                onChange={handleChange}
                placeholder="PA Sistólica (mmHg)"
                required
                style={{ width: 120 }}
              />
              <input
                name="paDiastolica"
                value={form.paDiastolica}
                onChange={handleChange}
                placeholder="PA Diastólica (mmHg)"
                required
                style={{ width: 120 }}
              />
              <input
                name="fc"
                value={form.fc}
                onChange={handleChange}
                placeholder="FC (lpm)"
                required
              />
              <input
                name="spo2"
                value={form.spo2}
                onChange={handleChange}
                placeholder="SpO2 (%)"
                required
              />
              <input
                name="glucometria"
                value={form.glucometria}
                onChange={handleChange}
                placeholder="Glucometría (mg/dl)"
                required
              />
              <input
                name="peso"
                value={form.peso}
                onChange={handleChange}
                placeholder="Peso (kg)"
                required
              />
              <button type="submit">Guardar</button>
              <button
                type="button"
                style={{ background: "#bfcad6", color: "#6b4f2c" }}
                onClick={() => setShowForm(false)}
              >
                Cancelar
              </button>
            </form>
          </div>
        </div>
      )}
      {selected && (
        <table
          style={{
            marginTop: 18,
            background: "#f5f5f2",
            borderRadius: 10,
            width: "100%",
          }}
        >
          <thead>
            <tr style={{ background: "#bfae82", color: "#fff" }}>
              <th>Fecha</th>
              <th>PA Sistólica</th>
              <th>PA Diastólica</th>
              <th>FC</th>
              <th>SpO2</th>
              <th>Glucometría</th>
              <th>Peso</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {historico.map((sv) => (
              <tr
                key={sv.id}
                style={{ background: "#e8e6e3", color: "#6b4f2c" }}
              >
                <td>{new Date(sv.fecha).toLocaleString()}</td>
                <td>{sv.paSistolica}</td>
                <td>{sv.paDiastolica}</td>
                <td>{sv.fc}</td>
                <td>{sv.spo2}</td>
                <td>{sv.glucometria}</td>
                <td>{sv.peso}</td>
                <td>
                  <button
                    style={{ background: "#bfae82", color: "#fff" }}
                    onClick={() => handleDelete(sv.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
            {historico.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  style={{ textAlign: "center", color: "#bfae82" }}
                >
                  Sin registros
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

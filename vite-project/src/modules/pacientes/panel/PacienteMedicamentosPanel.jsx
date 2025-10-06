import { usePacientes } from "../hooks/usePacientes";
import { useMedicamentos } from "../../medicamentos/hooks/useMedicamentos";
import { useState } from "react";
import {
  getAdministracionesByPaciente,
  addAdministracion,
  getAdministraciones,
  deleteAdministracion,
} from "../../../shared/administracionesService";
import * as XLSX from "xlsx";

function MedicamentoAsignado({ medicamento, administracion, onAdministrar }) {
  const [showForm, setShowForm] = useState(false);
  const [persona, setPersona] = useState("");
  const [motivo, setMotivo] = useState("");

  const handleAdministrar = (estado) => {
    onAdministrar({ medicamentoId: medicamento.id, persona, estado, motivo });
    setShowForm(false);
    setPersona("");
    setMotivo("");
  };

  return (
    <tr>
      <td>{medicamento.nombre}</td>
      <td>{medicamento.frecuencia || "-"}</td>
      <td>{medicamento.horaRecomendada || "-"}</td>
      <td>
        {administracion && administracion.estado === "administrado" ? (
          <>
            <span style={{ color: "#00eaff", fontWeight: 600 }}>
              Administrado
            </span>
            <br />
            <small>
              {new Date(administracion.fecha).toLocaleTimeString()} por{" "}
              {administracion.persona}
            </small>
          </>
        ) : administracion && administracion.estado === "no-administrado" ? (
          <>
            <span style={{ color: "#ff4e4e", fontWeight: 600 }}>
              No administrado
            </span>
            <br />
            <small>Motivo: {administracion.motivo}</small>
          </>
        ) : showForm ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <input
              placeholder="Persona que administra"
              value={persona}
              onChange={(e) => setPersona(e.target.value)}
            />
            <div style={{ display: "flex", gap: 8 }}>
              <button
                style={{ background: "#00eaff", color: "#232946" }}
                onClick={() => handleAdministrar("administrado")}
                disabled={!persona}
              >
                Administrar
              </button>
              <button
                style={{ background: "#ff4e4e", color: "#fff" }}
                onClick={() => handleAdministrar("no-administrado")}
                disabled={!motivo}
              >
                No administrar
              </button>
              <button
                style={{ background: "#232946", color: "#00eaff" }}
                onClick={() => setShowForm(false)}
              >
                Cancelar
              </button>
            </div>
            <input
              placeholder="Motivo si no se administra"
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
            />
          </div>
        ) : (
          <button
            style={{ background: "#00eaff", color: "#232946", fontWeight: 600 }}
            onClick={() => setShowForm(true)}
          >
            Administrar
          </button>
        )}
      </td>
    </tr>
  );
}

export default function PacienteMedicamentosPanel() {
  const { pacientes } = usePacientes();
  const { medicamentos } = useMedicamentos();
  const [selected, setSelected] = useState(null);
  const [historico, setHistorico] = useState([]);

  const handleSelect = async (id) => {
    try {
      setSelected(id);
      const historicoData = await getAdministracionesByPaciente(id);
      setHistorico(historicoData);
    } catch (error) {
      console.error("Error al cargar el historial:", error);
      // Mostrar mensaje de error al usuario si es necesario
    }
  };

  const handleAdministrar = async ({
    medicamentoId,
    persona,
    estado,
    motivo,
  }) => {
    try {
      const fecha = new Date().toISOString();
      await addAdministracion({
        pacienteId: selected,
        medicamentoId,
        fecha,
        persona,
        estado,
        motivo,
      });
      // Actualizar el historial después de agregar
      await handleSelect(selected);
    } catch (error) {
      console.error("Error al registrar la administración:", error);
      // Mostrar mensaje de error al usuario si es necesario
    }
  };

  const handleReiniciar = async () => {
    if (!selected) return;

    try {
      const todas = await getAdministraciones();
      const promesasEliminar = todas
        .filter((a) => a.pacienteId === selected)
        .map((a) => deleteAdministracion(a.id));

      await Promise.all(promesasEliminar);
      await handleSelect(selected);
    } catch (error) {
      console.error("Error al reiniciar las administraciones:", error);
      // Mostrar mensaje de error al usuario si es necesario
    }
  };

  // Exportar histórico a Excel
  const exportarExcel = () => {
    if (!historico.length) return;
    const data = historico.map((a) => {
      const medicamento =
        medicamentos.find((m) => m.id === a.medicamentoId) || {};
      return {
        Paciente: pacientes.find((p) => p.id === a.pacienteId)?.nombre || "",
        Medicamento: medicamento.nombre || "",
        Estado:
          a.estado === "administrado" ? "Administrado" : "No administrado",
        Motivo: a.motivo || "-",
        Fecha: new Date(a.fecha).toLocaleString(),
        "Persona que administró": a.persona || "-",
      };
    });
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Administraciones");
    XLSX.writeFile(wb, "historico_administraciones.xlsx");
  };

  return (
    <div>
      <h2>Panel de Medicamentos por Paciente</h2>
      <div>
        <label>Selecciona un paciente: </label>
        <select
          value={selected || ""}
          onChange={(e) => handleSelect(e.target.value)}
        >
          <option value="">-- Selecciona --</option>
          {pacientes.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nombre} {p.apellido}
            </option>
          ))}
        </select>
      </div>
      {selected && (
        <>
          <h3>Medicamentos asignados</h3>
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Frecuencia</th>
                <th>Hora Recomendada</th>
                <th>Administrar</th>
              </tr>
            </thead>
            <tbody>
              {medicamentos
                .filter((m) => m.pacienteId === selected)
                .map((m) => {
                  // Buscar la última administración de este medicamento para este paciente
                  const admin = [...historico]
                    .reverse()
                    .find((a) => a.medicamentoId === m.id);
                  return (
                    <MedicamentoAsignado
                      key={m.id}
                      medicamento={m}
                      administracion={admin}
                      onAdministrar={handleAdministrar}
                    />
                  );
                })}
            </tbody>
          </table>
          <h3>Histórico de administraciones</h3>
          <table>
            <thead>
              <tr>
                <th>Medicamento</th>
                <th>Estado</th>
                <th>Motivo</th>
                <th>Hora</th>
                <th>Persona que administró</th>
              </tr>
            </thead>
            <tbody>
              {!Array.isArray(historico) || historico.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    style={{ textAlign: "center", color: "#888" }}
                  >
                    Sin registros
                  </td>
                </tr>
              ) : (
                historico.map((a) => {
                  const medicamento =
                    medicamentos.find((m) => m.id === a.medicamentoId) || {};
                  return (
                    <tr key={a.id}>
                      <td>
                        {medicamento.nombre || "Medicamento no encontrado"}
                      </td>
                      <td
                        style={{
                          color:
                            a.estado === "administrado" ? "#00eaff" : "#ff4e4e",
                          fontWeight: 600,
                        }}
                      >
                        {a.estado === "administrado"
                          ? "Administrado"
                          : "No administrado"}
                      </td>
                      <td>{a.motivo || "-"}</td>
                      <td>
                        {a.fecha ? new Date(a.fecha).toLocaleTimeString() : "-"}
                      </td>
                      <td>{a.persona || "-"}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
          <div style={{ display: "flex", gap: 16, marginTop: 16 }}>
            <button onClick={exportarExcel}>Exportar histórico a Excel</button>
            <button
              style={{ background: "#e57373", color: "#fff" }}
              onClick={handleReiniciar}
            >
              Reiniciar administraciones
            </button>
          </div>
        </>
      )}
    </div>
  );
}

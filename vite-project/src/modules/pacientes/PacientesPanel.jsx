import { usePacientes } from "./hooks/usePacientes";
import PacienteForm from "./components/PacienteForm";
import { useState } from "react";
import Modal from "../../components/Modal";

export default function PacientesPanel() {
  const { pacientes, create, update, remove } = usePacientes();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleOpenCreateModal = () => {
    setEditId(null);
    setEditData(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (paciente) => {
    setEditId(paciente._id || paciente.id);
    // Preparar los datos para el formulario
    const formData = {
      ...paciente,
      acompananteNombre: paciente.acompanante?.nombre || "",
      acompananteTelefono: paciente.acompanante?.telefono || "",
      acompananteParentesco: paciente.acompanante?.parentesco || "",
      fechaNacimiento: paciente.fechaNacimiento
        ? new Date(paciente.fechaNacimiento).toISOString().split("T")[0]
        : "",
    };
    setEditData(formData);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditId(null);
    setEditData(null);
  };

  const handleSubmit = async (data) => {
    if (editId) {
      await update(editId, data);
    } else {
      await create(data);
    }
    handleCloseModal();
  };

  const handleDelete = (paciente) => {
    const confirmDelete = window.confirm(
      `¿Está seguro que desea eliminar al paciente ${paciente.nombre} ${paciente.apellidos}?`
    );
    if (confirmDelete) {
      remove(paciente._id || paciente.id);
    }
  };

  // Calcular paginación
  const totalPages = Math.ceil(pacientes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPacientes = pacientes.slice(startIndex, endIndex);

  return (
    <div>
      <h2 style={{ color: "#2c3e50", margin: "0 0 20px 0", textAlign: "center", fontSize: "2rem" }}>
        Histórico de Pacientes
      </h2>

      <div style={{ overflowX: "auto", marginBottom: 10 }}>
        <table
          style={{
            background: "#fff",
            borderRadius: 8,
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
            width: "100%",
            minWidth: "1200px",
            fontSize: "13px",
          }}
        >
          <thead>
            <tr>
              <th style={{ padding: "10px 8px", whiteSpace: "nowrap" }}>Nombre</th>
              <th style={{ padding: "10px 8px", whiteSpace: "nowrap" }}>Apellidos</th>
              <th style={{ padding: "10px 8px", whiteSpace: "nowrap" }}>Género</th>
              <th style={{ padding: "10px 8px", whiteSpace: "nowrap" }}>Documento</th>
              <th style={{ padding: "10px 8px", whiteSpace: "nowrap" }}>Tipo Doc.</th>
              <th style={{ padding: "10px 8px", whiteSpace: "nowrap" }}>F. Nacimiento</th>
              <th style={{ padding: "10px 8px", whiteSpace: "nowrap" }}>Correo</th>
              <th style={{ padding: "10px 8px", whiteSpace: "nowrap" }}>Dirección</th>
              <th style={{ padding: "10px 8px", whiteSpace: "nowrap" }}>Teléfono</th>
              <th style={{ padding: "10px 8px", whiteSpace: "nowrap" }}>Estado</th>
              <th style={{ padding: "10px 8px", whiteSpace: "nowrap" }}>Acompañante</th>
              <th style={{ padding: "10px 8px", whiteSpace: "nowrap" }}>Acciones</th>
            </tr>
          </thead>
        <tbody>
          {pacientes.length === 0 ? (
            <tr>
              <td
                colSpan="12"
                style={{ textAlign: "center", padding: 20, color: "#6b4f2c" }}
              >
                No hay pacientes registrados
              </td>
            </tr>
          ) : (
            currentPacientes.map((p) => (
              <tr
                key={p._id || p.id}
              >
                <td style={{ padding: "10px 8px", whiteSpace: "nowrap" }}>{p.nombre}</td>
                <td style={{ padding: "10px 8px", whiteSpace: "nowrap" }}>{p.apellidos}</td>
                <td style={{ padding: "10px 8px" }}>{p.genero}</td>
                <td style={{ padding: "10px 8px" }}>{p.documento}</td>
                <td style={{ padding: "10px 8px" }}>{p.tipoDocumento}</td>
                <td style={{ padding: "10px 8px", whiteSpace: "nowrap" }}>
                  {p.fechaNacimiento
                    ? new Date(p.fechaNacimiento).toLocaleDateString("es-ES", { day: "2-digit", month: "2-digit", year: "numeric" })
                    : ""}
                </td>
                <td style={{ padding: "10px 8px", maxWidth: "180px", overflow: "hidden", textOverflow: "ellipsis" }}>{p.correo}</td>
                <td style={{ padding: "10px 8px", maxWidth: "150px", overflow: "hidden", textOverflow: "ellipsis" }}>{p.direccion}</td>
                <td style={{ padding: "10px 8px" }}>{p.telefono}</td>
                <td style={{ padding: "10px 8px" }}>
                  <span
                    style={{
                      padding: "3px 8px",
                      borderRadius: 4,
                      background: p.estado === "activo" ? "#16a085" : "#95a5a6",
                      color: "#fff",
                      fontSize: 11,
                      fontWeight: 600,
                      textTransform: "uppercase",
                    }}
                  >
                    {p.estado}
                  </span>
                </td>
                <td style={{ padding: "10px 8px", minWidth: "150px" }}>
                  {p.acompanante &&
                  (p.acompanante.nombre ||
                    p.acompanante.telefono ||
                    p.acompanante.parentesco) ? (
                    <div style={{ fontSize: 11 }}>
                      <div style={{ marginBottom: 2 }}>
                        <b>Nombre:</b> {p.acompanante.nombre}
                      </div>
                      <div style={{ marginBottom: 2 }}>
                        <b>Tel:</b> {p.acompanante.telefono}
                      </div>
                      <div>
                        <b>Parentesco:</b> {p.acompanante.parentesco}
                      </div>
                    </div>
                  ) : (
                    "-"
                  )}
                </td>
                <td style={{ padding: "10px 8px" }}>
                  <div style={{ display: "flex", gap: 6, flexWrap: "nowrap" }}>
                    <button
                      style={{
                        background: "#16a085",
                        color: "#fff",
                        padding: "5px 10px",
                        borderRadius: 4,
                        border: "2px solid #16a085",
                        cursor: "pointer",
                        fontWeight: 600,
                        fontSize: 12,
                        whiteSpace: "nowrap",
                      }}
                      onClick={() => handleOpenEditModal(p)}
                    >
                      Editar
                    </button>
                    <button
                      style={{
                        background: "#e74c3c",
                        color: "#fff",
                        padding: "5px 10px",
                        borderRadius: 4,
                        border: "2px solid #e74c3c",
                        cursor: "pointer",
                        fontWeight: 600,
                        fontSize: 12,
                        whiteSpace: "nowrap",
                      }}
                      onClick={() => handleDelete(p)}
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
        </table>
      </div>

      {/* Controles de paginación */}
      {totalPages > 1 && (
        <div style={{ 
          display: "flex", 
          justifyContent: "center",
          alignItems: "center", 
          marginTop: 20,
          gap: 10
        }}>
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            style={{
              padding: "8px 16px",
              opacity: currentPage === 1 ? 0.5 : 1,
              cursor: currentPage === 1 ? "not-allowed" : "pointer"
            }}
          >
            ← Anterior
          </button>
          <span style={{ color: "#2c3e50", fontWeight: 600 }}>
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            style={{
              padding: "8px 16px",
              opacity: currentPage === totalPages ? 0.5 : 1,
              cursor: currentPage === totalPages ? "not-allowed" : "pointer"
            }}
          >
            Siguiente →
          </button>
        </div>
      )}

      {/* Botón Ingresar Paciente */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
        <button
          onClick={handleOpenCreateModal}
          style={{
            background: "#16a085",
            color: "#fff",
            fontWeight: 700,
            padding: "12px 28px",
            borderRadius: 4,
            border: "2px solid #16a085",
            cursor: "pointer",
            fontSize: 16,
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            boxShadow: "0 3px 10px rgba(22, 160, 133, 0.3)",
          }}
        >
          + Ingresar Paciente
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editId ? "Editar Paciente" : "Ingresar Nuevo Paciente"}
      >
        <PacienteForm
          onSubmit={handleSubmit}
          initialData={editData}
          onCancel={handleCloseModal}
        />
      </Modal>
    </div>
  );
}

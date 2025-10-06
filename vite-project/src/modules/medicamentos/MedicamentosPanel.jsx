import { useMedicamentos } from "./hooks/useMedicamentos";
import MedicamentoForm from "./components/MedicamentoForm";
import { useState, useCallback } from "react";

export default function MedicamentosPanel() {
  const { medicamentos, create, update, remove, loading, error } =
    useMedicamentos();
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState(null);

  // Depuración
  console.log("Medicamentos cargados:", medicamentos);
  console.log("Estado de carga:", loading);
  if (error) console.error("Error al cargar medicamentos:", error);

  // Función para manejar el envío del formulario
  const handleSubmit = useCallback(
    (data) => {
      if (editId) {
        update(editId, data);
        setEditId(null);
        setEditData(null);
      } else {
        create(data);
      }
    },
    [editId, update, create]
  );

  // Función para manejar la edición
  const handleEdit = useCallback((medicamento) => {
    setEditId(medicamento.id);
    setEditData(medicamento);
  }, []);

  // Función para manejar la cancelación
  const handleCancel = useCallback(() => {
    setEditId(null);
    setEditData(null);
  }, []);

  // Función para manejar la eliminación
  const handleDelete = useCallback(
    (id) => {
      if (
        window.confirm("¿Estás seguro de que deseas eliminar este medicamento?")
      ) {
        remove(id);
      }
    },
    [remove]
  );

  // Mostrar estado de carga
  if (loading) {
    return (
      <div className="loading-container">
        <p>Cargando medicamentos...</p>
      </div>
    );
  }

  // Mostrar mensaje de error si hay alguno
  if (error) {
    return (
      <div className="error-container">
        <h2>Error al cargar los medicamentos</h2>
        <p>
          {error.message ||
            "No se pudieron cargar los medicamentos. Intente nuevamente más tarde."}
        </p>
        <button onClick={() => window.location.reload()}>Reintentar</button>
      </div>
    );
  }

  return (
    <div className="medicamentos-panel">
      <h2>Panel de Medicamentos</h2>

      <MedicamentoForm
        onSubmit={handleSubmit}
        initialData={editData}
        onCancel={handleCancel}
      />

      <div className="table-responsive">
        <table className="medicamentos-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Stock</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(medicamentos) && medicamentos.length > 0 ? (
              medicamentos
                .filter(
                  (medicamento) =>
                    medicamento && typeof medicamento.id !== "undefined"
                )
                .map((medicamento) => (
                  <tr key={`medicamento-${medicamento.id}`}>
                    <td>{medicamento.id}</td>
                    <td>{medicamento.nombre || "Sin nombre"}</td>
                    <td>{medicamento.descripcion || "Sin descripción"}</td>
                    <td>{medicamento.stock ?? "N/A"}</td>
                    <td
                      className={`estado ${medicamento.estado || "inactivo"}`}
                    >
                      {medicamento.estado === "activo" ? "Activo" : "Inactivo"}
                    </td>
                    <td className="acciones">
                      <button
                        className="btn-editar"
                        onClick={() => handleEdit(medicamento)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn-eliminar"
                        onClick={() => handleDelete(medicamento.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No hay medicamentos para mostrar.{" "}
                  {medicamentos === null ? "(Error al cargar)" : ""}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

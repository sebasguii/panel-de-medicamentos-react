import PacienteForm from "./PacienteForm";
import Modal from "../../../components/Modal";
import { useState } from "react";

export default function PacienteList({ pacientes, onEdit, onDelete }) {
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (paciente) => {
    setEditId(paciente.id || paciente._id);
    setEditData(paciente);
    setIsModalOpen(true);
  };

  const handleDelete = (paciente) => {
    const confirmDelete = window.confirm(
      `¿Está seguro que desea eliminar al paciente ${paciente.nombre} ${paciente.apellidos || paciente.apellido}?`
    );
    if (confirmDelete) {
      onDelete(paciente.id || paciente._id);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditId(null);
    setEditData(null);
  };

  return (
    <div>
      <h2>Pacientes</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Documento</th>
            <th>Tipo Documento</th>
            <th>Fecha Nacimiento</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pacientes.map((p) => (
            <tr key={p.id || p._id}>
              <td>{p.nombre}</td>
              <td>{p.apellidos || p.apellido}</td>
              <td>{p.documento}</td>
              <td>{p.tipoDocumento}</td>
              <td>{p.fechaNacimiento}</td>
              <td>{p.estado}</td>
              <td>
                <button
                  style={{
                    background: '#2196F3',
                    color: '#fff',
                    padding: '6px 12px',
                    borderRadius: 4,
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: 600,
                    marginRight: 8,
                  }}
                  onClick={() => handleEdit(p)}
                >
                  Editar
                </button>
                <button
                  style={{
                    background: '#f44336',
                    color: '#fff',
                    padding: '6px 12px',
                    borderRadius: 4,
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: 600,
                  }}
                  onClick={() => handleDelete(p)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Editar Paciente">
        <PacienteForm
          initialData={editData}
          onSubmit={(data) => {
            onEdit(editId, data);
            handleCloseModal();
          }}
          onCancel={handleCloseModal}
        />
      </Modal>
    </div>
  );
}

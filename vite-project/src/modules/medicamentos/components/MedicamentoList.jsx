import MedicamentoForm from './MedicamentoForm';
import { useState } from 'react';
import AdministrarMedicamentoModal from './AdministrarMedicamentoModal';
import MedicamentoAdministradoList from './MedicamentoAdministradoList';
import { addAdministracion } from '../../../shared/administracionesService';

export default function MedicamentoList({ medicamentos, pacientes, onEdit, onDelete }) {
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState(null);
  const [adminModal, setAdminModal] = useState({ open: false, medicamento: null });

  const handleAdministrar = (data) => {
    addAdministracion(data);
    setAdminModal({ open: false, medicamento: null });
  };

  return (
    <div>
      <h2>Medicamentos</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Stock</th>
            <th>Estado</th>
            <th>Administrado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {medicamentos.map(m => (
            <tr key={m.id}>
              <td>{m.nombre}</td>
              <td>{m.descripcion}</td>
              <td>{m.stock}</td>
              <td>{m.estado}</td>
              <td>
                <MedicamentoAdministradoList medicamentoId={m.id} pacientes={pacientes} />
              </td>
              <td>
                <button onClick={() => { setEditId(m.id); setEditData(m); }}>Editar</button>
                <button onClick={() => onDelete(m.id)}>Eliminar</button>
                <button onClick={() => setAdminModal({ open: true, medicamento: m })}>Administrar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editId && (
        <MedicamentoForm
          initialData={editData}
          onSubmit={data => { onEdit(editId, data); setEditId(null); }}
          onCancel={() => setEditId(null)}
        />
      )}
      <AdministrarMedicamentoModal
        open={adminModal.open}
        onClose={() => setAdminModal({ open: false, medicamento: null })}
        pacientes={pacientes}
        medicamento={adminModal.medicamento}
        onSubmit={handleAdministrar}
      />
    </div>
  );
}

import { useState } from 'react';

export default function AdministrarMedicamentoModal({ open, onClose, pacientes, onSubmit, medicamento }) {
  const [pacienteId, setPacienteId] = useState('');
  const [fecha, setFecha] = useState(new Date().toISOString().slice(0,16));
  const [persona, setPersona] = useState('');

  if (!open) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>Administrar Medicamento: {medicamento?.nombre}</h3>
        <form onSubmit={e => { e.preventDefault(); onSubmit({ pacienteId, medicamentoId: medicamento.id, fecha, persona }); }}>
          <label>Paciente:
            <select value={pacienteId} onChange={e => setPacienteId(e.target.value)} required>
              <option value="">Seleccione un paciente</option>
              {pacientes.map(p => <option key={p.id} value={p.id}>{p.nombre} {p.apellido}</option>)}
            </select>
          </label>
          <label>Fecha y hora:
            <input type="datetime-local" value={fecha} onChange={e => setFecha(e.target.value)} required />
          </label>
          <label>Persona que administra:
            <input value={persona} onChange={e => setPersona(e.target.value)} required placeholder="Nombre completo" />
          </label>
          <div className="modal-actions">
            <button type="submit">Guardar</button>
            <button type="button" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

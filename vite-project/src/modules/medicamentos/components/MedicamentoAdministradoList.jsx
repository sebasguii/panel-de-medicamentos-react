import { getAdministracionesByMedicamento } from '../../../shared/administracionesService';

export default function MedicamentoAdministradoList({ medicamentoId, pacientes }) {
  const administraciones = getAdministracionesByMedicamento(medicamentoId);

  if (!administraciones.length) return <p>No se ha administrado este medicamento.</p>;

  return (
    <table className="admin-table">
      <thead>
        <tr>
          <th>Paciente</th>
          <th>Fecha y hora</th>
          <th>Persona que administró</th>
        </tr>
      </thead>
      <tbody>
        {administraciones.map(a => {
          const paciente = pacientes.find(p => p.id === a.pacienteId);
          return (
            <tr key={a.id}>
              <td>{paciente ? paciente.nombre + ' ' + paciente.apellido : 'Desconocido'}</td>
              <td>{new Date(a.fecha).toLocaleString()}</td>
              <td>{a.persona}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

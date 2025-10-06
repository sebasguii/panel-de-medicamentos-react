import { usePacientes } from './hooks/usePacientes';
import { useMedicamentos } from '../medicamentos/hooks/useMedicamentos';
import { useState } from 'react';
import AsignarMedicamentoForm from './components/AsignarMedicamentoForm';

export default function AsignacionMedicamentosPanel() {
  const { pacientes } = usePacientes();
  const { medicamentos, update: updateMed } = useMedicamentos();
  const [asignarId, setAsignarId] = useState(null);

  const handleAsignar = (pacienteId, { medicamentoId, frecuencia, horaRecomendada }) => {
    const med = medicamentos.find(m => m.id === medicamentoId);
    if (med) {
      updateMed(medicamentoId, { ...med, pacienteId, frecuencia, horaRecomendada });
    }
    setAsignarId(null);
  };

  return (
    <div>
      <h2 style={{color:'#6b4f2c'}}>Asignación de Medicamentos por Paciente</h2>
      <table style={{background:'#f5f5f2',borderRadius:12,boxShadow:'0 2px 12px #bfae82cc'}}>
        <thead>
          <tr style={{background:'#bfae82',color:'#fff'}}>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Documento</th>
            <th>Tipo Documento</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {(() => {
            // Validar que pacientes sea un array y tenga elementos
            if (!Array.isArray(pacientes) || pacientes.length === 0) {
              return (
                <tr>
                  <td colSpan="5" style={{textAlign: 'center', padding: '10px'}}>
                    {!pacientes ? 'Cargando pacientes...' : 'No hay pacientes disponibles'}
                  </td>
                </tr>
              );
            }

            // Filtrar pacientes sin ID válido
            const pacientesValidos = pacientes.filter(paciente => paciente && (paciente.id || paciente._id));
            
            if (pacientesValidos.length === 0) {
              return (
                <tr>
                  <td colSpan="5" style={{textAlign: 'center', padding: '10px', color: 'red'}}>
                    Error: No hay pacientes con ID válido
                  </td>
                </tr>
              );
            }

            // Mapear solo pacientes con ID válido
            return pacientesValidos.map(paciente => {
              // Usar _id si id no está presente
              const pacienteId = paciente.id || paciente._id;
              
              return (
                <tr key={`paciente-${pacienteId}`} style={{background: '#e8e6e3', color: '#6b4f2c'}}>
                  <td>{paciente.nombre || 'No especificado'}</td>
                  <td>{paciente.apellido || 'No especificado'}</td>
                  <td>{paciente.documento || 'No especificado'}</td>
                  <td>{paciente.tipoDocumento || 'No especificado'}</td>
                  <td>
                    <button 
                      style={{background: '#bfcad6', color: '#6b4f2c'}} 
                      onClick={() => setAsignarId(pacienteId)}
                    >
                      Asignar medicamento
                    </button>
                    {asignarId === pacienteId && (
                      <AsignarMedicamentoForm
                        medicamentos={Array.isArray(medicamentos) 
                          ? medicamentos.filter(m => !m.pacienteId || m.pacienteId === pacienteId)
                          : []}
                        onAsignar={data => handleAsignar(pacienteId, data)}
                      />
                    )}
                  </td>
                </tr>
              );
            });
          })()}
        </tbody>
      </table>
    </div>
  );
}

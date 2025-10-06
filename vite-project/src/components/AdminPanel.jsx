import { useState } from 'react';
import { useMedicamentos } from '../modules/medicamentos/hooks/useMedicamentos';
import { usePacientes } from '../modules/pacientes/hooks/usePacientes';
import MedicamentoForm from '../modules/medicamentos/components/MedicamentoForm';
import MedicamentoList from '../modules/medicamentos/components/MedicamentoList';
import ExportarExcelButton from '../modules/medicamentos/components/ExportarExcelButton';
import PacienteForm from '../modules/pacientes/components/PacienteForm';
import PacienteList from '../modules/pacientes/components/PacienteList';

export default function AdminPanel() {
  const [tab, setTab] = useState('medicamentos');
  const {
    medicamentos, create: createMed, update: updateMed, remove: removeMed
  } = useMedicamentos();
  const {
    pacientes, create: createPac, update: updatePac, remove: removePac
  } = usePacientes();

  return (
    <div>
      <h1>Panel de Administración</h1>
      <div style={{ marginBottom: 20 }}>
        <button onClick={() => setTab('medicamentos')}>Medicamentos</button>
        <button onClick={() => setTab('pacientes')}>Pacientes</button>
      </div>
      {tab === 'medicamentos' && (
        <>
          <MedicamentoForm onSubmit={createMed} />
          <ExportarExcelButton medicamentos={medicamentos} pacientes={pacientes} />
          <MedicamentoList medicamentos={medicamentos} pacientes={pacientes} onEdit={updateMed} onDelete={removeMed} />
        </>
      )}
      {tab === 'pacientes' && (
        <>
          <PacienteForm onSubmit={createPac} />
          <PacienteList pacientes={pacientes} onEdit={updatePac} onDelete={removePac} />
        </>
      )}
    </div>
  );
}

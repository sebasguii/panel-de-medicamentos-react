import * as XLSX from 'xlsx';
import { getAdministraciones } from '../../../shared/administracionesService';

export default function ExportarExcelButton({ medicamentos, pacientes }) {
  const exportar = () => {
    const administraciones = getAdministraciones();
    const data = administraciones.map(a => {
      const medicamento = medicamentos.find(m => m.id === a.medicamentoId) || {};
      const paciente = pacientes.find(p => p.id === a.pacienteId) || {};
      return {
        Medicamento: medicamento.nombre,
        Descripcion: medicamento.descripcion,
        Paciente: paciente.nombre + ' ' + paciente.apellido,
        Fecha: a.fecha,
        'Persona que administró': a.persona,
      };
    });
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Administraciones');
    XLSX.writeFile(wb, 'medicamentos_administrados.xlsx');
  };
  return <button onClick={exportar}>Exportar a Excel</button>;
}

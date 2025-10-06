import { useState } from 'react';
import { usePacientes } from '../pacientes/hooks/usePacientes';
import { getAdministracionesByPaciente } from '../../shared/administracionesService';
import { getSignosVitales } from '../signosVitales/SignosVitalesService';
import * as XLSX from 'xlsx';

function filtrarHoy(arr, campoFecha) {
  const hoy = new Date();
  return arr.filter(item => {
    const fecha = new Date(item[campoFecha]);
    return fecha.getFullYear() === hoy.getFullYear() && fecha.getMonth() === hoy.getMonth() && fecha.getDate() === hoy.getDate();
  });
}

export default function HistoricoDiaPanel() {
  const { pacientes } = usePacientes();
  const [selected, setSelected] = useState('');
  const [historicoMed, setHistoricoMed] = useState([]);
  const [historicoSignos, setHistoricoSignos] = useState([]);

  const handleSelect = (id) => {
    setSelected(id);
    setHistoricoMed(filtrarHoy(getAdministracionesByPaciente(id), 'fecha'));
    // Actualizar para usar getSignosVitales de forma asíncrona
    const cargarSignosVitales = async () => {
      try {
        const signos = await getSignosVitales(id, localStorage.getItem('token'));
        setHistoricoSignos(filtrarHoy(signos, 'fecha'));
      } catch (error) {
        console.error('Error al cargar signos vitales:', error);
      }
    };
    cargarSignosVitales();
  };

  const exportarExcel = () => {
    if (!selected) return;
    const paciente = pacientes.find(p => p.id === selected);
    const wsData = [];
    wsData.push([`Histórico del día para: ${paciente.nombre} ${paciente.apellido}`]);
    wsData.push([]);
    wsData.push(['Medicamentos administrados']);
    wsData.push(['Medicamento', 'Estado', 'Motivo', 'Hora', 'Persona']);
    historicoMed.forEach(a => {
      wsData.push([
        a.medicamentoId,
        a.estado === 'administrado' ? 'Administrado' : 'No administrado',
        a.motivo || '-',
        new Date(a.fecha).toLocaleTimeString(),
        a.persona || '-'
      ]);
    });
    wsData.push([]);
    wsData.push(['Signos vitales registrados']);
    wsData.push(['Fecha', 'PA Sistólica', 'PA Diastólica', 'FC', 'SpO2', 'Glucometría', 'Peso']);
    historicoSignos.forEach(sv => {
      wsData.push([
        new Date(sv.fecha).toLocaleTimeString(),
        sv.paSistolica,
        sv.paDiastolica,
        sv.fc,
        sv.spo2,
        sv.glucometria,
        sv.peso
      ]);
    });
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'HistoricoDia');
    XLSX.writeFile(wb, `historico_dia_${paciente.nombre}_${paciente.apellido}.xlsx`);
  };

  return (
    <div style={{maxWidth:700,margin:'40px auto',background:'#f5f5f2',borderRadius:18,padding:32,boxShadow:'0 4px 32px #bfae8233'}}>
      <h2 style={{color:'#6b4f2c'}}>Histórico del Día</h2>
      <div style={{marginBottom:24}}>
        <label style={{color:'#6b4f2c',fontWeight:600}}>Selecciona un paciente: </label>
        <select value={selected} onChange={e => handleSelect(e.target.value)} style={{background:'#e8e6e3',border:'1.5px solid #bfae82',color:'#6b4f2c',padding:'8px 16px',borderRadius:8}}>
          <option value="">-- Selecciona --</option>
          {pacientes.map(p => (
            <option key={p.id} value={p.id}>{p.nombre} {p.apellido} ({p.tipoDocumento}: {p.documento})</option>
          ))}
        </select>
        {selected && (
          <button style={{marginLeft:16,background:'#bfae82',color:'#fff'}} onClick={exportarExcel}>Exportar histórico a Excel</button>
        )}
      </div>
      {selected && (
        <>
          <h3 style={{color:'#6b4f2c'}}>Medicamentos administrados hoy</h3>
          <table style={{marginBottom:24,background:'#f5f5f2',borderRadius:10,width:'100%'}}>
            <thead>
              <tr style={{background:'#bfae82',color:'#fff'}}>
                <th>Medicamento</th>
                <th>Estado</th>
                <th>Motivo</th>
                <th>Hora</th>
                <th>Persona</th>
              </tr>
            </thead>
            <tbody>
              {historicoMed.length === 0 && (
                <tr><td colSpan={5} style={{textAlign:'center',color:'#bfae82'}}>Sin registros</td></tr>
              )}
              {historicoMed.map(a => (
                <tr key={a.id} style={{background:'#e8e6e3',color:'#6b4f2c'}}>
                  <td>{a.medicamentoId}</td>
                  <td>{a.estado === 'administrado' ? 'Administrado' : 'No administrado'}</td>
                  <td>{a.motivo || '-'}</td>
                  <td>{new Date(a.fecha).toLocaleTimeString()}</td>
                  <td>{a.persona || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h3 style={{color:'#6b4f2c'}}>Signos vitales registrados hoy</h3>
          <table style={{background:'#f5f5f2',borderRadius:10,width:'100%'}}>
            <thead>
              <tr style={{background:'#bfae82',color:'#fff'}}>
                <th>Hora</th>
                <th>PA Sistólica</th>
                <th>PA Diastólica</th>
                <th>FC</th>
                <th>SpO2</th>
                <th>Glucometría</th>
                <th>Peso</th>
              </tr>
            </thead>
            <tbody>
              {historicoSignos.length === 0 && (
                <tr><td colSpan={7} style={{textAlign:'center',color:'#bfae82'}}>Sin registros</td></tr>
              )}
              {historicoSignos.map(sv => (
                <tr key={sv.id} style={{background:'#e8e6e3',color:'#6b4f2c'}}>
                  <td>{new Date(sv.fecha).toLocaleTimeString()}</td>
                  <td>{sv.paSistolica}</td>
                  <td>{sv.paDiastolica}</td>
                  <td>{sv.fc}</td>
                  <td>{sv.spo2}</td>
                  <td>{sv.glucometria}</td>
                  <td>{sv.peso}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

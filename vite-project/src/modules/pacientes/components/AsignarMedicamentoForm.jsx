import { useState } from 'react';

export default function AsignarMedicamentoForm({ medicamentos, onAsignar }) {
  const [medicamentoId, setMedicamentoId] = useState('');
  const [frecuencia, setFrecuencia] = useState('');
  const [horaRecomendada, setHoraRecomendada] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!medicamentoId) return;
    onAsignar({ medicamentoId, frecuencia, horaRecomendada });
    setMedicamentoId('');
    setFrecuencia('');
    setHoraRecomendada('');
  };

  return (
    <form onSubmit={handleSubmit} style={{marginBottom: 12}}>
      <select value={medicamentoId} onChange={e => setMedicamentoId(e.target.value)} required>
        <option value="">Selecciona medicamento</option>
        {medicamentos.map(m => (
          <option key={m.id} value={m.id}>{m.nombre}</option>
        ))}
      </select>
      <input placeholder="Frecuencia" value={frecuencia} onChange={e => setFrecuencia(e.target.value)} />
      <input type="time" placeholder="Hora recomendada" value={horaRecomendada} onChange={e => setHoraRecomendada(e.target.value)} />
      <button type="submit">Asignar</button>
    </form>
  );
}

import { useState, useEffect } from 'react';

export default function SignosVitalesForm({ onSubmit, initialData, onCancel }) {
  const [formData, setFormData] = useState({
    pacienteId: '',
    fecha: new Date().toISOString().split('T')[0],
    presionArterial: '',
    frecuenciaCardiaca: '',
    frecuenciaRespiratoria: '',
    temperatura: '',
    peso: '',
    talla: '',
    saturacionOxigeno: '',
    observaciones: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        fecha: initialData.fecha ? new Date(initialData.fecha).toISOString().split('T')[0] : ''
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} style={{ 
      marginBottom: '20px', 
      padding: '20px', 
      background: '#f5f5f2', 
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h3>{initialData ? 'Editar' : 'Agregar'} Signos Vitales</h3>
      
      <div style={{ marginBottom: '10px' }}>
        <label>Fecha: </label>
        <input 
          type="date" 
          name="fecha" 
          value={formData.fecha}
          onChange={handleChange}
          required 
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
        <div>
          <label>Presión Arterial: </label>
          <input 
            type="text" 
            name="presionArterial" 
            value={formData.presionArterial}
            onChange={handleChange}
            placeholder="Ej: 120/80"
          />
        </div>

        <div>
          <label>Frecuencia Cardíaca: </label>
          <input 
            type="number" 
            name="frecuenciaCardiaca" 
            value={formData.frecuenciaCardiaca}
            onChange={handleChange}
            placeholder="latidos/min"
          />
        </div>

        <div>
          <label>Frecuencia Respiratoria: </label>
          <input 
            type="number" 
            name="frecuenciaRespiratoria" 
            value={formData.frecuenciaRespiratoria}
            onChange={handleChange}
            placeholder="respiraciones/min"
          />
        </div>

        <div>
          <label>Temperatura (°C): </label>
          <input 
            type="number" 
            step="0.1"
            name="temperatura" 
            value={formData.temperatura}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Peso (kg): </label>
          <input 
            type="number" 
            step="0.1"
            name="peso" 
            value={formData.peso}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Talla (cm): </label>
          <input 
            type="number" 
            step="0.1"
            name="talla" 
            value={formData.talla}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Saturación de Oxígeno (%): </label>
          <input 
            type="number" 
            name="saturacionOxigeno" 
            value={formData.saturacionOxigeno}
            onChange={handleChange}
            max="100"
            min="0"
          />
        </div>
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label>Observaciones: </label>
        <textarea 
          name="observaciones" 
          value={formData.observaciones}
          onChange={handleChange}
          style={{ width: '100%', minHeight: '60px' }}
        />
      </div>

      <div>
        <button type="submit" style={{ 
          background: '#6b4f2c', 
          color: 'white', 
          padding: '8px 16px', 
          border: 'none', 
          borderRadius: '4px',
          marginRight: '10px',
          cursor: 'pointer'
        }}>
          {initialData ? 'Actualizar' : 'Guardar'}
        </button>
        
        {onCancel && (
          <button 
            type="button" 
            onClick={onCancel}
            style={{ 
              background: '#bfae82', 
              color: 'white', 
              padding: '8px 16px', 
              border: 'none', 
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

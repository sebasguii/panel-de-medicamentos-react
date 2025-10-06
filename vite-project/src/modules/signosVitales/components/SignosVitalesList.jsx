import { format } from 'date-fns';

export default function SignosVitalesList({ signosVitales, onEdit, onDelete }) {
  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'dd/MM/yyyy HH:mm');
    } catch (error) {
      return dateString;
    }
  };

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        background: '#f5f5f2',
        borderRadius: '12px',
        boxShadow: '0 2px 12px #bfae82cc',
        marginTop: '20px'
      }}>
        <thead>
          <tr style={{ background: '#bfae82', color: '#fff' }}>
            <th style={{ padding: '12px', textAlign: 'left' }}>Fecha</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Presión Arterial</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Frec. Cardíaca</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Frec. Respiratoria</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Temperatura</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Peso</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Talla</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Sat. O2</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {signosVitales.map((sv) => (
            <tr 
              key={sv._id || sv.id} 
              style={{
                background: '#e8e6e3',
                color: '#6b4f2c',
                borderBottom: '1px solid #ddd'
              }}
            >
              <td style={{ padding: '12px' }}>{formatDate(sv.fecha)}</td>
              <td style={{ padding: '12px' }}>{sv.presionArterial || '-'}</td>
              <td style={{ padding: '12px' }}>{sv.frecuenciaCardiaca ? `${sv.frecuenciaCardiaca} lpm` : '-'}</td>
              <td style={{ padding: '12px' }}>{sv.frecuenciaRespiratoria ? `${sv.frecuenciaRespiratoria} rpm` : '-'}</td>
              <td style={{ padding: '12px' }}>{sv.temperatura ? `${sv.temperatura} °C` : '-'}</td>
              <td style={{ padding: '12px' }}>{sv.peso ? `${sv.peso} kg` : '-'}</td>
              <td style={{ padding: '12px' }}>{sv.talla ? `${sv.talla} cm` : '-'}</td>
              <td style={{ padding: '12px' }}>{sv.saturacionOxigeno ? `${sv.saturacionOxigeno}%` : '-'}</td>
              <td style={{ padding: '12px' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button 
                    onClick={() => onEdit(sv)}
                    style={{
                      background: '#bfae82',
                      color: '#fff',
                      border: 'none',
                      padding: '6px 12px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    Editar
                  </button>
                  <button 
                    onClick={() => onDelete(sv._id || sv.id)}
                    style={{
                      background: '#d4a76a',
                      color: '#fff',
                      border: 'none',
                      padding: '6px 12px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {signosVitales.length === 0 && (
            <tr>
              <td colSpan="9" style={{ textAlign: 'center', padding: '20px', color: '#6b4f2c' }}>
                No hay registros de signos vitales disponibles.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

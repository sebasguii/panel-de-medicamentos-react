import axios from 'axios';

const API_URL = 'http://localhost:4000/api/medicamentos';

export const getMedicamentos = async (token) => {
  try {
    const res = await axios.get(API_URL, {
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      timeout: 5000 // 5 segundos de timeout
    });
    return res.data;
  } catch (error) {
    console.error('Error en getMedicamentos:', error);
    if (error.response) {
      // El servidor respondió con un código de estado fuera del rango 2xx
      console.error('Datos de la respuesta de error:', error.response.data);
      console.error('Estado de la respuesta:', error.response.status);
      console.error('Cabeceras de la respuesta:', error.response.headers);
    } else if (error.request) {
      // La solicitud fue hecha pero no se recibió respuesta
      console.error('No se recibió respuesta del servidor. ¿El backend está en ejecución?');
    } else {
      // Algo sucedió en la configuración de la solicitud que generó un error
      console.error('Error al configurar la solicitud:', error.message);
    }
    throw error; // Relanzamos el error para manejarlo en el hook
  }
};

export const addMedicamento = async (medicamento, token) => {
  const res = await axios.post(API_URL, medicamento, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const updateMedicamento = async (id, updated, token) => {
  const res = await axios.put(`${API_URL}/${id}`, updated, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const deleteMedicamento = async (id, token) => {
  const res = await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

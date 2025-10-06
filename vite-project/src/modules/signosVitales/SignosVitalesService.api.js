import axios from 'axios';

const API_URL = 'http://localhost:4000/api/signos-vitales';

// Obtener todos los signos vitales de un paciente
export const getSignosVitalesByPaciente = async (pacienteId, token) => {
  const res = await axios.get(`${API_URL}/paciente/${pacienteId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

// Obtener un registro de signos vitales por ID
export const getSignosVitalesById = async (id, token) => {
  const res = await axios.get(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

// Crear un nuevo registro de signos vitales
export const createSignosVitales = async (signosData, token) => {
  const res = await axios.post(API_URL, signosData, {
    headers: { 
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  return res.data;
};

// Actualizar un registro de signos vitales existente
export const updateSignosVitales = async (id, signosData, token) => {
  const res = await axios.put(`${API_URL}/${id}`, signosData, {
    headers: { 
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  return res.data;
};

// Eliminar un registro de signos vitales
export const deleteSignosVitales = async (id, token) => {
  const res = await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

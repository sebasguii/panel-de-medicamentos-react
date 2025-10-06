import axios from 'axios';

const API_URL = 'http://localhost:4000/api/pacientes';

export const getPacientes = async (token) => {
  const res = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const addPaciente = async (paciente, token) => {
  const res = await axios.post(API_URL, paciente, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const updatePaciente = async (id, updated, token) => {
  const res = await axios.put(`${API_URL}/${id}`, updated, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const deletePaciente = async (id, token) => {
  const res = await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

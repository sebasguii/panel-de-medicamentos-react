// Servicio para administrar la relación paciente-medicamento
import {
  getAdministraciones as getAPI,
  addAdministracion as addAPI
} from './administracionesService.api';
import axios from 'axios';

const getAuthToken = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('No se encontró el token de autenticación');
    throw new Error('No autenticado');
  }
  return token;
};

export const getAdministraciones = async () => {
  try {
    const token = getAuthToken();
    return await getAPI(token);
  } catch (error) {
    console.error('Error al obtener administraciones:', error);
    throw error;
  }
};

export const getAdministracionesByPaciente = async (pacienteId) => {
  try {
    const token = getAuthToken();
    const admins = await getAPI(token);
    return admins.filter(a => a.pacienteId === pacienteId);
  } catch (error) {
    console.error('Error al obtener administraciones por paciente:', error);
    throw error;
  }
};

export const addAdministracion = async (data) => {
  try {
    const token = getAuthToken();
    return await addAPI(data, token);
  } catch (error) {
    console.error('Error al agregar administración:', error);
    throw error;
  }
};

// Eliminar una administración usando el backend
export const deleteAdministracion = async (id, token) => {
  const API_URL = 'http://localhost:4000/api/administraciones';
  const res = await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

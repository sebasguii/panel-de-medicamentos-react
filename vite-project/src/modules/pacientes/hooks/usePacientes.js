import { useState, useEffect } from 'react';
import {
  getPacientes as apiGetPacientes,
  addPaciente as apiAddPaciente,
  updatePaciente as apiUpdatePaciente,
  deletePaciente as apiDeletePaciente
} from '../services/pacienteService.api';

export function usePacientes() {
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Debes obtener el token JWT del contexto, localStorage o donde lo guardes tras el login
  const token = localStorage.getItem('token');

  const fetchPacientes = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiGetPacientes(token);
      setPacientes(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPacientes();
    // eslint-disable-next-line
  }, []);

  const create = async (paciente) => {
    setLoading(true);
    setError(null);
    try {
      await apiAddPaciente(paciente, token);
      await fetchPacientes();
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const update = async (id, data) => {
    setLoading(true);
    setError(null);
    try {
      await apiUpdatePaciente(id, data, token);
      await fetchPacientes();
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await apiDeletePaciente(id, token);
      await fetchPacientes();
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { pacientes, loading, error, create, update, remove };
}

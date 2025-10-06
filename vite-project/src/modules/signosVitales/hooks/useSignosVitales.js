import { useState, useEffect, useCallback } from 'react';
import { createSignosVitales, getSignosVitales, updateSignosVitales, deleteSignosVitales } from '../services/SignosVitalesService';

export function useSignosVitales(pacienteId) {
  const [signosVitales, setSignosVitales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSignosVitales = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getSignosVitales(pacienteId);
      setSignosVitales(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      console.error('Error al cargar signos vitales:', err);
      setError('Error al cargar los signos vitales');
      setSignosVitales([]);
    } finally {
      setLoading(false);
    }
  }, [pacienteId]);

  const create = async (signosData) => {
    try {
      setLoading(true);
      const newSignos = await createSignosVitales({
        ...signosData,
        pacienteId
      });
      setSignosVitales(prev => [...prev, newSignos]);
      return newSignos;
    } catch (err) {
      console.error('Error al crear signos vitales:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const update = async (id, signosData) => {
    try {
      setLoading(true);
      const updatedSignos = await updateSignosVitales(id, {
        ...signosData,
        pacienteId
      });
      setSignosVitales(prev => 
        prev.map(sv => sv._id === id || sv.id === id ? updatedSignos : sv)
      );
      return updatedSignos;
    } catch (err) {
      console.error('Error al actualizar signos vitales:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id) => {
    try {
      setLoading(true);
      await deleteSignosVitales(id);
      setSignosVitales(prev => prev.filter(sv => sv._id !== id && sv.id !== id));
    } catch (err) {
      console.error('Error al eliminar signos vitales:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (pacienteId) {
      fetchSignosVitales();
    } else {
      setSignosVitales([]);
      setLoading(false);
    }
  }, [pacienteId, fetchSignosVitales]);

  return {
    signosVitales,
    loading,
    error,
    create,
    update,
    remove,
    refresh: fetchSignosVitales
  };
}

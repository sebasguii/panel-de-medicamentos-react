
import { useState, useEffect } from 'react';
import {
  getMedicamentos as apiGetMedicamentos,
  addMedicamento as apiAddMedicamento,
  updateMedicamento as apiUpdateMedicamento,
  deleteMedicamento as apiDeleteMedicamento
} from '../services/medicamentoService.api';

export function useMedicamentos() {
  const [medicamentos, setMedicamentos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Debes obtener el token JWT del contexto, localStorage o donde lo guardes tras el login
  const token = localStorage.getItem('token');

  const fetchMedicamentos = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('Iniciando fetchMedicamentos...');
      console.log('Token:', token ? 'Presente' : 'No encontrado');
      
      if (!token) {
        throw new Error('No se encontró el token de autenticación. Por favor, inicia sesión nuevamente.');
      }

      console.log('Realizando petición a la API...');
      const data = await apiGetMedicamentos(token);
      console.log('Respuesta de la API:', data);
      
      if (!data) {
        throw new Error('La respuesta de la API está vacía');
      }
      
      if (!Array.isArray(data)) {
        console.warn('La respuesta de la API no es un array:', data);
        setMedicamentos([]);
        return;
      }

      // Mapear los datos para asegurar que usamos 'id' en lugar de '_id'
      const mappedData = data.map(item => ({
        id: item._id || Math.random().toString(36).substr(2, 9), // Usar _id o generar un ID temporal
        nombre: item.nombre || 'Sin nombre',
        descripcion: item.descripcion || 'Sin descripción',
        stock: typeof item.stock === 'number' ? item.stock : 0,
        estado: item.estado || 'inactivo',
        // Preservar todas las propiedades originales
        ...item
      }));
      
      setMedicamentos(mappedData);
    } catch (err) {
      console.error('Error en fetchMedicamentos:', err);
      
      // Crear un mensaje de error más detallado
      let errorMessage = 'Error al cargar los medicamentos';
      let errorDetails = '';
      
      if (err.message.includes('Network Error')) {
        errorMessage = 'No se pudo conectar al servidor.';
        errorDetails = 'Verifica que el servidor backend esté en ejecución y accesible en http://localhost:4000';
      } else if (err.response) {
        // El servidor respondió con un estado de error
        errorDetails = `Estado: ${err.response.status} - ${err.response.statusText}`;
        
        if (err.response.data) {
          errorDetails += `\nMensaje: ${JSON.stringify(err.response.data, null, 2)}`;
        }
        
        if (err.response.status === 401) {
          errorMessage = 'No autorizado';
          errorDetails = 'Tu sesión ha expirado o no tienes permisos. Por favor, inicia sesión nuevamente.';
        } else if (err.response.status === 500) {
          errorMessage = 'Error en el servidor';
          errorDetails = 'Ocurrió un error en el servidor. Por favor, revisa los logs del servidor para más detalles.';
        }
      } else if (err.request) {
        // La petición fue hecha pero no se recibió respuesta
        errorMessage = 'No se recibió respuesta del servidor';
        errorDetails = 'El servidor no respondió. Verifica que el backend esté en ejecución y accesible.';
      } else {
        // Error al configurar la petición
        errorMessage = 'Error en la configuración de la petición';
        errorDetails = err.message;
      }
      
      const fullErrorMessage = `${errorMessage}${errorDetails ? '\n\n' + errorDetails : ''}`;
      console.error('Error completo:', fullErrorMessage);
      setError(new Error(fullErrorMessage));
      setMedicamentos([]); // Asegurarse de que no mostramos datos viejos
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedicamentos();
    // eslint-disable-next-line
  }, []);

  const create = async (medicamento) => {
    setLoading(true);
    setError(null);
    try {
      await apiAddMedicamento(medicamento, token);
      await fetchMedicamentos();
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
      await apiUpdateMedicamento(id, data, token);
      await fetchMedicamentos();
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
      await apiDeleteMedicamento(id, token);
      await fetchMedicamentos();
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { medicamentos, loading, error, create, update, remove };
}

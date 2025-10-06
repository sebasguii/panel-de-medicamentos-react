import { 
  getSignosVitalesByPaciente as getByPacienteAPI,
  getSignosVitalesById as getByIdAPI,
  createSignosVitales as createAPI,
  updateSignosVitales as updateAPI,
  deleteSignosVitales as deleteAPI
} from './SignosVitalesService.api';

// Obtener signos vitales por paciente
export const getSignosVitales = async (pacienteId, token) => {
  try {
    const signos = await getByPacienteAPI(pacienteId, token);
    return signos;
  } catch (error) {
    console.error('Error al obtener signos vitales:', error);
    throw error;
  }
};

// Obtener un registro de signos vitales por ID
export const getSignosVitalesById = async (id, token) => {
  try {
    const signos = await getByIdAPI(id, token);
    return signos;
  } catch (error) {
    console.error('Error al obtener el registro de signos vitales:', error);
    throw error;
  }
};

// Crear un nuevo registro de signos vitales
export const createSignosVitales = async (signosData, token) => {
  try {
    const newSignos = await createAPI(signosData, token);
    return newSignos;
  } catch (error) {
    console.error('Error al crear el registro de signos vitales:', error);
    throw error;
  }
};

// Actualizar un registro de signos vitales existente
export const updateSignosVitales = async (id, signosData, token) => {
  try {
    const updatedSignos = await updateAPI(id, signosData, token);
    return updatedSignos;
  } catch (error) {
    console.error('Error al actualizar el registro de signos vitales:', error);
    throw error;
  }
};

// Eliminar un registro de signos vitales
export const deleteSignosVitales = async (id, token) => {
  try {
    await deleteAPI(id, token);
  } catch (error) {
    console.error('Error al eliminar el registro de signos vitales:', error);
    throw error;
  }
};

import { getData, setData } from '../../../shared/storage';

const KEY = 'pacientes';

export const getPacientes = () => getData(KEY);

export const addPaciente = (paciente) => {
  const pacientes = getPacientes();
  paciente.id = crypto.randomUUID();
  setData(KEY, [...pacientes, paciente]);
};

export const updatePaciente = (id, updated) => {
  const pacientes = getPacientes().map(p => p.id === id ? { ...p, ...updated } : p);
  setData(KEY, pacientes);
};

export const deletePaciente = (id) => {
  const pacientes = getPacientes().filter(p => p.id !== id);
  setData(KEY, pacientes);
};

import { getData, setData } from '../../../shared/storage';

const KEY = 'medicamentos';

export const getMedicamentos = () => getData(KEY);

export const addMedicamento = (medicamento) => {
  const medicamentos = getMedicamentos();
  medicamento.id = crypto.randomUUID();
  setData(KEY, [...medicamentos, medicamento]);
};

export const updateMedicamento = (id, updated) => {
  const medicamentos = getMedicamentos().map(m => m.id === id ? { ...m, ...updated } : m);
  setData(KEY, medicamentos);
};

export const deleteMedicamento = (id) => {
  const medicamentos = getMedicamentos().filter(m => m.id !== id);
  setData(KEY, medicamentos);
};

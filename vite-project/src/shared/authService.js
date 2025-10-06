import axios from 'axios';

const API_URL = 'http://localhost:4000/api/usuarios/login';

export const login = async (email, password) => {
  const res = await axios.post(API_URL, { email, password });
  localStorage.setItem('token', res.data.token);
  return res.data;
};

export const register = async ({ nombre, email, password, rol }) => {
  const res = await axios.post('http://localhost:4000/api/usuarios/registrar', {
    nombre, email, password, rol
  });
  return res.data;
};

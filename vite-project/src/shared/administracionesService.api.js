import axios from 'axios';

const API_URL = 'http://localhost:4000/api/administraciones';

export const getAdministraciones = async (token) => {
  const res = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const addAdministracion = async (administracion, token) => {
  const res = await axios.post(API_URL, administracion, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

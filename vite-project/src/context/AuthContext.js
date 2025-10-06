import React, { createContext, useContext, useState, useEffect } from 'react';
import { login as loginService, register as registerService } from '../shared/authService';

// Crear el contexto
export const AuthContext = createContext(null);

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  // Estados
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  // Efecto para verificar el token al cargar
  useEffect(() => {
    const verifyToken = async () => {
      try {
        // Aquí podrías verificar si el token es válido
        // y cargar los datos del usuario si es necesario
        // Por ahora solo establecemos loading a falso
        setLoading(false);
      } catch (error) {
        console.error('Error al verificar el token:', error);
        setLoading(false);
      }
    };

    verifyToken();
  }, []);

  // Función para iniciar sesión
  const login = async (email, password) => {
    try {
      const data = await loginService(email, password);
      setToken(data.token);
      localStorage.setItem('token', data.token);
      // Aquí podrías obtener y establecer los datos del usuario
      // await fetchUserData();
      return { success: true };
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Error en el inicio de sesión' 
      };
    }
  };

  // Función para registrar un nuevo usuario
  const register = async (userData) => {
    try {
      await registerService(userData);
      return { success: true };
    } catch (error) {
      console.error('Error en el registro:', error);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Error en el registro' 
      };
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  };

  // Valor del contexto
  const value = {
    user,
    token,
    isAuthenticated: !!token,
    loading,
    login,
    register,
    logout,
  };

  // Retornar el Provider con el valor del contexto
  return React.createElement(
    AuthContext.Provider,
    { value: value },
    children
  );
};

// Hook personalizado para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  
  return context;
};

export default AuthContext;

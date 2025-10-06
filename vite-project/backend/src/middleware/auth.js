const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
const dotenv = require('dotenv');
dotenv.config();

const auth = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Token requerido' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = await Usuario.findById(decoded.id);
    if (!req.usuario) return res.status(401).json({ error: 'Usuario no válido' });
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' });
  }
};

const esAdmin = (req, res, next) => {
  if (req.usuario.rol !== 'administrador') return res.status(403).json({ error: 'Solo administrador' });
  next();
};

const esAuxiliar = (req, res, next) => {
  if (req.usuario.rol !== 'auxiliar') return res.status(403).json({ error: 'Solo auxiliar' });
  next();
};

const esCuidador = (req, res, next) => {
  if (req.usuario.rol !== 'cuidador') return res.status(403).json({ error: 'Solo cuidador' });
  next();
};

const esAdminOAuxiliar = (req, res, next) => {
  if (req.usuario.rol === 'administrador' || req.usuario.rol === 'auxiliar') return next();
  return res.status(403).json({ error: 'Solo administrador o auxiliar' });
};

module.exports = { auth, esAdmin, esAuxiliar, esCuidador, esAdminOAuxiliar };

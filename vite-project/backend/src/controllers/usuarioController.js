const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

exports.registrar = async (req, res) => {
  try {
    const usuarios = await Usuario.countDocuments();
    // Si ya hay usuarios, solo un admin puede registrar
    if (usuarios > 0) {
      if (!req.usuario || req.usuario.rol !== 'administrador') {
        return res.status(403).json({ error: 'Solo administrador puede registrar usuarios' });
      }
    }
    const usuario = new Usuario(req.body);
    await usuario.save();
    res.status(201).json(usuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const usuario = await Usuario.findOne({ email });
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    const valido = await usuario.compararPassword(password);
    if (!valido) return res.status(401).json({ error: 'Credenciales incorrectas' });
    const token = jwt.sign({ id: usuario._id, rol: usuario.rol }, process.env.JWT_SECRET, { expiresIn: '8h' });
    res.json({ token, usuario });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.listar = async (req, res) => {
  const usuarios = await Usuario.find().populate('pacientesAsignados');
  res.json(usuarios);
};

exports.asignarPaciente = async (req, res) => {
  const { usuarioId, pacienteId } = req.body;
  const usuario = await Usuario.findById(usuarioId);
  if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
  usuario.pacientesAsignados.push(pacienteId);
  await usuario.save();
  res.json(usuario);
};

const Administracion = require('../models/Administracion');

exports.crear = async (req, res) => {
  try {
    const administracion = new Administracion(req.body);
    await administracion.save();
    res.status(201).json(administracion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.listar = async (req, res) => {
  const administraciones = await Administracion.find().populate('paciente medicamento usuario');
  res.json(administraciones);
};

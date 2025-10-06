const Historico = require('../models/Historico');

exports.crear = async (req, res) => {
  try {
    const historico = new Historico(req.body);
    await historico.save();
    res.status(201).json(historico);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.listar = async (req, res) => {
  const historicos = await Historico.find().populate('paciente usuario');
  res.json(historicos);
};

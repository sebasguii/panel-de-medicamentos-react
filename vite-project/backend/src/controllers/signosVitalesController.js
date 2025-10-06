const SignosVitales = require('../models/SignosVitales');

exports.crear = async (req, res) => {
  try {
    const signos = new SignosVitales(req.body);
    await signos.save();
    res.status(201).json(signos);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.listar = async (req, res) => {
  const signos = await SignosVitales.find().populate('paciente usuario');
  res.json(signos);
};

const Paciente = require('../models/Paciente');

exports.crear = async (req, res) => {
  try {
    const paciente = new Paciente(req.body);
    await paciente.save();
    res.status(201).json(paciente);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.listar = async (req, res) => {
  const pacientes = await Paciente.find();
  res.json(pacientes);
};

exports.obtener = async (req, res) => {
  const paciente = await Paciente.findById(req.params.id);
  if (!paciente) return res.status(404).json({ error: 'No encontrado' });
  res.json(paciente);
};

exports.actualizar = async (req, res) => {
  const paciente = await Paciente.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(paciente);
};

exports.eliminar = async (req, res) => {
  await Paciente.findByIdAndDelete(req.params.id);
  res.json({ mensaje: 'Paciente eliminado' });
};

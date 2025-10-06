const Medicamento = require('../models/Medicamento');

exports.crear = async (req, res) => {
  try {
    const medicamento = new Medicamento(req.body);
    await medicamento.save();
    res.status(201).json(medicamento);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.listar = async (req, res) => {
  const medicamentos = await Medicamento.find();
  res.json(medicamentos);
};

exports.obtener = async (req, res) => {
  const medicamento = await Medicamento.findById(req.params.id);
  if (!medicamento) return res.status(404).json({ error: 'No encontrado' });
  res.json(medicamento);
};

exports.actualizar = async (req, res) => {
  const medicamento = await Medicamento.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(medicamento);
};

exports.eliminar = async (req, res) => {
  await Medicamento.findByIdAndDelete(req.params.id);
  res.json({ mensaje: 'Medicamento eliminado' });
};

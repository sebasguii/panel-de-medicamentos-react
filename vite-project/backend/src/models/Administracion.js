const mongoose = require('mongoose');

const administracionSchema = new mongoose.Schema({
  paciente: { type: mongoose.Schema.Types.ObjectId, ref: 'Paciente', required: true },
  medicamento: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicamento', required: true },
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  fecha: { type: Date, default: Date.now },
  observaciones: String
});

module.exports = mongoose.model('Administracion', administracionSchema);

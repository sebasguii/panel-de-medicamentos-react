const mongoose = require('mongoose');

const historicoSchema = new mongoose.Schema({
  paciente: { type: mongoose.Schema.Types.ObjectId, ref: 'Paciente', required: true },
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  tipo: { type: String, enum: ['signos', 'medicamento'], required: true },
  fecha: { type: Date, default: Date.now },
  detalle: String
});

module.exports = mongoose.model('Historico', historicoSchema);

const mongoose = require('mongoose');

const signosVitalesSchema = new mongoose.Schema({
  paciente: { type: mongoose.Schema.Types.ObjectId, ref: 'Paciente', required: true },
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  fecha: { type: Date, default: Date.now },
  temperatura: Number,
  presion: String,
  frecuenciaCardiaca: Number,
  frecuenciaRespiratoria: Number,
  observaciones: String
});

module.exports = mongoose.model('SignosVitales', signosVitalesSchema);

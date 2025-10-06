const mongoose = require('mongoose');

const medicamentoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: String,
  dosis: String,
  frecuencia: String
});

module.exports = mongoose.model('Medicamento', medicamentoSchema);

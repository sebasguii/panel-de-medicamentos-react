const mongoose = require('mongoose');


const pacienteSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellidos: { type: String, required: true },
  tipoDocumento: { type: String, enum: ['CC', 'TI', 'CE', 'RC', 'Otro'], required: true },
  documento: { type: String, required: true, unique: true },
  fechaNacimiento: { type: Date, required: true },
  genero: { type: String, enum: ['masculino', 'femenino', 'otro'], required: true },
  direccion: { type: String },
  telefono: { type: String },
  correo: { type: String, required: true, unique: true },
  estado: { type: String, enum: ['activo', 'inactivo'], default: 'activo' },
  acompanante: {
    nombre: { type: String },
    telefono: { type: String },
    parentesco: { type: String }
  },
  historial: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Historico' }]
});

module.exports = mongoose.model('Paciente', pacienteSchema);

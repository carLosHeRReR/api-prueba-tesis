// models/estudianteModel.js
const mongoose = require('mongoose');

const estudianteSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  codestudiante: String,
  fullname: String,
  numDocumento: String,
  fecNacimiento: [Number],
  sexo: String,
  dirDomicilio: String,
  telCelular: String,
  correoInstitucional: String,
  correoPersonal: String,
  especialidad: String,
  condicion: String,
  ciclo: String,
});

const Estudiante = mongoose.model('Estudiante', estudianteSchema);

module.exports = Estudiante;

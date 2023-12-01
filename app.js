const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const Joi = require('joi');
const cors = require('cors');

const app = express();
const port = 3000;
const dbName = 'pruebaapi';

// Conexión a la base de datos
mongoose.connect(`mongodb://127.0.0.1:27017/${dbName}`);

// Middleware
app.use(bodyParser.json());
app.use(helmet());
app.use(cors());

// Middleware de registro de solicitudes
app.use((req, res, next) => {
  console.log('Solicitud recibida:', req.method, req.url, req.body);
  next();
});

const estudianteSchema = new mongoose.Schema({
  codestudiante: Number,
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

// Ruta GET para obtener todos los estudiantes
app.get('/estudiantes', async (req, res) => {
  try {
    const estudiantes = await Estudiante.find();
    res.json(estudiantes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener estudiantes' });
  }
});

// Ruta POST para agregar un nuevo estudiante
app.post('/estudiantes', async (req, res) => {
  try {
    const { error } = validarEstudiante(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const nuevoEstudiante = new Estudiante(req.body);
    await nuevoEstudiante.save();
    res.json({ message: 'Estudiante agregado con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al agregar estudiante' });
  }
});

// Ruta POST para autenticar un estudiante
app.post('/auth', async (req, res) => {
  console.log('Cuerpo de la solicitud:', req.body);
  try {
    const { error } = Joi.object({
      correoInstitucional: Joi.string(),
      codestudiante: Joi.number(),
    }).validate(req.body);

    if (error) {
      console.error(error);
      return res.status(400).json({ error: error.details[0].message });
    }

    const estudiante = await Estudiante.findOne(req.body);

    if (estudiante) {
      // Autenticación exitosa
      res.json({ message: 'Autenticación exitosa' });
    } else {
      // Credenciales incorrectas
      res.status(401).json({ error: 'Credenciales incorrectas' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al autenticar estudiante' });
  }
});


// Validar datos del estudiante
function validarEstudiante(estudiante) {
  const schema = Joi.object({
    fullname: Joi.string().required(),
    codestudiante: Joi.number().required(),
  });

  return schema.validate(estudiante);
}

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});

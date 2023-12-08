// controllers/authController.js
const Estudiante = require('../models/estudianteModel');
const Joi = require('joi');

async function authenticate(req, res) {
  console.log('Cuerpo de la solicitud:', req.body);
  try {
    const { error } = Joi.object({
      correoInstitucional: Joi.string(),
      codestudiante: Joi.string(),
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
}

module.exports = {
  authenticate,
};

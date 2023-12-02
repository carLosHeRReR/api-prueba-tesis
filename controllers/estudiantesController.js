// controllers/estudiantesController.js
const Estudiante = require('../models/estudianteModel');
const { validarEstudiante } = require('../utils/validation');

async function getAllEstudiantes(req, res) {
  try {
    const estudiantes = await Estudiante.find();
    res.json(estudiantes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener estudiantes' });
  }
}

async function addEstudiante(req, res) {
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
}

module.exports = {
  getAllEstudiantes,
  addEstudiante,
};

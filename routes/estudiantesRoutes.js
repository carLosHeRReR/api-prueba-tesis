// routes/estudiantesRoutes.js
const express = require('express');
const router = express.Router();
const EstudiantesController = require('../controllers/estudiantesController');

// Ruta GET para obtener todos los estudiantes
router.get('/', EstudiantesController.getAllEstudiantes);

// Ruta POST para agregar un nuevo estudiante
router.post('/', EstudiantesController.addEstudiante);

module.exports = router;

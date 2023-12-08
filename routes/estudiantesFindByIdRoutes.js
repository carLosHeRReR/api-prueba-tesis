const express = require('express');
const router = express.Router();
const Estudiante = require('../models/estudianteModel');
const path = require('path');

// Obtener un estudiante por su ID
router.get('/:id', async (req, res) => {
  try {
    console.log('Recibida solicitud para obtener estudiante con ID:', req.params.id);

    const estudiante = await Estudiante.findById(req.params.id);

    if (!estudiante) {
      console.log('Estudiante no encontrado');
      return res.status(404).json({ error: 'Estudiante no encontrado' });
    }

    console.log('Estudiante encontrado:', estudiante);
    res.json(estudiante);
  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;

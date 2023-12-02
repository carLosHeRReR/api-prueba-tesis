// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');

// Ruta POST para autenticar un estudiante
router.post('/', AuthController.authenticate);

module.exports = router;

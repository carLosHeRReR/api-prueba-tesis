// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const estudiantesRoutes = require('./routes/estudiantesRoutes');
const authRoutes = require('./routes/authRoutes');
const requestLogger = require('./middlewares/requestLogger');
const estudiantesFindByIdRoutes = require('./routes/estudiantesFindByIdRoutes');

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
app.use(requestLogger);

// Rutas
app.use('/estudiantes', estudiantesRoutes);
app.use('/auth', authRoutes);
app.use('/:id', estudiantesFindByIdRoutes);
// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});

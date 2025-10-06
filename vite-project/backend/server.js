const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
const conectarDB = require('./src/config/db');

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares globales
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Conexión a la base de datos
conectarDB();

// Monta las rutas (todas las rutas públicas y protegidas se gestionan en sus propios archivos)
app.use('/api/usuarios', require('./src/routes/usuarioRoutes'));
app.use('/api/pacientes', require('./src/routes/pacienteRoutes'));
app.use('/api/medicamentos', require('./src/routes/medicamentoRoutes'));
app.use('/api/administraciones', require('./src/routes/administracionRoutes'));
app.use('/api/signos-vitales', require('./src/routes/signosVitalesRoutes'));
app.use('/api/historico', require('./src/routes/historicoRoutes'));

// Ruta raíz
app.get('/', (req, res) => {
  res.send('Servidor backend corriendo');
});

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en puerto ${PORT}`);
});
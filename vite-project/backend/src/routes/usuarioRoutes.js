const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { auth, esAdmin } = require('../middleware/auth');

router.post('/registrar', usuarioController.registrar);
router.post('/login', usuarioController.login);
router.get('/', auth, usuarioController.listar); // Todos los roles
router.post('/asignar-paciente', esAdmin, usuarioController.asignarPaciente); // Solo admin

module.exports = router;

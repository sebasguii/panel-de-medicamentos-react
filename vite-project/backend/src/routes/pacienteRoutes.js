const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/pacienteController');
const { auth, esAdmin } = require('../middleware/auth');

router.post('/', auth, esAdmin, pacienteController.crear); // Solo admin
router.get('/', auth, pacienteController.listar); // Todos los roles
router.get('/:id', auth, pacienteController.obtener);
router.put('/:id', auth, esAdmin, pacienteController.actualizar); // Solo admin
router.delete('/:id', auth, esAdmin, pacienteController.eliminar); // Solo admin

module.exports = router;

const express = require('express');
const router = express.Router();
const medicamentoController = require('../controllers/medicamentoController');
const { auth, esAdmin } = require('../middleware/auth');

// Apply auth middleware first, then check admin role
router.post('/', auth, esAdmin, medicamentoController.crear); // Solo admin
router.get('/', auth, medicamentoController.listar); // Todos los roles autenticados
router.get('/:id', auth, medicamentoController.obtener);
router.put('/:id', auth, esAdmin, medicamentoController.actualizar); // Solo admin
router.delete('/:id', auth, esAdmin, medicamentoController.eliminar); // Solo admin

module.exports = router;

const express = require('express');
const router = express.Router();
const historicoController = require('../controllers/historicoController');
const { auth } = require('../middleware/auth');

router.post('/', auth, historicoController.crear); // admin, auxiliar
router.get('/', auth, historicoController.listar); // todos los roles

module.exports = router;

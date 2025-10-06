const express = require('express');
const router = express.Router();
const administracionController = require('../controllers/administracionController');
const { auth, esAdminOAuxiliar } = require('../middleware/auth');

router.post('/', esAdminOAuxiliar, administracionController.crear); // admin y auxiliar
router.get('/', auth, administracionController.listar); // todos los roles

module.exports = router;

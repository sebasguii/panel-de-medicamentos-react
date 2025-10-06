const express = require('express');
const router = express.Router();
const signosVitalesController = require('../controllers/signosVitalesController');
const { auth, esAdminOAuxiliar } = require('../middleware/auth');

router.post('/', esAdminOAuxiliar, signosVitalesController.crear); // admin y auxiliar
router.get('/', auth, signosVitalesController.listar); // todos los roles

module.exports = router;

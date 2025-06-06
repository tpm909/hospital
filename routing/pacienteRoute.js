const express = require('express');
const pacienteController = require('../Controller/pacienteController');
const ingresoController = require('../Controller/ingresoController')

const router = express.Router();

router.get('/', pacienteController.Listar);
router.get('/nuevo',pacienteController.formulario)
router.post('/nuevo',pacienteController.crear)
router.get('/ingreso',pacienteController.inicio)
router.post('/ingreso',pacienteController.buscarRedirect)
router.get('/ingreso/:DNI',pacienteController.buscar)
router.post('/ingreso/:DNI',ingresoController.crear)


module.exports = router;
const express = require('express');
const pacienteController = require('../Controller/pacienteController');
const ingresoController = require('../Controller/ingresoController')

const router = express.Router();

router.get('/', pacienteController.Listar);
router.get('/nuevo',pacienteController.formulario)
router.post('/nuevo',pacienteController.crear)
router.get('/ingreso',pacienteController.inicio)
router.post('/ingreso',pacienteController.buscarRedirect)
router.get('/ingreso/:DNI/crear',pacienteController.buscar)
router.post('/ingreso/:DNI/crear',ingresoController.crear)
router.get('/ver',pacienteController.ver)




module.exports = router;
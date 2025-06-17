const express = require('express');

const ingresoController = require('../Controller/ingresoController')

const router = express.Router();

router.get('/',ingresoController.ingreso)
router.post('/',ingresoController.buscar)
router.post('/crear',ingresoController.crear)


module.exports = router;
const express = require('express');
const pacienteController = require('../Controller/pacienteController');


const router = express.Router();

router.get('/', pacienteController.Listar);
router.get('/nuevo',pacienteController.formulario)
router.post('/nuevo',pacienteController.crear)
router.get('/ver',pacienteController.ver)



module.exports = router;
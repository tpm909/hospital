const express = require('express');
const pacienteController = require('../Controller/pacienteController');

const router = express.Router();

router.get('/', pacienteController.Listar);


module.exports = router;
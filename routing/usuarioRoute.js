const express = require('express');
const usuariosController = require('../Controller/usuarioController');

const router = express.Router();

router.get('/', usuariosController.Listar);

//esto esta sin implementar
module.exports = router;
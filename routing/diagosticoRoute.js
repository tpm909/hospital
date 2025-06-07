const express = require('express');
const diagnosticoController = require("../Controller/diagnosticoController")

const router = express.Router();

router.get('/crear',diagnosticoController.diagnosticoForm)
router.post('/crear',diagnosticoController.crear)



module.exports = router;
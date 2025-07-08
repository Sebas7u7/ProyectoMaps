const express = require('express');
const router = express.Router();
const { getRutasProgramadas, getRutaProgramada, addRutaProgramada, updateRutaProgramada, deleteRutaProgramada } = require('../controllers/rutasProgramadasController');

router.get('/', getRutasProgramadas);
router.get('/:id', getRutaProgramada);
router.post('/', addRutaProgramada);
router.put('/:id', updateRutaProgramada);
router.delete('/:id', deleteRutaProgramada);

module.exports = router;

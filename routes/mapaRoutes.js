const express = require('express');
const router = express.Router();
const mapaController = require('../controllers/mapaController');

router.get('/api/mapa/:id', mapaController.obtenerPuntosRuta);

module.exports = router;
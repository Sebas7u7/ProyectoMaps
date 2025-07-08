const express = require('express');
const router = express.Router();
const { getDetalleRutas, getDetallesByRuta, getDetalleRuta, addDetalleRuta, updateDetalleRuta, deleteDetalleRuta } = require('../controllers/detalleRutasController');

router.get('/', getDetalleRutas);
router.get('/ruta/:rutaId', getDetallesByRuta);
router.get('/:id', getDetalleRuta);
router.post('/', addDetalleRuta);
router.put('/:id', updateDetalleRuta);
router.delete('/:id', deleteDetalleRuta);

module.exports = router;

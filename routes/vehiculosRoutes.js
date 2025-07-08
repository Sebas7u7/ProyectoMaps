const express = require('express');
const router = express.Router();
const { getVehiculos, getVehiculoByPlaca, addVehiculo, updateVehiculo, deleteVehiculo } = require('../controllers/vehiculosController');

router.get('/', getVehiculos);
router.get('/:placa', getVehiculoByPlaca);
router.post('/', addVehiculo);
router.put('/:placa', updateVehiculo);
router.delete('/:placa', deleteVehiculo);

module.exports = router;

const express = require('express');
const router = express.Router();
const { getConductores, getConductorById, addConductor, updateConductor, deleteConductor } = require('../controllers/conductoresController');

router.get('/', getConductores);
router.get('/:id', getConductorById);
router.post('/', addConductor);
router.put('/:id', updateConductor);
router.delete('/:id', deleteConductor);

module.exports = router;

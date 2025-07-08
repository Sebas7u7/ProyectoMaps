const mapaModel = require('../models/mapaModel');

exports.obtenerPuntosRuta = (req, res) => {
    const { id } = req.params;
    mapaModel.obtenerPuntosPorRuta(id, (err, puntos) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener puntos de la ruta' });
        }
        res.json(puntos);
    });
};
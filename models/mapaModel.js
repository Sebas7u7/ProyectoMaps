const db = require('../config/dbConfig');

exports.obtenerPuntosPorRuta = (rutaId, callback) => {
    const sql = `SELECT latitud, longitud, direccion, numero_paquetes FROM detalle_ruta WHERE ruta_programada_id = ?`;
    db.query(sql, [rutaId], (err, resultados) => {
        if (err) {
            console.error('Error en consulta SQL:', err);
            callback(err, null);
        } else {
            console.log(`Consulta exitosa para ruta ${rutaId}:`, resultados);
            callback(null, resultados);
        }
    });
};
const connection = require('../config/dbConfig');

// Obtener todos los detalles de rutas con información completa
const getDetalleRutas = (req, res) => {
  const query = `
    SELECT 
      dr.*,
      rp.ruta as nombre_ruta
    FROM detalle_ruta dr
    JOIN ruta_programada rp ON dr.ruta_programada_id = rp.id
    ORDER BY rp.id, dr.id
  `;
  
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener detalles de rutas:', err);
      res.status(500).json({ error: 'Error interno del servidor al obtener los detalles de rutas' });
    } else {
      res.json(results);
    }
  });
};

// Obtener detalles de una ruta específica
const getDetallesByRuta = (req, res) => {
  const { rutaId } = req.params;
  const query = `
    SELECT * FROM detalle_ruta 
    WHERE ruta_programada_id = ? 
    ORDER BY id
  `;
  
  connection.query(query, [rutaId], (err, results) => {
    if (err) {
      console.error('Error al obtener detalles de ruta específica:', err);
      res.status(500).json({ error: 'Error interno del servidor al obtener los detalles de la ruta' });
    } else {
      res.json(results);
    }
  });
};

// Obtener un detalle de ruta específico
const getDetalleRuta = (req, res) => {
  const { id } = req.params;
  connection.query('SELECT * FROM detalle_ruta WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Error al obtener detalle de ruta:', err);
      res.status(500).json({ error: 'Error interno del servidor al obtener el detalle de ruta' });
    } else if (results.length === 0) {
      res.status(404).json({ message: 'Detalle de ruta no encontrado' });
    } else {
      res.json(results[0]);
    }
  });
};

// Agregar nuevo detalle de ruta
const addDetalleRuta = (req, res) => {
  const { 
    ruta_programada_id, 
    latitud, 
    longitud, 
    direccion, 
    numero_paquetes
  } = req.body;
  
  // Validar campos requeridos
  if (!ruta_programada_id || !latitud || !longitud || !direccion || !numero_paquetes) {
    return res.status(400).json({ 
      error: 'Todos los campos son requeridos: ruta, latitud, longitud, dirección y número de paquetes' 
    });
  }
  
  const query = `
    INSERT INTO detalle_ruta 
    (ruta_programada_id, latitud, longitud, direccion, numero_paquetes) 
    VALUES (?, ?, ?, ?, ?)
  `;
  
  connection.query(query, [ruta_programada_id, latitud, longitud, direccion, numero_paquetes], (err, result) => {
    if (err) {
      console.error('Error al crear detalle de ruta:', err);
      
      // Manejar errores específicos de foreign key
      if (err.code === 'ER_NO_REFERENCED_ROW_2') {
        return res.status(400).json({ error: 'La ruta programada seleccionada no existe' });
      }
      
      res.status(500).json({ error: 'Error interno del servidor al crear el detalle de ruta' });
    } else {
      res.status(201).json({ 
        message: 'Detalle de ruta creado exitosamente',
        id: result.insertId, 
        ruta_programada_id, 
        latitud, 
        longitud, 
        direccion, 
        numero_paquetes
      });
    }
  });
};

// Actualizar detalle de ruta
const updateDetalleRuta = (req, res) => {
  const { id } = req.params;
  const { 
    ruta_programada_id, 
    latitud, 
    longitud, 
    direccion, 
    numero_paquetes
  } = req.body;
  
  // Validar campos requeridos
  if (!ruta_programada_id || !latitud || !longitud || !direccion || !numero_paquetes) {
    return res.status(400).json({ 
      error: 'Todos los campos son requeridos: ruta, latitud, longitud, dirección y número de paquetes' 
    });
  }
  
  const query = `
    UPDATE detalle_ruta SET 
    ruta_programada_id = ?, latitud = ?, longitud = ?, direccion = ?, numero_paquetes = ?
    WHERE id = ?
  `;
  
  connection.query(query, [ruta_programada_id, latitud, longitud, direccion, numero_paquetes, id], (err, result) => {
    if (err) {
      console.error('Error al actualizar detalle de ruta:', err);
      
      // Manejar errores específicos de foreign key
      if (err.code === 'ER_NO_REFERENCED_ROW_2') {
        return res.status(400).json({ error: 'La ruta programada seleccionada no existe' });
      }
      
      res.status(500).json({ error: 'Error interno del servidor al actualizar el detalle de ruta' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Detalle de ruta no encontrado' });
    } else {
      res.json({ 
        message: 'Detalle de ruta actualizado exitosamente',
        id, 
        ruta_programada_id, 
        latitud, 
        longitud, 
        direccion, 
        numero_paquetes
      });
    }
  });
};

const deleteDetalleRuta = (req, res) => {
  const { id } = req.params;
  connection.query('DELETE FROM detalle_ruta WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('Error al eliminar detalle de ruta:', err);
      res.status(500).json({ error: 'Error interno del servidor al eliminar el detalle de ruta' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Detalle de ruta no encontrado' });
    } else {
      res.status(200).json({ message: 'Detalle de ruta eliminado exitosamente' });
    }
  });
};

module.exports = { getDetalleRutas, getDetallesByRuta, getDetalleRuta, addDetalleRuta, updateDetalleRuta, deleteDetalleRuta };

const connection = require('../config/dbConfig');

const getRutasProgramadas = (req, res) => {
  const { vehiculo, conductor, fecha } = req.query;
  let query = 'SELECT * FROM ruta_programada WHERE 1=1';
  const queryParams = [];
  
  if (vehiculo) {
    query += ' AND vehiculo_placa = ?';
    queryParams.push(vehiculo);
  }
  
  if (conductor) {
    query += ' AND conductor_id = ?';
    queryParams.push(conductor);
  }
  
  if (fecha) {
    query += ' AND fecha_programada = ?';
    queryParams.push(fecha);
  }
  
  connection.query(query, queryParams, (err, results) => {
    if (err) {
      console.error('Error al obtener rutas programadas:', err);
      res.status(500).json({ error: 'Error interno del servidor al obtener las rutas programadas' });
    } else {
      res.json(results);
    }
  });
};

const getRutaProgramada = (req, res) => {
  const { id } = req.params;
  connection.query('SELECT * FROM ruta_programada WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Error al obtener ruta programada:', err);
      res.status(500).json({ error: 'Error interno del servidor al obtener la ruta programada' });
    } else if (results.length === 0) {
      res.status(404).json({ message: 'Ruta programada no encontrada' });
    } else {
      res.json(results[0]);
    }
  });
};

const addRutaProgramada = (req, res) => {
  const { conductor_id, vehiculo_placa, fecha, ruta } = req.body;
  
  // Validar campos requeridos
  if (!conductor_id || !vehiculo_placa || !fecha || !ruta) {
    return res.status(400).json({ 
      error: 'Todos los campos son requeridos: conductor, vehículo, fecha y ruta' 
    });
  }

  connection.query('INSERT INTO ruta_programada (conductor_id, vehiculo_placa, fecha_programada, ruta) VALUES (?, ?, ?, ?)', [conductor_id, vehiculo_placa, fecha, ruta], (err, result) => {
    if (err) {
      console.error('Error al crear ruta programada:', err);
      
      // Manejar errores específicos de foreign key
      if (err.code === 'ER_NO_REFERENCED_ROW_2') {
        if (err.sqlMessage.includes('conductor')) {
          return res.status(400).json({ error: 'El conductor seleccionado no existe' });
        }
        if (err.sqlMessage.includes('vehiculo')) {
          return res.status(400).json({ error: 'El vehículo seleccionado no existe' });
        }
      }
      
      res.status(500).json({ error: 'Error interno del servidor al crear la ruta programada' });
    } else {
      res.status(201).json({ 
        message: 'Ruta programada creada exitosamente',
        id: result.insertId, 
        conductor_id, 
        vehiculo_placa, 
        fecha_programada: fecha, 
        ruta 
      });
    }
  });
};

const updateRutaProgramada = (req, res) => {
  const { id } = req.params;
  const { conductor_id, vehiculo_placa, fecha, ruta } = req.body;
  
  // Validar campos requeridos
  if (!conductor_id || !vehiculo_placa || !fecha || !ruta) {
    return res.status(400).json({ 
      error: 'Todos los campos son requeridos: conductor, vehículo, fecha y ruta' 
    });
  }

  connection.query('UPDATE ruta_programada SET conductor_id = ?, vehiculo_placa = ?, fecha_programada = ?, ruta = ? WHERE id = ?', [conductor_id, vehiculo_placa, fecha, ruta, id], (err, result) => {
    if (err) {
      console.error('Error al actualizar ruta programada:', err);
      
      // Manejar errores específicos de foreign key
      if (err.code === 'ER_NO_REFERENCED_ROW_2') {
        if (err.sqlMessage.includes('conductor')) {
          return res.status(400).json({ error: 'El conductor seleccionado no existe' });
        }
        if (err.sqlMessage.includes('vehiculo')) {
          return res.status(400).json({ error: 'El vehículo seleccionado no existe' });
        }
      }
      
      res.status(500).json({ error: 'Error interno del servidor al actualizar la ruta programada' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Ruta programada no encontrada' });
    } else {
      res.json({ 
        message: 'Ruta programada actualizada exitosamente',
        id, 
        conductor_id, 
        vehiculo_placa, 
        fecha_programada: fecha, 
        ruta 
      });
    }
  });
};

const deleteRutaProgramada = (req, res) => {
  const { id } = req.params;
  connection.query('DELETE FROM ruta_programada WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('Error al eliminar ruta programada:', err);
      res.status(500).json({ error: 'Error interno del servidor al eliminar la ruta programada' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Ruta programada no encontrada' });
    } else {
      res.status(200).json({ message: 'Ruta programada eliminada exitosamente' });
    }
  });
};

module.exports = { getRutasProgramadas, getRutaProgramada, addRutaProgramada, updateRutaProgramada, deleteRutaProgramada };

const connection = require('../config/dbConfig');

const getConductores = (req, res) => {
  connection.query('SELECT * FROM conductor', (err, results) => {
    if (err) {
      console.error('Error al obtener conductores:', err);
      res.status(500).json({ error: 'Error interno del servidor al obtener conductores' });
    } else {
      res.json(results);
    }
  });
};

const getConductorById = (req, res) => {
  const { id } = req.params;
  connection.query('SELECT * FROM conductor WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Error al obtener conductor:', err);
      res.status(500).json({ error: 'Error interno del servidor al obtener el conductor' });
    } else if (results.length === 0) {
      res.status(404).json({ error: 'Conductor no encontrado' });
    } else {
      res.json(results[0]);
    }
  });
};

const addConductor = (req, res) => {
  console.log('Datos recibidos para crear conductor:', req.body);
  const { nombres, apellidos, numero_licencia, telefono, correo } = req.body;
  
  // Validar que todos los campos estén presentes
  if (!nombres || !apellidos || !numero_licencia || !telefono || !correo) {
    console.log('Faltan campos requeridos');
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }
  
  connection.query('INSERT INTO conductor (nombres, apellidos, numero_licencia, telefono, correo) VALUES (?, ?, ?, ?, ?)', 
    [nombres, apellidos, numero_licencia, telefono, correo], (err, result) => {
    if (err) {
      console.error('Error completo al insertar conductor:', err);
      console.error('Código de error:', err.code);
      console.error('Mensaje SQL:', err.sqlMessage);
      
      if (err.code === 'ER_DUP_ENTRY') {
        res.status(409).json({ error: 'Ya existe un conductor con estos datos. Verifique el número de licencia y correo.' });
      } else if (err.code === 'ER_NO_SUCH_TABLE') {
        res.status(500).json({ error: 'La tabla conductor no existe. Ejecute el script de base de datos.' });
      } else {
        res.status(500).json({ error: 'Error interno del servidor al crear el conductor: ' + err.message });
      }
    } else {
      console.log('Conductor creado exitosamente con ID:', result.insertId);
      res.status(201).json({ id: result.insertId, nombres, apellidos, numero_licencia, telefono, correo });
    }
  });
};

const updateConductor = (req, res) => {
  const { id } = req.params;
  const { nombres, apellidos, numero_licencia, telefono, correo } = req.body;
  connection.query('UPDATE conductor SET nombres = ?, apellidos = ?, numero_licencia = ?, telefono = ?, correo = ? WHERE id = ?', [nombres, apellidos, numero_licencia, telefono, correo, id], (err, result) => {
    if (err) {
      console.error('Error al actualizar conductor:', err);
      if (err.code === 'ER_DUP_ENTRY') {
        res.status(409).json({ error: 'Ya existe otro conductor con estos datos. Verifique el número de licencia y correo.' });
      } else {
        res.status(500).json({ error: 'Error interno del servidor al actualizar el conductor' });
      }
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Conductor no encontrado' });
    } else {
      res.json({ id, nombres, apellidos, numero_licencia, telefono, correo });
    }
  });
};

const deleteConductor = (req, res) => {
  const { id } = req.params;
  console.log('Intentando eliminar conductor con ID:', id);
  
  connection.query('DELETE FROM conductor WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('Error completo al eliminar conductor:', err);
      console.error('Código de error:', err.code);
      console.error('Mensaje SQL:', err.sqlMessage);
      
      if (err.code === 'ER_ROW_IS_REFERENCED_2') {
        res.status(409).json({ error: 'Este conductor está haciendo una ruta.' });
      } else if (err.code === 'ER_NO_SUCH_TABLE') {
        res.status(500).json({ error: 'La tabla conductor no existe. Ejecute el script de base de datos.' });
      } else {
        res.status(500).json({ error: 'Error interno del servidor al eliminar el conductor: ' + err.message });
      }
    } else if (result.affectedRows === 0) {
      console.log('Conductor no encontrado para eliminar');
      res.status(404).json({ error: 'Conductor no encontrado' });
    } else {
      console.log('Conductor eliminado exitosamente');
      res.status(204).send();
    }
  });
};

module.exports = { getConductores, getConductorById, addConductor, updateConductor, deleteConductor };

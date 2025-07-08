const connection = require('../config/dbConfig');

// Funciones de validación
const validarPlaca = (placa) => {
  const regex = /^[A-Za-z]{3}[0-9]{3}$/;
  return regex.test(placa);
};

const validarTexto = (texto, minLength, maxLength, soloLetras = false) => {
  if (!texto || texto.trim().length < minLength || texto.trim().length > maxLength) {
    return false;
  }
  if (soloLetras) {
    return /^[A-Za-z\s]+$/.test(texto.trim());
  }
  return /^[A-Za-z0-9\s\-]+$/.test(texto.trim());
};

const validarCapacidad = (capacidad) => {
  const num = parseFloat(capacidad);
  return !isNaN(num) && num >= 50 && num <= 50000;
};

const getVehiculos = (req, res) => {
  connection.query('SELECT * FROM vehiculo', (err, results) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.json(results);
    }
  });
};

const getVehiculoByPlaca = (req, res) => {
  const { placa } = req.params;
  connection.query('SELECT * FROM vehiculo WHERE placa = ?', [placa], (err, results) => {
    if (err) {
      res.status(500).json({ error: err });
    } else if (results.length === 0) {
      res.status(404).json({ message: 'Vehículo no encontrado' });
    } else {
      res.json(results[0]);
    }
  });
};

const addVehiculo = (req, res) => {
  let { placa, modelo, color, marca, capacidad_carga } = req.body;

  // Normalizar datos
  placa = placa ? placa.toString().toUpperCase().trim() : '';
  modelo = modelo ? modelo.toString().trim() : '';
  color = color ? color.toString().trim() : '';
  marca = marca ? marca.toString().trim() : '';

  // Validaciones
  if (!validarPlaca(placa)) {
    return res.status(400).json({ 
      error: 'La placa debe tener exactamente 3 letras seguidas de 3 números (ej: ABC123)' 
    });
  }

  if (!validarTexto(modelo, 2, 50)) {
    return res.status(400).json({ 
      error: 'El modelo debe tener entre 2 y 50 caracteres y solo contener letras, números, espacios y guiones' 
    });
  }

  if (!validarTexto(color, 3, 30, true)) {
    return res.status(400).json({ 
      error: 'El color debe tener entre 3 y 30 caracteres y solo contener letras y espacios' 
    });
  }

  if (!validarTexto(marca, 2, 30, true)) {
    return res.status(400).json({ 
      error: 'La marca debe tener entre 2 y 30 caracteres y solo contener letras y espacios' 
    });
  }

  if (!validarCapacidad(capacidad_carga)) {
    return res.status(400).json({ 
      error: 'La capacidad de carga debe ser un número entre 50 y 50,000 kg' 
    });
  }

  capacidad_carga = parseFloat(capacidad_carga);

  connection.query('INSERT INTO vehiculo (placa, modelo, color, marca, capacidad_carga) VALUES (?, ?, ?, ?, ?)', 
    [placa, modelo, color, marca, capacidad_carga], (err, result) => {
    if (err) {
      console.error('Error al insertar vehículo:', err);
      if (err.code === 'ER_DUP_ENTRY') {
        res.status(409).json({ 
          error: `Ya existe un vehículo con la placa ${placa}. Por favor, use una placa diferente.` 
        });
      } else if (err.code === 'ER_DATA_TOO_LONG') {
        res.status(400).json({ 
          error: 'Algunos datos son demasiado largos. Verifique la longitud de los campos.' 
        });
      } else {
        res.status(500).json({ 
          error: 'Error interno del servidor al crear el vehículo' 
        });
      }
    } else {
      res.status(201).json({ placa, modelo, color, marca, capacidad_carga });
    }
  });
};

const updateVehiculo = (req, res) => {
  const { placa } = req.params;
  let { modelo, color, marca, capacidad_carga } = req.body;

  // Normalizar datos
  modelo = modelo ? modelo.toString().trim() : '';
  color = color ? color.toString().trim() : '';
  marca = marca ? marca.toString().trim() : '';

  // Validaciones
  if (!validarTexto(modelo, 2, 50)) {
    return res.status(400).json({ 
      error: 'El modelo debe tener entre 2 y 50 caracteres y solo contener letras, números, espacios y guiones' 
    });
  }

  if (!validarTexto(color, 3, 30, true)) {
    return res.status(400).json({ 
      error: 'El color debe tener entre 3 y 30 caracteres y solo contener letras y espacios' 
    });
  }

  if (!validarTexto(marca, 2, 30, true)) {
    return res.status(400).json({ 
      error: 'La marca debe tener entre 2 y 30 caracteres y solo contener letras y espacios' 
    });
  }

  if (!validarCapacidad(capacidad_carga)) {
    return res.status(400).json({ 
      error: 'La capacidad de carga debe ser un número entre 50 y 50,000 kg' 
    });
  }

  capacidad_carga = parseFloat(capacidad_carga);

  connection.query('UPDATE vehiculo SET modelo = ?, color = ?, marca = ?, capacidad_carga = ? WHERE placa = ?', 
    [modelo, color, marca, capacidad_carga, placa], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error interno del servidor' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Vehículo no encontrado' });
    } else {
      res.json({ placa, modelo, color, marca, capacidad_carga });
    }
  });
};

const deleteVehiculo = (req, res) => {
  const { placa } = req.params;
  connection.query('DELETE FROM vehiculo WHERE placa = ?', [placa], (err, result) => {
    if (err) {
      res.status(500).json({ error: err });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Vehículo no encontrado' });
    } else {
      res.status(204).send();
    }
  });
};

module.exports = { getVehiculos, getVehiculoByPlaca, addVehiculo, updateVehiculo, deleteVehiculo };

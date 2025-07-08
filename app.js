const express = require('express');
const path = require('path');
const app = express();



// Rutas
const vehiculosRoutes = require('./routes/vehiculosRoutes');
const conductoresRoutes = require('./routes/conductoresRoutes');
const rutasProgramadasRoutes = require('./routes/rutasProgramadasRoutes');
const detalleRutasRoutes = require('./routes/detalleRutasRoutes');
const mapaRoutes = require('./routes/mapaRoutes');

// Middleware
app.use(express.json());
app.use('/api/vehiculos', vehiculosRoutes);
app.use('/api/conductores', conductoresRoutes);
app.use('/api/rutasProgramadas', rutasProgramadasRoutes);
app.use('/api/detalleRutas', detalleRutasRoutes);
app.use(mapaRoutes);

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Configurar el puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

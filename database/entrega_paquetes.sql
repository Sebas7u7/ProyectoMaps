-- Base de datos para Sistema de Entrega de Paquetes
-- Creado: 7 de Julio, 2025

-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS entrega_paquetes;
USE entrega_paquetes;

-- =============================================
-- Tabla de Vehículos
-- =============================================
CREATE TABLE vehiculo (
    placa VARCHAR(10) PRIMARY KEY,
    modelo VARCHAR(50) NOT NULL,
    color VARCHAR(30) NOT NULL,
    marca VARCHAR(30) NOT NULL,
    capacidad_carga DECIMAL(8,2) NOT NULL COMMENT 'Capacidad en kilogramos'
);

-- =============================================
-- Tabla de Conductores
-- =============================================
CREATE TABLE conductor (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombres VARCHAR(50) NOT NULL,
    apellidos VARCHAR(50) NOT NULL,
    numero_licencia VARCHAR(20) UNIQUE NOT NULL,
    telefono VARCHAR(15) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL
);


-- =============================================
-- Tabla de Rutas Programadas
-- =============================================
CREATE TABLE ruta_programada (
    id INT AUTO_INCREMENT PRIMARY KEY,
    conductor_id INT NOT NULL,
    vehiculo_placa VARCHAR(10) NOT NULL,
    fecha_programada DATE NOT NULL,
    ruta VARCHAR(200) NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (conductor_id) REFERENCES conductor(id) ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY (vehiculo_placa) REFERENCES vehiculo(placa) ON DELETE RESTRICT ON UPDATE CASCADE,
    INDEX idx_fecha_programada (fecha_programada),
    INDEX idx_conductor (conductor_id),
    INDEX idx_vehiculo (vehiculo_placa)
);

-- =============================================
-- Tabla de Detalle de Rutas
-- =============================================
CREATE TABLE detalle_ruta (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ruta_programada_id INT NOT NULL,
    latitud DECIMAL(10, 8) NOT NULL,
    longitud DECIMAL(11, 8) NOT NULL,
    direccion VARCHAR(255) NOT NULL,
    numero_paquetes INT NOT NULL DEFAULT 1,
    FOREIGN KEY (ruta_programada_id) REFERENCES ruta_programada(id) ON DELETE CASCADE ON UPDATE CASCADE,
    INDEX idx_ruta_programada (ruta_programada_id)
);

-- =============================================
-- Datos de ejemplo para testing
-- =============================================

-- Insertar vehículos de ejemplo
INSERT INTO vehiculo (placa, modelo, color, marca, capacidad_carga) VALUES
('ABC123', 'Corolla', 'Blanco', 'Toyota', 500.00),
('DEF456', 'Ranger', 'Azul', 'Ford', 1000.00),
('GHI789', 'Spark', 'Rojo', 'Chevrolet', 350.00),
('JKL012', 'Frontier', 'Negro', 'Nissan', 1200.00),
('MNO345', 'Transit', 'Blanco', 'Ford', 1500.00);

-- Insertar conductores de ejemplo
INSERT INTO conductor (nombres, apellidos, numero_licencia, telefono, correo) VALUES
('Juan Carlos', 'Pérez González', 'LIC001234567', '3101234567', 'juan.perez@empresa.com'),
('María Elena', 'García Rodríguez', 'LIC002345678', '3109876543', 'maria.garcia@empresa.com'),
('Carlos Alberto', 'Rodríguez López', 'LIC003456789', '3105555555', 'carlos.rodriguez@empresa.com'),
('Ana Sofía', 'Fernández Martín', 'LIC004567890', '3108888888', 'ana.fernandez@empresa.com'),
('Pedro Luis', 'López Hernández', 'LIC005678901', '3107777777', 'pedro.lopez@empresa.com');

-- Insertar rutas programadas de ejemplo
INSERT INTO ruta_programada (conductor_id, vehiculo_placa, fecha_programada, ruta) VALUES
(1, 'ABC123', '2025-07-08', 'Ruta Centro - Norte'),
(2, 'DEF456', '2025-07-08', 'Ruta Sur - Occidente'),
(3, 'GHI789', '2025-07-09', 'Ruta Oriente - Centro'),
(4, 'JKL012', '2025-07-09', 'Ruta Norte - Sur'),
(5, 'MNO345', '2025-07-10', 'Ruta Metropolitana');

-- Insertar detalles de rutas de ejemplo
INSERT INTO detalle_ruta (ruta_programada_id, latitud, longitud, direccion, numero_paquetes) VALUES
-- Ruta 1: Centro - Norte
(1, 4.6097100, -74.0817500, 'Carrera 7 # 32-16, Centro, Bogotá', 3),
(1, 4.6486200, -74.0742300, 'Calle 63 # 11-50, Chapinero, Bogotá', 2),
(1, 4.6687900, -74.0567800, 'Carrera 15 # 85-20, Zona Rosa, Bogotá', 1),
(1, 4.7043400, -74.0325600, 'Calle 127 # 7-83, Usaquén, Bogotá', 4),

-- Ruta 2: Sur - Occidente
(2, 4.6097100, -74.0817500, 'Carrera 7 # 32-16, Centro, Bogotá', 5),
(2, 4.5731600, -74.1102900, 'Carrera 30 # 1-45, San Cristóbal, Bogotá', 2),
(2, 4.5534800, -74.1243500, 'Calle 1 Sur # 40-67, Bosa, Bogotá', 1),
(2, 4.5982300, -74.1456700, 'Avenida 68 # 24-35, Kennedy, Bogotá', 2),

-- Ruta 3: Oriente - Centro
(3, 4.6097100, -74.0817500, 'Carrera 7 # 32-16, Centro, Bogotá', 4),
(3, 4.6234500, -74.0456700, 'Carrera 4 # 45-23, La Candelaria, Bogotá', 1),
(3, 4.6345600, -74.0234500, 'Calle 57 # 3-45, Lourdes, Bogotá', 2),
(3, 4.6456700, -74.0123400, 'Carrera 2 # 67-89, Egipto, Bogotá', 1),

-- Ruta 4: Norte - Sur
(4, 4.6097100, -74.0817500, 'Carrera 7 # 32-16, Centro, Bogotá', 6),
(4, 4.7234500, -74.0456700, 'Calle 140 # 15-32, Cedritos, Bogotá', 2),
(4, 4.6789000, -74.0567800, 'Carrera 11 # 93-45, Chicó, Bogotá', 1),
(4, 4.5345600, -74.0987600, 'Calle 8 Sur # 20-67, San Jorge, Bogotá', 2),
(4, 4.5123400, -74.1234500, 'Carrera 25 # 5-89, Restrepo, Bogotá', 1),

-- Ruta 5: Metropolitana
(5, 4.6097100, -74.0817500, 'Carrera 7 # 32-16, Centro, Bogotá', 8),
(5, 4.7567800, -74.0234500, 'Calle 170 # 9-23, Toberin, Bogotá', 2),
(5, 4.4876500, -74.1345600, 'Carrera 50 # 5-67, Tintal, Bogotá', 2),
(5, 4.6543200, -74.1876500, 'Avenida 80 # 45-32, Engativá, Bogotá', 2),
(5, 4.5987600, -74.0345600, 'Carrera 13 # 18-54, San Victorino, Bogotá', 1),
(5, 4.6789000, -74.1234500, 'Calle 80 # 60-78, Minuto de Dios, Bogotá', 1);

-- =============================================
-- Configuraciones finales
-- =============================================

-- Mensaje de confirmación
SELECT 'Base de datos entrega_paquetes creada exitosamente' as Status;
SELECT 'Tablas creadas: vehiculo, conductor, ruta_programada, detalle_ruta' as Tablas;
SELECT 'Datos de ejemplo insertados correctamente' as Datos;

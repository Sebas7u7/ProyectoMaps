# 📦 Sistema de Entrega de Paquetes - Documentación Técnica

## 📋 Información General del Proyecto

**Nombre del Proyecto:** Sistema de Gestión de Rutas de Entrega de Paquetes  
**Tipo de Aplicación:** Full Stack Web Application  
**Tecnologías:** Node.js + Express.js (Backend) + HTML/CSS/Bootstrap (Frontend) + MySQL (Base de Datos)  
**Puerto:** 5000  
**URL de Acceso:** http://localhost:5000

---

## 🏗️ Arquitectura del Sistema

### **Backend (Node.js + Express.js)**
- **Tipo:** Backend API REST
- **Puerto:** 5000
- **Framework:** Express.js
- **Base de Datos:** MySQL

### **Frontend (HTML/CSS/Bootstrap)**
- **Tipo:** Frontend Web Application
- **Framework:** Bootstrap 4 + jQuery
- **Ubicación:** `/public/`
- **Acceso:** A través del servidor Express en puerto 5000

---

## 🌐 Endpoints y Servicios API

### **1. Gestión de Vehículos**
**Base URL:** `/api/vehiculos`

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/vehiculos` | Obtener todos los vehículos |
| GET | `/api/vehiculos/:placa` | Obtener vehículo por placa |
| POST | `/api/vehiculos` | Crear nuevo vehículo |
| PUT | `/api/vehiculos/:placa` | Actualizar vehículo |
| DELETE | `/api/vehiculos/:placa` | Eliminar vehículo |

**Campos:** placa, modelo, color, marca, capacidad_carga

### **2. Gestión de Conductores**
**Base URL:** `/api/conductores`

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/conductores` | Obtener todos los conductores |
| GET | `/api/conductores/:id` | Obtener conductor por ID |
| POST | `/api/conductores` | Crear nuevo conductor |
| PUT | `/api/conductores/:id` | Actualizar conductor |
| DELETE | `/api/conductores/:id` | Eliminar conductor |

**Campos:** id, nombres, apellidos, numero_licencia, telefono, correo

### **3. Gestión de Rutas Programadas**
**Base URL:** `/api/rutasProgramadas`

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/rutasProgramadas` | Obtener todas las rutas |
| GET | `/api/rutasProgramadas/:id` | Obtener ruta por ID |
| POST | `/api/rutasProgramadas` | Crear nueva ruta |
| PUT | `/api/rutasProgramadas/:id` | Actualizar ruta |
| DELETE | `/api/rutasProgramadas/:id` | Eliminar ruta |
| GET | `/api/rutasProgramadas/buscar` | Buscar rutas con filtros |

**Campos:** id, conductor_id, vehiculo_placa, fecha_programada, ruta, fecha_creacion

### **4. Gestión de Detalle de Rutas**
**Base URL:** `/api/detalleRutas`

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/detalleRutas` | Obtener todos los detalles |
| GET | `/api/detalleRutas/:id` | Obtener detalle por ID |
| POST | `/api/detalleRutas` | Crear nuevo detalle |
| PUT | `/api/detalleRutas/:id` | Actualizar detalle |
| DELETE | `/api/detalleRutas/:id` | Eliminar detalle |

**Campos:** id, ruta_programada_id, latitud, longitud, direccion, numero_paquetes

### **5. Servicio de Mapas**
**Base URL:** `/api/mapa`

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/mapa/:id` | Obtener puntos de entrega por ruta |

**Descripción:** Retorna las coordenadas y direcciones de todos los puntos de entrega de una ruta específica para ser mostrados en el mapa.

---

## 🖥️ Páginas Web (Frontend)

| Página | URL | Descripción |
|--------|-----|-------------|
| **Inicio** | `/index.html` | Página principal del sistema |
| **Vehículos** | `/vehiculos.html` | CRUD de vehículos de entrega |
| **Conductores** | `/conductores.html` | CRUD de conductores |
| **Rutas Programadas** | `/rutasProgramadas.html` | CRUD de rutas programadas |
| **Detalle de Rutas** | `/detalleRutas.html` | CRUD de puntos de entrega |
| **Buscar Rutas** | `/buscarRutas.html` | Búsqueda de rutas con filtros |
| **Mapa de Rutas** | `/mapa.html` | Visualización de rutas en mapa |

---

## 🗺️ Características del Mapa

**Librería:** MapLibre GL JS  
**Proveedor de Mapas:** MapTiler  
**Funcionalidades:**
- Punto fijo de bodega: `4.757786586246297, -74.04488664305592`
- Visualización de puntos de entrega
- Trazado de rutas optimizadas usando OSRM
- Marcadores interactivos con información de entregas
- Selector de rutas para visualización

---

## 🗄️ Base de Datos

**Tipo:** MySQL  
**Nombre:** `entrega_paquetes`

### **Tablas:**

1. **vehiculo**
   - placa (VARCHAR(10), PK)
   - modelo, color, marca (VARCHAR)
   - capacidad_carga (DECIMAL)

2. **conductor**
   - id (INT, PK, AUTO_INCREMENT)
   - nombres, apellidos (VARCHAR(50))
   - numero_licencia (VARCHAR(20), UNIQUE)
   - telefono (VARCHAR(15))
   - correo (VARCHAR(100), UNIQUE)

3. **ruta_programada**
   - id (INT, PK, AUTO_INCREMENT)
   - conductor_id (INT, FK)
   - vehiculo_placa (VARCHAR(10), FK)
   - fecha_programada (DATE)
   - ruta (VARCHAR(200))
   - fecha_creacion (TIMESTAMP)

4. **detalle_ruta**
   - id (INT, PK, AUTO_INCREMENT)
   - ruta_programada_id (INT, FK)
   - latitud, longitud (DECIMAL)
   - direccion (VARCHAR(255))
   - numero_paquetes (INT)

---

## 🚀 Instrucciones de Instalación y Ejecución

### **Prerrequisitos:**
- Node.js (v14 o superior)
- MySQL Server
- XAMPP (recomendado para desarrollo local)

### **Pasos:**

1. **Clonar el proyecto** en `C:\xampp\htdocs\Entrega-de-Paquetes\`

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar base de datos:**
   - Importar `database/entrega_paquetes.sql` en MySQL
   - Verificar configuración en `config/dbConfig.js`

4. **Ejecutar la aplicación:**
   ```bash
   node app.js
   ```

5. **Acceder al sistema:**
   - Abrir navegador en: http://localhost:5000

---

## 🔧 Servicios y Métodos Principales

### **Validaciones Implementadas:**
- Formato de placas de vehículos (ABC123)
- Validación de emails y teléfonos
- Verificación de capacidades de carga
- Validación de coordenadas GPS
- Verificación de fechas

### **Funcionalidades Clave:**
- CRUD completo para todas las entidades
- Búsqueda avanzada de rutas por múltiples criterios
- Optimización automática de rutas usando algoritmos OSRM
- Interfaz responsiva compatible con dispositivos móviles
- Manejo de errores y mensajes informativos al usuario

### **Integraciones Externas:**
- **OSRM (Open Source Routing Machine):** Para optimización de rutas
- **MapTiler:** Proveedor de mapas base
- **MapLibre GL JS:** Librería de mapas interactivos

---

## 👥 Equipo de Desarrollo

**Proyecto Final - Desarrollo de Software**  
**Institución:** Universidad Francisco Jose de Caldas 
**Materia:** Programacion por componentes
**Profesor:** Noe Arcos

---

## 📝 Notas Adicionales

- El sistema está optimizado para ciudades de Colombia (coordenadas de Bogotá)
- Todas las rutas inician desde la bodega ubicada en las coordenadas especificadas
- El mapa muestra rutas optimizadas que minimizan tiempo y distancia de entrega
- La aplicación es compatible con navegadores modernos que soporten HTML5 y JavaScript ES6

---

**Fecha de Creación:** Julio 2025  
**Versión:** 1.0  
**Estado:** Completado

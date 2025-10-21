// routes/contratacionesRoutes.js
import express from 'express';
const router = express.Router();
import { obtenerContratacionesPorPrestador, actualizarEstadoContratacion,crearContratacion } from '../controllers/contratacionesController.js';

// Ruta para obtener contrataciones por id de prestador
router.get('/contrataciones', obtenerContratacionesPorPrestador);

// Ruta para actualizar estado de contratación
router.put('/contrataciones/:contratacionId', actualizarEstadoContratacion);
// Ruta para crear una contratación
router.post('/crearContratacion', crearContratacion);






export default router;

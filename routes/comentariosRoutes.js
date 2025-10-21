// /routes/comentariosRoutes.js
import express from 'express';
const router = express.Router();
import { crearComentario, obtenerComentariosPorServicio } from '../controllers/comentariosController.js';

// Ruta para crear un comentario
router.post('/servicios/:idServicio/comentarios', crearComentario);
router.get('/comentarios/servicio/:idServicio', obtenerComentariosPorServicio);

export default router;
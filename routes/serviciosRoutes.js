import express from 'express';
import { 
  publicarServicio, 
  obtenerServicioPorId, 
  calificarServicio,buscarServicios,
  editarServicio,despublicarServicio
  ,eliminarServicio,obtenerTodosLosServicios
} from '../controllers/serviciosController.js';

import { obtenerComentariosPorServicio } from '../controllers/comentariosController.js';

const router = express.Router();

router.post('/publicarServicio', publicarServicio);

// Nueva ruta para obtener un servicio por ID
router.get('/servicio/:idServicio', obtenerServicioPorId);

// Nueva ruta para obtener comentarios por servicio
router.get('/servicio/:idServicio/comentarios', obtenerComentariosPorServicio);

// Nueva ruta para calificar un servicio
router.put('/servicio/:idServicio/calificar', calificarServicio);

// Nueva ruta para la búsqueda de servicios
router.get('/buscar', buscarServicios);

router.put('/editarServicio/:idServicio', editarServicio); // Nueva ruta para editar servicio
router.put('/despublicarServicio/:idServicio', despublicarServicio); // Nueva ruta para despublicar servicio
router.delete('/eliminarServicio/:idServicio', eliminarServicio); // Nueva ruta para eliminar servicio
router.use(express.json()); // Middleware para analizar JSON
router.use(express.urlencoded({ extended: true })); // Middleware para analizar datos de formulario

router.get('/obtenerTodosLosServicios', obtenerTodosLosServicios);


export default router;
// /routes/authRoutes.js
import express from 'express';
const router = express.Router();
import { iniciarSesion } from '../controllers/authController.js';

// Ruta para iniciar sesión
router.post('/iniciarSesion', iniciarSesion);

export default router;

// /routes/userRoutes.js
import express from 'express';
const router = express.Router();
import { registrarUsuario } from '../controllers/userController.js';

router.post('/registro', registrarUsuario);

export default router;

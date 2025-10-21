import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Rutas de API
import authRoutes from './routes/authRoutes.js';
import comentariosRoutes from './routes/comentariosRoutes.js';
import contratacionesRoutes from './routes/contratacionesRoutes.js';
import serviciosRoutes from './routes/serviciosRoutes.js';
import userRoutes from './routes/userRoutes.js';

app.use('/api', authRoutes);
app.use('/api', comentariosRoutes);
app.use('/api', contratacionesRoutes);
app.use('/api', serviciosRoutes);
app.use('/api', userRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
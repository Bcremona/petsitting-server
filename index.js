import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';

const app = express();
const port = 3000;

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

// Servir archivos estáticos del build de React en producción
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../build')));
  
  // Todas las rutas que NO sean /api/* devuelven el index.html de React
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
  });
}

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
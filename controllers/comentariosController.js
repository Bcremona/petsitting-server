// /controllers/comentariosController.js
import pool from '../config/db.js';

const crearComentario = async (req, res) => {
  const { idServicio } = req.params;
  const { texto, userId } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO comentarios (idServicio, texto, userId)
       VALUES ($1, $2, $3) RETURNING id`,
      [idServicio, texto, userId]
    );

    res.status(201).json({ id: result.rows[0].id, message: 'Comentario creado con éxito' });
  } catch (error) {
    console.error('Error al crear el comentario:', error.message);
    res.status(500).json({ error: 'Error al crear el comentario' });
  }
};

const obtenerComentariosPorServicio = async (req, res) => {
  const { idServicio } = req.params;

  try {
    const result = await pool.query('SELECT * FROM comentarios WHERE idServicio = $1', [idServicio]);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error al obtener comentarios:', error.message);
    res.status(500).json({ error: 'Error al obtener comentarios' });
  }
};

export { crearComentario, obtenerComentariosPorServicio };

// /controllers/serviciosController.js
import pool from '../config/db.js';

// Publicar servicio
const publicarServicio = async (req, res) => {
  const { nombre, categoria, frecuencia, duracion, costo, userId } = req.body;

  try {
    await pool.query(
      `INSERT INTO servicios (nombre, categoria, frecuencia, duracion, costo, prestadorId)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [nombre, categoria, frecuencia, duracion, costo, userId]
    );

    res.status(201).json({ message: 'Servicio publicado con éxito' });
  } catch (error) {
    console.error('Error al publicar el servicio:', error);
    res.status(500).json({ message: 'Error al publicar el servicio' });
  }
};

// Obtener servicio por ID
const obtenerServicioPorId = async (req, res) => {
  const { idServicio } = req.params;

  try {
    const result = await pool.query('SELECT * FROM servicios WHERE id = $1', [idServicio]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Servicio no encontrado' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error al obtener el servicio:', error.message);
    res.status(500).json({ error: 'Error al obtener el servicio' });
  }
};

// Calificar servicio
const calificarServicio = async (req, res) => {
  const { idServicio } = req.params;
  const { calificacion } = req.body;

  try {
    await pool.query(
      'UPDATE servicios SET calificacion = $1 WHERE id = $2',
      [calificacion, idServicio]
    );
    res.status(200).json({ message: 'Calificación actualizada correctamente' });
  } catch (error) {
    console.error('Error al calificar el servicio:', error.message);
    res.status(500).json({ error: 'Error al calificar el servicio' });
  }
};

// Buscar servicios por nombre o categoría
const buscarServicios = async (req, res) => {
  const { query } = req.query;

  try {
    const result = await pool.query(
      `SELECT * FROM servicios WHERE categoria ILIKE $1 OR nombre ILIKE $1`,
      [`%${query}%`]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error al buscar servicios:', error.message);
    res.status(500).json({ error: 'Error al buscar servicios' });
  }
};

// Editar servicio
const editarServicio = async (req, res) => {
  const { idServicio } = req.params;
  const { nombre, categoria, frecuencia, duracion, costo, calificacion } = req.body;

  try {
    await pool.query(
      `UPDATE servicios SET nombre = $1, categoria = $2, frecuencia = $3,
       duracion = $4, costo = $5, calificacion = $6 WHERE id = $7`,
      [nombre, categoria, frecuencia, duracion, costo, calificacion, idServicio]
    );
    res.status(200).json({ message: 'Servicio actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar el servicio:', error);
    res.status(500).json({ message: 'Error al actualizar el servicio' });
  }
};

// Despublicar servicio
const despublicarServicio = async (req, res) => {
  const { idServicio } = req.params;

  try {
    await pool.query(
      `UPDATE servicios SET estado = 'despublicado' WHERE id = $1`,
      [idServicio]
    );
    res.status(200).json({ message: 'Servicio despublicado correctamente' });
  } catch (error) {
    console.error('Error al despublicar el servicio:', error);
    res.status(500).json({ message: 'Error al despublicar el servicio' });
  }
};

// Eliminar servicio y comentarios asociados
const eliminarServicio = async (req, res) => {
  const { idServicio } = req.params;

  try {
    await pool.query('DELETE FROM comentarios WHERE idServicio = $1', [idServicio]);
    await pool.query('DELETE FROM servicios WHERE id = $1', [idServicio]);
    res.status(200).json({ message: 'Servicio eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar el servicio:', error);
    res.status(500).json({ message: 'Error al eliminar el servicio' });
  }
};

// Obtener todos los servicios
const obtenerTodosLosServicios = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM servicios');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error al obtener los servicios:', error.message);
    res.status(500).json({ error: 'Error al obtener los servicios' });
  }
};

export  {
  publicarServicio,
  obtenerServicioPorId,
  calificarServicio,
  buscarServicios,
  editarServicio,
  despublicarServicio,
  eliminarServicio,
  obtenerTodosLosServicios
};

// /controllers/contratacionesController.js
import pool from '../config/db.js';

const crearContratacion = async (req, res) => {
  const { idServicio, idPrestador, telefono, email, horario, mensaje, metodoPago } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO contrataciones
       (idServicio, idPrestador, telefono, email, horario, mensaje, metodoPago)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id`,
      [idServicio, idPrestador, telefono, email, horario, mensaje, metodoPago]
    );

    res.status(201).json({ id: result.rows[0].id, message: 'Contratación creada con éxito' });
  } catch (error) {
    console.error('Error al crear la contratación:', error.message);
    res.status(500).json({ error: 'Error al crear la contratación' });
  }
};

const obtenerContratacionesPorPrestador = async (req, res) => {
  const { prestadorId } = req.query;

  try {
    const result = await pool.query('SELECT * FROM contrataciones WHERE idPrestador = $1', [prestadorId]);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error al obtener contrataciones:', error.message);
    res.status(500).json({ error: 'Error al obtener contrataciones' });
  }
};

const actualizarEstadoContratacion = async (req, res) => {
  const { contratacionId } = req.params;
  const { nuevoEstado } = req.body;

  try {
    await pool.query(
      'UPDATE contrataciones SET estado = $1 WHERE id = $2',
      [nuevoEstado, contratacionId]
    );

    res.status(200).json({ message: 'Estado de la contratación actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar el estado:', error.message);
    res.status(500).json({ error: 'Error al actualizar el estado' });
  }
};

export  {
  crearContratacion,
  obtenerContratacionesPorPrestador,
  actualizarEstadoContratacion
};

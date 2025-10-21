// /controllers/authController.js
import bcrypt from 'bcryptjs';
import pool from '../config/db.js';

const iniciarSesion = async (req, res) => {
  const { email, contraseña } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      throw new Error('Credenciales incorrectas');
    }

    const user = result.rows[0];
    const contraseñaValida = await bcrypt.compare(contraseña, user.contraseña);
    if (!contraseñaValida) {
      throw new Error('Credenciales incorrectas');
    }

    res.status(200).json({ id: user.id, rol: user.rol });
  } catch (error) {
    console.error('Error al iniciar sesión:', error.message);
    res.status(401).json({ error: 'Credenciales incorrectas' });
  }
};

export { iniciarSesion };

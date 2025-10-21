// /controllers/userController.js
import bcrypt from 'bcryptjs';
import pool from '../config/db.js';

const registrarUsuario = async (req, res) => {
  const { nombre, apellido, email, dni, telefono, domicilio, contraseña, rol } = req.body;

  try {
    // Verificar si el usuario ya existe
    const existe = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existe.rows.length > 0) {
      return res.status(400).json({ error: 'El usuario ya está registrado' });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(contraseña, 10);

    // Insertar nuevo usuario
    await pool.query(
      `INSERT INTO users (nombre, apellido, email, dni, telefono, domicilio, contraseña, rol)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [nombre, apellido, email, dni, telefono, domicilio, hashedPassword, rol]
    );

    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

export { registrarUsuario };
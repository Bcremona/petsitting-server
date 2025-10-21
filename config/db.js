import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const { Pool } = pg;

const connectionString = process.env.DATABASE_URL;

// Agregar validación
if (!connectionString) {
  console.error('❌ DATABASE_URL no está definido en las variables de entorno');
  process.exit(1);
}

console.log('✅ Conectando a la base de datos...');

const pool = new Pool({
  connectionString: connectionString,
});

// Probar la conexión
pool.on('connect', () => {
  console.log('✅ Conexión a PostgreSQL exitosa');


});

pool.on('error', (err) => {
  console.error('❌ Error inesperado en el pool de PostgreSQL:', err);
});

export default pool;
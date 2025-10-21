import pg from 'pg'; // Usamos el cliente 'pg'
import 'dotenv/config'; // Para usar process.env localmente

// 1. Obtener la URL de conexión desde las variables de entorno
// Render usará la variable que configuraste en su dashboard.
const DATABASE_URL = process.env.DATABASE_URL;

// Validación básica (opcional, pero recomendado)
if (!DATABASE_URL) {
  console.error("❌ ERROR: La variable de entorno DATABASE_URL no está definida.");
  // process.exit(1); 
}

// Configuración de SSL para entornos de producción como Render
// Render se conecta a bases de datos externas que casi siempre requieren SSL.
// 'rejectUnauthorized: false' es común en entornos Node.js para evitar errores
// con certificados autofirmados, aunque es menos seguro.
const sslConfig = process.env.NODE_ENV === 'production' 
    ? { ssl: { rejectUnauthorized: false } }
    : {}; // No usar SSL en desarrollo local si no es necesario

// 2. Crear la configuración del Pool de Conexiones
// Usamos el objeto Pool de 'pg' para manejar múltiples conexiones
const pool = new pg.Pool({
    connectionString: DATABASE_URL,
    ...sslConfig, // AÑADIDO: Configuración de SSL condicional
    // Opciones de configuración (opcional, pero recomendado para producción/Render)
    max: 20, // Máximo de 20 clientes en el pool
    idleTimeoutMillis: 30000, // Los clientes inactivos se cerrarán después de 30 segundos
    connectionTimeoutMillis: 2000, // Tiempo de espera para la conexión inicial del cliente
});

// 3. Manejo de Errores y Conexión Inicial (Opcional, pero útil)
pool.on('error', (err, client) => {
    // Si un cliente dentro del pool lanza un error fatal
    console.error('⚠️ Error inesperado en el pool de PG:', err);
    // Nota: El pool no se detiene, sino que intenta recuperar la conexión
});

// 4. Conexión de Prueba y Exportación
pool.query('SELECT NOW()')
    .then(res => {
        console.log('✅ Conexión a PostgreSQL (pg Pool) establecida con éxito. Hora del servidor DB:', res.rows[0].now);
    })
    .catch(err => {
        console.error('❌ Falló la conexión inicial a PostgreSQL:', err.message);
    });

// 5. Exportar la instancia del Pool para ser usada en el resto de la aplicación
export default pool;

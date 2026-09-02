require("dotenv").config();

const { Pool } = require("pg");

// Configuracion de conexion con PostgreSQL
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

// Probar conexion con PostgreSQL
pool.query("SELECT NOW()", (error, result) => {
    if (error) {
        console.error("Error al conectar con PostgreSQL: ", error);
    } else {
        console.log("Conexion con PostgreSQL exitosa");
        console.log(result.rows[0]);
    }
});


// Exportar el pool 
module.exports = pool;
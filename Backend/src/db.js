// Backend/src/db.js

const mysql = require('mysql2/promise'); // Import mysql2 with promise support

// Create a connection pool
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vehicle_service_booking',
    port: 3306
});

// Test the database connection
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database as id ' + connection.threadId);
    connection.release(); // release the connection
});

module.exports = pool;

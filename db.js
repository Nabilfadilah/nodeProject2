const mysql = require("mysql");

const db = mysql.createPool({
    connectionLimit: 10, // Jumlah koneksi maksimum
    host: "localhost", // Host default XAMPP
    user: "root", // Username default XAMPP
    password: "", // Password default XAMPP (kosong)
    database: "nodeexpressDB2", // Nama database 
});

// Ping database untuk mengecek error umum
db.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.');
        }
    }

    if (connection) connection.release();

    return;
});

// cek apakah database terkoneksi?
db.query('SELECT 1', (err, results) => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
    } else {
        console.log('Database connected successfully!');
    }
});

module.exports = db;

const express = require('express')
const mysql = require("mysql2");
const dotenv = require("dotenv").config();
const app = express()

// listen to the server
const PORT = 3000
    // MySQL connection setup
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
});
// Connect to the database
db.connect((err) => {
    if (err) {
        console.error("Cannot connect to the database:", err.stack);
        process.exit(1);
    }
    console.log("Connected to the database");

    // Make the db accessible in routes
    app.set('db', db);

    // Retrieve all patients
    router.get('/patients', (req, res) => {
        const query = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients';

        db.query(query, (error, results) => {
            if (error) return res.status(500).json({ error: error.message });
            res.json(results);
        });
    });
    // Retrieve all providers
    router.get('/providers', (req, res) => {
        const query = 'SELECT first_name, last_name, provider_specialty FROM providers';

        db.query(query, (error, results) => {
            if (error) return res.status(500).json({ error: error.message });
            res.json(results);
        });
    });
    // Filter patients by first name
    router.get('/patients/filter', (req, res) => {
        const { first_name } = req.query;

        if (!first_name) return res.status(400).json({ error: 'First name is required' });

        const query = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients WHERE first_name = ?';

        db.query(query, [first_name], (error, results) => {
            if (error) return res.status(500).json({ error: error.message });
            res.json(results);
        });
    });

    // Filter providers by specialty
    router.get('/providers/filter', (req, res) => {
        const { provider_specialty } = req.query;

        if (!provider_specialty) return res.status(400).json({ error: 'Provider specialty is required' });

        const query = 'SELECT first_name, last_name, provider_specialty FROM providers WHERE provider_specialty = ?';

        db.query(query, [provider_specialty], (error, results) => {
            if (error) return res.status(500).json({ error: error.message });
            res.json(results);
        });
    });

    // Launch server only after successful DB connection
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});
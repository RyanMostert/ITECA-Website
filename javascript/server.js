const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from 'public'

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Your MySQL root password
    database: 'fashionfusion'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL Connected...');
});

// API Endpoints
app.get('/products', (req, res) => {
    let sql = 'SELECT * FROM products';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.post('/products', (req, res) => {
    let product = req.body;
    let sql = 'INSERT INTO products SET ?';
    db.query(sql, product, (err, result) => {
        if (err) throw err;
        res.json({ id: result.insertId, ...product });
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

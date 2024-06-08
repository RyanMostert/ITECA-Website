const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

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

//API Endpoints
 app.get('/products', (req, res) => {
     let sql = 'SELECT * FROM products';
    db.query(sql, (err, results) => {
        if (err) {
             res.status(500).json({ error: 'Failed to fetch products from the database.' });
       } else {
           res.json(results);
        }
    });
 });

app.post('products', (req, res) => {
    let product = req.body;
    let sql = 'INSERT INTO products SET ?';
    db.query(sql, product, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Failed to add product to the database.' });
        } else {
            res.json({ id: result.insertId, ...product });
        }
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

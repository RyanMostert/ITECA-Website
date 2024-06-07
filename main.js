const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

// // Middleware
// app.use(bodyParser.json());
// app.use(cors());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from 'public'

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


/*

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
*/
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

/*
document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.getElementById('search-bar');
    const clothingItems = document.querySelectorAll('.clothing-item');

    searchBar.addEventListener('keyup', (e) => {
        const searchString = e.target.value.toLowerCase();

        clothingItems.forEach(item => {
            const name = item.getAttribute('data-name').toLowerCase();
            if (name.includes(searchString)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });

    // Description modal setup
    const modal = document.createElement('div');
    modal.classList.add('description-modal');
    document.body.appendChild(modal);

    const closeModal = () => {
        modal.style.display = 'none';
    };

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('description-button')) {
            const itemId = e.target.closest('.clothing-item').getAttribute('data-id');
            fetch(`/products/${itemId}`)
                .then(response => response.json())
                .then(product => {
                    modal.innerHTML = `
                        <h2>${product.name}</h2>
                        <p>${product.description}</p>
                        <button onclick="closeModal()">Close</button>
                    `;
                    modal.style.display = 'block';
                });
        } else if (e.target === modal || e.target.tagName === 'BUTTON' && e.target.textContent === 'Close') {
            closeModal();
        }
    });
});
*/


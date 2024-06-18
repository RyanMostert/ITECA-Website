const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcrypt');
const session = require('express-session');
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'fashionfusion'
});

db.connect((err) => {
    if (err) {
        console.error('MySQL Connection Error:', err);
        process.exit(1);
    }
    console.log('MySQL Connected...');
});

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'fashionfusion146@gmail.com',
        pass: 'FashionFusion@1'
    }
});

let receptionEmail = 'fashionfusion146@gmail.com';

app.post('/register', [
    body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters long.'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.'),
    body('email').isEmail().withMessage('Invalid email address.')
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, password, confirmPassword, email } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).json({ error: 'Passwords do not match.' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const sql = 'INSERT INTO users (username, password, email) VALUES (?, ?, ?)';
    db.query(sql, [username, hashedPassword, email], (err, result) => {
        if (err) {
            console.error('Error registering user:', err);
            return res.status(500).json({ error: 'Error registering user.' });
        }
        res.json({ message: 'User registered successfully!' });
    });
});

app.post('/login', [
    body('username').not().isEmpty().withMessage('Username is required.'),
    body('password').not().isEmpty().withMessage('Password is required.')
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    const sql = 'SELECT * FROM users WHERE username = ?';
    db.query(sql, [username], (err, results) => {
        if (err) {
            console.error('Error logging in:', err);
            return res.status(500).json({ error: 'Error logging in.' });
        }
        if (results.length === 0) {
            return res.status(400).json({ error: 'Invalid username or password.' });
        }

        const user = results[0];
        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(400).json({ error: 'Invalid username or password.' });
        }

        req.session.user = { id: user.id, username: user.username };
        res.json({ message: 'Login successful!' });
    });
});

// Middleware to authenticate user and get user ID from session
function authenticate(req, res, next) {
    if (!req.session.user) {
        return res.status(401).json({ error: 'Unauthorized access' });
    }
    req.userId = req.session.user.id;
    next();
}

// Cart routes
app.get('/api/cart', authenticate, (req, res) => {
    const userId = req.userId;
    const sql = 'SELECT cart.id, cart.quantity, products.* FROM cart JOIN products ON cart.product_id = products.id WHERE cart.user_id = ?';
    db.query(sql, [userId], (err, results) => {
        if (err) {
            console.error('Failed to fetch cart:', err);
            return res.status(500).json({ error: 'Failed to fetch cart.' });
        }
        res.json(results);
    });
});

app.post('/api/cart', authenticate, (req, res) => {
    const userId = req.userId;
    const { productId, quantity } = req.body;

    const checkSql = 'SELECT * FROM cart WHERE user_id = ? AND product_id = ?';
    db.query(checkSql, [userId, productId], (err, results) => {
        if (err) {
            console.error('Failed to check cart:', err);
            return res.status(500).json({ error: 'Failed to check cart.' });
        }
        if (results.length > 0) {
            const updateSql = 'UPDATE cart SET quantity = quantity + ? WHERE user_id = ? AND product_id = ?';
            db.query(updateSql, [quantity, userId, productId], (err, result) => {
                if (err) {
                    console.error('Failed to update cart:', err);
                    return res.status(500).json({ error: 'Failed to update cart.' });
                }
                res.json({ message: 'Cart updated successfully!' });
            });
        } else {
            const insertSql = 'INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)';
            db.query(insertSql, [userId, productId, quantity], (err, result) => {
                if (err) {
                    console.error('Failed to add to cart:', err);
                    return res.status(500).json({ error: 'Failed to add to cart.' });
                }
                res.json({ message: 'Product added to cart successfully!' });
            });
        }
    });
});

app.put('/api/cart', authenticate, (req, res) => {
    const userId = req.userId;
    const { productId, quantity } = req.body;
    const sql = 'UPDATE cart SET quantity = ? WHERE user_id = ? AND product_id = ?';
    db.query(sql, [quantity, userId, productId], (err, result) => {
        if (err) {
            console.error('Failed to update cart:', err);
            return res.status(500).json({ error: 'Failed to update cart.' });
        }
        res.json({ message: 'Cart updated successfully!' });
    });
});

app.delete('/api/cart', authenticate, (req, res) => {
    const userId = req.userId;
    const { productId } = req.body;
    const sql = 'DELETE FROM cart WHERE user_id = ? AND product_id = ?';
    db.query(sql, [userId, productId], (err, result) => {
        if (err) {
            console.error('Failed to remove from cart:', err);
            return res.status(500).json({ error: 'Failed to remove from cart.' });
        }
        res.json({ message: 'Product removed from cart successfully!' });
    });
});

// Checkout and clear current user's cart
app.post('/api/checkout', authenticate, (req, res) => {
    const userId = req.userId;
    const sql = 'DELETE FROM cart WHERE user_id = ?';
    db.query(sql, [userId], (err, result) => {
        if (err) {
            console.error('Failed to clear cart:', err);
            return res.status(500).json({ error: 'Failed to clear cart.' });
        }
        res.json({ message: 'Checkout successful and cart cleared!' });
    });
});

// Other routes and middleware
app.get('/profile', (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ error: 'Unauthorized access' });
    }

    const userId = req.session.user.id;
    const sql = 'SELECT username, email FROM users WHERE id = ?';
    db.query(sql, [userId], (err, results) => {
        if (err) {
            console.error('Failed to fetch profile data:', err);
            return res.status(500).json({ error: 'Failed to fetch profile data.' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'User not found.' });
        }
        res.json(results[0]);
    });
});

app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;

    const mailOptions = {
        from: email,
        to: receptionEmail,
        subject: `Contact Form Submission from ${name}`,
        text: message
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ error: 'Failed to send email.' });
        }
        console.log('Email sent:', info.response);
        res.json({ message: 'Email sent successfully!' });
    });
});

app.get('/products', (req, res) => {
    const sql = 'SELECT * FROM products';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Failed to fetch products:', err);
            return res.status(500).json({ error: 'Failed to fetch products from the database.' });
        }
        res.json(results);
    });
});

app.post('/products', (req, res) => {
    const product = req.body;
    const sql = 'INSERT INTO products SET ?';
    db.query(sql, product, (err, result) => {
        if (err) {
            console.error('Failed to add product:', err);
            return res.status(500).json({ error: 'Failed to add product.' });
        }
        res.json({ message: 'Product added successfully!', id: result.insertId });
    });
});

app.delete('/products/:id', (req, res) => {
    const productId = req.params.id;
    const sql = 'DELETE FROM products WHERE id = ?';
    db.query(sql, [productId], (err, result) => {
        if (err) {
            console.error('Failed to delete product:', err);
            return res.status(500).json({ error: 'Failed to delete product.' });
        }
        res.json({ message: 'Product deleted successfully!' });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

const express = require('express');
const mysql = require('mysql');
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
    cookie: { secure: false } // Set to true if using HTTPS
}));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'fashionfusion'
});

// Configure the email transporter
let transporter = nodemailer.createTransport({
    service: 'gmail', // Use the appropriate email service
    auth: {
        user: 'your_email@gmail.com', // Your email address
        pass: 'your_email_password'   // Your email password
    }
});

// Email reception address (changeable)
let receptionEmail = 'ramostert1@gmail.com';

db.connect((err) => {
    if (err) {
        console.error('MySQL Connection Error:', err);
        process.exit(1);
    }
    console.log('MySQL Connected...');
});

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

// Profile endpoint
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

// Contact endpoint
app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;

    const mailOptions = {
        from: email,
        to: receptionEmail, // Use the receptionEmail variable
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
            return res.status(500).json({ error: 'Failed to add product to the database.' });
        }
        res.json({ id: result.insertId, ...product });
    });
});

app.get('/products/:id', (req, res) => {
    const productId = req.params.id;
    const sql = 'SELECT * FROM products WHERE id = ?';
    db.query(sql, [productId], (err, results) => {
        if (err) {
            console.error('Failed to fetch product:', err);
            return res.status(500).json({ error: 'Failed to fetch product from the database.' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Product not found.' });
        }
        res.json(results[0]);
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/register.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/profile.html', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login.html');
    }
    res.sendFile(path.join(__dirname, 'public', 'profile.html'));
});

app.get('/cart.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'cart.html'));
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

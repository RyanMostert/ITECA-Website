DROP DATABASE IF EXISTS fashionfusion;

CREATE DATABASE IF NOT EXISTS fashionfusion;

USE fashionfusion;

-- Create users table
CREATE TABLE users (
                       id INT AUTO_INCREMENT PRIMARY KEY,
                       username VARCHAR(50) NOT NULL,
                       password VARCHAR(255) NOT NULL,
                       email VARCHAR(100)
);

-- Insert initial user
INSERT INTO users (username, password, email)
VALUES ('root', 'root', 'root@example.com');

-- Create products table
CREATE TABLE products (
                          id INT AUTO_INCREMENT PRIMARY KEY,
                          name VARCHAR(255) NOT NULL,
                          description TEXT,
                          price DECIMAL(10, 2) NOT NULL,
                          image VARCHAR(255)
);

-- Insert initial products
INSERT INTO products (name, description, price, image) VALUES
('Red Dress', 'A beautiful red dress perfect for any occasion.', 899.99, '/Images/RedDress.jpg'),
     ('Blue Jeans', 'Comfortable blue jeans with a stylish fit.', 649.99, '/Images/Blue%20Jeans.jpg'),
        ('White T-Shirt', 'Classic white T-shirt made from high-quality cotton.', 199.99, '/Images/White%20T-shirts.jpg'),
            ('Black Jacket', 'A sleek black jacket for a modern look.', 599.99, '/Images/Black%20jacket.jpg'),
                ('Denim Shorts', 'Casual denim shorts for everyday wear.', 399.99, '/Images/Denim%20Shorts.jpg'),
                    ('Striped Shirt', 'A trendy striped shirt that pairs well with jeans.', 349.99, '/Images/Striped%20Shirt.jpg');

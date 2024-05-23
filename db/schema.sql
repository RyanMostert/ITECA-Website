CREATE DATABASE fashionfusion;

USE fashionfusion;

CREATE TABLE users (
                       id INT AUTO_INCREMENT PRIMARY KEY,
                       username VARCHAR(50) NOT NULL,
                       password VARCHAR(255) NOT NULL,
                       email VARCHAR(100)
);

INSERT INTO users (username, password, email)
VALUES ('root', 'root', 'root@example.com');
<?php
// Database credentials
$servername = "localhost";
$username = "root";
$password = ""; // Assuming password is empty
$dbname = "fashionfusion";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Registration functionality
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST["username"];
    $password = $_POST["password"];
    $confirm_password = $_POST["confirm_password"];
    $email = $_POST["email"];

    // Perform simple validation
    if (empty($username) || empty($password) || empty($confirm_password) || empty($email)) {
        echo "Please fill out all fields.";
        exit;
    }

    if ($password !== $confirm_password) {
        echo "Passwords do not match.";
        exit;
    }

    // Hash the password for security
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    // Insert user data into the database
    $stmt = $conn->prepare("INSERT INTO users (username, password, email) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $username, $hashed_password, $email);

    if ($stmt->execute()) {
        echo "User registered successfully!";
    } else {
        echo "Error: " . $conn->error;
    }

    // Close statement
    $stmt->close();
}

// Close connection
$conn->close();
?>

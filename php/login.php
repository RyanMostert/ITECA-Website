<?php
// Database credentials
$servername = "localhost";
$username = "root"; // replace with your actual database username
$password = " "; // replace with your actual database password
$dbname = "fashionfusion";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Retrieve form data
$user = $_POST['username'];
$pass = $_POST['password'];

// Prepare and bind
$stmt = $conn->prepare("SELECT password FROM users WHERE username = ?");
$stmt->bind_param("s", $user);

// Execute the statement
$stmt->execute();
$stmt->store_result();
$stmt->bind_result($hashed_password);
$stmt->fetch();

// Verify password
if ($stmt->num_rows > 0 && password_verify($pass, $hashed_password)) {
    // Password is correct, redirect to main.html
    header("Location: /view/main.html");
    exit();
} else {
    // Invalid username or password
    echo "Invalid username or password.";
}

// Close the connection
$stmt->close();
$conn->close();
?>

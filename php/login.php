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

// Retrieve form data
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $user = $_POST['username'];
    $pass = $_POST['password'];

    // Prepare and execute SQL statement to retrieve user's information
    $stmt = $conn->prepare("SELECT id, username, password FROM users WHERE username = ?");
    $stmt->bind_param("s", $user);
    $stmt->execute();
    $result = $stmt->get_result();

    // Check if user exists
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $hashed_password = $row['password'];

        // Verify password
        if (password_verify($pass, $hashed_password)) {
            // Password is correct
            echo "Login successful!";
            // You can redirect the user to another page here
        } else {
            // Invalid password
            echo "Invalid password.";
        }
    } else {
        // User does not exist
        echo "User does not exist.";
    }

    // Close statement and connection
    $stmt->close();
    $conn->close();
}
?>

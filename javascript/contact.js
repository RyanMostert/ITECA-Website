function sendEmail() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var message = document.getElementById("message").value;

    // For demonstration purposes, log the email content to the console
    console.log("Name: " + name);
    console.log("Email: " + email);
    console.log("Message: " + message);

    // Simulate email sending
    alert("Your message has been sent! We'll get back to you shortly.");
}

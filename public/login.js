(function() {
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault();

        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        var submitButton = event.target.querySelector('input[type="submit"]');

        // Disable the submit button to prevent multiple submissions
        submitButton.disabled = true;

        // Show loading indicator (if you have one)
        // document.getElementById('loadingIndicator').style.display = 'block';

        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
            .then(response => {
                // Re-enable the submit button
                submitButton.disabled = false;

                if (!response.ok) {
                    throw new Error('Network response was not ok: ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                if (data.error) {
                    alert(data.error);
                } else {
                    alert(data.message);
                    window.location.href = '/profile.html'; // Redirect to profile page after successful login
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred. Please try again later.');
            })
            .finally(() => {
                // Hide loading indicator
                // document.getElementById('loadingIndicator').style.display = 'none';
            });
    });
})();

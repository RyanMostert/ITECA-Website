document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('register-form');
    const messageDiv = document.getElementById('message');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = {
            username: form.username.value,
            password: form.password.value,
            confirmPassword: form.confirmPassword.value,
            email: form.email.value
        };

        fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    messageDiv.textContent = data.error;
                    messageDiv.style.color = 'red';
                } else {
                    messageDiv.textContent = data.message;
                    messageDiv.style.color = 'green';
                    setTimeout(() => {
                        window.location.href = '/login.html';
                    }, 2000);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                messageDiv.textContent = 'An error occurred. Please try again later.';
                messageDiv.style.color = 'red';
            });
    });
});

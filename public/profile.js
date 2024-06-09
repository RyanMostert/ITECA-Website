document.addEventListener('DOMContentLoaded', () => {
    fetch('/profile')
        .then(response => {
            if (response.status === 401) {
                window.location.href = '/login.html';
            } else {
                return response.json();
            }
        })
        .then(user => {
            if (user) {
                const profileInfo = document.getElementById('profile-info');
                profileInfo.innerHTML = `
                    <p>Username: ${user.username}</p>
                    <p>Email: ${user.email}</p>
                `;
            }
        })
        .catch(error => {
            console.error('Error fetching profile data:', error);
        });
});

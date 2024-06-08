document.addEventListener('DOMContentLoaded', () => {
    const modal = document.createElement('div');
    modal.classList.add('description-modal');
    document.body.appendChild(modal);

    const closeModal = () => {
        modal.style.display = 'none';
    };

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('description-button')) {
            const itemId = e.target.closest('.clothing-item').getAttribute('data-id');
            fetch(`/products/${itemId}`)
                .then(response => response.json())
                .then(product => {
                    modal.innerHTML = `
                        <h2>${product.name}</h2>
                        <p>${product.description}</p>
                        <button onclick="closeModal()">Close</button>
                    `;
                    modal.style.display = 'block';
                })
                .catch(error => {
                    console.error('Error fetching product description:', error);
                });
        } else if (e.target === modal || (e.target.tagName === 'BUTTON' && e.target.textContent === 'Close')) {
            closeModal();
        }
    });

    // Close modal when clicking outside of modal content
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
});

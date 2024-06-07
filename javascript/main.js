document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.getElementById('search-bar');
    const clothingItems = document.querySelectorAll('.clothing-item');

    searchBar.addEventListener('keyup', (e) => {
        const searchString = e.target.value.toLowerCase();

        clothingItems.forEach(item => {
            const name = item.getAttribute('data-name').toLowerCase();
            if (name.includes(searchString)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });

    // Description modal setup
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
                });
        } else if (e.target === modal || e.target.tagName === 'BUTTON' && e.target.textContent === 'Close') {
            closeModal();
        }
    });
});

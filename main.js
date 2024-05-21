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
});

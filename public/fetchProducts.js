let productList = [];

function displayProducts(products) {
    const clothingItems = document.getElementById('clothing-items');

    // Clear existing content
    clothingItems.innerHTML = '';

    // Populate HTML with product information
    products.forEach(product => {
        const item = document.createElement('div');
        item.classList.add('clothing-item');
        item.setAttribute('data-id', product.id);
        item.setAttribute('data-name', product.name);

        item.innerHTML = `
            <img src="${product.image}" alt="${product.name} Image">
            <h3>${product.name}</h3>
            <p>R${product.price}</p>
            <div class="buttons">
                <button class="description-button">Description</button>
                <button class="add-to-cart-button">Add to Cart</button>
            </div>
        `;

        clothingItems.appendChild(item);
    });
}

function fetchProducts() {
    fetch('/products') // Fetch data from the server
        .then(response => response.json())
        .then(products => {
            productList = products;
            displayProducts(productList); // Display all products initially
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });
}

// Function to filter products based on search query
function filterProducts(query) {
    const filteredProducts = productList.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase())
    );
    displayProducts(filteredProducts);
}

// Event listener for the search bar
document.getElementById('search-bar').addEventListener('input', (e) => {
    const query = e.target.value;
    filterProducts(query);
});

// Call the function to display products when the DOM content is loaded
document.addEventListener('DOMContentLoaded', fetchProducts);

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.createElement('div');
    modal.classList.add('description-modal');
    document.body.appendChild(modal);

    const closeModal = () => {
        modal.style.display = 'none';
    };

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('description-button')) {
            const itemId = parseInt(e.target.closest('.clothing-item').getAttribute('data-id'));
            const product = productList.find(product => product.id === itemId);

            if (product) {
                modal.innerHTML = `
                    <h2>${product.name}</h2>
                    <p>${product.description}</p>
                    <button class="close-modal-button">Close</button>
                `;
                modal.style.display = 'block';
            }
        } else if (e.target.classList.contains('close-modal-button') || e.target === modal) {
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
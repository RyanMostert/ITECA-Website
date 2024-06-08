function displayProducts() {
    fetch('/products') // Fetch data from the server
        .then(response => response.json())
        .then(products => {
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
                    <p>R${product.price.toFixed(2)}</p>
                    <div class="buttons">
                        <button class="description-button">Description</button>
                        <button class="add-to-cart-button">Add to Cart</button>
                    </div>
                `;

                clothingItems.appendChild(item);
            });
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });
}

// Call the function to display products when the DOM content is loaded
document.addEventListener('DOMContentLoaded', displayProducts);

// Add product to cart and save it in localStorage
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || {};
    if (cart[product.id]) {
        cart[product.id].quantity += 1;
    } else {
        cart[product.id] = {
            ...product,
            quantity: 1
        };
    }
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to display cart
function displayCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceContainer = document.getElementById('total-price');
    const cart = JSON.parse(localStorage.getItem('cart')) || {};
    cartItemsContainer.innerHTML = ''; // Clear existing content

    let totalPrice = 0;

    Object.values(cart).forEach(product => {
        const item = document.createElement('div');
        item.classList.add('cart-item');

        item.innerHTML = `
            <img src="${product.image}" alt="${product.name} Image">
            <h3>${product.name}</h3>
            <p>Quantity: ${product.quantity}</p>
            <p>R${product.price}</p>
            <p>Total: R${(product.price * product.quantity).toFixed(2)}</p>
        `;
        cartItemsContainer.appendChild(item);

        totalPrice += product.price * product.quantity;
    });

    totalPriceContainer.innerHTML = `<h3>Total Price: R${totalPrice.toFixed(2)}</h3>`;
}

// Event listener for 'Add to Cart' button clicks
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart-button')) {
        const itemId = parseInt(e.target.closest('.clothing-item').getAttribute('data-id'));
        const product = productList.find(product => product.id === itemId);
        addToCart(product);
    }
});

// Display cart if on cart page
if (window.location.pathname === '/cart.html') {
    document.addEventListener('DOMContentLoaded', displayCart);
}

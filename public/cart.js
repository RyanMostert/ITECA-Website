// Function to display cart
function displayCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceContainer = document.getElementById('total-price');

    fetch('/api/cart', {
        method: 'GET',
        credentials: 'include' // Include cookies to maintain session
    })
        .then(response => response.json())
        .then(cart => {
            cartItemsContainer.innerHTML = ''; // Clear existing content

            let totalPrice = 0;

            cart.forEach(product => {
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
        })
        .catch(error => {
            console.error('Failed to fetch cart:', error);
        });
}

// Event listener for 'Add to Cart' button clicks
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart-button')) {
        const itemId = parseInt(e.target.closest('.clothing-item').getAttribute('data-id'));
        const product = productList.find(product => product.id === itemId);

        fetch('/api/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include', // Include cookies to maintain session
            body: JSON.stringify({ productId: product.id, quantity: 1 })
        })
            .then(response => response.json())
            .then(data => {
                displayCart(); // Refresh the cart display
            })
            .catch(error => {
                console.error('Failed to add to cart:', error);
            });
    }
});

// Event listener for 'Checkout' button click
document.getElementById('checkout-button').addEventListener('click', () => {
    fetch('/api/checkout', {
        method: 'POST',
        credentials: 'include' // Include cookies to maintain session
    })
        .then(response => response.json())
        .then(data => {
            // Clear the cart display
            document.getElementById('cart-items').innerHTML = '';
            document.getElementById('total-price').innerHTML = '<h3>Total Price: R0.00</h3>';
            alert('Checkout successful and cart cleared!');
        })
        .catch(error => {
            console.error('Failed to checkout:', error);
        });
});

// Display cart if on cart page
if (window.location.pathname === '/cart.html') {
    document.addEventListener('DOMContentLoaded', displayCart);
}

document.addEventListener('DOMContentLoaded', function () {
    const cart = [];
    const products = [
        { id: 1, name: 'iPhone', price: 999 },
        { id: 2, name: 'Mouse', price: 50 },
        { id: 3, name: 'PS5', price: 499 },
        { id: 4, name: 'Xbox', price: 399 }
    ];

    const totalElement = document.querySelector('#Carrito h2');
    const cartItemsElement = document.getElementById('cart-items');
    const buttons = document.querySelectorAll('main .product button');
    const buyButton = document.querySelector('aside button'); // "Comprar" button

    // Event listener for product buttons
    buttons.forEach((button, index) => {
        button.addEventListener('click', function () {
            const quantityInput = document.getElementById(`quantity-${index + 1}`);
            const quantity = parseInt(quantityInput.value);
            if (quantity > 0) {
                addToCart(products[index], quantity);
                alert(`Added ${quantity} x ${products[index].name} to cart!`);
            } else {
                alert('Please select a valid quantity!');
            }
        });
    });

    // Add event listener for the "Comprar" button
    buyButton.addEventListener('click', function () {
        if (cart.length === 0) {
            alert('Your cart is empty. Add some products before buying!');
        } else {
            const confirmPurchase = confirm('Are you sure you want to purchase these items?');
            if (confirmPurchase) {
                alert('Thank you for your purchase!');
                clearCart(); // Clear the cart after purchase
            }
        }
    });

    function addToCart(product, quantity) {
        const cartProduct = cart.find(item => item.id === product.id);
        if (cartProduct) {
            cartProduct.quantity += quantity;
        } else {
            cart.push({ ...product, quantity });
        }
        updateCart();
    }

    function updateCart() {
        cartItemsElement.innerHTML = '';  // Clear the list
        if (cart.length === 0) {
            const emptyMessage = document.createElement('li');
            emptyMessage.textContent = 'Your cart is empty.';
            cartItemsElement.appendChild(emptyMessage);
        } else {
            cart.forEach(item => {
                const li = document.createElement('li');
                li.textContent = `${item.name} - ${item.quantity} x $${item.price} = $${(item.price * item.quantity).toFixed(2)}`;
                cartItemsElement.appendChild(li);
            });
        }
        updateTotal();
    }

    function updateTotal() {
        let total = 0;
        cart.forEach(item => {
            total += item.price * item.quantity;
        });
        totalElement.textContent = `Total: $${total.toFixed(2)}`;
    }

    // Function to clear the cart
    function clearCart() {
        cart.length = 0; // Empty the cart array
        updateCart();     // Update the cart display
        updateTotal();    // Reset the total to $0
    }
});

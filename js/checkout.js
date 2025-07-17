// Checkout Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    displayCheckoutItems();

    // Payment method selection
    const paymentMethods = document.querySelectorAll('.payment-method');
    paymentMethods.forEach((method) => {
        const radio = method.querySelector('input[type="radio"]');
        radio.addEventListener('change', function() {
            paymentMethods.forEach(m => m.classList.remove('active'));
    
            if (this.checked) {
                method.classList.add('active');
            }
        });
    });

    // Place order button
    const placeOrderBtn = document.querySelector('.place-order');
    if (placeOrderBtn) {
        placeOrderBtn.addEventListener('click', function (e) {
            e.preventDefault();

            // validate form
            const form = document.getElementById('shipping-form');
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;

            requiredFields.forEach((field) => {
                if (!field.value.trim()) {
                    field.style.borderColor = 'var(--danger-color)';
                    isValid = false;
                } else {
                    field.style.borderColor = '#ddd';
                }
            });

            if (!isValid) {
                alert('Please fill in all required fields.');
                return;
            }

            // In a real app,we would process the payment here
            // For now, we'll just show a success message
            processOrder();
        });
    }
});

function displayCheckoutItems() {
    const itemsContainer = document.getElementById('checkout-items');
    const subtotalElement = document.getElementById('checkout-subtotal');
    const totalElement = document.getElementById('checkout-total');
    const taxElement = document.getElementById('tax');

    let cart = JSON.parse(localStorage.getItem('cart'));
    let subtotal = 0;
    if (cart.length === 0) {
        itemsContainer.innerHTML = '<p>Your Cart is Empty.</p>';
        subtotalElement.textContent = '$0.00';
        totalElement.textContent = '$5.99';
        taxElement.textContent = '$0.00';
        return;
    }

    itemsContainer.innerHTML = '';

    cart.forEach((item) => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        const itemElement = document.createElement('div');
            itemElement.className = 'order-item';
            itemElement.innerHTML = `
                <div class="order-item-name">
                    <div class="order-item-image">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <span class="${item.name}"></span>
                </div>
                <div class="order-item-price">
                    <span>${item.quantity} x ${item.price.toFixed(2)}</span>
                    <span>$${itemTotal.toFixed(2)}</span>
                </div>
            `;

            itemsContainer.appendChild(itemElement);
    });

    // Calculate totals
    const shipping = 5.99;
    const taxRate = 0.08;
    const tax = subtotal * taxRate;
    const total = subtotal + shipping + tax;

    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    taxElement.textContent = `$${tax.toFixed(2)}`;
    totalElement.textContent = `$${total.toFixed(2)}`;
}

function processOrder() {
    // In a real app, this would communicate with a payment processor
    // Create order object
    const order = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        items: JSON.parse(localStorage.getItem('cart')) || [],
        shipping: {
            name: document.getElementById('first-name').value + ' ' + document.getElementById('last-name').value,
            address: document.getElementById('address').value,
            city: document.getElementById('city').value,
            state: document.getElementById('zip').value,
            country: document.getElementById('country').value

        },
        payment: document.querySelector('input[name="payment"]:checked').id,
        total: parseFloat(document.getElementById('checkout-total').textContent.replace('$', ''))
    };

    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));

    // Clear cart
    localStorage.removeItem('cart');
    updateCartCount();

    // Redirect to confirmation page (Which we would to create in a real app)
    alert('Order Placed Successfully! Thank you for your purchase.');
    window.location.href = 'index.html';
}
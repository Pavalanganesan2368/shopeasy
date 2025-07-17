// Product Details Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Thumbnail image click handler
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.getElementById('main-image');

    thumbnails.forEach((thumbnail) => {
        thumbnail.addEventListener('click', function() {
            // Remove active class from all thumbnail
            thumbnails.forEach(t => t.classList.remove('active'));
            // Add active class to clicked
            this.classList.add('active')
            // Update main image
            mainImage.src = this.src;
            mainImage.alt = this.alt;
        });
    });
});

// Quantity controls 
const quantityInput = document.getElementById('quantity');
const minusBtn = document.querySelector('.quantity-btn.minus');
const plusBtn = document.querySelector('.quantity-btn.plus');

minusBtn.addEventListener('click', function() {
    let value = parseInt(quantityInput.value);
    if (value > 1) {
        quantityInput.value = value - 1;
    }
});

plusBtn.addEventListener('click', function() {
    let value = parseInt(quantityInput.value);
    quantityInput.value = value + 1;
});

// Add to cart button
const addToCartBtn = document.getElementById('add-to-cart');
if (addToCartBtn) {
    addToCartBtn.addEventListener('click', function() {
        const productId = 1;  //This would normally come from the URL or data attribute
        const quantity = parseInt(quantityInput.value);

        let cart = JSON.parse(localStorage.getItem('cart'));

        // Check if product already in cart
        const existingItem = cart.find(item => item.id === productId);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            // In a real app, we would fetch the product details
            const product = {
                id : productId,
                name: document.getElementById('product-title').textContent,
                price: parseFloat(document.getElementById('product-price').textContent.replace('$', '')),
                image: mainImage.src,
                quantity: quantity
            };

            cart.push(product);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();

        alert(`${quantity} item(s) added to cart!`);
    });
}

// Tab functionally
const tabButton = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

tabButton.forEach(button => {
    button.addEventListener('click', function() {
        const tabId = this.getAttribute('data-tab');

        // Update active tab button
        tabButton.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');

        // Show corresponding panel
        tabPanels.forEach(panel => {
            panel.classList.remove('active');
            if (panel.id === tabId) {
                panel.classList.add('active');
            }
        });
    });

    loadRelatedProducts();
});

function loadRelatedProducts() {
    const relatedContainer = document.getElementById('related-products');

    if (relatedContainer) {
        const relatedProducts = products.slice(0, 4);
        relatedContainer.forEach(product => {
            const productElement = document.createElement('div');
            productElement.className = 'product-card';
            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-price">$${product.price.toFixed(2)}</p>
                    <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                </div>
            `;
            relatedContainer.appendChild(productElement);
        });

        // Add event listener to "Add to Cart" buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', addCart);
        })
    }
}
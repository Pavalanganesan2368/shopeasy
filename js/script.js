const products = [
    {
        id : 1,
        name : "Wireless Headphones",
        price : 99.99,
        image : "images/headphones.jpg",
        description : "High-quality wireless headphone with noise cancellation.",
        category : "electronics"
    },

    {
        id : 2,
        name : "Smart Watch",
        price : 199.99,
        image : "images/smartwatch.jpg",
        description : "Feature-packed smartwatch with health monitoring.",
        category : "electronics"
    },

    {
        id : 3,
        name : "Running Shoes",
        price : 79.99,
        image : "images/shoes.jpg",
        description : "Comfortable running shoes for all terrians.",
        category : "fashion"
    },

    {
        id : 4,
        name : "Backpack",
        price : 49.99,
        image : "images/backpack.jpg",
        description : "Durable backpach with laptop compartment.",
        category : "fashion"
    },

    {
        id : 5,
        name : "Coffee Maker",
        price : 129.99,
        image : "images/coffee-maker.jpg",
        description : "Automatic coffee maker with timer function.",
        category : "home"
    },

    {
        id : 6,
        name : "Yoga Mat",
        price : 29.99,
        image : "images/yoga-mat.jpg",
        description : "Non-slip yoga mat with carrying strap.",
        category : "sports"
    }
];

// Display featured product on homepage
const displayFeaturedProducts = () => {
    const featuredContainer = document.getElementById('featured-products');
     if (featuredContainer) {
        const featuredProducts = products.slice(0, 4);
        
        featuredProducts.forEach((product) => {
            const productElement = document.createElement('div');
            productElement.className = 'product-card';
            productElement.innerHTML = `
                <img src = "${product.image}" alt = "${product.name}" class = "product-image">
                <div class = "product-info">
                    <h3 class = "product-title">${product.name}</h3>
                    <p class = "product-price">$${product.price.toFixed(2)}</p>
                    <button class = "add-to-cart" data-id = "${product.id}">ADD TO CART</button>
                </div>
            `;

            featuredContainer.appendChild(productElement);
        });

        document.querySelectorAll('.add-to-cart').forEach((button) => {
            button.addEventListener('click', addToCart)
        })
     }
}

//Add to cart function

function addToCart(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    const product = products.find(p => p.id === productId);

    if (product) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Check if product already in cart
        const existingItem = cart.find((item) => {
            item.id === productId
        })

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                ...product,
                quantity: 1
            });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        alert(`${product.name} added to cart successfully!`);
    }
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

    document.querySelectorAll('.cart-count').forEach((element) => {
        element.textContent = totalItems;
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    displayFeaturedProducts();
    updateCartCount();
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        })
    }
})
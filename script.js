const products = [
    {
        id: 1,
        name: "Eco-Friendly Laptop",
        price: 999.99,
        description: "A high-performance laptop made from recycled materials. Fast, reliable, and green.",
        image: "https://picsum.photos/id/0/400/300"
    },
    {
        id: 2,
        name: "Wireless Headphones",
        price: 149.50,
        description: "Noise-cancelling wireless headphones with 40 hours of battery life.",
        image: "https://picsum.photos/id/10/400/300"
    },
    {
        id: 3,
        name: "Smart Watch",
        price: 199.00,
        description: "Track your health and stay connected with this sleek smartwatch.",
        image: "https://picsum.photos/id/20/400/300"
    },
    {
        id: 4,
        name: "Mechanical Keyboard",
        price: 120.00,
        description: "RGB backlit mechanical keyboard with tactile switches for the best typing experience.",
        image: "https://picsum.photos/id/60/400/300"
    }
];

let cart = [];

document.addEventListener('DOMContentLoaded', () => {
    const productContainer = document.getElementById('product-container');
    if (productContainer) {
        displayProducts();
    }

    window.addEventListener('scroll', handleScrollReveal);

    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
});

function handleScrollReveal() {
    const revealSection = document.getElementById('reveal-section');
    if (!revealSection) return;

    const windowHeight = window.innerHeight;
    const elementTop = revealSection.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
        revealSection.classList.add('active');
    }
}

function handleFormSubmit(event) {
    event.preventDefault();
    const select = document.getElementById('select').value;

    if (!select) {
        alert("Error: Please choose a category from the form.");
        return;
    }

    alert("Success! Your submission was successful. Thank you for reaching out.");
    event.target.reset();
}

function displayProducts() {
    const productContainer = document.getElementById('product-container');
    productContainer.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'col-md-3';
        productCard.innerHTML = `
            <div class="card h-100 product-card shadow-sm" data-id="${product.id}">
                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                <div class="card-body text-center">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text text-primary fw-bold">$${product.price.toFixed(2)}</p>
                    <button class="btn btn-outline-primary view-details-btn">View Details</button>
                </div>
            </div>
        `;

        productCard.querySelector('.view-details-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            showProductOverlay(product);
        });

        productCard.querySelector('.card').addEventListener('click', () => {
            showProductOverlay(product);
        });

        productContainer.appendChild(productCard);
    });
}

function showProductOverlay(product) {
    const modalTitle = document.getElementById('modalTitle');
    const modalImage = document.getElementById('modalImage');
    const modalDescription = document.getElementById('modalDescription');
    const modalPrice = document.getElementById('modalPrice');
    const modalBuyBtn = document.getElementById('modalBuyBtn');

    modalTitle.innerText = product.name;
    modalImage.src = product.image;
    modalDescription.innerText = product.description;
    modalPrice.innerText = `$${product.price.toFixed(2)}`;

    modalBuyBtn.onclick = () => {
        addToCart(product);
        const modalElement = document.getElementById('productModal');
        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        modalInstance.hide();
    };

    const productModal = new bootstrap.Modal(document.getElementById('productModal'));
    productModal.show();
}

function calculateTotal() {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
}

function addToCart(product) {
    cart.push(product);
    updateCartDisplay();
    alert(`${product.name} added to cart!`);
}

function updateCartDisplay() {
    const cartInfo = document.getElementById('cart-info');
    if (cartInfo) {
        const total = calculateTotal();
        cartInfo.innerText = `Items: ${cart.length} | Total: $${total}`;
    }
}

const checkoutBtn = document.getElementById('checkout-btn');
if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert("Your cart is empty!");
        } else {
            alert(`Proceeding to checkout with total: $${calculateTotal()}`);
            cart = [];
            updateCartDisplay();
        }
    });
}

const joinBtn = document.getElementById('join-btn');
if (joinBtn) {
    joinBtn.addEventListener('click', () => {
        alert("Welcome to the club!");
    });
}

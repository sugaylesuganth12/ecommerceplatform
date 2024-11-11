// Sample product list with images and additional products
const products = [
    { product_id: 1, name: "Organic Banana", category: "Groceries", price: 15.99, image: "./green-banana_74190-4937.avif" },
    { product_id: 2, name: "Almond Milk", category: "Groceries", price: 3.99, image: "./plant-based-milk-as-alternatives-dairy_23-2149307786.avif" },
    { product_id: 3, name: "Brown Rice", category: "Groceries", price: 5.49, image: "./clay-bowl-full-raw-rice-placed-stone-background_114579-59016.avif" },
    { product_id: 4, name: "Olive Oil", category: "Groceries", price: 8.99, image: "./tasty-looking-olives-extra-virgin-olive-oil-olive-leafs-dark-wooden-background_181624-43771.avif" },
    { product_id: 5, name: "Honey", category: "Groceries", price: 6.49, image: "./honey" },
    { product_id: 6, name: "Green Tea", category: "Groceries", price: 4.99, image: "./green-tea-banner-template_23-2148397318.avif" },
    { product_id: 7, name: "Cereal", category: "Groceries", price: 2.99, image: "./breakfast-cereals-realistic-composition_1284-25934.avif" },
    { product_id: 8, name: "Spaghetti", category: "Groceries", price: 1.99, image: "./spageti" },
    { product_id: 9, name: "Running Shoes", category: "Shoes", price: 49.99, image: "./men-shoes_1203-8440.avif" },
    { product_id: 10, name: "Casual Sneakers", category: "Shoes", price: 39.99, image: "./causual" },
    { product_id: 11, name: "Sports Shoes", category: "Shoes", price: 50.00, image: "./shoes_1203-8153.avif" },
    { product_id: 12, name: "Bat", category: "sports", price: 600.00, image: "./cricket_1308-11652.avif" },
    { product_id: 13, name: "Makeup Kit", category: "Makeup", price: 30.00, image: "./palette-cosmetic-eye-shadow-different-shades-lipstick-brush-white-backdrop_23-2147970859.avif" },
    { product_id: 14, name: "Ball", category: "sports", price: 7.99, image: "./ball" },
    { product_id: 15, name: "Biscuits", category: "Groceries", price: 15.99, image: "./biscuits" },
    { product_id: 16, name: "cream biscuits", category: "Groceries", price: 15.99, image: "./cream" },
    { product_id: 17, name: "Nuts", category: "Groceries", price: 18.99, image: "./nuts" },
    { product_id: 18, name: "Tshirt", category: "Groceries", price: 6.99, image: "./tshirt" },
    { product_id: 19, name: "Shirts", category: "Groceries", price: 9.99, image: "./shirt" },
    { product_id: 20, name: "Pants", category: "Groceries", price: 11.99, image: "./pant" },
    { product_id: 21, name: "Trosers", category: "Groceries", price: 23.99, image: "./trousers" },
    { product_id: 22, name: "Redchilli powder", category: "Groceries", price: 6.99, image: "./chilli" },
    { product_id: 23, name: "Noodles", category: "Groceries", price: 15.99, image: "./noodles" },
    { product_id: 24, name: "Chairs", category: "Groceries", price: 100.99, image: "./chairs" },
    { product_id: 25, name: "Orange", category: "Groceries", price: 12.99, image: "./orange" },
    { product_id: 26, name: "Laddu", category: "Groceries", price: 1.99, image: "./laddu" },
    { product_id: 27, name: "Butter", category: "Groceries", price: 15.99, image: "./butter" },
    { product_id: 28, name: "Bun", category: "Groceries", price: 15.99, image: "./bun" },
];

// Cart initialization
const cart = [];

// Function to display products in a 4-product per row grid
function displayProducts(productList) {
    const container = document.getElementById('product-container');
    container.innerHTML = '';  // Clear container before adding new products
    productList.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Price: $${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.product_id})">Add to Cart</button>
        `;
        container.appendChild(productDiv);
    });
}

// Initial display of all products
displayProducts(products);

// Search function
function searchProducts() {
    const searchTerm = document.getElementById('search-bar').value.toLowerCase();
    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchTerm));
    displayProducts(filteredProducts);
}

// Add to cart function
function addToCart(productId) {
    const product = products.find(p => p.product_id === productId);
    const cartItem = cart.find(item => item.product_id === productId);

    if (cartItem) {
        cartItem.quantity += 1; // Increment quantity if product already in cart
    } else {
        cart.push({ ...product, quantity: 1 }); // Add new product with quantity 1
    }

    updateCart();
}

// Increment quantity function
function incrementQuantity(productId) {
    const cartItem = cart.find(item => item.product_id === productId);
    if (cartItem) {
        cartItem.quantity += 1;
        updateCart();
    }
}

// Decrement quantity function
function decrementQuantity(productId) {
    const cartItem = cart.find(item => item.product_id === productId);
    if (cartItem && cartItem.quantity > 1) {
        cartItem.quantity -= 1;
    } else if (cartItem && cartItem.quantity === 1) {
        // Remove item if quantity is 1 after decrement
        cart.splice(cart.indexOf(cartItem), 1);
    }
    updateCart();
}

// Update cart display
function updateCart() {
    const cartButton = document.getElementById('cart-button');
    cartButton.innerText = `Cart (${cart.length})`;  // Update cart button with item count

    const cartList = document.getElementById('cart-list');
    const totalPriceElement = document.getElementById('total-price');
    cartList.innerHTML = '';
    let totalPrice = 0;

    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span>${item.name} - $${item.price.toFixed(2)} x ${item.quantity}</span>
            <div>
                <button onclick="decrementQuantity(${item.product_id})">-</button>
                <span>${item.quantity}</span>
                <button onclick="incrementQuantity(${item.product_id})">+</button>
            </div>
        `;
        cartList.appendChild(listItem);
        totalPrice += item.price * item.quantity;
    });

    totalPriceElement.innerText = totalPrice.toFixed(2);
}

// Checkout function
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
    } else {
        alert("Order Successful!");
        cart.length = 0;  // Empty the cart
        updateCart();  // Update the cart display after checkout
    }
}

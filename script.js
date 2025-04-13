// Product data
const products = [
    { id: 1, name: "Skincare products", image: "box1.img.jpg", price: 20 },
    { id: 2, name: "Comfortable Shoes", image: "box2.jpg", price: 50 },
    { id: 3, name: "Home Decor", image: "box3-img.jpg", price: 30 },
    { id: 4, name: "Peptide Lip tints", image: "box4-img.jpg", price: 15 },
    { id: 5, name: "Smart Watches", image: "box5-img.jpg", price: 120 },
    { id: 6, name: "Top Mobile Phones", image: "box6-img.jpg", price: 500 },
    { id: 7, name: "Books", image: "box7-image.jpg", price: 10 },
    { id: 8, name: "Classic Speakers", image: "box8-img.jpg", price: 70 },
  ];
  
  // Cart array loaded from localStorage
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
  // Update cart count in navbar
  function updateCartCount() {
    const cartCount = document.querySelector(".nav-cart");
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.innerHTML = `<i class="fa-solid fa-cart-shopping"></i> Cart (${count})`;
  }
  updateCartCount();
  
  // Search functionality
  document.querySelector(".search-icon").addEventListener("click", () => {
    const searchValue = document.querySelector(".search-input").value.toLowerCase();
    const shopSection = document.querySelector(".shop-section");
    shopSection.innerHTML = "";
  
    const filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(searchValue)
    );
  
    if (filteredProducts.length === 0) {
      shopSection.innerHTML = "<h2 style='padding: 20px;'>No products found!</h2>";
      return;
    }
  
    filteredProducts.forEach(product => {
      const box = document.createElement("div");
      box.className = "box";
      box.innerHTML = `
        <div class="box-content">
          <h2>${product.name}</h2>
          <div class="box-img" style="background-image:url(${product.image})"></div>
          <p>$${product.price}</p>
          <button onclick="addToCart(${product.id})" class="add-btn">Add to Cart</button>
        </div>
      `;
      shopSection.appendChild(box);
    });
  });
  
  // Add to cart
  window.addToCart = function (id) {
    const product = products.find(p => p.id === id);
    const existing = cart.find(item => item.id === id);
    if (existing) {
      existing.quantity++;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert(`${product.name} added to cart!`);
  };
  
  // Create checkout page
  function createCheckoutPage() {
    document.body.innerHTML = `
      <header class="navbar" style="background:#0f1111;color:white;padding:10px;font-size:1.2rem;">Checkout</header>
      <div style="padding:20px;">
        <h2>Your Cart</h2>
        <div id="cart-items"></div>
        <h3 id="total">Subtotal: $0</h3>
        <button onclick="clearCart()" style="margin-top:20px;padding:10px 20px;">Clear Cart</button>
        <button onclick="goBack()" style="margin-top:20px;padding:10px 20px;margin-left:10px;">Back to Shop</button>
      </div>
    `;
  
    const cartItemsContainer = document.getElementById("cart-items");
    let total = 0;
  
    cart.forEach(item => {
      const itemDiv = document.createElement("div");
      itemDiv.style.margin = "10px 0";
      itemDiv.innerHTML = `
        <div style="display:flex;align-items:center;">
          <img src="${item.image}" style="height:80px;margin-right:20px;">
          <div style="flex:1;">
            <h4>${item.name}</h4>
            <p>Price: $${item.price}</p>
            <p>Quantity: ${item.quantity}</p>
          </div>
          <button onclick="removeFromCart(${item.id})" style="padding:5px 10px;">Remove</button>
        </div>
        <hr>
      `;
      cartItemsContainer.appendChild(itemDiv);
      total += item.price * item.quantity;
    });
  
    document.getElementById("total").innerText = `Subtotal: $${total}`;
  }
  
  // Remove item from cart
  window.removeFromCart = function (id) {
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(cart));
    createCheckoutPage();
    updateCartCount();
  };
  
  // Clear cart
  window.clearCart = function () {
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    createCheckoutPage();
    updateCartCount();
  };
  
  // Go back to main page
  window.goBack = function () {
    window.location.reload();
  };
  
  // Go to checkout page when cart icon clicked
  document.querySelector(".nav-cart").addEventListener("click", createCheckoutPage);
  
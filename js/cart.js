// FlexiShop Cart Functionality
class ShoppingCart {
  constructor() {
    this.cartItems = this.getCartItems();
    this.updateCartCount();
  }

  // Get cart items from localStorage
  getCartItems() {
    const cart = localStorage.getItem('flexishop_cart');
    return cart ? JSON.parse(cart) : [];
  }

  // Save cart items to localStorage
  saveCartItems() {
    localStorage.setItem('flexishop_cart', JSON.stringify(this.cartItems));
    this.updateCartCount();
  }

  // Update cart count in header
  updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
      const totalCount = this.cartItems.reduce((total, item) => total + item.quantity, 0);
      cartCount.textContent = totalCount;
      cartCount.style.display = totalCount > 0 ? 'flex' : 'none';
    }
  }

  // Add item to cart
  addToCart(product) {
    console.log('Adding product to cart:', product);
    const existingItem = this.cartItems.find(item => item.id === product.id);
    
    if (existingItem) {
      console.log('Product already in cart, incrementing quantity');
      existingItem.quantity += 1;
    } else {
      console.log('New product, adding to cart');
      this.cartItems.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
      });
    }
    
    this.saveCartItems();
    this.showAddToCartAnimation();
  }

  // Remove item from cart
  removeFromCart(productId) {
    this.cartItems = this.cartItems.filter(item => item.id !== productId);
    this.saveCartItems();
    this.renderCartItems();
  }

  // Update item quantity
  updateQuantity(productId, quantity) {
    const item = this.cartItems.find(item => item.id === productId);
    if (item) {
      if (quantity <= 0) {
        this.removeFromCart(productId);
      } else {
        item.quantity = quantity;
        this.saveCartItems();
      }
      this.renderCartItems();
    }
  }

  // Get total cart value
  getCartTotal() {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  // Get total item count
  getTotalItemCount() {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  // Clear cart
  clearCart() {
    this.cartItems = [];
    this.saveCartItems();
  }

  // Show animation when adding to cart
  showAddToCartAnimation() {
    const addToCartBtn = document.querySelector('.add-to-cart-btn');
    if (addToCartBtn) {
      addToCartBtn.classList.add('slide-in');
      setTimeout(() => {
        addToCartBtn.classList.remove('slide-in');
      }, 300);
    }
  }

  // Render cart items (for cart page) with Amazon-inspired design
  renderCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartSummaryContainer = document.getElementById('cart-summary');
    
    if (!cartItemsContainer) return;
    
    if (this.cartItems.length === 0) {
      cartItemsContainer.innerHTML = '<p>Your cart is empty. <a href="../index.html">Continue shopping</a></p>';
      if (cartSummaryContainer) {
        cartSummaryContainer.innerHTML = '<p>No items in cart</p>';
      }
      return;
    }
    
    // Render cart items
    cartItemsContainer.innerHTML = this.cartItems.map(item => `
      <div class="cart-item">
        <div class="cart-item-details">
          <img src="${item.image}" alt="${item.name}" class="cart-item-image">
          <div>
            <h3>${item.name}</h3>
            <p>In stock</p>
            <p>Eligible for FREE Shipping</p>
            <div class="prime-badge">
              <i class="fas fa-check"></i>
              <span>Prime</span>
            </div>
          </div>
        </div>
        <div class="cart-item-price">$${item.price.toFixed(2)}</div>
        <div class="quantity-controls">
          <select class="quantity-select" data-id="${item.id}">
            ${Array.from({length: 10}, (_, i) => i + 1).map(num => 
              `<option value="${num}" ${num === item.quantity ? 'selected' : ''}>${num}</option>`
            ).join('')}
          </select>
        </div>
        <button class="remove-btn" data-id="${item.id}">Delete</button>
      </div>
    `).join('');
    
    // Add event listeners for quantity controls
    document.querySelectorAll('.quantity-select').forEach(select => {
      select.addEventListener('change', (e) => {
        const productId = parseInt(e.target.dataset.id);
        const quantity = parseInt(e.target.value);
        this.updateQuantity(productId, quantity);
      });
    });
    
    // Add event listeners for remove buttons
    document.querySelectorAll('.remove-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const productId = parseInt(e.target.dataset.id);
        this.removeFromCart(productId);
      });
    });
    
    // Render cart summary
    if (cartSummaryContainer) {
      const subtotal = this.getCartTotal();
      const itemCount = this.getTotalItemCount();
      cartSummaryContainer.innerHTML = `
        <div class="cart-summary">
          <h3>Subtotal (${itemCount} item${itemCount !== 1 ? 's' : ''}): <strong>$${subtotal.toFixed(2)}</strong></h3>
          <button class="place-order-btn" onclick="window.location.href='checkout.html'">Proceed to Checkout</button>
        </div>
      `;
    }
    
    this.updateCartCount();
  }

  // Render order summary for checkout page with Amazon-inspired design
  renderOrderSummary() {
    const orderSummaryContainer = document.getElementById('order-summary');
    if (!orderSummaryContainer) return;
    
    if (this.cartItems.length === 0) {
      orderSummaryContainer.innerHTML = '<p>No items in cart</p>';
      return;
    }
    
    const subtotal = this.getCartTotal();
    const tax = subtotal * 0.08;
    const total = subtotal + tax;
    const itemCount = this.getTotalItemCount();
    
    orderSummaryContainer.innerHTML = `
      <div class="summary-item">
        <span>Items (${itemCount}):</span>
        <span>$${subtotal.toFixed(2)}</span>
      </div>
      <div class="summary-item">
        <span>Shipping & handling:</span>
        <span>$0.00</span>
      </div>
      <div class="summary-item">
        <span>Total before tax:</span>
        <span>$${subtotal.toFixed(2)}</span>
      </div>
      <div class="summary-item">
        <span>Estimated tax to be collected:</span>
        <span>$${tax.toFixed(2)}</span>
      </div>
      <div class="summary-total">
        <span>Order total:</span>
        <span>$${total.toFixed(2)}</span>
      </div>
    `;
  }
}

// Initialize cart when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initializeCart();
});

// Fallback initialization
function initializeCart() {
  console.log('Initializing cart...');
  const cart = new ShoppingCart();
  
  // Add to cart button functionality
  document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      console.log('Add to cart button clicked');
      const productElement = e.target.closest('.product-card, .product-detail');
      if (productElement) {
        const product = {
          id: parseInt(productElement.dataset.id),
          name: productElement.querySelector('.product-title, h1').textContent,
          price: parseFloat(productElement.querySelector('.product-price').textContent.replace('$', '')),
          image: productElement.querySelector('.product-image, .product-detail-image').src
        };
        console.log('Adding product to cart:', product);
        cart.addToCart(product);
      }
    });
  });
  
  // Render cart items if on cart page
  if (document.getElementById('cart-items')) {
    console.log('Rendering cart items');
    cart.renderCartItems();
  }
  
  // Render order summary if on checkout page
  if (document.getElementById('order-summary')) {
    console.log('Rendering order summary');
    cart.renderOrderSummary();
  }
  console.log('Cart initialized successfully');
}

// Fallback in case DOMContentLoaded doesn't fire
if (document.readyState === 'loading') {
  console.log('Document still loading, waiting for DOMContentLoaded');
} else {
  console.log('Document already loaded, initializing cart immediately');
  // Document is already loaded, initialize immediately
  initializeCart();
}
// FlexiShop Main Application Functions
class FlexiShop {
  constructor() {
    this.products = [];
    this.filteredProducts = [];
    this.currentPage = 'home';
    this.init();
  }

  // Initialize the application
  async init() {
    console.log('Initializing FlexiShop app...');
    console.log('Document readyState:', document.readyState);
    await this.loadProducts();
    console.log('Products loaded:', this.products);
    this.setupEventListeners();
    this.renderProducts();
    console.log('App initialized successfully');
  }

  // Load products from JSON file
  async loadProducts() {
    console.log('Attempting to load products...');
    try {
      console.log('Trying path: data/products.json');
      const response = await fetch('data/products.json');
      console.log('Response status:', response.status);
      this.products = await response.json();
      this.filteredProducts = [...this.products];
      console.log('Products loaded successfully from root path');
      
      // If we're on a page in a subdirectory, adjust image paths
      if (window.location.pathname.includes('/pages/')) {
        console.log('Adjusting image paths for subdirectory page');
        this.products.forEach(product => {
          if (product.image.startsWith('assets/')) {
            product.image = '../' + product.image;
          }
        });
        this.filteredProducts = [...this.products];
      }
    } catch (error) {
      console.error('Error loading products from root path:', error);
      // Try alternative path for pages in subdirectories
      try {
        console.log('Trying alternative path: ../data/products.json');
        const response = await fetch('../data/products.json');
        console.log('Response status:', response.status);
        this.products = await response.json();
        this.filteredProducts = [...this.products];
        console.log('Products loaded successfully from pages path');
      } catch (error) {
        console.error('Error loading products from alternative path:', error);
      }
    }
  }

  // Set up event listeners
  setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.filterProducts();
      });
    }

    // Category filter
    const categoryFilter = document.getElementById('category-filter');
    if (categoryFilter) {
      categoryFilter.addEventListener('change', (e) => {
        this.filterProducts();
      });
    }

    // Price filter
    const priceFilter = document.getElementById('price-filter');
    if (priceFilter) {
      priceFilter.addEventListener('change', (e) => {
        this.filterProducts();
      });
    }

    // Sort functionality
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        this.sortProducts(e.target.value);
      });
    }

    // Reset filters button
    const resetFiltersBtn = document.getElementById('reset-filters');
    if (resetFiltersBtn) {
      resetFiltersBtn.addEventListener('click', (e) => {
        this.resetFilters();
      });
    }
  }

  // Filter products based on search, category, and price
  filterProducts() {
    const searchTerm = document.getElementById('search-input')?.value.toLowerCase() || '';
    const category = document.getElementById('category-filter')?.value || '';
    const priceRange = document.getElementById('price-filter')?.value || '';

    this.filteredProducts = this.products.filter(product => {
      // Search filter
      const matchesSearch = product.name.toLowerCase().includes(searchTerm) || 
                           product.description.toLowerCase().includes(searchTerm) ||
                           product.brand.toLowerCase().includes(searchTerm);

      // Category filter
      const matchesCategory = category === '' || product.category === category;

      // Price filter
      let matchesPrice = true;
      if (priceRange === '0-50') {
        matchesPrice = product.price <= 50;
      } else if (priceRange === '50-100') {
        matchesPrice = product.price > 50 && product.price <= 100;
      } else if (priceRange === '100+') {
        matchesPrice = product.price > 100;
      }

      return matchesSearch && matchesCategory && matchesPrice;
    });

    this.renderProducts();
  }

  // Sort products
  sortProducts(sortBy) {
    switch (sortBy) {
      case 'price-low':
        this.filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        this.filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        this.filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'rating':
        this.filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Default sort by ID
        this.filteredProducts.sort((a, b) => a.id - b.id);
    }
    this.renderProducts();
  }

  // Reset all filters
  resetFilters() {
    if (document.getElementById('search-input')) {
      document.getElementById('search-input').value = '';
    }
    if (document.getElementById('category-filter')) {
      document.getElementById('category-filter').value = '';
    }
    if (document.getElementById('price-filter')) {
      document.getElementById('price-filter').value = '';
    }
    if (document.getElementById('sort-select')) {
      document.getElementById('sort-select').value = '';
    }
    this.filteredProducts = [...this.products];
    this.renderProducts();
  }

  // Render products to the page with Amazon-inspired design
  renderProducts() {
    console.log('Rendering products...');
    const productsContainer = document.getElementById('products-container');
    console.log('Products container found:', !!productsContainer);
    console.log('Products container element:', productsContainer);
    if (!productsContainer) {
      console.log('Products container not found!');
      return;
    }

    console.log('Filtered products to render:', this.filteredProducts);
    if (this.filteredProducts.length === 0) {
      productsContainer.innerHTML = '<p class="no-products">No products found matching your criteria.</p>';
      console.log('No products to render');
      return;
    }

    console.log('Rendering', this.filteredProducts.length, 'products');
    const html = this.filteredProducts.map(product => `
      <div class="product-card fade-in" data-id="${product.id}">
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <div class="product-info">
          <a href="product-details.html?id=${product.id}" class="product-title">${product.name}</a>
          <div class="product-rating">
            <div class="rating-stars">
              ${'★'.repeat(Math.floor(product.rating))}
              ${product.rating % 1 !== 0 ? '½' : ''}
              ${'☆'.repeat(5 - Math.ceil(product.rating))}
            </div>
            <a href="#" class="rating-count">(${Math.floor(Math.random() * 1000)})</a>
          </div>
          <p class="product-price">$${product.price.toFixed(2)}</p>
          ${product.inStock ? `
          <div class="prime-badge">
            <i class="fas fa-check"></i>
            <span>Prime</span>
          </div>
          ` : ''}
          <button class="add-to-cart-btn" ${!product.inStock ? 'disabled' : ''}>
            ${product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    `).join('');
    
    console.log('Generated HTML:', html);
    productsContainer.innerHTML = html;

    // Add event listeners to new add to cart buttons
    const buttons = document.querySelectorAll('.add-to-cart-btn');
    console.log('Found', buttons.length, 'add to cart buttons');
    buttons.forEach(button => {
      button.addEventListener('click', (e) => {
        console.log('Add to cart button clicked');
        const productElement = e.target.closest('.product-card');
        if (productElement) {
          const product = {
            id: parseInt(productElement.dataset.id),
            name: productElement.querySelector('.product-title').textContent,
            price: parseFloat(productElement.querySelector('.product-price').textContent.replace('$', '')),
            image: productElement.querySelector('.product-image').src
          };
          
          // Add to cart functionality
          const cart = new ShoppingCart();
          cart.addToCart(product);
        }
      });
    });
    console.log('Products rendered successfully');
  }

  // Render product details with Amazon-inspired design
  renderProductDetails(productId) {
    const product = this.products.find(p => p.id === parseInt(productId));
    if (!product) return;

    const productDetailContainer = document.getElementById('product-detail-container');
    if (!productDetailContainer) return;

    productDetailContainer.innerHTML = `
      <div class="product-detail" data-id="${product.id}">
        <div class="product-detail-image-container">
          <img src="${product.image}" alt="${product.name}" class="product-detail-image">
        </div>
        <div class="product-detail-info">
          <h1>${product.name}</h1>
          <div class="product-detail-rating">
            <div class="rating-stars">
              ${'★'.repeat(Math.floor(product.rating))}
              ${product.rating % 1 !== 0 ? '½' : ''}
              ${'☆'.repeat(5 - Math.ceil(product.rating))}
            </div>
            <a href="#">See all reviews</a>
          </div>
          <p class="product-detail-price">$${product.price.toFixed(2)}</p>
          <p class="product-detail-description">${product.description}</p>
          
          <div class="buy-box">
            <p class="buy-box-price"><strong>Price: $${product.price.toFixed(2)}</strong></p>
            ${product.inStock ? `
            <div class="prime-badge">
              <i class="fas fa-check"></i>
              <span>FREE delivery Thursday, June 1</span>
            </div>
            <p>In Stock</p>
            ` : '<p>Out of Stock</p>'}
            
            <div class="quantity-selector">
              <label for="quantity">Qty:</label>
              <input type="number" id="quantity" class="quantity-input" value="1" min="1" max="10">
            </div>
            
            <button class="add-to-cart-btn" ${!product.inStock ? 'disabled' : ''}>
              ${product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>
        </div>
      </div>
    `;

    // Add event listener to add to cart button
    const addToCartBtn = productDetailContainer.querySelector('.add-to-cart-btn');
    if (addToCartBtn) {
      addToCartBtn.addEventListener('click', (e) => {
        const quantity = parseInt(document.getElementById('quantity').value);
        const productToAdd = {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: quantity
        };
        
        // Add to cart functionality
        const cart = new ShoppingCart();
        for (let i = 0; i < quantity; i++) {
          cart.addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image
          });
        }
      });
    }
  }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded, initializing FlexiShop app...');
  const app = new FlexiShop();
  
  // Check if we're on product details page
  if (window.location.pathname.includes('product-details.html')) {
    // Extract product ID from URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    if (productId) {
      app.renderProductDetails(productId);
    }
  }
});

// Fallback in case DOMContentLoaded doesn't fire
if (document.readyState === 'loading') {
  console.log('Document still loading, waiting for DOMContentLoaded');
} else {
  console.log('Document already loaded, initializing immediately');
  // Document is already loaded, initialize immediately
  const app = new FlexiShop();
  
  // Check if we're on product details page
  if (window.location.pathname.includes('product-details.html')) {
    // Extract product ID from URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    if (productId) {
      app.renderProductDetails(productId);
    }
  }
}
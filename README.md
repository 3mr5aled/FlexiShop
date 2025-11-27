# FlexiShop - E-commerce Template

A complete front-end e-commerce template built with HTML, CSS, and JavaScript. FlexiShop provides a responsive, modern shopping experience with all essential e-commerce features.

## Features

### 🛍️ Product Management
- Product listing with grid layout
- Product detail pages
- Product filtering by category and price range
- Product searching
- Product sorting (price, name, rating)

### 🛒 Shopping Cart
- Add/remove products from cart
- Adjust product quantities
- Persistent cart using LocalStorage
- Real-time cart item counter

### 💳 Checkout Process
- Billing information form
- Payment information form
- Order summary
- Order placement simulation

### 🎨 UI/UX Features
- Fully responsive design (mobile, tablet, desktop)
- Smooth animations and transitions
- Modern, clean aesthetic
- Intuitive navigation

### 🧠 Technical Features
- Data loaded from JSON file
- LocalStorage for cart persistence
- Modular, maintainable code structure
- BEM methodology for CSS naming

## Project Structure

```
FlexiShop/
├── css/
│   └── style.css          # All styles
├── data/
│   └── products.json      # Product data
├── js/
│   ├── app.js             # Main application logic
│   └── cart.js            # Cart functionality
├── pages/
│   ├── products.html      # Product listing page
│   ├── product-details.html # Product detail page
│   ├── cart.html          # Shopping cart page
│   └── checkout.html      # Checkout page
├── assets/                # Images and other assets
└── index.html             # Home page
```

## Pages

1. **Home Page** ([index.html](index.html))
   - Hero section with call-to-action
   - Featured products display
   - Navigation to other pages

2. **Products Page** ([pages/products.html](pages/products.html))
   - Product grid with all items
   - Filtering controls (search, category, price)
   - Sorting options
   - Reset filters functionality

3. **Product Details Page** ([pages/product-details.html](pages/product-details.html))
   - Detailed product information
   - Product images
   - Add to cart functionality
   - Quantity selector

4. **Cart Page** ([pages/cart.html](pages/cart.html))
   - Cart item listing
   - Quantity adjustment
   - Item removal
   - Order summary with totals

5. **Checkout Page** ([pages/checkout.html](pages/checkout.html))
   - Billing information form
   - Payment information form
   - Order summary
   - Place order functionality

## How to Run

1. **Clone or download** the repository
2. **Open** `index.html` in your web browser
3. **Navigate** through the site using the navigation menu

### For Local Development

1. **Using VS Code:**
   - Open the project folder in VS Code
   - Install the "Live Server" extension
   - Right-click `index.html` and select "Open with Live Server"

2. **Using Python (if installed):**
   ```bash
   # Navigate to the FlexiShop directory
   cd FlexiShop
   
   # Start a simple HTTP server
   python -m http.server 8000
   
   # Open http://localhost:8000 in your browser
   ```

3. **Using XAMPP (as you're already in htdocs):**
   - Start Apache in XAMPP Control Panel
   - Visit `http://localhost/FlexiShop/` in your browser

## Customization

### Adding Products
1. Edit [data/products.json](data/products.json)
2. Add new product objects with the following structure:
```json
{
  "id": 7,
  "name": "Product Name",
  "price": 29.99,
  "category": "Category Name",
  "brand": "Brand Name",
  "image": "../assets/images/product.jpg",
  "description": "Product description",
  "rating": 4.5,
  "inStock": true
}
```

### Styling
- All CSS is in [css/style.css](css/style.css)
- Uses CSS variables for consistent theming
- Responsive design with media queries

### JavaScript Functionality
- [js/app.js](js/app.js): Main application logic, product filtering, and rendering
- [js/cart.js](js/cart.js): Shopping cart functionality with LocalStorage

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Responsive design works on mobile, tablet, and desktop

## Dependencies

- None! Pure HTML, CSS, and JavaScript
- No build process required

## License

This project is open source and available under the [MIT License](LICENSE).

## Author

FlexiShop was created as a front-end e-commerce template demonstration.

---

Enjoy building your e-commerce site with FlexiShop! 🛍️
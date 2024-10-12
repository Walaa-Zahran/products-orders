# Product Order Application

## Description

This is a **Product Order Application** built with the latest version of **Angular**. It demonstrates a simple e-commerce workflow where users can view products, add them to their cart, and place orders. The application features product management, cart functionality, and order tracking, making it suitable for e-commerce scenarios.

### Key Features:

- **Product Listing**: Displays all available products with pricing and stock availability.
- **Add to Cart**: Allows users to add products to their shopping cart.
- **Edit Product Quantity**: Adjust product quantities directly in the product list.
- **Order Details**: Displays detailed order information including customer details and ordered products.
- **Low Stock Warning**: Highlights products with fewer than 5 pieces available.
- **Local Storage Support**: Cart data is saved in the browser's local storage for persistence across sessions.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Technologies](#technologies)
- [Features](#features)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Walaa-Zahran/products-orders.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd product-order-app
   ```

3. **Install the dependencies:**

   ```bash
   npm install
   ```

4. **Run the application:**

   ```bash
   ng serve
   ```

   Navigate to `http://localhost:4200/` in your browser.

## Usage

- Once the application is running, you will see a list of products on the home page.
- You can:
  - Adjust the quantity of a product.
  - Add products to the cart.
  - View the total price of your order.
  - Check out the detailed order information.

## Technologies

- **Angular** (Latest version)
- **RxJS** for reactive programming.
- **Bootstrap** for responsive design.
- **LocalStorage** for cart persistence.

## Features

### 1. Product Listing

Displays all products with images, prices, and available stock. Products with low stock (less than 5 pieces) are highlighted.

### 2. Add to Cart

Users can add products to their cart. The cart persists even after the browser is refreshed, thanks to local storage.

### 3. Edit Product Quantity

The application allows users to adjust the quantity of products both on the product listing page and the cart.

### 4. Order Management

The user can place an order and view details such as the total price and payment method.

## Project Structure

Here's a brief overview of the folder structure:

```bash
src/
│
├── app/
│   ├── core/
│   │   ├── services/          # Services like DataService, CartService
│   ├── features/
│   │   ├── products/          # Product-related components
│   │   ├── cart/              # Cart-related components
│   │   ├── orders/            # Order-related components
│   ├── shared/                # Shared models, utilities, and components
│
├── assets/                    # Static assets (images, JSON files)
│
└── environments/              # Environment configurations
```

## Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/new-feature`).
3. Make your changes and commit them (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature/new-feature`).
5. Open a pull request.

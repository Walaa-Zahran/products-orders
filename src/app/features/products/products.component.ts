import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/models/product.model';
import { DataService } from '../../core/services/data.service';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule], // Importing CommonModule for basic Angular directives
  templateUrl: './products.component.html', // Link to the component's HTML template
  providers: [DataService], // Providing the DataService locally to this component
  styleUrls: ['./products.component.scss'] // Link to the component's SCSS file for styling
})
export class ProductsComponent implements OnInit {
  // Array to store the list of products retrieved from the DataService
  products: Product[] = [];

  // Injecting both DataService and CartService via the constructor
  constructor(
    private dataService: DataService,
    private cartService: CartService
  ) {}

  /**
   * Lifecycle hook that runs after the component is initialized.
   * This fetches the list of products from the DataService and stores them in the `products` array.
   */
  ngOnInit(): void {
    this.dataService.getProducts().subscribe(
      (data: Product[]) => {
        console.log('Received products:', data); // Debugging: log received products
        this.products = data; // Store the received products in the `products` array
      },
      (error) => console.error('Failed to load products', error) // Log any errors encountered while fetching products
    );
  }

  /**
   * Determines whether a product has low stock based on the available pieces.
   * @param product The product to check stock for.
   * @returns True if the product's stock is less than 5, otherwise false.
   */
  isLowStock(product: Product): boolean {
    return product.AvailablePieces < 5; // Return true if the product has fewer than 5 pieces available
  }

  /**
   * Updates the quantity of the given product.
   * @param product The product to update.
   * @param quantity The new quantity for the product.
   */
  editProductQuantity(product: Product, quantity: number): void {
    this.dataService.editProductQuantity(product, quantity); // Use the DataService to update the product quantity
  }

  /**
   * Adds a product to the cart by calling the CartService.
   * @param product The product to add to the cart.
   */
  addToCart(product: Product) {
    this.cartService.addOrder(product); // Add the product to the cart using the CartService
  }
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataService } from '../../core/services/data.service';
import { Customer } from '../../shared/models/customer.model';
import { Order } from '../../shared/models/order.model';
import { Product } from '../../shared/models/product.model';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrderListComponent {
  // Array to store fetched orders
  orders: Order[] = [];

  // Array to store fetched customers
  customers: Customer[] = [];

  // Array to store fetched products
  products: Product[] = [];

  constructor(private dataService: DataService) {}

  /**
   * Lifecycle hook to load orders and products when the component is initialized.
   */
  ngOnInit(): void {
    this.loadOrdersAndProducts();
  }

  /**
   * Load orders and products data from the DataService.
   * This method fetches both the orders and products and updates the component's state.
   */
  private loadOrdersAndProducts(): void {
    // Fetch orders from DataService
    this.dataService.getOrders().subscribe((orders: Order[]) => {
      this.orders = orders; // Update the orders array
    });

    // Fetch products from DataService
    this.dataService.getProducts().subscribe((products: Product[]) => {
      this.products = products; // Update the products array
    });
  }

  /**
   * Calculates the total price for a specific order by summing up the price of each product in the order.
   * @param order The order for which the total price is calculated.
   * @returns The total price of the order.
   */
  calculateOrderPrice(order: Order): number {
    let totalPrice = 0;

    // Loop through each product in the order
    for (const orderProduct of order.Products) {
      // Find the product details from the products array
      const product = this.products.find((p) => p.ProductId === orderProduct.ProductId);

      // If the product exists, calculate the price for this product and add it to the total order price
      if (product) {
        totalPrice += product.ProductPrice * orderProduct.Quantity;
      }
    }

    return totalPrice;
  }

  /**
   * Gets the name of the customer associated with a specific order.
   * @param userId The ID of the customer.
   * @returns The name of the customer, or 'Unknown Customer' if not found.
   */
  getCustomerName(userId: string): string {
    // Find the customer by userId from the customers array
    const customer = this.customers.find(c => c.Id === userId);

    // Return the customer's name or 'Unknown Customer' if not found
    return customer ? customer.Name : 'Unknown Customer';
  }
}

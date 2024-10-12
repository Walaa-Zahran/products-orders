import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DataService } from "../../core/services/data.service";
import { Customer } from "../../shared/models/customer.model";
import { Order } from "../../shared/models/order.model";
import { Product } from "../../shared/models/product.model";

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss'
})
export class OrderDetailsComponent {
  // Holds all orders in the system
  orders: Order[] = [];

  // The selected order, retrieved by order ID
  selectedOrder: Order | undefined;

  // Array to store the products in the selected order with their quantities
  productsInOrder: (Product & { Quantity: number })[] = [];

  // The customer details for the selected order
  customer: Customer | undefined;

  constructor(private orderService: DataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Get the order ID from the route parameters
    const orderId = +this.route.snapshot.paramMap.get('id')!;

    // Fetch all orders (this can be helpful for a list or future functionality)
    this.orderService.getOrders().subscribe(orders => {
      this.orders = orders;
      console.log('All Orders:', orders); // Debugging/logging purpose
    });

    // Fetch the specific order by its ID
    this.orderService.getOrder(orderId).subscribe(order => {
      this.selectedOrder = order;
    });

    // Fetch the products associated with the specific order
    this.orderService.getProductsByOrderId(orderId).subscribe(products => {
      this.productsInOrder = products;
    });

    // Fetch the customer details associated with the specific order
    this.orderService.getCustomerByOrder(orderId).subscribe(customer => {
      this.customer = customer;
    });
  }

  /**
   * Get the quantity of a product in the selected order.
   * @param productId - The ID of the product to search for in the order.
   * @returns The quantity of the product in the order, or 0 if not found.
   */
  getProductQuantity(productId: string): number {
    return this.selectedOrder?.Products.find(p => p.ProductId === productId)?.Quantity || 0;
  }

  /**
   * Calculate the total price for the selected order.
   * Iterates through the products in the order and multiplies each product's price by its quantity.
   * @returns The total price of the order.
   */
  calculateTotalOrderPrice(): number {
    let totalPrice = 0;

    // Check if the selected order exists
    if (this.selectedOrder) {
      // Loop through each product in the order
      for (const orderProduct of this.selectedOrder.Products) {
        // Find the corresponding product details (price) in the list of products in the order
        const product = this.productsInOrder.find(p => p.ProductId === orderProduct.ProductId);
        if (product) {
          // Calculate the total for each product (price * quantity) and add to totalPrice
          totalPrice += product.ProductPrice * orderProduct.Quantity;
        }
      }
    }

    return totalPrice; // Return the calculated total price
  }
}

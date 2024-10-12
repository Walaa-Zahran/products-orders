
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
  imports: [CommonModule,RouterModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrderListComponent {
  orders: Order[] = [];
  customers: Customer[] = [];
  products:Product[]=[];
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadOrdersAndProducts();

  }
 // Load orders and products data
 private loadOrdersAndProducts(): void {
  this.dataService.getOrders().subscribe((orders: Order[]) => {
    this.orders = orders;
  });

  this.dataService.getProducts().subscribe((products: Product[]) => {
    this.products = products;
  });
}
// Calculate the total price of an order
calculateOrderPrice(order: Order): number {
  let totalPrice = 0;
console.log('order.products',order.Products)
  for (const orderProduct of order.Products) {
    // Find the product details from products array
    const product = this.products.find((p) => p.ProductId === orderProduct.ProductId);
    if (product) {
      // Calculate total price for this product and add to total order price
      totalPrice += product.ProductPrice * orderProduct.Quantity;
    }
  }

  return totalPrice;
}

  getCustomerName(userId: string): string {
    const customer = this.customers.find(c => c.Id === userId);
    return customer ? customer.Name : 'Unknown Customer';
  }
}

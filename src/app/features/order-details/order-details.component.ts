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
  orders: Order[] = [];
  selectedOrder: Order | undefined;
  productsInOrder: (Product & { Quantity: number })[] = [];
  customer: Customer | undefined;

  constructor(private orderService: DataService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    const orderId = +this.route.snapshot.paramMap.get('id')!;

    // Get all orders
    this.orderService.getOrders().subscribe(orders => {
      this.orders = orders;
      console.log('All Orders:', orders);
    });

    //Get Order By Order Id
    this.orderService.getOrder(orderId).subscribe(order => {
      this.selectedOrder = order;
    });

    // Get products for an order
    this.orderService.getProductsByOrderId(orderId).subscribe(products => {
      this.productsInOrder = products;
    });
    //  Get customer details for an order
    this.orderService.getCustomerByOrder(orderId).subscribe(customer => {
      this.customer = customer;
    });
  }
  // Get the product quantity in the order
  getProductQuantity(productId: string): number {
    return this.selectedOrder?.Products.find(p => p.ProductId === productId)?.Quantity || 0;
  }
 // Calculate the total price for the order
 calculateTotalOrderPrice(): number {
  let totalPrice = 0;
  if (this.selectedOrder) {
    for (const orderProduct of this.selectedOrder.Products) {
      const product = this.productsInOrder.find(p => p.ProductId === orderProduct.ProductId);
      if (product) {
        totalPrice += product.ProductPrice * orderProduct.Quantity;
      }
    }
  }
  return totalPrice;
}
}

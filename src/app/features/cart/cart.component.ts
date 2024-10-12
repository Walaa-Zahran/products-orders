import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/models/product.model';
import { CartService } from '../../core/services/cart.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, CommonModule, FormsModule, RouterLink, RouterModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  // Array to hold cart items, each item contains a product and its quantity
  cartItems: { product: Product, quantity: number }[] = [];

  constructor(private cartService: CartService) {}

  /**
   * Lifecycle hook that is called after the component is initialized.
   * Subscribes to the cart items from CartService to populate the cart.
   */
  ngOnInit(): void {
    // Subscribe to the cart items to ensure that changes to the cart are reflected in the view
    this.cartService.getCartItems().subscribe((items) => {
      this.cartItems = items;
    });
  }

  /**
   * Increases the quantity of a product in the cart.
   * @param productId The ID of the product whose quantity will be increased.
   */
  increaseQuantity(productId: string) {
    this.cartService.increaseQuantity(productId);
  }

  /**
   * Decreases the quantity of a product in the cart.
   * If the quantity reaches zero, the product is removed from the cart.
   * @param productId The ID of the product whose quantity will be decreased.
   */
  decreaseQuantity(productId: string) {
    this.cartService.decreaseQuantity(productId);
  }

  /**
   * Removes a product entirely from the cart.
   * @param productId The ID of the product to remove.
   */
  removeFromCart(productId: string) {
    this.cartService.removeFromCart(productId);
  }
}

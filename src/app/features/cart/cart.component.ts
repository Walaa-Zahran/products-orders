// features/cart/cart.component.ts
import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/models/product.model';
import { CartService } from '../../core/services/cart.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone:true,
  imports:[CurrencyPipe,CommonModule,FormsModule,RouterLink,RouterModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: { product: Product, quantity: number }[] = [];
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe((items) => {
      this.cartItems = items;
    });
  }

  increaseQuantity(productId: string) {
    this.cartService.increaseQuantity(productId);
  }

  decreaseQuantity(productId: string) {
    this.cartService.decreaseQuantity(productId);
  }

  removeFromCart(productId: string) {
    this.cartService.removeFromCart(productId);
  }
}

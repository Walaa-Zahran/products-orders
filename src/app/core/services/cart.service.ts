// features/cart/cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../shared/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: { product: Product, quantity: number }[] = [];
  private cartSubject = new BehaviorSubject<{ product: Product, quantity: number }[]>([]);
  private cartItemCount = new BehaviorSubject<number>(0);
  private CART_KEY = 'cart_items';
  constructor() {
    this.loadCartFromLocalStorage();
  }
  getCartItems() {
    return this.cartSubject.asObservable();
  }

  getCartItemCount() {
    return this.cartItemCount.asObservable();
  }

  addOrder(product: Product) {
    const existingItem = this.cartItems.find(item => item.product.ProductId === product.ProductId);

    if (existingItem) {
      existingItem.quantity += 1; // Increment the quantity if the product is already in the cart
    } else {
      this.cartItems.push({ product, quantity: 1 });
    }
    this.updateCart();
  }

  removeFromCart(productId: string) {
    this.cartItems = this.cartItems.filter(item => item.product.ProductId !== productId);
    this.updateCart();
  }


  increaseQuantity(productId: string) {
    const item = this.cartItems.find(item => item.product.ProductId === productId);
    if (item) {
      item.quantity += 1;
    }
    this.updateCart();
  }
  decreaseQuantity(productId: string) {
    const item = this.cartItems.find(item => item.product.ProductId === productId);
    if (item && item.quantity > 1) {
      item.quantity -= 1;
    } else if (item) {
      this.removeFromCart(productId); // Remove item from cart if quantity reaches 0
    }
    this.updateCart();
  }

  clearCart() {
    this.cartItems = [];
    this.updateCart();
  }

  private updateCart() {
    this.cartSubject.next(this.cartItems);
    this.cartItemCount.next(this.cartItems.reduce((total, item) => total + item.quantity, 0));
    this.saveCartToLocalStorage(); // Save to localStorage whenever the cart updates
  }
  private saveCartToLocalStorage() {
    localStorage.setItem(this.CART_KEY, JSON.stringify(this.cartItems));
  }

  private loadCartFromLocalStorage() {
    const storedCart = localStorage.getItem(this.CART_KEY);
    if (storedCart) {
      this.cartItems = JSON.parse(storedCart);
      this.cartSubject.next(this.cartItems);
      this.cartItemCount.next(this.cartItems.reduce((total, item) => total + item.quantity, 0));
    }
  }
}

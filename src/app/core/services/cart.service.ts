import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../shared/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  // Stores the cart items as an array of objects containing product and quantity
  private cartItems: { product: Product, quantity: number }[] = [];

  // BehaviorSubject to track the cart items and allow components to subscribe to changes
  private cartSubject = new BehaviorSubject<{ product: Product, quantity: number }[]>([]);

  // BehaviorSubject to track the total number of items in the cart
  private cartItemCount = new BehaviorSubject<number>(0);

  // Key to store and retrieve cart data from localStorage
  private CART_KEY = 'cart_items';

  constructor() {
    // Load the cart data from localStorage when the service is instantiated
    this.loadCartFromLocalStorage();
  }

  /**
   * Gets the current cart items as an observable.
   * Components can subscribe to this to stay updated on cart changes.
   */
  getCartItems() {
    return this.cartSubject.asObservable();
  }

  /**
   * Gets the current total number of items in the cart as an observable.
   * Components can subscribe to this to display cart item count.
   */
  getCartItemCount() {
    return this.cartItemCount.asObservable();
  }

  /**
   * Adds a product to the cart.
   * If the product is already in the cart, increment the quantity.
   * If not, add the product with an initial quantity of 1.
   * @param product The product to add or update in the cart.
   */
  addOrder(product: Product) {
    const existingItem = this.cartItems.find(item => item.product.ProductId === product.ProductId);

    if (existingItem) {
      // If the product is already in the cart, increase its quantity
      existingItem.quantity += 1;
    } else {
      // Otherwise, add the product with quantity 1
      this.cartItems.push({ product, quantity: 1 });
    }

    // Update the cart state and save to localStorage
    this.updateCart();
  }

  /**
   * Removes a product from the cart by its ProductId.
   * @param productId The ID of the product to remove.
   */
  removeFromCart(productId: string) {
    // Filter out the product with the given ProductId
    this.cartItems = this.cartItems.filter(item => item.product.ProductId !== productId);

    // Update the cart state and save to localStorage
    this.updateCart();
  }

  /**
   * Increases the quantity of a product in the cart.
   * @param productId The ID of the product whose quantity will be increased.
   */
  increaseQuantity(productId: string) {
    const item = this.cartItems.find(item => item.product.ProductId === productId);
    if (item) {
      // Increment the quantity of the found product
      item.quantity += 1;
    }

    // Update the cart state and save to localStorage
    this.updateCart();
  }

  /**
   * Decreases the quantity of a product in the cart.
   * If the quantity becomes 0, the product is removed from the cart.
   * @param productId The ID of the product whose quantity will be decreased.
   */
  decreaseQuantity(productId: string) {
    const item = this.cartItems.find(item => item.product.ProductId === productId);

    if (item) {
      if (item.quantity > 1) {
        // Decrease the quantity if it's more than 1
        item.quantity -= 1;
      } else {
        // Remove the item if the quantity reaches 0
        this.removeFromCart(productId);
      }

      // Update the cart state and save to localStorage
      this.updateCart();
    }
  }

  /**
   * Clears all items from the cart.
   */
  clearCart() {
    // Empty the cart array
    this.cartItems = [];

    // Update the cart state and save to localStorage
    this.updateCart();
  }

  /**
   * Updates the cart state by notifying all subscribers and saving to localStorage.
   * This method ensures that the UI is updated whenever the cart is changed.
   */
  private updateCart() {
    // Update the BehaviorSubject with the current cart items
    this.cartSubject.next(this.cartItems);

    // Update the BehaviorSubject with the total number of items in the cart
    this.cartItemCount.next(this.cartItems.reduce((total, item) => total + item.quantity, 0));

    // Save the updated cart to localStorage
    this.saveCartToLocalStorage();
  }

  /**
   * Saves the current cart state to localStorage to persist across sessions.
   */
  private saveCartToLocalStorage() {
    localStorage.setItem(this.CART_KEY, JSON.stringify(this.cartItems));
  }

  /**
   * Loads the cart data from localStorage and updates the cart state accordingly.
   * This method is called when the service is initialized.
   */
  private loadCartFromLocalStorage() {
    const storedCart = localStorage.getItem(this.CART_KEY);

    if (storedCart) {
      // Parse and set the stored cart data
      this.cartItems = JSON.parse(storedCart);

      // Update the BehaviorSubjects with the loaded data
      this.cartSubject.next(this.cartItems);
      this.cartItemCount.next(this.cartItems.reduce((total, item) => total + item.quantity, 0));
    }
  }
}

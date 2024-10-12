import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../core/services/cart.service'; // Service to manage cart items
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Customer } from '../../shared/models/customer.model'; // Customer model

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [FormsModule, CommonModule], // Importing necessary modules
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
  // Array to hold the cart items from the CartService
  cartItems: any[] = [];

  // Customer model object, initialized with empty fields
  customer: Customer = {
    Name: '',
    Email: '',
    Address: '',
    Id: '',
    Phone: '',
    RegisterDate: ''
  };

  // To store the selected payment method
  paymentMethod = '';

  constructor(
    private cartService: CartService, // Injecting CartService to manage cart operations
    private router: Router // Injecting Router to navigate between pages
  ) {}

  /**
   * ngOnInit lifecycle hook to fetch cart items when the component is initialized.
   */
  ngOnInit(): void {
    // Subscribe to the cart items observable from CartService to keep track of cart changes
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items; // Update the cart items list
    });
  }

  /**
   * Handles the order submission.
   * Validates the form and clears the cart if the form is valid.
   * @param form - The form object from the template.
   */
  submitOrder(form: any) {
    if (form.valid) {
      // If the form is valid, show a success message
      alert('Order submitted successfully!');

      // Clear the cart after successful order submission
      this.cartService.clearCart();

      // Navigate back to the products page after submitting the order
      this.router.navigate(['/products']);
    } else {
      // If the form is invalid, show an error message
      alert('Please fill in the required fields.');
    }
  }
}

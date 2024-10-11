import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Customer } from '../../shared/models/customer.model';

@Component({
  selector: 'app-checkout',
  standalone:true,
  imports:[FormsModule,CommonModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
  cartItems: any[] = [];


  customer: Customer = { Name: '', Email: '', Address: '',  Id:'' ,Phone:'',RegisterDate:''};
  paymentMethod = '';

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
    });
  }

  submitOrder(form:any) {
    if (form.valid) {
      alert('Order submitted successfully!');
    this.cartService.clearCart();
    this.router.navigate(['/products']); // Redirect back to products page after order

    } else {
      alert('Please fill in the required fields.');
    } }
}

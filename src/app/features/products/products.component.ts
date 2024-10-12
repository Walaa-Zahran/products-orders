import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {  Product } from '../../shared/models/product.model';
import { DataService } from '../../core/services/data.service';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  providers:[
   DataService
  ],
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  products: Product[] = [];

  constructor(private dataService: DataService,private cartService:CartService) {}


  ngOnInit(): void {
    this.dataService.getProducts().subscribe(
      (data: Product[]) => (this.products = data),
      (error) => console.error('Failed to load products', error)
    );
  }

  isLowStock(product: Product): boolean {
    return product.AvailablePieces < 5;
  }
  editProductQuantity(product: Product, quantity: number): void {
    // Ensure the quantity is not negative
    if(quantity>=0){
      const prd = this.products.find((p) => p.ProductId === product.ProductId);

      if (prd ) {
        prd.AvailablePieces=quantity;
      }
    }

  }


  addToCart(product: Product) {
    this.cartService.addOrder(product);
  }
}

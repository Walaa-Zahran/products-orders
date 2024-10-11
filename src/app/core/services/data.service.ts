import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Order, ProductInOrder } from '../../shared/models/order.model';
import { Product } from '../../shared/models/product.model';
import { Customer } from '../../shared/models/customer.model';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  products: Product[] = [];

  constructor(private http: HttpClient) { }

  // Paths to JSON files
  private ordersUrl = 'assets/json/orders.json';
  private productsUrl = 'assets/json/products.json';
  private usersUrl = 'assets/json/users.json';


  //Get All products
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl);
  }

}

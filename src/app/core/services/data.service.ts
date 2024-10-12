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
  //Get All Orders
  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.ordersUrl);
  }
  //Get Order
  getOrder(orderId: number): Observable<Order | undefined> {
    return this.getOrders().pipe(
      map(orders => orders.find(order => order.OrderId === orderId))
    );
  }
  //Get Products By Order Id
  getProductsByOrderId(orderId: number): Observable<(ProductInOrder & Product|any)[]> {
    return this.getOrder(orderId).pipe(
      switchMap(order => {
        if (!order) return [];

        const productsInOrder = order.Products;
        return this.http.get<Product[]>(this.productsUrl).pipe(
          map(allProducts =>
            productsInOrder.map(productInOrder => ({
              ...productInOrder,
              ...allProducts.find(p => p.ProductId === productInOrder.ProductId)
            }))
          )
        );
      })
    );
  }
  //Get Customer By Order Id
  getCustomerByOrder(orderId: number): Observable<Customer | undefined> {
    return this.getOrder(orderId).pipe(
      switchMap(order => {
        if (!order) return [];

        return this.http.get<Customer[]>(this.usersUrl).pipe(
          map(users => users.find(user => user.Id === order.UserId))
        );
      })
    );
  }
}

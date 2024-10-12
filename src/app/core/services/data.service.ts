import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Order, ProductInOrder } from '../../shared/models/order.model';
import { Product } from '../../shared/models/product.model';
import { Customer } from '../../shared/models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // In-memory storage for products
  products: Product[] = [];

  constructor(private http: HttpClient) { }

  // Paths to JSON files
  private ordersUrl = 'assets/json/orders.json';
  private productsUrl = 'assets/json/products.json';
  private usersUrl = 'assets/json/users.json';

  /**
   * Fetches all products from the JSON file.
   * Stores the fetched products in the `products` array and logs the operation.
   * @returns An observable of the product array.
   */
  getProducts(): Observable<Product[]> {
    console.log('Fetching products...');
    return this.http.get<Product[]>(this.productsUrl).pipe(
      tap(products => {
        console.log('Storing products:', products);
        this.products = products; // Store products in memory for later use
      }),
      catchError(error => {
        console.error('Error fetching products:', error);
        return of([]); // Return an empty array in case of error
      })
    );
  }

  /**
   * Fetches all orders from the JSON file.
   * @returns An observable of the order array.
   */
  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.ordersUrl).pipe(
      catchError(error => {
        console.error('Error fetching orders:', error);
        return of([]); // Return an empty array in case of error
      })
    );
  }

  /**
   * Fetches a single order by its ID.
   * @param orderId The ID of the order to retrieve.
   * @returns An observable containing the order, or undefined if not found.
   */
  getOrder(orderId: number): Observable<Order | undefined> {
    return this.getOrders().pipe(
      map(orders => orders.find(order => order.OrderId === orderId)),
      catchError(error => {
        console.error(`Error fetching order with ID ${orderId}:`, error);
        return of(undefined); // Return undefined if there's an error
      })
    );
  }

  /**
   * Retrieves the products associated with a specific order.
   * @param orderId The ID of the order.
   * @returns An observable containing an array of products with quantities.
   */
  getProductsByOrderId(orderId: number): Observable<(ProductInOrder & Product | any)[]> {
    return this.getOrder(orderId).pipe(
      switchMap(order => {
        if (!order) return of([]); // Return an empty array if the order is not found

        const productsInOrder = order.Products;
        return this.http.get<Product[]>(this.productsUrl).pipe(
          map(allProducts =>
            productsInOrder.map(productInOrder => ({
              ...productInOrder,
              ...allProducts.find(p => p.ProductId === productInOrder.ProductId)
            }))
          ),
          catchError(error => {
            console.error('Error fetching products for the order:', error);
            return of([]); // Return an empty array if there's an error
          })
        );
      })
    );
  }

  /**
   * Retrieves the customer details associated with a specific order.
   * @param orderId The ID of the order.
   * @returns An observable containing the customer details, or undefined if not found.
   */
  getCustomerByOrder(orderId: number): Observable<Customer | undefined> {
    return this.getOrder(orderId).pipe(
      switchMap(order => {
        if (!order) return of(undefined); // Return undefined if the order is not found

        return this.http.get<Customer[]>(this.usersUrl).pipe(
          map(users => users.find(user => user.Id === order.UserId)),
          catchError(error => {
            console.error(`Error fetching customer for order ID ${orderId}:`, error);
            return of(undefined); // Return undefined if there's an error
          })
        );
      })
    );
  }

  /**
   * Updates the quantity of a product in memory (not persisted).
   * @param product The product to update.
   * @param quantity The new quantity for the product.
   */
  editProductQuantity(product: Product, quantity: number): void {
    console.log(`Editing quantity for product ${product.ProductId} to ${quantity}`);

    const index = this.products.findIndex(p => p.ProductId === product.ProductId);

    if (index !== -1) {
      // Update the quantity of the product in memory
      this.products[index].AvailablePieces = quantity;
      console.log('Updated product:', this.products[index]);
    } else {
      console.log('Product not found');
    }
  }
}

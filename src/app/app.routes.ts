import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'products',
    loadComponent: () =>
      import('./features/products/products.component').then(
        (m) => m.ProductsComponent
      ),
  },
  {
    path: 'cart',
    loadComponent: () => import('./features/cart/cart.component').then(m => m.CartComponent)
  },
  {
    path: 'checkout',
    loadComponent: () => import('./features/checkout/checkout.component').then(m => m.CheckoutComponent)
  },
  // {
  //   path: 'orders',
  //    loadComponent: () =>
  //   import('./features/orders/order-list/order-list.component').then(
  //     (m) => m.OrderListComponent
  //   ),
  //  },
  //  {
  //   path: 'order-details/:id',
  //   loadComponent: () =>
  //  import('./features/orders/order-details/order-details.component').then(
  //    (m) => m.OrderDetailsComponent
  //  ),
  // },
  {
    path: '',
    redirectTo: '/products',
    pathMatch: 'full'
  }

];
